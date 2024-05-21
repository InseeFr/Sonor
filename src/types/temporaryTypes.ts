export type SurveyUnitTemporaryType = {
  id: string;
  campaignLabel: string;
  ssech: number;
  interviewer: string;
  states: string;
  result: string;
  contactOutcome: {
    date: number;
    type: string;
  };
  priority: boolean;
};
