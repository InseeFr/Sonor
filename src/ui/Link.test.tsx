import { fireEvent, render, screen } from "@testing-library/react";
import { Link } from "./Link";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

describe("Link component", () => {
  const label = "Link text";
  const otherPage = "Other page";

  it("should render Link", () => {
    render(
      <Router>
        <Link to={"/path"}>{label}</Link>
      </Router>,
    );

    expect(screen.getByText(label)).toBeInTheDocument();
  });

  it("should navigate", () => {
    render(
      <Router>
        <Routes>
          <Route path="/" element={<Link to={"/path"}>{label}</Link>} />
          <Route path="/path" element={<Link to={"/"}>{otherPage}</Link>} />
        </Routes>
      </Router>,
    );

    expect(screen.getByText(label)).toBeInTheDocument();

    fireEvent.click(screen.getByText(label));

    expect(screen.getByText(otherPage)).toBeInTheDocument();
  });
});
