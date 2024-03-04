import { AppBar, Box, IconButton, Link, Stack, Toolbar, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { Row } from "./Row.tsx";
import { PropsWithChildren } from "react";
import { useUser, useLogout } from "../hooks/useAuth.ts";
import packageInfo from "../../package.json";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

export function Header() {
  const { name } = useUser();
  const logout = useLogout();

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
            <img src="/logoInsee.png" alt="logo insee" width={48} height={50} />
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
            <Row gap={3}>
              <Link color="inherit" component={RouterLink} underline="none" to="/follow">
                Suivre
              </Link>
              <Link color="inherit" component={RouterLink} underline="none" to="/read">
                Relire
              </Link>
            </Row>
            <Row gap={1}>
              <Typography>{name}</Typography>
              <IconButton
                onClick={() =>
                  logout({
                    redirectTo: "specific url",
                    url: "",
                  })
                }
              >
                <ExitToAppIcon />
              </IconButton>
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
