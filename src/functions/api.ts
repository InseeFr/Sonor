import type { APIPaths, APIRequests, APIResponse, APIMethods, APIRequest } from "../types/api.ts";

const baseURL = import.meta.env.VITE_API_ENDPOINT;

const mockApiRequest = new Map<string, (url: string, options: any) => any>()

export function mockRequest<
Path extends APIPaths,
Method extends APIMethods<Path>,
>(path: Path, method: Method, cb: (options: APIRequest<Path, Method>) => APIResponse<Path, Method>) {
  mockApiRequest.set(`${method} ${path}`, cb as any)
}

export function clearMockRequest() {
  mockApiRequest.clear()
}

export async function fetchAPI<
  Path extends APIPaths,
  Options extends APIRequests<Path> & { signal?: AbortSignal; headers?: Record<string, string> },
>(path: Path, options: Options): Promise<APIResponse<Path, Options["method"]>> {
  const fetchOptions: RequestInit = {
    signal: options?.signal,
    method: options?.method?.toUpperCase() ?? "GET",
    headers: {
      Accept: "application/json",
      ...options.headers,
    } as Record<string, string>,
  };
  options = (options ?? {}) as Options;

  // Request body
  const body = "body" in options ? options["body"] : null;
  if (body && (typeof body === "string" || body instanceof FormData)) {
    fetchOptions.body = body;
  } else if (body) {
    (fetchOptions.headers as Record<string, string>)["Content-Type"] = "application/json";
    fetchOptions.body = JSON.stringify(body);
  }

  // Replace url parameters (for instance "/path/{id}"
  let urlPath: string = path;
  if ("urlParams" in options) {
    for (const [name, value] of Object.entries(options.urlParams)) {
      urlPath = urlPath.replace(`{${name}}`, value.toString());
    }
  }

  const url = new URL(baseURL + urlPath);

  // Add query parameters
  if ("query" in options && options.query) {
    for (const [name, value] of Object.entries(options.query)) {
      if (value !== undefined && value !== "") {
        url.searchParams.set(
          name,
          typeof value === "object" && !Array.isArray(value) ? JSON.stringify(value) : (value as any),
        );
      }
    }
  }
  const requestKey = `${fetchOptions.method?.toLowerCase()} ${path}`
  if (mockApiRequest.has(requestKey)) {
    return (mockApiRequest.get('requestKey') as any)(options) as APIResponse<Path, Options["method"]>
  }
  const response = await fetch(url.toString(), fetchOptions);
  if (response.status === 204) {
    return null as any;
  }
  if (!response.headers.get("content-type")?.includes("application/json")) {
    throw new APIError(
      {
        message: await response.text(),
      },
      response.status,
    );
  }
  const data = await response.json();
  if (response.ok) {
    return data;
  }
  throw new APIError(data, response.status);
}
export class APIError extends Error {
  constructor(
    public data: Record<string, unknown>,
    public status: number,
  ) {
    super();
  }

  get message(): string {
    return "message" in this.data && typeof this.data.message === "string"
      ? this.data.message
      : "Server error";
  }

  get errors(): Record<string, string[]> {
    if (!("errors" in this.data)) {
      return {};
    }
    return this.data.errors as Record<string, string[]>;
  }
}
