import { useIntl } from "react-intl";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Link } from "../Link";
import { Link as RouterLink } from "react-router-dom";

const surveysMock = [
  {
    id: "1",
    label: "Logement",
  },
  {
    id: "2",
    label: "Autonomie",
  },
  {
    id: "3",
    label: "TIC",
  },
];

export const FollowSurveyCard = () => {
  const intl = useIntl();

  surveysMock.sort((su1, su2) => su1.label.localeCompare(su2.label));

  return (
    <Card variant="general" sx={{ height: "calc(100vh - 140px)", py: 4, px: 3, overflow: "auto" }}>
      <Stack gap={3}>
        <Typography variant="headlineLarge">{intl.formatMessage({ id: "followSurvey" })}</Typography>

        <Stack gap={1.5} typography={"bodyMedium"}>
          <Box color={"text.tertiary"}>{intl.formatMessage({ id: "chooseSurvey" })}</Box>
          <Stack gap={0.5}>
            {surveysMock.map(survey => (
              <Link
                key={survey.id}
                color="inherit"
                component={RouterLink}
                underline="none"
                to={`/follow/campaign/${survey.id}`}
              >
                {survey.label}
              </Link>
            ))}
          </Stack>
          <Box>{intl.formatMessage({ id: "allSurveys" })}</Box>
        </Stack>
      </Stack>
    </Card>
  );
};
