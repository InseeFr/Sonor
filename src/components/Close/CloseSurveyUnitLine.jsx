import D from '../../i18n';
import React from 'react';

function CloseSurveyUnitLine({ lineData, isChecked, updateFunc }) {
  const {
    campaign, id,displayName, ssech, contactOutcome, questionnaireState, interviewer, closingCause, identificationState
  } = lineData;
  return (
    <tr>
      <td className="Clickable ColCheckbox">
        <input key={lineData.id} type="checkbox" checked={isChecked} name={id} value={id} onChange={() => updateFunc()} />
      </td>
      <td className="ColCampaign">{campaign}</td>
      <td className="ColId">{displayName}</td>
      <td className="ColInterviewer">{`${interviewer?.interviewerLastName ?? ""} ${interviewer?.interviewerFirstName ?? ""}`}</td>
      <td className="ColSsech">{ssech}</td>
      <td className="ColIdentificationState">{identificationState ? D[identificationState] : ''}</td>
      <td className="ColLocation">{contactOutcome ? D[contactOutcome.type] : ''}</td>
      <td className="ColCity">{questionnaireState ? D[questionnaireState] : ''}</td>
      <td className="ColState">{closingCause ? D[closingCause] : ''}</td>
    </tr>
  );
}

export default CloseSurveyUnitLine;
