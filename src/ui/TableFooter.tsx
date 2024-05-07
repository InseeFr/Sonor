import { TableFooter as MuiTableFooter, TablePagination, TableRow } from "@mui/material";
import { useTranslation } from "../functions/translate";

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
    borderBottom: "none",
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
  const { translate } = useTranslation();
  return (
    <MuiTableFooter>
      <TableRow>
        <TablePagination
          sx={style.root}
          rowsPerPageOptions={[10, 20, 50]}
          labelRowsPerPage={translate("labelRowsPerPage")}
          labelDisplayedRows={page =>
            `${page.from}-${page.to === -1 ? page.count : page.to} ${translate("on")} ${page.count} ${translate("labelDisplayedRows")}`
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
