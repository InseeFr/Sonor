import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import { Button, Menu, Typography } from "@mui/material";
import { useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useLogout, useUser } from "../hooks/useAuth";
import { Link } from "./Link";
import { Row } from "./Row";
import { theme } from "../theme";

export const AccountNavigation = () => {
  const { name } = useUser();

  const logout = useLogout();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);

  const onClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const onClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box component="div">
      <Button
        onClick={onClick}
        color={"inherit"}
        sx={{ textTransform: "none" }}
        startIcon={<AccountCircleIcon fontSize="large" style={{ color: theme.palette.text.tertiary }} />}
        endIcon={<KeyboardArrowDownIcon />}
      >
        <Typography variant="bodyMedium">{name}</Typography>
      </Button>
      <Menu
        id="account-menu"
        aria-labelledby="account-navigation-button"
        anchorEl={anchorEl}
        open={open}
        onClose={onClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem key={"favorite-surveys"} value={"favorite"}>
          <Link to={"/follow"} color="inherit" underline="none">
            Sélectionner mes enquêtes favorites
          </Link>
        </MenuItem>
        <Link to={"/"} color="inherit" underline="none" target="_blank">
          <MenuItem key={"help"} value={"help"}>
            <Row gap={0.5}>
              <OpenInNewIcon fontSize="small" />
              <Typography>AIDE</Typography>
            </Row>
          </MenuItem>
        </Link>
        <MenuItem
          key={"logout"}
          value={"logout"}
          onClick={() =>
            logout({
              redirectTo: "specific url",
              url: "",
            })
          }
        >
          Se déconnecter
        </MenuItem>
      </Menu>
    </Box>
  );
};
