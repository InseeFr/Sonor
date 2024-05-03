import { useNavigate } from "react-router-dom";
import { Row } from "../Row";
import Stack from "@mui/material/Stack";
import { Box, Divider, IconButton, Tabs, Typography } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { Breadcrumbs, BreadcrumbsItem } from "../Breadcrumbs";
import { useIntl } from "react-intl";
import { ReactNode, SyntheticEvent } from "react";

type Props = {
  category: string;
  label: string;
  breadcrumbs: BreadcrumbsItem[];
  currentTab: string;
  onChange: (_: SyntheticEvent, newValue: string) => void;
  children: ReactNode;
};

export const FollowSinglePageHeader = ({
  category,
  label,
  breadcrumbs,
  currentTab,
  onChange,
  children,
}: Props) => {
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
      <Tabs
        value={currentTab}
        onChange={onChange}
        sx={{
          px: 3,
        }}
      >
        {children}
      </Tabs>
    </Stack>
  );
};
