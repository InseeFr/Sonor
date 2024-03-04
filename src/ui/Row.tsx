import Stack from "@mui/material/Stack";
import { type StackProps } from "@mui/material";
import { forwardRef } from "react";

/**
 * A horizontal stack
 */
export const Row = forwardRef<HTMLDivElement, StackProps>((props, ref) => {
  return <Stack direction="row" alignItems="center" ref={ref} {...props} />;
});
