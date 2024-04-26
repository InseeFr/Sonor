import { screen, waitFor, waitForElementToBeRemoved } from "@testing-library/react";
import { WrappedRender } from "../WrappedRender";
import * as hooks from "../hooks/useFetchQuery";
import { HomeTableCard } from "./HomeTableCard";
import userEvent from "@testing-library/user-event";
import { UseMutationResult } from "@tanstack/react-query";
import { APIError } from "../functions/api";
import { APIEndpoints, APIMethods, APIRequest } from "../types/api";

describe("HomeTableCard component", () => {
  const mockedResponse = {
    mutateAsync: vi.fn(),
    mutationFn: vi.fn(),
  } as unknown as UseMutationResult<
    never,
    APIError,
    Omit<APIRequest<keyof APIEndpoints, APIMethods<keyof APIEndpoints>>, "method">,
    unknown
  >;

  vi.spyOn(hooks, "useFetchMutation").mockReturnValue(mockedResponse);

  it("should render HomeTable and filter by id", async () => {
    WrappedRender(<HomeTableCard />);

    expect(screen.getByRole("textbox", { name: /rechercher/i })).toBeInTheDocument();
    expect(screen.getByText("Enquête")).toBeInTheDocument();
    expect(screen.getByText("Sous-éch.")).toBeInTheDocument();
    expect(screen.getByText("Enquêteur")).toBeInTheDocument();
    expect(screen.getAllByRole("row")[1]).toContain(screen.getByRole("cell", { name: /logement/i }));
    expect(screen.getAllByRole("row")[2]).toContain(screen.getByRole("cell", { name: /autonomie/i }));

    await waitFor(() => userEvent.type(screen.getByRole("textbox"), "2"));
    await waitForElementToBeRemoved(screen.queryByRole("cell", { name: /logement/i }));

    expect(screen.getByRole("cell", { name: /autonomie/i })).toBeInTheDocument();
    expect(screen.queryByRole("cell", { name: /logement/i })).not.toBeInTheDocument();
  });

  it("should render HomeTable and filter by campaign label", async () => {
    WrappedRender(<HomeTableCard />);

    expect(screen.getByRole("textbox", { name: /rechercher/i })).toBeInTheDocument();
    expect(screen.getByText("Enquête")).toBeInTheDocument();
    expect(screen.getByText("Sous-éch.")).toBeInTheDocument();
    expect(screen.getByText("Enquêteur")).toBeInTheDocument();
    expect(screen.getAllByRole("row")[1]).toContain(screen.getByRole("cell", { name: /logement/i }));
    expect(screen.getAllByRole("row")[2]).toContain(screen.getByRole("cell", { name: /autonomie/i }));

    await waitFor(() => userEvent.type(screen.getByRole("textbox"), "log"));
    await waitForElementToBeRemoved(screen.queryByRole("cell", { name: /autonomie/i }));

    expect(screen.queryByRole("cell", { name: /autonomie/i })).not.toBeInTheDocument();
    expect(screen.getByRole("cell", { name: /logement/i })).toBeInTheDocument();
  });
});
