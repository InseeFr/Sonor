import { TableCell as MuiTableCell, TableCellProps, TableSortLabel } from "@mui/material";
import { useIntl } from "react-intl";

type Props = {
  columnId: string;
  label: string;
  sort?: boolean;
  order?: "asc" | "desc";
  orderBy?: string;
  onRequestSort?: (event: React.MouseEvent<unknown>, property: string) => void;
} & Pick<TableCellProps, "sx">;

export const TableHeadCell = ({
  columnId,
  label,
  sort = true,
  order,
  orderBy,
  onRequestSort,
  sx,
}: Props) => {
  const intl = useIntl();

  const createSortHandler = (property: string) => (event: React.MouseEvent<unknown>) => {
    if (!onRequestSort) {
      return;
    }
    onRequestSort(event, property);
  };

  return (
    <MuiTableCell sx={{ ...sx, typography: "titleSmall", pb: 2 }}>
      {sort ? (
        <TableSortLabel
          active={orderBy === columnId}
          direction={orderBy === columnId ? order : "asc"}
          onClick={createSortHandler(columnId)}
        >
          {intl.formatMessage({ id: label })}
        </TableSortLabel>
      ) : (
        intl.formatMessage({ id: label })
      )}
    </MuiTableCell>
  );
};
