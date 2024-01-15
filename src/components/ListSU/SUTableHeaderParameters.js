import D from "../../i18n";

export const SUTableHeaderParameters =[
    {
        label: D.identifier,
        className: "Clickable ColId",
        sortValue: "id",
        isVisibleWithoutActivatedConfiguration: true,
    },
    {
        label: D.interviewer,
        className: "Clickable ColInterviewer",
        sortValue: "interviewer",
        dataTestId: "TableHeader_interviewer_name",
        isVisibleWithoutActivatedConfiguration: true,
    },
    {
        label: D.ssech,
        className: "Clickable ColSsech",
        sortValue: "ssech",
        isVisibleWithoutActivatedConfiguration: true,
    },
    {
        label: D.department,
        className: "Clickable ColDepartement",
        sortValue: "departement",
        isVisibleWithoutActivatedConfiguration: true,
    },
    {
        label: D.town,
        className: "Clickable ColCity",
        sortValue: "city",
        isVisibleWithoutActivatedConfiguration: true,
    },
    {
        label: D.totalRemindersLabel,
        className: "ColTotalReminders",
        tooltipLabel: D.totalReminders,
        isVisibleWithoutActivatedConfiguration: false,
    },
    {
        label: D.latestReminderLabel,
        className: "ColLatestReminder",
        tooltipLabel: D.latestReminder,
        isVisibleWithoutActivatedConfiguration: false,
    },
    {
        label: `${D.latestReminderLabel}-1`,
        className: "ColLatestReminder",
        tooltipLabel: D.secondLatestReminder,
        isVisibleWithoutActivatedConfiguration: false,
    },
    {
        label: `${D.latestReminderLabel}-2`,
        className: "ColLatestReminder",
        tooltipLabel: D.thirdLatestReminder,
        isVisibleWithoutActivatedConfiguration: false,
    },
    {
        label: `${D.latestReminderLabel}-3`,
        className: "ColLatestReminder",
        tooltipLabel: D.fourthLatestReminder,
        isVisibleWithoutActivatedConfiguration: false,
    },
    {
        label: D.contactOutcomeLabel,
        className: "ColContactOutcomeType",
        isVisibleWithoutActivatedConfiguration: false,
    },
    {
        label: D.contactOutcomeDateLabel,
        className: "Clickable ColContactOutcomeDate",
        sortValue: "contactOutcomeDate",
        tooltipLabel: D.contactOutcomeDate,
        isVisibleWithoutActivatedConfiguration: false,
    },
    {
        label: D.state,
        className: "Clickable ColState",
        sortValue: "state",
        isVisibleWithoutActivatedConfiguration: true,
    }
];