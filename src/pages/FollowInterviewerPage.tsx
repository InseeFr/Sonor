import { CircularProgress, Stack, Tabs } from "@mui/material";
import { SyntheticEvent, useState } from "react";
import { useIntl } from "react-intl";
import { FollowSinglePageHeader } from "../ui/follow/FollowSinglePageHeader";
import { PageTab } from "../ui/PageTab";
import { Row } from "../ui/Row";
import { useFetchQuery } from "../hooks/useFetchQuery";
import { useParams } from "react-router-dom";

enum Tab {
  progress = "progress",
  collect = "collect",
  lastSynchronization = "lastSynchronization",
}

export const FollowInterviewerPage = () => {
  const { id } = useParams();
  const intl = useIntl();

  const [currentTab, setCurrentTab] = useState<string>(Tab.progress);

  const { data: interviewer } = useFetchQuery("/api/interviewer/{id}", {
    urlParams: {
      id: id!,
    },
  });

  if (!interviewer) {
    return (
      <Row justifyContent="center" py={10}>
        <CircularProgress />
      </Row>
    );
  }

  const label = `${interviewer.lastName?.toLocaleUpperCase() ?? ""} ${interviewer.firstName ?? ""}`;

  const handleChange = (_: SyntheticEvent, newValue: string) => {
    setCurrentTab(newValue);
  };

  const breadcrumbs = [
    { href: "/follow", title: "goToFollowPage" },
    intl.formatMessage({ id: "followInterviewerBreacrumb" }),
    label,
  ];

  return (
    <>
      <FollowSinglePageHeader
        category={"interviewer"}
        label={label}
        breadcrumbs={breadcrumbs}
        currentTab={currentTab}
        onChange={handleChange}
      >
        {Object.keys(Tab).map(k => (
          <PageTab key={k} value={k} label={intl.formatMessage({ id: k })} />
        ))}
      </FollowSinglePageHeader>

      <Stack px={3} py={4}>
        {currentTab === Tab.progress && <>tab avancement</>}
        {currentTab === Tab.collect && <>tab collecte</>}
        {currentTab === Tab.lastSynchronization && <>tab dernière synchro</>}
      </Stack>
    </>
  );
};
