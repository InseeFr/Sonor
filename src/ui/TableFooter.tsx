import { TableFooter as MuiTableFooter, TablePagination, TableRow } from "@mui/material";

const style = {
  root: {
    ".MuiTablePagination-displayedRows": {
      typography: "bodySmall",
    },
    ".MuiTablePagination-input": {
      typography: "bodySmall",
    },
    ".MuiTablePagination-selectLabel": {
      typography: "bodySmall",
      color: "text.tertiary",
    },
  },
};

type TableFooterProps = {
  count: number;
  rowsPerPage: number;
  page: number;
  onChangePage: (_: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => void;
  onChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
};

export const TableFooter = ({
  count,
  rowsPerPage,
  page,
  onChangePage,
  onChangeRowsPerPage,
}: TableFooterProps) => {
  return (
    <MuiTableFooter>
      <TableRow>
        <TablePagination
          sx={style.root}
          rowsPerPageOptions={[10, 20, 50]}
          labelRowsPerPage={"Lignes par page :"}
          labelDisplayedRows={page =>
            `${page.from}-${page.to === -1 ? page.count : page.to} sur ${page.count} entités affichées`
          }
          count={count}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={onChangePage}
          onRowsPerPageChange={onChangeRowsPerPage}
        />
      </TableRow>
    </MuiTableFooter>
  );
};
