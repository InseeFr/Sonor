import { useIntl } from "react-intl";
import { useDebouncedState } from "../hooks/useDebouncedState";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { SearchField } from "./SearchField";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import { TableBody, TableCell, TableRow } from "@mui/material";

const interviewersMock = [
  {
    id: "1",
    interviewerFirstName: "John",
    interviewerLastName: "Doe",
  },
  {
    id: "2",
    interviewerFirstName: "Marion",
    interviewerLastName: "Cotillard",
  },
  {
    id: "3",
    interviewerFirstName: "Johnny",
    interviewerLastName: "Depp",
  },
  {
    id: "4",
    interviewerFirstName: "Romain",
    interviewerLastName: "Duris",
  },
  {
    id: "5",
    interviewerFirstName: "Angélina",
    interviewerLastName: "Jolie",
  },
];

export const FollowInterviewerCard = () => {
  const intl = useIntl();
  const [search, setSearch] = useDebouncedState("", 500);
  // const [page, setPage] = useState(0);

  // const handleChangePage = (_: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
  //   setPage(newPage);
  // };

  return (
    <Card variant="general" sx={{ height: "calc(100vh - 140px)", py: 4, px: 3 }}>
      <Stack gap={3}>
        <Typography variant="headlineLarge">
          {intl.formatMessage({ id: "followInterviewer" })}
        </Typography>
        <SearchField
          onChange={e => setSearch(e.target.value)}
          label={intl.formatMessage({ id: "toSearchLabel" })}
          placeholder={intl.formatMessage({ id: "searchInterviewer" })}
        />

        <TableContainer>
          <Table aria-label="interviewer list" size="small" sx={{ typography: "bodyMedium" }}>
            <TableHead>
              <TableRow>
                <TableCell sx={{ color: "text.tertiary" }}>
                  {intl.formatMessage({ id: "chooseInterviewer" })}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {interviewersMock.map(interviewer => (
                <TableRow key={interviewer.id}>
                  <TableCell>
                    {interviewer.interviewerLastName.toLocaleUpperCase()}{" "}
                    {interviewer.interviewerFirstName}
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
