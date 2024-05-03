import { useIntl } from "react-intl";
import { useDebouncedState } from "../../hooks/useDebouncedState";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import { TableBody, TableCell, TableRow } from "@mui/material";
import { useState } from "react";
import { APISchemas } from "../../types/api";
import { Link as RouterLink } from "react-router-dom";
import { Link } from "../Link";
import { FollowCardHeader } from "./FollowCardHeader";
import { useFetchQuery } from "../../hooks/useFetchQuery";

import { LoadingCell } from "../LoadingCell";

export const FollowInterviewerCard = () => {
  const intl = useIntl();
  const [search, setSearch] = useDebouncedState("", 500);
  const [page, setPage] = useState(0);

  const { data: interviewers, isLoading } = useFetchQuery("/api/interviewers", { method: "get" });

  const handleChangePage = (_: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const filteredInterviewers = filterInterviewers({ interviewers: interviewers ?? [], search });

  return (
    <Card variant="general" sx={{ height: "calc(100vh - 140px)", py: 4, px: 3, overflow: "auto" }}>
      <Stack gap={2}>
        <FollowCardHeader
          title={"followInterviewer"}
          onSearch={e => setSearch(e.target.value)}
          placeholder="searchInterviewer"
        />
        <TableContainer>
          <Table aria-label="interviewer list" size="small" sx={{ typography: "bodyMedium" }}>
            <TableHead>
              <TableRow>
                <TableCell sx={{ color: "text.tertiary", px: 0 }}>
                  {intl.formatMessage({ id: "chooseInterviewer" })}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {isLoading ? (
                <LoadingCell columnLength={1} />
              ) : (
                filteredInterviewers.map(interviewer => (
                  <TableRow key={interviewer.id}>
                    <TableCell sx={{ py: 0.5, px: 0 }}>
                      <Link
                        color="inherit"
                        component={RouterLink}
                        underline="none"
                        to={`/follow/interviewer/${interviewer.id}`}
                      >
                        {interviewer.interviewerLastName?.toLocaleUpperCase()}{" "}
                        {interviewer.interviewerFirstName}
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

type FilterInterviewerProps = {
  interviewers: APISchemas["InterviewerDto"][];
  search?: string;
};

/*  filterInterviewers :
  conditions enable to filter when user search by:
  - firstName 
  - lastName
  - firstName follow by lastName 
  - lastName follow by firstName
*/
const filterInterviewers = ({ interviewers, search }: FilterInterviewerProps) => {
  if (search) {
    interviewers = interviewers.filter(
      item =>
        item.interviewerFirstName?.toLowerCase().includes(search.toLowerCase()) ||
        item.interviewerLastName?.toLowerCase().includes(search.toLowerCase()) ||
        (item.interviewerFirstName &&
          item.interviewerLastName &&
          (item.interviewerFirstName
            ?.toLowerCase()
            .concat(item.interviewerLastName?.toLowerCase())
            .includes(search.split(" ").join("").toLowerCase()) ||
            item.interviewerLastName
              ?.toLowerCase()
              .concat(item.interviewerFirstName?.toLowerCase())
              .includes(search.split(" ").join("").toLowerCase()))),
    );
  }

  return interviewers.sort((i1, i2) => {
    const nameI1 = getInterviewerName({
      lastName: i1.interviewerLastName,
      firstName: i1.interviewerFirstName,
    });

    const nameI2 = getInterviewerName({
      lastName: i2.interviewerLastName,
      firstName: i2.interviewerFirstName,
    });

    return nameI1.trim().localeCompare(nameI2.trim());
  });
};

const getInterviewerName = ({ lastName, firstName }: { lastName?: string; firstName?: string }) => {
  if (lastName) {
    return firstName ? lastName.concat(firstName) : lastName;
  } else {
    return firstName ?? "";
  }
};
