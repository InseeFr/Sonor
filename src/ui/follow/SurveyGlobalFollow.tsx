import { Card, Typography } from "@mui/material";
import { useIntl } from "react-intl";

export const SurveyGlobalFollow = () => {
  const intl = useIntl();
  return (
    <Card variant="general" sx={{ p: 4, zIndex: 3, boxShadow: "none" }}>
      <Typography variant="titleSmall">{intl.formatMessage({ id: "followSurvey" })}</Typography>
    </Card>
  );
};
