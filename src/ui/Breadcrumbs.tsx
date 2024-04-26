import MuiBreadcrumbs from "@mui/material/Breadcrumbs";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import { NavLink } from "react-router-dom";
import { useIntl } from "react-intl";

export type BreadcrumbsItem = { href: string; title: string } | string;

type Props = {
  items: BreadcrumbsItem[];
};

export function Breadcrumbs({ items }: Readonly<Props>) {
  return (
    <MuiBreadcrumbs
      aria-label="breadcrumb"
      sx={{
        typography: "itemSmall",
        ".MuiBreadcrumbs-separator": {
          color: "text.tertiary",
        },
      }}
    >
      {items.map(item => (
        <BreadcrumbsItem item={item} key={getKey(item)} />
      ))}
    </MuiBreadcrumbs>
  );
}

function getKey(item: BreadcrumbsItem) {
  if (typeof item === "string") {
    return item;
  }
  return item.href;
}

function BreadcrumbsItem({ item }: Readonly<{ item: BreadcrumbsItem }>) {
  const intl = useIntl();
  if (typeof item === "string") {
    return (
      <Box component="span" color="text.tertiary">
        {item}
      </Box>
    );
  }

  return (
    <Link component={NavLink} underline="hover" color="text.tertiary" to={item.href}>
      {intl.formatMessage({ id: item.title })}
    </Link>
  );
}
