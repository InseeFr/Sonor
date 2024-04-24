import { Row } from "../ui/Row";
import { FollowInterviewerCard } from "../ui/FollowInterviewerCard";
import { FollowSurveyCard } from "../ui/FollowSurveyCard";
import { FollowOrganizationUnitCard } from "../ui/FollowOrganizationUnitCard";

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
