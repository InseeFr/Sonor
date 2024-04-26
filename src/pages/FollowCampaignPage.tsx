import { useIntl } from "react-intl";
import { FollowSinglePageHeader } from "../ui/follow/FollowSinglePageHeader";
import { SyntheticEvent, useState } from "react";
import Tabs from "@mui/material/Tabs";
import Stack from "@mui/material/Stack";
import { PageTab } from "../ui/PageTab";
import { FollowCampaignProgress } from "../ui/follow/FollowCampaignProgress";

// TODO remove
const labelMock = "Logement";

enum Tab {
  progress = "progress",
  collect = "collect",
  reminders = "reminders",
  provisionalStatus = "provisionalStatus",
  closedSU = "closedSU",
  terminatedSU = "terminatedSU",
}

export const FollowCampaignPage = () => {
  const intl = useIntl();
  const [currentTab, setCurrentTab] = useState(Tab.progress);
  const handleChange = (_: SyntheticEvent, newValue: Tab) => {
    setCurrentTab(newValue);
  };

  const breadcrumbs = [
    { href: "/follow", title: "goToFollowPage" },
    intl.formatMessage({ id: "followCampaignBreacrumb" }),
    labelMock,
  ];

  return (
    <>
      <FollowSinglePageHeader category={"survey"} label={labelMock} breadcrumbs={breadcrumbs} />
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
        {currentTab === Tab.progress && <FollowCampaignProgress />}
        {currentTab === Tab.collect && <>tab collecte</>}
        {currentTab === Tab.reminders && <>tab relances</>}
        {currentTab === Tab.provisionalStatus && <>tab statut provisoire</>}
        {currentTab === Tab.closedSU && <>tab UE cloturées</>}
        {currentTab === Tab.terminatedSU && <>tab UE terminées</>}
      </Stack>
    </>
  );
};
