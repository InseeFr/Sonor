import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import { Row } from "./Row";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { SelectWithCheckbox } from "./SelectWithCheckbox";
import { Option } from "./SelectWithCheckbox";
import ClearIcon from "@mui/icons-material/Clear";
import { useGetSearchFilter, useSearchForm, useToggleSearchFilter } from "../hooks/useSearchFilter";
import Chip from "@mui/material/Chip";

const styles = {
  Grid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1fr",
    gap: "16px",
  },
};

// TODO: add other options (campaigns, states, ssech ...)
const contactOutcomeOptions = [
  { label: "Enquête acceptée", value: "ACCEPTED" },
  { label: "Déchet", value: "WASTE" },
  { label: "Hors champ", value: "HC" },
];

export const FiltersCard = () => {
  const filters = useGetSearchFilter();
  const { onReset } = useSearchForm(filters);
  const toggleSearchFilter = useToggleSearchFilter();

  return (
    <Card sx={{ p: 2 }} elevation={2} variant="general">
      <Stack gap={2}>
        <Row justifyContent={"space-between"}>
          <Typography variant="titleMedium">Filtrer les unités par :</Typography>
          <Button variant="text" color="inherit" onClick={onReset}>
            Réinitialiser les filtres
          </Button>
        </Row>
        <Row style={styles.Grid} sx={{ color: "text.tertiary" }}>
          <SelectWithCheckbox
            label={"Enquêtes..."}
            options={[]}
            name="campaigns"
            toggleSearchFilter={toggleSearchFilter}
            filters={filters}
          />
          <SelectWithCheckbox
            label={"Sous-échantillon..."}
            options={[]}
            name="ssech"
            toggleSearchFilter={toggleSearchFilter}
            filters={filters}
          />
          <SelectWithCheckbox
            label={"Enquêteur..."}
            options={[]}
            name="interviewer"
            toggleSearchFilter={toggleSearchFilter}
            filters={filters}
          />
          <SelectWithCheckbox
            label={"Etat..."}
            options={[]}
            name="states"
            toggleSearchFilter={toggleSearchFilter}
            filters={filters}
          />
          <SelectWithCheckbox
            label={"Bilan agrégé..."}
            options={contactOutcomeOptions}
            name="contactOutcome"
            toggleSearchFilter={toggleSearchFilter}
            filters={filters}
          />
          <SelectWithCheckbox
            label={"Prioritaire..."}
            options={[]}
            name="priority"
            toggleSearchFilter={toggleSearchFilter}
            filters={filters}
          />
        </Row>
        <Row gap={1}>
          {/* TODO: add other tags */}
          {getFiltersTags({
            filters: filters.contactOutcome,
            options: contactOutcomeOptions,
            name: "contactOutcome",
            toggleSearchFilter,
          })}
        </Row>
      </Stack>
    </Card>
  );
};

type GetFiltersTagsType = {
  filters: string[];
  options: Option[];
  name: string;
  toggleSearchFilter: (name: string, value: string) => void;
};
const getFiltersTags = ({ filters, options, name, toggleSearchFilter }: GetFiltersTagsType) => {
  return options
    .filter(f => filters.includes(f.value))
    .map(o => (
      <Chip
        sx={{
          typography: "labelMedium",
          ".MuiChip-deleteIcon": { fontSize: "12px" },
        }}
        deleteIcon={<ClearIcon />}
        key={o.value}
        label={o.label}
        onDelete={() => toggleSearchFilter(name, o.value)}
      />
    ));
};
