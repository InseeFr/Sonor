import { useIntl } from "react-intl";
import { SyntheticEvent, useState } from "react";
import Tabs from "@mui/material/Tabs";
import Stack from "@mui/material/Stack";
import { SurveyGlobalFollow } from "./SurveyGlobalFollow";
import { Tab as MuiTab } from "@mui/material";

// TODO change tabs
enum Tab {
  progress = "progress",
  collect = "collect",
  reminders = "reminders",
  provisionalStatus = "provisionalStatus",
  closedSU = "closedSU",
}

export const FollowCampaignProgress = () => {
  const intl = useIntl();
  const [currentTab, setCurrentTab] = useState(Tab.progress);
  const handleChange = (_: SyntheticEvent, newValue: Tab) => {
    setCurrentTab(newValue);
  };

  return (
    <>
      <Tabs
        value={currentTab}
        onChange={handleChange}
        sx={{
          ml: 5,
          ".MuiTabs-indicator": { backgroundColor: "white" },
          position: "relative",
          width: "fit-content",
        }}
      >
        {Object.keys(Tab).map(k => (
          <MuiTab classes={"cardTab"} label={intl.formatMessage({ id: k })} key={k} value={k} />
        ))}
      </Tabs>

      <Stack>
        {/* todo changes components and tabs  */}
        {currentTab === Tab.progress && <SurveyGlobalFollow />}
        {currentTab === Tab.collect && <SurveyGlobalFollow />}
        {currentTab === Tab.reminders && <SurveyGlobalFollow />}
        {currentTab === Tab.provisionalStatus && <SurveyGlobalFollow />}
        {currentTab === Tab.closedSU && <SurveyGlobalFollow />}
      </Stack>
    </>
  );
};
