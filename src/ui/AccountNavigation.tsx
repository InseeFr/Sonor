import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import { Button, Divider, Menu, Typography } from "@mui/material";
import { useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useLogout, useUser } from "../hooks/useAuth";
import { Link } from "./Link";
import { Row } from "./Row";
import { theme } from "../theme";
import { useTranslation } from "../hooks/useTranslation";

export const AccountNavigation = () => {
  const { translate } = useTranslation();
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
        <Typography variant="bodyMedium">{translate("myProfile")}</Typography>
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
        <MenuItem disabled sx={{ "&.Mui-disabled": { opacity: 1 }, typography: "titleSmall" }}>
          {name}
        </MenuItem>
        <Divider variant="fullWidth" sx={{ mt: "0px !important" }} />
        {/* TODO: change link */}
        <MenuItem
          {...{ component: Link, to: "/follow" }}
          sx={{
            mt: "12px",
            typography: "bodyMedium",
            textDecoration: "underline",
            color: "primary.main",
          }}
        >
          {translate("selectFavoriteSurveys").toLocaleUpperCase()}
        </MenuItem>
        {/* TODO: change link */}
        <MenuItem
          {...{ component: Link, to: "/", target: "_blank" }}
          sx={{
            textDecoration: "underline",
            color: "primary.main",
          }}
        >
          <Row gap={0.5}>
            <OpenInNewIcon fontSize="littleIcon" />
            <Typography variant={"bodyMedium"}>{translate("goToHelp").toLocaleUpperCase()}</Typography>
          </Row>
        </MenuItem>
        <MenuItem
          sx={{ typography: "bodyMedium" }}
          onClick={() =>
            logout({
              redirectTo: "specific url",
              url: "",
            })
          }
        >
          {translate("logout")}
        </MenuItem>
      </Menu>
    </Box>
  );
};
