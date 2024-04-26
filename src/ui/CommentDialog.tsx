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
import { translate } from "../functions/translate";
import { useIntl } from "react-intl";
import { useFetchMutation } from "../hooks/useFetchQuery";
type Props = {
  open: boolean;
  onClose: () => void;
  comment?: string;
  surveyUnitId: string;
};

export const CommentDialog = ({ open, onClose, comment = "", surveyUnitId }: Props) => {
  const intl = useIntl();
  const [newComment, setNewComment] = useState(comment);

  const { mutateAsync, isPending } = useFetchMutation("/api/survey-unit/{id}/comment", "put");

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    value !== newComment && setNewComment(value);
  };

  const handleCancel = () => {
    onClose();
    setNewComment(comment);
  };

  const handleDelete = async () => {
    await mutateAsync({
      body: { type: "MANAGEMENT", value: "" },
      urlParams: { id: surveyUnitId },
    });
    onClose();
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async e => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const commentData = data.get("comment") as string;
    await mutateAsync({
      body: { type: "MANAGEMENT", value: commentData },
      urlParams: { id: surveyUnitId },
    });

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
            <Box>{translate("comment", intl)}</Box>
            <Row gap={1}>
              <Divider orientation="vertical" variant="middle" sx={{ height: "20px" }} />
              <Box>
                {translate("surveyUnitNumber", intl)} {surveyUnitId}
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
              id="comment"
              name="comment"
              label={translate("comment", intl)}
              placeholder={translate("commentPlaceholder", intl)}
              type="text"
              fullWidth
              variant="outlined"
              multiline
              rows={3}
              value={newComment}
              onChange={onChange}
            />
            <Typography variant="bodySmall" color={"text.tertiary"}>
              {translate("commentDialogHelpText", intl)}
            </Typography>
          </Stack>
        </DialogContent>
        {comment === "" || isModified ? (
          <DialogActions>
            <Button onClick={handleCancel}>{translate("cancel", intl)}</Button>
            <Button type="submit" variant="contained" disabled={!isModified || isPending}>
              {translate("validate", intl)}
            </Button>
          </DialogActions>
        ) : (
          <DialogActions>
            <Button onClick={handleDelete} disabled={isPending}>
              {translate("delete", intl)}
            </Button>
            <Button onClick={handleCancel} variant="contained">
              {translate("closeButtonLabel", intl)}
            </Button>
          </DialogActions>
        )}
      </form>
    </Dialog>
  );
};
