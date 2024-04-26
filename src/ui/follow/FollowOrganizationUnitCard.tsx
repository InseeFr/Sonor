import { useIntl } from "react-intl";
import { useDebouncedState } from "../../hooks/useDebouncedState";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import { TableBody, TableCell, TableRow } from "@mui/material";
import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Link } from "../Link";
import { FollowCardHeader } from "./FollowCardHeader";

const OUMock = [
  {
    id: "1",
    label: "Paris",
  },
  {
    id: "2",
    label: "Metz",
  },
  {
    id: "3",

    label: "Lille",
  },
  {
    id: "4",

    label: "Amiens",
  },
];

export const FollowOrganizationUnitCard = () => {
  const intl = useIntl();
  const [search, setSearch] = useDebouncedState("", 500);
  const [page, setPage] = useState(0);

  const handleChangePage = (_: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const filteredOU = filterOrganizationUnits({ organizationUnits: OUMock, search });

  return (
    <Card variant="general" sx={{ height: "calc(100vh - 140px)", py: 4, px: 3, overflow: "auto" }}>
      <Stack gap={3}>
        <FollowCardHeader
          title={"followOrganizationUnit"}
          onSearch={e => setSearch(e.target.value)}
          placeholder="searchOrganizationUnit"
        />
        <TableContainer>
          <Table aria-label="organization unit list" size="small" sx={{ typography: "bodyMedium" }}>
            <TableHead>
              <TableRow>
                <TableCell sx={{ color: "text.tertiary" }}>
                  {intl.formatMessage({ id: "chooseOrganizationUnit" })}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredOU.map(OU => (
                <TableRow key={OU.id}>
                  <TableCell sx={{ py: 0.5 }}>
                    <Link
                      color="inherit"
                      component={RouterLink}
                      underline="none"
                      to={`/follow/organization-unit/${OU.id}`}
                    >
                      {OU.label}
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            {/* TODO use TableFooter  */}
          </Table>
        </TableContainer>
      </Stack>
    </Card>
  );
};

type FilterOUProps = {
  organizationUnits: { id: string; label: string }[];
  search?: string;
};

const filterOrganizationUnits = ({ organizationUnits, search }: FilterOUProps) => {
  if (search) {
    organizationUnits = organizationUnits.filter(item =>
      item.label.toLowerCase().includes(search.toLowerCase()),
    );
  }

  return organizationUnits.sort((ou1, ou2) => ou1.label.localeCompare(ou2.label));
};
