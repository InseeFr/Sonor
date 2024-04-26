import Tab, { TabProps } from "@mui/material/Tab";

type Props = {
  label: string;
} & TabProps;

export const PageTab = ({ label, ...props }: Props) => {
  return (
    <Tab
      label={label}
      sx={{
        px: 2,
        mx: 0.5,
        py: 2,
        typography: "titleSmall",
        letterSpacing: 0.4,
      }}
      {...props}
    />
  );
};
