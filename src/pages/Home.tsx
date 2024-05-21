import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { FiltersCard } from "../ui/FiltersCard";
import { HomeTableCard } from "../ui/HomeTableCard";
import { useTranslation } from "../hooks/useTranslation";

export const Home = () => {
  const { translate } = useTranslation();

  return (
    <Stack px={4} py={2} gap={2}>
      <Typography variant="headlineLarge" fontWeight={"400"} pb={2} pt={1} alignSelf={"center"}>
        {translate("homepageTitle")}
      </Typography>
      <FiltersCard />
      <HomeTableCard />
    </Stack>
  );
};
