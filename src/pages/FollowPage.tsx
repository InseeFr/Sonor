import { Row } from "../ui/Row";
import { FollowInterviewerCard } from "../ui/FollowInterviewerCard";

export const FollowPage = () => {
  // TODO use real condition
  const isNationalProfile = true;

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
      <FollowInterviewerCard />
    </Row>
  );
};
