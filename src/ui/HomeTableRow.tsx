import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
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
import { useTranslation } from "../hooks/useTranslation";

type Props = {
  surveyUnit: SurveyUnitTemporaryType; // TODO change type after backend rework
};

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
}));

export const HomeTableRow = ({ surveyUnit }: Props) => {
  const { translate } = useTranslation();

  const [isDialogOpen, toggleDialog] = useToggle(false);

  return (
    <StyledTableRow tabIndex={-1} key={`row-${surveyUnit.id}`}>
      <TableCell sx={{ typography: "itemSmall" }}>
        <Link to={`/survey-unit/${surveyUnit.id}`} color="inherit">
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
        {surveyUnit.result ? translate(surveyUnit.result) : "-"}
      </TableCell>
      <TableCell sx={{ typography: "itemSmall" }}>
        {surveyUnit.contactOutcome ? translate(surveyUnit.contactOutcome.type) : "-"}
      </TableCell>
      <TableCell sx={{ typography: "itemSmall" }}>
        {surveyUnit.priority ? translate("yes") : translate("no")}
      </TableCell>
      <TableCell>
        <Row gap={0.5}>
          <Tooltip title={translate("readQuestionnaire")} placement="bottom-start" arrow>
            <IconButton color="inherit">
              <InsertDriveFileIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Divider orientation="vertical" variant="middle" sx={{ height: "24px" }} />

          <Tooltip title={translate("comment")} placement="bottom-start" arrow>
            <IconButton color="inherit" onClick={toggleDialog}>
              <InsertCommentIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Divider orientation="vertical" variant="middle" sx={{ height: "24px" }} />

          <Tooltip title={translate("close")} placement="bottom-start" arrow>
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
