import { Stack } from "@mui/material";
import { useParams } from "react-router-dom";

export const SurveyUnitPage = () => {
  const { id } = useParams();
  return <Stack>UE {id}</Stack>;
};
