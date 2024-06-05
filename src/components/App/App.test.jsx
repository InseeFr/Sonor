// Link.react.test.js
import React from 'react';
import { render, screen, cleanup } from "@testing-library/react";
import { NotificationManager } from 'react-notifications';
import DataFormatter from '../../utils/DataFormatter';
import { App } from "./App";
import mocks from '../../tests/mocks';
import C from '../../utils/constants.json';
import { mockOidcForUser, mockOidcFailed } from "../../Authentication/useAuth";

jest.mock(
	"../../../package.json",
	() => ({
		version: "1.0.0",
	})
);

const toLocaleDateString = Date.prototype.toLocaleString;
Date.prototype.toLocaleDateString = function() {
  return toLocaleDateString.call(this, 'en-EN', { timeZone: 'UTC',year: "numeric", month: "numeric", day: "numeric" });
};
const OriginalDate = global.Date;
jest
  .spyOn(global, 'Date')
  .mockImplementation((a) => (a ? new OriginalDate(a) : new OriginalDate('2020-08-20T11:01:58.135Z')));
Date.now = jest.fn(() => 1597916474000);

afterEach(cleanup);

jest.mock('react-notifications');
jest.mock('../../utils/DataFormatter');
jest.mock('../../initConfiguration');

const {
  mainScreenData,
  userData,
  preferences,
  respModeByInterviewers1Survey,
  respModeBySite,
  respModeBySurvey,
  respModeByInterviewer,
  reviewDataAllSurveys,
  campaignPortalData,
  suTerminated,
  listSU,
} = mocks;

const mockSuccess = jest.fn();
const mockError = jest.fn();
NotificationManager.success = mockSuccess;
NotificationManager.error = mockError;

const updatePreferences = jest.fn((newPrefs, cb) => {
  if (newPrefs.includes('simpsonkgs2020x00')) {
    cb({ status: 500 });
  } else {
    cb({ status: 200 });
  }
});

DataFormatter.mockImplementation(() => ({
  getPreferences: (c) => (c(preferences)),
  getAllCampaigns: (c) => (c(mainScreenData)),
  getQuestionnaireId: (id, c) => (c({ questionnaireId: 'QXT55' })),
  getFormattedCampaignsForMainScreen: (a, c) => {
    if (c) { c(mainScreenData); }
    return Promise.resolve(mainScreenData);
  },
  getListSuTerminated: (id, cb) => (cb(suTerminated)),
  getDataForReview: (s, cb) => (cb(reviewDataAllSurveys)),
  getDataForCampaignPortal: (a, cb) => (cb(campaignPortalData)),
  getDataForListSU: (a, cb) => (cb(listSU)),
  getUserInfo: (cb) => (cb(userData)),
  getDataForMonitoringTable: (survey, date, pagination, mode, cb) => {
    switch (mode) {
      case C.BY_INTERVIEWER_ONE_SURVEY:
        cb(respModeByInterviewers1Survey);
        break;
      case C.BY_SITE:
        cb(respModeBySite);
        break;
      case C.BY_SURVEY:
        cb(respModeBySurvey);
        break;
      case C.BY_INTERVIEWER:
        cb(respModeByInterviewer);
        break;
      default:
        break;
    }
  },
  updatePreferences,
}));

it("Component is displayed ", async () => {
  mockOidcForUser();
  const component = render(<App />);
  await screen.findByText("List of surveys");
  expect(component).toMatchSnapshot();
});

it("Component is not displayed ", async () => {
  mockOidcFailed();
  const component = render(<App />);
  expect(component).toMatchSnapshot();
});
