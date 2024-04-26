import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { FiltersCard } from "../ui/FiltersCard";
import { useIntl } from "react-intl";
import { HomeTableCard } from "../ui/HomeTableCard";
import { translate } from "../functions/translate";

export const Home = () => {
  const intl = useIntl();

  return (
    <Stack px={4} py={2} gap={2}>
      <Typography variant="headlineLarge" fontWeight={"400"} pb={2} pt={1} alignSelf={"center"}>
        {translate("homepageTitle", intl)}
      </Typography>
      <FiltersCard />
      <HomeTableCard />
    </Stack>
  );
};
