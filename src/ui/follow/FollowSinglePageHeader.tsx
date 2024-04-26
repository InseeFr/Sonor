import { useNavigate } from "react-router-dom";
import { Row } from "../Row";
import Stack from "@mui/material/Stack";
import { Box, Divider, IconButton, Typography } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { Breadcrumbs, BreadcrumbsItem } from "../Breadcrumbs";
import { useIntl } from "react-intl";

type Props = {
  category: string;
  label: string;
  breadcrumbs: BreadcrumbsItem[];
};

export const FollowSinglePageHeader = ({ category, label, breadcrumbs }: Props) => {
  const navigate = useNavigate();
  const intl = useIntl();

  return (
    <Stack bgcolor={"white"}>
      <Divider variant="fullWidth" />
      <Row justifyContent={"space-between"} alignItems={"initial"} px={4} py={3}>
        <Row gap={4}>
          <IconButton sx={{ bgcolor: "background.default" }} onClick={() => navigate(-1)}>
            <ArrowBackIosNewIcon sx={{ color: "black.main" }} />
          </IconButton>
          <Typography variant="headlineLarge">
            <Box component={"span"}>{intl.formatMessage({ id: category })} - </Box>
            <Box component={"span"} sx={{ color: "text.tertiary" }}>
              {label}
            </Box>
          </Typography>
        </Row>
        <Breadcrumbs items={breadcrumbs} />
      </Row>
      <Divider variant="fullWidth" />
    </Stack>
  );
};
