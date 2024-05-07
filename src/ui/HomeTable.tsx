import { Table, TableBody, TableHead, TableRow } from "@mui/material";
import TableContainer from "@mui/material/TableContainer";
import { TableHeadCell } from "./TableHeadCell";
import { useState } from "react";
import { HomeTableRow } from "./HomeTableRow";
import { TableFooter } from "./TableFooter";
import { SurveyUnitTemporaryType } from "../types/temporaryTypes";

type Props = {
  surveyUnits: SurveyUnitTemporaryType[]; // TODO change type after backend rework
};

const columns = [
  {
    columnId: "id",
    label: "id",
  },
  {
    columnId: "campaignLabel",
    label: "survey",
  },
  {
    columnId: "ssech",
    label: "subSample",
  },
  {
    columnId: "interviewer",
    label: "interviewer",
  },
  {
    columnId: "states",
    label: "state",
  },
  {
    columnId: "result",
    label: "result",
  },
  {
    columnId: "contactOutcome",
    label: "contactOutcome",
  },
  {
    columnId: "priority",
    label: "priority",
  },
  {
    columnId: "actions",
    label: "actions",
    sort: false,
  },
];

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (orderBy === "contactOutcome") {
    const typeA = (a[orderBy] as SurveyUnitTemporaryType["contactOutcome"]).type;
    const typeB = (b[orderBy] as SurveyUnitTemporaryType["contactOutcome"]).type;
    return typeA.localeCompare(typeB);
  }
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator<Key extends keyof any>(
  order: "asc" | "desc",
  orderBy: Key,
): (
  a: { [key in Key]: number | string | boolean | { date: number; type: string } },
  b: { [key in Key]: number | string | boolean | { date: number; type: string } },
) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

export const HomeTable = ({ surveyUnits }: Props) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [orderBy, setOrderBy] = useState<string>("id");

  const handleChangePage = (_: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleRequestSort = (_: React.MouseEvent<unknown>, property: string) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  surveyUnits.sort(getComparator(order, orderBy));

  return (
    <TableContainer>
      <Table aria-label="survey units table" size="small">
        <TableHead>
          <TableRow>
            {columns.map(c => (
              <TableHeadCell
                key={c.label}
                columnId={c.columnId}
                label={c.label}
                sort={c.sort}
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
              />
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {surveyUnits.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(su => (
            <HomeTableRow surveyUnit={su} key={`surveyUnit-${su.id}`} />
          ))}
        </TableBody>
        <TableFooter
          count={surveyUnits.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Table>
    </TableContainer>
  );
};
