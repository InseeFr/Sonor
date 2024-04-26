import { Chip } from "@mui/material";
import { translate } from "../functions/translate";
import { useIntl } from "react-intl";

type Props = {
  value: string;
};

export const StateChip = ({ value }: Props) => {
  const intl = useIntl();
  return <Chip label={translate(value, intl)} variant="filled" color={getChipColor(value)} />;
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
