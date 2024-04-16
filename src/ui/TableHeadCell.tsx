import { TableCell as MuiTableCell, TableCellProps } from "@mui/material";
import { useIntl } from "react-intl";

type Props = {
  label: string;
} & Pick<TableCellProps, "sx">;

export const TableHeadCell = ({ label, sx }: Props) => {
  const intl = useIntl();

  return (
    <MuiTableCell sx={{ ...sx, typography: "titleSmall", pb: 2 }}>
      {intl.formatMessage({ id: label })}
    </MuiTableCell>
  );
};
