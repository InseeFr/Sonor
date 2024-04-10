import { Link as MuiLink, type LinkProps } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

type Props = LinkProps & {
  to: string;
};

export const Link = (props: Props) => {
  return <MuiLink component={RouterLink} {...props} />;
};
