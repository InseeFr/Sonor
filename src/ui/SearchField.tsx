import InputAdornment from "@mui/material/InputAdornment";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import { ChangeEvent } from "react";

type Props = {
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  label: string;
  placeholder: string;
} & Pick<TextFieldProps, "sx">;

export const SearchField = ({ onChange, label, placeholder, sx }: Props) => {
  return (
    <TextField
      sx={{ ...sx, mb: 1 }}
      InputProps={{
        sx: { borderRadius: "8px", height: "48px" },
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon fontSize="small" />
          </InputAdornment>
        ),
      }}
      label={label}
      placeholder={placeholder}
      variant="outlined"
      size="small"
      onChange={onChange}
    />
  );
};
