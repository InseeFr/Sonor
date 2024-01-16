import D from "../../i18n";

export const SUTableHeaderParameters =[
    {
        label: D.identifier,
        className: "Clickable ColId",
        sortValue: "id",
        isAlwaysVisible: true,
    },
    {
        label: D.interviewer,
        className: "Clickable ColInterviewer",
        sortValue: "interviewer",
        dataTestId: "TableHeader_interviewer_name",
        isAlwaysVisible: true,
    },
    {
        label: D.ssech,
        className: "Clickable ColSsech",
        sortValue: "ssech",
        isAlwaysVisible: true,
    },
    {
        label: D.department,
        className: "Clickable ColDepartement",
        sortValue: "departement",
        isAlwaysVisible: true,
    },
    {
        label: D.town,
        className: "Clickable ColCity",
        sortValue: "city",
        isAlwaysVisible: true,
    },
    {
        label: D.totalRemindersLabel,
        className: "ColTotalReminders",
        tooltipLabel: D.totalReminders,
        isAlwaysVisible: false,
    },
    {
        label: D.latestReminderLabel,
        className: "ColLatestReminder",
        tooltipLabel: D.latestReminder,
        isAlwaysVisible: false,
    },
    {
        label: `${D.latestReminderLabel}-1`,
        className: "ColLatestReminder",
        tooltipLabel: D.secondLatestReminder,
        isAlwaysVisible: false,
    },
    {
        label: `${D.latestReminderLabel}-2`,
        className: "ColLatestReminder",
        tooltipLabel: D.thirdLatestReminder,
        isAlwaysVisible: false,
    },
    {
        label: `${D.latestReminderLabel}-3`,
        className: "ColLatestReminder",
        tooltipLabel: D.fourthLatestReminder,
        isAlwaysVisible: false,
    },
    {
        label: D.contactOutcomeLabel,
        className: "ColContactOutcomeType",
        isAlwaysVisible: false,
    },
    {
        label: D.contactOutcomeDateLabel,
        className: "Clickable ColContactOutcomeDate",
        sortValue: "contactOutcomeDate",
        tooltipLabel: D.contactOutcomeDate,
        isAlwaysVisible: false,
    },
    {
        label: D.state,
        className: "Clickable ColState",
        sortValue: "state",
        isAlwaysVisible: true,
    }
];