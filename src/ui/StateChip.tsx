import { Chip } from "@mui/material";
import { useTranslation } from "../functions/translate";

type Props = {
  value: string;
};

export const StateChip = ({ value }: Props) => {
  const { translate } = useTranslation();
  return <Chip label={translate(value)} variant="filled" color={getChipColor(value)} />;
};

const getChipColor = (value: string) => {
  // TODO use real color and all states
  switch (value) {
    case "NVM":
      return "success";
    case "NNS":
      return "error";
    case "CLO":
      return "info";
    default:
      return "default";
  }
};
