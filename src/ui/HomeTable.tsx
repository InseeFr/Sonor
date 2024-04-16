import { Table, TableBody, TableHead, TableRow } from "@mui/material";
import TableContainer from "@mui/material/TableContainer";
import { TableHeadCell } from "./TableHeadCell";
import { useState } from "react";
import { HomeTableRow } from "./HomeTableRow";
import { TableFooter } from "./TableFooter";
import { theme } from "../theme";

type Props = {
  surveyUnits: Record<string, string>[]; // TODO change type after backend rework
};

export const HomeTable = ({ surveyUnits }: Props) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (_: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  return (
    <TableContainer>
      <Table aria-label="survey units table" size="small">
        <TableHead>
          <TableRow
            sx={{
              borderBottom: `solid 1px ${theme.palette.text.hint}`,
            }}
          >
            <TableHeadCell key={"id"} label={"id"} />
            <TableHeadCell key={"campaignLabel"} label={"surveys"} />
            <TableHeadCell key={"ssech"} label={"subSample"} />
            <TableHeadCell key={"interviewer"} label={"interviewer"} />
            <TableHeadCell key={"state"} label={"state"} />
            <TableHeadCell key={"closingCause"} label={"closingCause"} />
            <TableHeadCell key={"contactOutcome"} label={"contactOutcome"} />
            <TableHeadCell key={"priority"} label={"priority"} />
            <TableHeadCell key={"actions"} label={"actions"} />
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
