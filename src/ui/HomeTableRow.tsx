import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import { useIntl } from "react-intl";
import { styled } from "@mui/material/styles";
import { Row } from "./Row";
import Tooltip from "@mui/material/Tooltip";
import { Divider, IconButton } from "@mui/material";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import InsertCommentIcon from "@mui/icons-material/InsertComment";
import { SurveyUnitTemporaryType } from "../types/temporaryTypes";
import { useToggle } from "react-use";
import { CommentDialog } from "./CommentDialog";
import { Link } from "./Link";
import { StateChip } from "./StateChip";
import ClearIcon from "@mui/icons-material/Clear";

type Props = {
  surveyUnit: SurveyUnitTemporaryType; // TODO change type after backend rework
};

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
}));

export const HomeTableRow = ({ surveyUnit }: Props) => {
  const intl = useIntl();

  const [isDialogOpen, toggleDialog] = useToggle(false);

  return (
    <StyledTableRow tabIndex={-1} key={`row-${surveyUnit.id}`}>
      <TableCell sx={{ typography: "itemSmall" }}>
        <Link to={`/surveyUnits/${surveyUnit.id}`} color="inherit">
          {surveyUnit.id}
        </Link>
      </TableCell>
      <TableCell sx={{ typography: "itemSmall" }}>{surveyUnit.campaignLabel}</TableCell>
      <TableCell sx={{ typography: "itemSmall" }}>{surveyUnit.ssech ?? "-"}</TableCell>
      <TableCell sx={{ typography: "itemSmall" }}>{surveyUnit.interviewer ?? "-"}</TableCell>
      <TableCell sx={{ typography: "itemSmall" }}>
        <StateChip value={surveyUnit.states} />
      </TableCell>
      <TableCell sx={{ typography: "itemSmall" }}>
        {surveyUnit.closingCause ? intl.formatMessage({ id: surveyUnit.closingCause }) : "-"}
      </TableCell>
      <TableCell sx={{ typography: "itemSmall" }}>
        {surveyUnit.contactOutcome ? intl.formatMessage({ id: surveyUnit.contactOutcome }) : "-"}
      </TableCell>
      <TableCell sx={{ typography: "itemSmall" }}>
        {surveyUnit.priority ? intl.formatMessage({ id: "yes" }) : intl.formatMessage({ id: "no" })}
      </TableCell>
      <TableCell>
        <Row gap={0.5}>
          <Tooltip
            title={intl.formatMessage({ id: "readQuestionnaire" })}
            placement="bottom-start"
            arrow
          >
            <IconButton color="inherit">
              <InsertDriveFileIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Divider orientation="vertical" variant="middle" sx={{ height: "24px" }} />

          <Tooltip title={intl.formatMessage({ id: "comment" })} placement="bottom-start" arrow>
            <IconButton color="inherit" onClick={toggleDialog}>
              <InsertCommentIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Divider orientation="vertical" variant="middle" sx={{ height: "24px" }} />

          <Tooltip title={intl.formatMessage({ id: "close" })} placement="bottom-start" arrow>
            <IconButton color="inherit">
              <ClearIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Row>
      </TableCell>
      <CommentDialog open={isDialogOpen} onClose={toggleDialog} surveyUnitId={surveyUnit.id} />
    </StyledTableRow>
  );
};
