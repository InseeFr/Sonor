import { Row } from "../ui/Row";
import { FollowInterviewerCard } from "../ui/follow/FollowInterviewerCard";
import { FollowSurveyCard } from "../ui/follow/FollowSurveyCard";
import { FollowOrganizationUnitCard } from "../ui/follow/FollowOrganizationUnitCard";

export const FollowPage = () => {
  // TODO use real condition
  const isNationalProfile = true;

  // TODO call api to get interviewers, surveys and organizationUnits

  const gridTemplateColumns = isNationalProfile
    ? { gridTemplateColumns: "1fr 1fr 1fr" }
    : { gridTemplateColumns: "1fr 1fr" };

  return (
    <Row
      style={{
        ...{
          display: "grid",
          ...gridTemplateColumns,
        },
      }}
      gap={3}
      px={4}
      py={3}
    >
      <FollowSurveyCard />
      <FollowInterviewerCard />
      {isNationalProfile && <FollowOrganizationUnitCard />}
    </Row>
  );
};
