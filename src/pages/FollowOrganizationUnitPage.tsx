import { SyntheticEvent, useState } from "react";
import { useIntl } from "react-intl";
import { FollowSinglePageHeader } from "../ui/follow/FollowSinglePageHeader";
import Tabs from "@mui/material/Tabs";
import { PageTab } from "../ui/PageTab";
import Stack from "@mui/material/Stack";

// TODO remove
const labelMock = "Paris";

enum Tab {
  progress = "progress",
  collect = "collect",
}

export const FollowOrganizationUnitPage = () => {
  const intl = useIntl();
  const [currentTab, setCurrentTab] = useState(Tab.progress);
  const handleChange = (_: SyntheticEvent, newValue: Tab) => {
    setCurrentTab(newValue);
  };

  const breadcrumbs = [
    { href: "/follow", title: "goToFollowPage" },
    intl.formatMessage({ id: "followOrganizationUnitBreacrumb" }),
    labelMock,
  ];

  return (
    <>
      <FollowSinglePageHeader
        category={"organizationUnit"}
        label={labelMock}
        breadcrumbs={breadcrumbs}
      />
      <Tabs
        value={currentTab}
        onChange={handleChange}
        sx={{
          px: 3,
          backgroundColor: "white",
        }}
      >
        {Object.keys(Tab).map(k => (
          <PageTab key={k} value={k} label={intl.formatMessage({ id: k })} />
        ))}
      </Tabs>
      <Stack px={3} py={4}>
        {currentTab === Tab.progress && <>tab avancement</>}
        {currentTab === Tab.collect && <>tab collecte</>}
      </Stack>
    </>
  );
};
