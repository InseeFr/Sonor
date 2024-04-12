import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import { Row } from "./Row";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { SelectWithCheckbox, Option } from "./SelectWithCheckbox";
import ClearIcon from "@mui/icons-material/Clear";
import { useGetSearchFilter, useSearchForm, useToggleSearchFilter } from "../hooks/useSearchFilter";
import Chip from "@mui/material/Chip";
import { useIntl } from "react-intl";

const styles = {
  Grid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1fr",
    gap: "16px",
  },
};

// TODO: add other options (campaigns, states, ssech ...)
const closingCauseOptions = [
  { label: "Enquête acceptée", value: "ACCEPTED" },
  { label: "Déchet", value: "WASTE" },
  { label: "Hors champ", value: "HC" },
];

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
];

export const FiltersCard = () => {
  const intl = useIntl();
  const filters = useGetSearchFilter();
  const { onReset } = useSearchForm(filters);
  const toggleSearchFilter = useToggleSearchFilter();

  return (
    <Card sx={{ p: 2 }} elevation={2} variant="general">
      <Stack gap={2}>
        <Row justifyContent={"space-between"}>
          <Typography variant="titleMedium">{intl.formatMessage({ id: "filterUnitsBy" })}</Typography>
          <Button variant="text" color="inherit" onClick={onReset}>
            {intl.formatMessage({ id: "resetFilters" })}
          </Button>
        </Row>
        <Row style={styles.Grid} sx={{ color: "text.tertiary" }}>
          <SelectWithCheckbox
            label={intl.formatMessage({ id: "surveyFilterLabel" })}
            options={[]}
            name="campaigns"
            toggleSearchFilter={toggleSearchFilter}
            filters={filters}
          />
          <SelectWithCheckbox
            label={intl.formatMessage({ id: "subSampleFilterLabel" })}
            options={[]}
            name="ssech"
            toggleSearchFilter={toggleSearchFilter}
            filters={filters}
          />
          <SelectWithCheckbox
            label={intl.formatMessage({ id: "interviewerFilterLabel" })}
            options={interviewerMock}
            name="interviewer"
            toggleSearchFilter={toggleSearchFilter}
            filters={filters}
            canSearch={true}
          />
          <SelectWithCheckbox
            label={intl.formatMessage({ id: "statesFilterLabel" })}
            options={[]}
            name="states"
            toggleSearchFilter={toggleSearchFilter}
            filters={filters}
          />
          <SelectWithCheckbox
            label={intl.formatMessage({ id: "closingCauseFilterLabel" })}
            options={closingCauseOptions}
            name="closingCause"
            toggleSearchFilter={toggleSearchFilter}
            filters={filters}
          />
          <SelectWithCheckbox
            label={intl.formatMessage({ id: "priorityFilterLabel" })}
            options={priorityOptions}
            name="priority"
            toggleSearchFilter={toggleSearchFilter}
            filters={filters}
          />
        </Row>
        <Row gap={1} flexWrap={"wrap"}>
          {getFiltersTags({
            filters: filters.all,
            options: [...priorityOptions, ...closingCauseOptions, ...interviewerMock],
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
