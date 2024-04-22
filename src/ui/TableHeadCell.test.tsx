import { fireEvent, screen } from "@testing-library/react";
import { WrappedRender } from "../WrappedRender";
import { TableHeadCell } from "./TableHeadCell";

describe("TableHeadCell component", () => {
  it("should render label, sort icon and call sort function  ", () => {
    const onRequestSortMock = vi.fn();
    WrappedRender(
      <TableHeadCell
        columnId={"id"}
        label={"id"}
        order={"asc"}
        orderBy="id"
        onRequestSort={onRequestSortMock}
      />,
    );
    expect(screen.getByText("Identifiant")).toBeInTheDocument();
    expect(screen.getByTestId("ArrowDownwardIcon")).toBeInTheDocument();
    fireEvent.click(screen.getByText("Identifiant"));
    expect(onRequestSortMock).toHaveBeenCalledTimes(1);
  });

  it("should only render label  ", () => {
    const onRequestSortMock = vi.fn();
    WrappedRender(
      <TableHeadCell
        columnId={"id"}
        label={"id"}
        sort={false}
        order={"asc"}
        orderBy="id"
        onRequestSort={onRequestSortMock}
      />,
    );
    expect(screen.getByText("Identifiant")).toBeInTheDocument();
    expect(screen.queryByTestId("ArrowDownwardIcon")).not.toBeInTheDocument();
    fireEvent.click(screen.getByText("Identifiant"));
    expect(onRequestSortMock).not.toHaveBeenCalled();
  });
});
