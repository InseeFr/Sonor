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
import { useFetchQuery } from "../../hooks/useFetchQuery";

import { APISchemas } from "../../types/api";
import { LoadingCell } from "../LoadingCell";

export const FollowOrganizationUnitCard = () => {
  const intl = useIntl();
  const [search, setSearch] = useDebouncedState("", 500);
  const [page, setPage] = useState(0);

  const { data: organizationUnits, isLoading } = useFetchQuery("/api/organization-units", {
    method: "get",
  });

  const handleChangePage = (_: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const filteredOU = filterOrganizationUnits({ organizationUnits: organizationUnits ?? [], search });

  return (
    <Card variant="general" sx={{ height: "calc(100vh - 140px)", py: 4, px: 3, overflow: "auto" }}>
      <Stack gap={2}>
        <FollowCardHeader
          title={"followOrganizationUnit"}
          onSearch={e => setSearch(e.target.value)}
          placeholder="searchOrganizationUnit"
        />
        <TableContainer>
          <Table aria-label="organization unit list" size="small" sx={{ typography: "bodyMedium" }}>
            <TableHead>
              <TableRow>
                <TableCell sx={{ color: "text.tertiary", px: 0 }}>
                  {intl.formatMessage({ id: "chooseOrganizationUnit" })}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {isLoading ? (
                <LoadingCell columnLength={1} />
              ) : (
                filteredOU.map(OU => (
                  <TableRow key={OU.id}>
                    <TableCell sx={{ py: 0.5, px: 0 }}>
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
                ))
              )}
            </TableBody>
            {/* TODO use TableFooter  */}
          </Table>
        </TableContainer>
      </Stack>
    </Card>
  );
};

type FilterOUProps = {
  organizationUnits: APISchemas["OrganizationUnitContextDto"][];
  search?: string;
};

const filterOrganizationUnits = ({ organizationUnits, search }: FilterOUProps) => {
  if (search) {
    organizationUnits = organizationUnits.filter(item =>
      item.label?.toLowerCase().includes(search.toLowerCase()),
    );
  }

  return organizationUnits.sort((ou1, ou2) => {
    if (!ou1.label || !ou2.label) {
      return 1;
    }
    return ou1.label.localeCompare(ou2.label);
  });
};
