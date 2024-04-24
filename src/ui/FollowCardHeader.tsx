import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useIntl } from "react-intl";
import { SearchField } from "./SearchField";
import { ChangeEvent } from "react";

type Props = {
  title: string;
  placeholder: string;
  onSearch: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
};

export const FollowCardHeader = ({ title, placeholder, onSearch }: Props) => {
  const intl = useIntl();

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    onSearch(e);
  };

  return (
    <Stack gap={3}>
      <Typography variant="headlineLarge">{intl.formatMessage({ id: title })}</Typography>
      <SearchField
        onChange={handleChange}
        label={intl.formatMessage({ id: "toSearchLabel" })}
        placeholder={intl.formatMessage({ id: placeholder })}
      />
    </Stack>
  );
};
