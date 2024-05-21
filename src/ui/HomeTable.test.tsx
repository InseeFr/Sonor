import { fireEvent, screen } from "@testing-library/react";
import { WrappedRender } from "../WrappedRender";
import { HomeTable } from "./HomeTable";
import { surveyUnitsMock } from "./HomeTableCard";
import { UseMutationResult } from "@tanstack/react-query";
import { APIError } from "../functions/api";
import { APIEndpoints, APIMethods, APIRequest } from "../types/api";
import * as hooks from "../hooks/useFetchQuery";

describe("HomeTable component", () => {
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

  it("should render HomeTable and change order when sort on id", () => {
    WrappedRender(<HomeTable surveyUnits={surveyUnitsMock} />);

    expect(screen.getByText("Identifiant")).toBeInTheDocument();
    expect(screen.getByText("Enquête")).toBeInTheDocument();
    expect(screen.getByText("Sous-éch.")).toBeInTheDocument();
    expect(screen.getByText("Enquêteur")).toBeInTheDocument();
    expect(screen.getByText("Etat")).toBeInTheDocument();
    expect(screen.getByText("Résultat")).toBeInTheDocument();
    expect(screen.getByText("Bilan des contacts")).toBeInTheDocument();
    expect(screen.getByText("Prioritaire")).toBeInTheDocument();
    expect(screen.getByText("Actions")).toBeInTheDocument();
    expect(screen.getAllByRole("row")[1]).toContain(screen.getByRole("cell", { name: /logement/i }));
    expect(screen.getAllByRole("row")[2]).toContain(screen.getByRole("cell", { name: /autonomie/i }));

    fireEvent.click(
      screen.getByRole("button", {
        name: /identifiant/i,
      }),
    );
    expect(screen.getAllByRole("row")[1]).toContain(screen.getByRole("cell", { name: /autonomie/i }));
    expect(screen.getAllByRole("row")[2]).toContain(screen.getByRole("cell", { name: /logement/i }));
  });
});
