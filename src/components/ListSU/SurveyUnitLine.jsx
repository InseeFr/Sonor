import React from "react";
import D from "../../i18n";
import Utils from "../../utils/Utils";

function SurveyUnitLine({
  lineData,
  isChecked,
  updateFunc,
  communicationRequestConfiguration,
}) {
  const {
    id,
    displayName,
    ssech,
    departement,
    city,
    interviewer,
    state,
    remindersByOrder = [],
    contactOutcome,
    closingCause,
  } = lineData;

  const getReminderDescription = (reminder) => {
    switch (reminder.medium) {
      case "EMAIL":
        switch (reminder.reason) {
          case "REFUSAL":
            return `${D.reminderEmailMedium} ${D.reminderRefReason}`;
          case "UNREACHABLE":
            return `${D.reminderEmailMedium} ${D.reminderItjReason}`;
          default:
            return D.reminderEmailMedium;
        }
      case "MAIL":
        switch (reminder.reason) {
          case "REFUSAL":
            return `${D.reminderMailMedium} ${D.reminderRefReason}`;
          case "UNREACHABLE":
            return `${D.reminderMailMedium} ${D.reminderItjReason}`;
          default:
            return D.reminderMailMedium;
        }
      default:
        switch (reminder.reason) {
          case "REFUSAL":
            return D.reminderRefReason;
          case "UNREACHABLE":
            return D.reminderItjReason;
          default:
            return "";
        }
    }
  };

  const getReminderDate = (reminder) => {
    const date = reminder.status.find(
      (status) => status.status === "INITIATED"
    ).date;
    return date ? Utils.convertToDateString(new Date(date)) : "";
  };

  return (
    <tr>
      <td className="Clickable ColCheckbox">
        {state !== "CLO" && state !== "TBR" && state !== "FIN" ? (
          <input
            key={lineData.id}
            type="checkbox"
            checked={isChecked}
            name={id}
            value={id}
            onChange={() => updateFunc()}
          />
        ) : (
          <span />
        )}
      </td>
      <td className="ColId">{displayName}</td>
      <td className="ColInterviewer">{interviewer}</td>
      <td className="ColSsech">{ssech}</td>
      <td className="ColDepartement">{departement?.substring(0, 2) ?? ""}</td>
      <td className="ColCity">{city}</td>
      {communicationRequestConfiguration && (
        <>
          <td className="ColTotalReminders">{remindersByOrder.length}</td>
          <td className="ColLatestReminder">
            {remindersByOrder[0] &&
              `${getReminderDescription(remindersByOrder[0])} ${getReminderDate(
                remindersByOrder[0]
              )}`}
          </td>
          <td className="ColLatestReminder">
            {remindersByOrder[1] &&
              `${getReminderDescription(remindersByOrder[1])} ${getReminderDate(
                remindersByOrder[1]
              )}`}
          </td>
          <td className="ColLatestReminder">
            {remindersByOrder[2] &&
              `${getReminderDescription(remindersByOrder[2])} ${getReminderDate(
                remindersByOrder[2]
              )}`}
          </td>
          <td className="ColLatestReminder">
            {remindersByOrder[3] &&
              `${getReminderDescription(remindersByOrder[3])} ${getReminderDate(
                remindersByOrder[3]
              )}`}
          </td>
          <td className="ColContactOutcomeType">
            {contactOutcome?.type && D[contactOutcome.type]}
          </td>
          <td className="ColContactOutcomeDate">
            {contactOutcome?.date &&
              Utils.convertToDateString(new Date(contactOutcome.date))}
          </td>
        </>
      )}
      <td className="ColState">{closingCause ? D[closingCause] : ""}</td>
    </tr>
  );
}

export default SurveyUnitLine;
