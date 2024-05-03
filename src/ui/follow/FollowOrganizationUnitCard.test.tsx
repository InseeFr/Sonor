import userEvent from "@testing-library/user-event";
import { WrappedRender } from "../../WrappedRender";
import { FollowOrganizationUnitCard } from "./FollowOrganizationUnitCard";
import { act, screen, waitFor } from "@testing-library/react";
import { clearMockRequest, mockRequest } from "../../functions/api";

describe("FollowOrganizationUnitCard component", () => {
  beforeEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
    mockRequest("/api/organization-units", "get", () => [
      {
        id: "DR75",
        label: "Ile de France",
        type: "LOCAL" as const,
        users: [],
      },
      {
        id: "DR51",
        label: "Champagne-Ardenne",
        type: "LOCAL" as const,
        users: [],
      },
    ]);
  });

  afterEach(() => clearMockRequest());

  it("should render FollowOrganizationUnitCard component", () => {
    WrappedRender(<FollowOrganizationUnitCard />);

    expect(screen.getByText("Suivre un site")).toBeInTheDocument();
    expect(screen.getByRole("textbox")).toBeInTheDocument();
    expect(screen.getByText("Champagne-Ardenne")).toBeInTheDocument();

    expect(screen.getByText("Ile de France")).toBeInTheDocument();
  });

  it("should display search result", async () => {
    await act(async () => WrappedRender(<FollowOrganizationUnitCard />));

    userEvent.type(screen.getByRole("textbox"), "france");

    expect(screen.getByText("Ile de France")).toBeInTheDocument();
    await waitFor(() => expect(screen.queryByText("Champagne-Ardenne")).not.toBeInTheDocument());
  });

  it("should display sorted OU", async () => {
    await act(async () => WrappedRender(<FollowOrganizationUnitCard />));

    const links = screen.getAllByRole("link");
    expect(links[0]).toContainHTML("Champagne-Ardenne");
    expect(links[1]).toContainHTML("Ile de France");
  });
});
