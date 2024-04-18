import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { theme } from "../theme";
import { ChangeEvent, useState } from "react";
import { Box, Divider, InputAdornment, Stack, Typography } from "@mui/material";
import { Row } from "./Row";
import { useIntl } from "react-intl";

type Props = {
  open: boolean;
  onClose: () => void;
  comment?: string;
  surveyUnitId: string;
};

export const CommentDialog = ({ open, onClose, comment = "", surveyUnitId }: Props) => {
  const intl = useIntl();

  const [newComment, setNewComment] = useState(comment);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    value !== newComment && setNewComment(value);
  };

  const handleCancel = () => {
    onClose();
    setNewComment(comment);
  };

  const handleDelete = () => {
    // TODO call api to delete comment
    onClose();
    setNewComment("");
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault();
    // TODO call api to add comment
    onClose();
  };

  const isModified = newComment !== comment;

  return (
    <Dialog
      open={open}
      onClose={handleCancel}
      sx={{ ".MuiPaper-root": { width: "560px", px: 3, borderRadius: "8px", pb: 2 } }}
    >
      <form onSubmit={handleSubmit}>
        <DialogTitle>
          <Row justifyContent={"space-between"}>
            <Box>{intl.formatMessage({ id: "comment" })}</Box>
            <Row gap={1}>
              <Divider orientation="vertical" variant="middle" sx={{ height: "20px" }} />
              <Box>
                {intl.formatMessage({ id: "surveyUnitNumber" })} {surveyUnitId}
              </Box>
            </Row>
          </Row>
        </DialogTitle>
        <DialogContent>
          <Stack gap={1}>
            <TextField
              sx={{
                mt: 1,
                ".MuiInputLabel-root": {
                  typography: "labelMedium",
                },
                ".MuiInputBase-root": {
                  typography: "bodyMedium",
                },
                ".MuiOutlinedInput-notchedOutline": {
                  borderColor: theme.palette.text.secondary,
                },
              }}
              InputProps={{
                startAdornment: <InputAdornment position="start" />,
              }}
              autoFocus
              id="comment"
              name="comment"
              label={intl.formatMessage({ id: "comment" })}
              placeholder={intl.formatMessage({ id: "commentPlaceholder" })}
              type="text"
              fullWidth
              variant="outlined"
              multiline
              rows={3}
              value={newComment}
              onChange={onChange}
            />
            <Typography variant="bodySmall" color={"text.tertiary"}>
              {intl.formatMessage({ id: "commentDialogHelpText" })}
            </Typography>
          </Stack>
        </DialogContent>
        {comment === "" || isModified ? (
          <DialogActions>
            <Button onClick={handleCancel}>{intl.formatMessage({ id: "cancel" })}</Button>
            <Button type="submit" variant="contained" disabled={!isModified}>
              {intl.formatMessage({ id: "validate" })}
            </Button>
          </DialogActions>
        ) : (
          <DialogActions>
            <Button onClick={handleDelete}>{intl.formatMessage({ id: "delete" })}</Button>
            <Button onClick={handleCancel} variant="contained">
              {intl.formatMessage({ id: "closeButtonLabel" })}
            </Button>
          </DialogActions>
        )}
      </form>
    </Dialog>
  );
};
