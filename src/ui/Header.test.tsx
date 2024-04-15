import { fireEvent, screen } from "@testing-library/react";
import { Header } from "./Header";
import { WrappedRender } from "../WrappedRender";
import * as hooks from "../hooks/useAuth";

describe("Header component", () => {
  beforeAll(() => {
    vi.spyOn(hooks, "useUser").mockImplementation(() => {
      return { name: "John Doe", inseegroupedefaut: ["gr"], preferred_username: "username" };
    });
    vi.spyOn(hooks, "useLogout").mockImplementation(vi.fn());
  });

  it("should render labels and user name in Header ", () => {
    WrappedRender(<Header />);

    expect(screen.getByText("Sabiane Gestion")).toBeInTheDocument();
    expect(screen.getByText("Suivre")).toBeInTheDocument();
    expect(screen.getByText("Lire")).toBeInTheDocument();
    expect(screen.getByText("Clore")).toBeInTheDocument();
    expect(screen.getByText("Notifier")).toBeInTheDocument();
    expect(screen.getByText("Réaffectation")).toBeInTheDocument();
    expect(screen.getByText("Organisation des collectes")).toBeInTheDocument();
    expect(screen.getByText("John Doe")).toBeInTheDocument();
  });

  it("should open account menu and call logout", () => {
    const logoutMock = vi.fn();
    vi.spyOn(hooks, "useLogout").mockImplementation(() => {
      return logoutMock;
    });
    WrappedRender(<Header />);

    fireEvent.click(screen.getByText("John Doe"));

    const logoutButton = screen.getByText("Se déconnecter");
    expect(logoutButton).toBeInTheDocument();

    fireEvent.click(logoutButton);

    expect(logoutMock).toHaveBeenCalled();
  });
});
