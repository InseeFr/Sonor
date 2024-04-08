import MenuItem from "@mui/material/MenuItem";
import { Button, Checkbox, Menu, Typography } from "@mui/material";
import { useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import shadows from "@mui/material/styles/shadows";
import { Filter, emptyFilter } from "../hooks/useSearchFilter";

const style = {
  root: {
    boxShadow: shadows[2],
    borderRadius: 8,
    justifyContent: "space-between",
  },
};

export type Option = { label: string; value: string };

type Props = {
  label: string;
  name: string;
  options: Option[];
  toggleSearchFilter: (name: string, value: string) => void;
  filters: typeof emptyFilter;
};

export const SelectWithCheckbox = ({ label, options, name, filters, toggleSearchFilter }: Props) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);

  const onClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const onClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button
        onClick={onClick}
        style={style.root}
        sx={{ textTransform: "none", typography: "bodySmall" }}
        size="large"
        endIcon={<KeyboardArrowDownIcon fontSize="small" />}
        color="inherit"
      >
        {label}
      </Button>
      <Menu
        sx={{ my: 0.5 }}
        elevation={2}
        id="select-menu"
        aria-labelledby="select-button"
        anchorEl={anchorEl}
        open={open}
        onClose={onClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        {options.map(option => (
          <MenuItem
            key={option.value}
            onClick={() => {
              toggleSearchFilter(name, option.value);
            }}
            sx={{ pl: 0, py: 0 }}
          >
            <Checkbox size="small" checked={filters[name as keyof Filter].includes(option.value)} />
            <Typography variant="bodySmall">{option.label}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};
