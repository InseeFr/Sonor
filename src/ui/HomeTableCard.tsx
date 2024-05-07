import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import { SearchField } from "./SearchField";
import { useDebouncedState } from "../hooks/useDebouncedState";
import { HomeTable } from "./HomeTable";
import { Filter, useGetSearchFilter } from "../hooks/useSearchFilter";
import { SurveyUnitTemporaryType } from "../types/temporaryTypes";
import { useTranslation } from "../hooks/useTranslation";

export const surveyUnitsMock = [
  {
    id: "10000000000",
    campaignLabel: "Logement",
    ssech: 10,
    interviewer: "enquêteur 1",
    states: "CLO",
    result: "NPA",
    contactOutcome: {
      date: 123,
      type: "NOA",
    },
    priority: true,
  },
  {
    id: "20000000000",
    campaignLabel: "Autonomie",
    ssech: 2,
    interviewer: "enquêteur 2",
    states: "FIN",
    result: "NPI",
    contactOutcome: {
      date: 123,
      type: "ALA",
    },
    priority: false,
  },
];

export const HomeTableCard = () => {
  const { translate } = useTranslation();
  const [search, setSearch] = useDebouncedState("", 500);
  const filters = useGetSearchFilter();

  const filteredSurveyUnits = filterSurveyUnits({ surveyUnits: surveyUnitsMock ?? [], search, filters });

  return (
    <Card sx={{ px: 2, py: 3 }} elevation={2} variant="general">
      <Stack gap={2}>
        <SearchField
          sx={{ maxWidth: "330px" }}
          onChange={e => setSearch(e.target.value)}
          label={translate("toSearchLabel")}
          placeholder={translate("searchSurveyUnitPlaceholder")}
        />
        <HomeTable surveyUnits={filteredSurveyUnits} />
      </Stack>
    </Card>
  );
};

type FilterSurveyUnitsProps = {
  surveyUnits: SurveyUnitTemporaryType[]; // TODO change type after backend rework
  search?: string;
  filters: Filter;
};

const filterSurveyUnits = ({ surveyUnits, search, filters }: FilterSurveyUnitsProps) => {
  if (search) {
    surveyUnits = surveyUnits.filter(
      item =>
        item.id?.includes(search) ||
        item.campaignLabel?.toLocaleLowerCase().includes(search.toLowerCase()),
    );
  }

  filters.campaigns.length !== 0 &&
    (surveyUnits = surveyUnits.filter(item => filters.campaigns.includes(item.campaignLabel)));

  filters.ssech.length !== 0 &&
    (surveyUnits = surveyUnits.filter(item => filters.ssech.toString().includes(item.ssech.toString())));

  filters.interviewer.length !== 0 &&
    (surveyUnits = surveyUnits.filter(item => filters.interviewer.includes(item.interviewer)));

  filters.states.length !== 0 &&
    (surveyUnits = surveyUnits.filter(item => filters.states.includes(item.states)));

  filters.result.length !== 0 &&
    (surveyUnits = surveyUnits.filter(item => filters.result.includes(item.result)));

  filters.priority.length !== 0 &&
    (surveyUnits = surveyUnits.filter(item =>
      filters.priority.includes(item.priority ? "true" : "false"),
    ));

  return surveyUnits;
};
