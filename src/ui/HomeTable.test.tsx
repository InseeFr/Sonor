import { fireEvent, screen } from "@testing-library/react";
import { WrappedRender } from "../WrappedRender";
import { HomeTable } from "./HomeTable";
import { surveyUnitsMock } from "./HomeTableCard";

describe("HomeTable component", () => {
  it("should render HomeTable and change order when sort on id", () => {
    WrappedRender(<HomeTable surveyUnits={surveyUnitsMock} />);

    expect(screen.getByText("Identifiant")).toBeInTheDocument();
    expect(screen.getByText("Enquête")).toBeInTheDocument();
    expect(screen.getByText("Sous-éch.")).toBeInTheDocument();
    expect(screen.getByText("Enquêteur")).toBeInTheDocument();
    expect(screen.getByText("Etat")).toBeInTheDocument();
    expect(screen.getByText("Bilan agrégé")).toBeInTheDocument();
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
