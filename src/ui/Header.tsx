import { AppBar, Box, Divider, IconButton, Link, Stack, Toolbar, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { Row } from "./Row.tsx";
import { PropsWithChildren } from "react";
import packageInfo from "../../package.json";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { AccountNavigation } from "./AccountNavigation.tsx";
import { useIntl } from "react-intl";

const style = {
  "&.MuiLink-root:hover": { color: "primary.main" },
};

export function Header() {
  const intl = useIntl();

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
                {intl.formatMessage({ id: "goToFollowPage" })}
              </Link>
              <Link sx={style} color="inherit" component={RouterLink} underline="none" to="/read">
                {intl.formatMessage({ id: "goToReadPage" })}
              </Link>
              <Link sx={style} color="inherit" component={RouterLink} underline="none" to="/close">
                {intl.formatMessage({ id: "goToClosePage" })}
              </Link>
              <Link sx={style} color="inherit" component={RouterLink} underline="none" to="/notify">
                {intl.formatMessage({ id: "goToNotifyPage" })}
              </Link>
              <Link
                sx={style}
                color="inherit"
                component={RouterLink}
                underline="none"
                to="/collectOrganization"
              >
                {intl.formatMessage({ id: "goToCollectOrganization" })}
              </Link>
              <Link
                sx={style}
                color="inherit"
                component={RouterLink}
                underline="none"
                to="/reassignment"
              >
                {intl.formatMessage({ id: "goToReassignment" })}
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
