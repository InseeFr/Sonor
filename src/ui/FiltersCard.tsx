import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import { Row } from "./Row";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { SelectWithCheckbox, Option } from "./SelectWithCheckbox";
import ClearIcon from "@mui/icons-material/Clear";
import { useGetSearchFilter, useSearchForm, useToggleSearchFilter } from "../hooks/useSearchFilter";
import Chip from "@mui/material/Chip";
import { surveyUnitStatesEnum } from "../constants/surveyUnitStates";
import { useTranslation } from "../hooks/useTranslation";

const styles = {
  Grid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1fr",
    gap: "16px",
  },
};

// TODO: add real options
const priorityOptions = [
  { label: "Oui", value: "true" },
  { label: "Non", value: "false" },
];

const interviewerMock = [
  {
    label: "john Doe",
    value: "1",
  },
  { label: "james Doe", value: "2" },
  { label: "Jean Dupont", value: "3" },
  { label: "enquêteur 1", value: "enquêteur 1" },
  { label: "enquêteur 2", value: "enquêteur 2" },
  { label: "enquêteur 3", value: "enquêteur 3" },
  { label: "enquêteur 4", value: "enquêteur 4" },
  { label: "enquêteur 5", value: "enquêteur 5" },
  { label: "enquêteur 6", value: "enquêteur 6" },
  { label: "enquêteur 7", value: "enquêteur 7" },
  { label: "enquêteur 8", value: "enquêteur 8" },
  { label: "enquêteur 9", value: "enquêteur 9" },
  { label: "enquêteur 10", value: "enquêteur 10" },
  { label: "enquêteur 11", value: "enquêteur 11" },
  { label: "enquêteur 12", value: "enquêteur 12" },
  { label: "enquêteur 13", value: "enquêteur 13" },
];

const surveysMock = [
  { label: "enquête 1", value: "enquête 1" },
  { label: "enquête 2", value: "enquête 2" },
  { label: "enquête 3", value: "enquête 3" },
  { label: "Autonomie", value: "Autonomie" },
  { label: "Logement", value: "Logement" },
];

const subsampleMock = [
  { label: "-", value: "undefined" },
  { label: 10, value: "10" },
  { label: 11, value: "11" },
];

export const FiltersCard = () => {
  const { translate } = useTranslation();
  const filters = useGetSearchFilter();
  const { onReset } = useSearchForm(filters);
  const toggleSearchFilter = useToggleSearchFilter();

  // TODO: find enum
  const resultOptions = [].map(c => {
    return { label: translate(c), value: c };
  });

  const statesOptions = surveyUnitStatesEnum.map(s => {
    return { label: translate(s), value: s };
  });

  return (
    <Card sx={{ p: 2 }} elevation={2} variant="general">
      <Stack gap={2}>
        <Row justifyContent={"space-between"}>
          <Typography variant="titleMedium">{translate("filterUnitsBy")}</Typography>
          <Button variant="text" color="inherit" onClick={onReset}>
            <Typography sx={{ textDecoration: "underline" }}>{translate("resetFilters")}</Typography>
          </Button>
        </Row>
        <Row style={styles.Grid} sx={{ color: "text.tertiary" }}>
          <SelectWithCheckbox
            label={translate("surveyFilterLabel")}
            options={surveysMock}
            name="campaigns"
            toggleSearchFilter={toggleSearchFilter}
            filters={filters}
          />
          <SelectWithCheckbox
            label={translate("subSampleFilterLabel")}
            options={subsampleMock}
            name="ssech"
            toggleSearchFilter={toggleSearchFilter}
            filters={filters}
          />
          <SelectWithCheckbox
            label={translate("interviewerFilterLabel")}
            options={interviewerMock}
            name="interviewer"
            toggleSearchFilter={toggleSearchFilter}
            filters={filters}
            canSearch={true}
          />
          <SelectWithCheckbox
            label={translate("statesFilterLabel")}
            options={statesOptions}
            name="states"
            toggleSearchFilter={toggleSearchFilter}
            filters={filters}
          />
          <SelectWithCheckbox
            label={translate("resultFilterLabel")}
            options={resultOptions}
            name="result"
            toggleSearchFilter={toggleSearchFilter}
            filters={filters}
          />
          <SelectWithCheckbox
            label={translate("priorityFilterLabel")}
            options={priorityOptions}
            name="priority"
            toggleSearchFilter={toggleSearchFilter}
            filters={filters}
          />
        </Row>
        <Row gap={1} flexWrap={"wrap"}>
          {getFiltersTags({
            filters: filters.all,
            options: [
              ...priorityOptions,
              ...resultOptions,
              ...statesOptions,
              ...interviewerMock,
              ...surveysMock,
              ...subsampleMock,
            ],
            toggleSearchFilter,
          })}
        </Row>
      </Stack>
    </Card>
  );
};

type GetFiltersTagsType = {
  filters: { name: string; value: string }[];
  options: Option[];
  toggleSearchFilter: (name: string, value: string) => void;
};
const getFiltersTags = ({ filters, options, toggleSearchFilter }: GetFiltersTagsType) => {
  return filters.map(f => (
    <Chip
      sx={{
        typography: "labelMedium",
        ".MuiChip-deleteIcon": { fontSize: "12px" },
      }}
      deleteIcon={<ClearIcon />}
      key={f.value}
      label={options.find(o => o.value === f.value)?.label}
      onDelete={() => toggleSearchFilter(f.name, f.value)}
    />
  ));
};
