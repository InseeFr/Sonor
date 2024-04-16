import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import { SearchField } from "./SearchField";
import { useIntl } from "react-intl";
import { useDebouncedState } from "../hooks/useDebouncedState";
import { HomeTable } from "./HomeTable";

const surveyUnitsMock = [
  {
    id: "10000000000",
    campaignLabel: "Logement",
    ssech: "1",
    interviewer: "enquêteur 1",
    state: "état",
    closingCause: "bilan",
    contactOutcome: "bilan des contacts",
    priority: "true",
  },
  {
    id: "20000000000",
    campaignLabel: "Autonomie",
    ssech: "2",
    interviewer: "enquêtrice 2",
    state: "état 2",
    closingCause: "bilan 2",
    contactOutcome: "bilan des contacts 2",
    priority: "true",
  },
];

export const HomeTableCard = () => {
  const intl = useIntl();
  const [search, setSearch] = useDebouncedState("", 500);

  const filteredSurveyUnits = filterSurveyUnits({ surveyUnits: surveyUnitsMock ?? [], search });

  return (
    <Card sx={{ px: 2, py: 3 }} elevation={2} variant="general">
      <Stack gap={2}>
        <SearchField
          sx={{ maxWidth: "330px" }}
          onChange={e => setSearch(e.target.value)}
          label={intl.formatMessage({ id: "toSearchLabel" })}
          placeholder={intl.formatMessage({ id: "searchSurveyUnitPlaceholder" })}
        />
        <HomeTable surveyUnits={filteredSurveyUnits} />
      </Stack>
    </Card>
  );
};

type FilterSurveyUnitsProps = {
  surveyUnits: Record<string, string>[]; // TODO change type after backend rework
  search?: string;
};

const filterSurveyUnits = ({ surveyUnits, search }: FilterSurveyUnitsProps) => {
  if (search) {
    surveyUnits = surveyUnits.filter(
      item =>
        item.id?.includes(search) || item.campaign?.toLocaleLowerCase().includes(search.toLowerCase()),
    );
  }
  return surveyUnits;
};
