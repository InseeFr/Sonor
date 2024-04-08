import { AppBar, Box, Divider, IconButton, Link, Stack, Toolbar, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { Row } from "./Row.tsx";
import { PropsWithChildren } from "react";
import packageInfo from "../../package.json";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { AccountNavigation } from "./AccountNavigation.tsx";

const style = {
  "&.MuiLink-root:hover": { color: "primary.main" },
};

export function Header() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        elevation={0}
        sx={{
          py: 1,
          height: 80,
          bgcolor: "white",
          color: "black.main",
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Row gap={2.5} component={HomeLink}>
            <img src="/logoInsee.png" alt="logo insee" width={56} height={58} />
            <Stack>
              <Typography variant="headlineSmall" color="black.main" fontWeight={600}>
                Sabiane Gestion
              </Typography>
              <Typography variant="bodySmall" color="black.main">
                v{packageInfo.version}
              </Typography>
            </Stack>
          </Row>
          <Row gap={8}>
            <Row gap={4} typography={"titleMedium"} color={"text.tertiary"}>
              <Link sx={style} color="inherit" component={RouterLink} underline="none" to="/follow">
                Suivre
              </Link>
              <Link sx={style} color="inherit" component={RouterLink} underline="none" to="/read">
                Lire
              </Link>
              <Link sx={style} color="inherit" component={RouterLink} underline="none" to="/close">
                Clore
              </Link>
              <Link sx={style} color="inherit" component={RouterLink} underline="none" to="/notify">
                Notifier
              </Link>
              <Link
                sx={style}
                color="inherit"
                component={RouterLink}
                underline="none"
                to="/collectOrganization"
              >
                Organisation des collectes
              </Link>
              <Link
                sx={style}
                color="inherit"
                component={RouterLink}
                underline="none"
                to="/reassignment"
              >
                Réaffectation
              </Link>
            </Row>
            <Row gap={1}>
              <IconButton>
                <NotificationsIcon />
              </IconButton>
              <Divider orientation="vertical" variant="middle" sx={{ height: "48px" }} />
              <AccountNavigation />
            </Row>
          </Row>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

const HomeLink = (props: PropsWithChildren) => {
  return <Link component={RouterLink} underline="none" to="/" {...props} />;
};
