import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { FiltersCard } from "../ui/FiltersCard";

export const Home = () => {
  return (
    <Stack px={4} py={2} gap={2}>
      <Typography variant="headlineLarge" fontWeight={"400"} pb={2} pt={1} alignSelf={"center"}>
        Bienvenue sur votre tableau de bord,
      </Typography>
      <FiltersCard />
    </Stack>
  );
};
