import 'core-js';
import DataFormatter from './DataFormatter';
import Service from './Service';
import C from './constants.json';
import Utils from './Utils';
import { resolve } from 'dns';
import mocks from 'tests/mocks';
import { vi, it, expect } from 'vitest';

const OriginalDate = global.Date;
vi.spyOn(global, 'Date').mockImplementation(a =>
  a ? new OriginalDate(a) : new OriginalDate('2020-08-20T11:01:58.135Z')
);
Date.now = vi.fn(() => 1597916474000);

vi.mock('./Service');

const {
  mainScreenData,
  userData,
  preferences,
  campaignPortalData2,
  formattedSurveys,
  pearlJamMocks,
  formattedReviewData,
  formattedDataMonitoringTableByInterv,
  formattedDataMonitoringTableByInterv1surv,
  formattedDataMonitoringTableBysurvey,
  formattedDataMonitoringTableBySite,
  formattedListSuData,
  formattedSuTerminated,
  formattedLisSuToReviewSimpsons,
  mainScreenData1Survey,
  surveyVqs,
} = mocks;

Service.mockImplementation(() => ({
  getUser: vi.fn(cb => {
    if (cb) {
      cb(userData);
    }
    return Promise.resolve(userData);
  }),
  putSurveyUnitToValidate: vi.fn((su, cb) => cb({ status: 200 })),
  putPreferences: vi.fn((prefs, cb) => cb({ status: 200 })),
  getQuestionnaireId: vi.fn((id, c) => c({ questionnaireId: 'QXT55' })),
  getCampaigns: vi.fn(cb => cb(mainScreenData)),
  getInterviewersByCampaign: vi.fn((id, cb) => cb(pearlJamMocks.interviewersByCampaign)),
  getInterviewers: vi.fn(cb => cb(pearlJamMocks.interviewers)),
  getSurveyUnitsNotAttributedByCampaign: vi.fn((id, cb) => cb(pearlJamMocks.notAttributed)),
  getSurveyUnitsAbandonedByCampaign: vi.fn((id, cb) => cb(pearlJamMocks.abandoned)),
  getTerminatedByCampaign: vi.fn((id, cb) => {
    cb(Utils.sortData(pearlJamMocks.terminated, 'finalizationDate', true));
    resolve(Utils.sortData(processedData, 'finalizationDate', true));
  }),
  getSurveyUnitsClosable: vi.fn(cb => cb(pearlJamMocks.surveyUnitsClosable)),
  getStatesBySurveyUnit: vi.fn((id, cb) => cb(pearlJamMocks.states)),
  getStateCountTotalByCampaign: vi.fn((id, cb) => cb(pearlJamMocks.stateCountTotal)),
  getSurveyUnits: vi.fn((id, state, cb) => {
    if (cb) {
      cb(pearlJamMocks.surveyUnits);
    }
    return new Promise(resolve => {
      resolve(pearlJamMocks.surveyUnits);
    });
  }),
  getStateCountByInterviewer: vi.fn((id, idep, date, cb) => {
    if (cb) {
      cb(pearlJamMocks.interviewerStateCount);
    }
    return new Promise(resolve => {
      resolve(pearlJamMocks.interviewerStateCount);
    });
  }),
  getCampaignsByInterviewer: vi.fn((idep, cb) => {
    if (cb) {
      cb(pearlJamMocks.campaignsByInterviewer);
    }
    return new Promise(resolve => {
      resolve(pearlJamMocks.campaignsByInterviewer);
    });
  }),
  getStateCount: vi.fn((id, date, cb) => cb(pearlJamMocks.stateCountTotal)),
  getStateCountByCampaign: vi.fn((date, cb) => cb(pearlJamMocks.stateCountByCampaign)),
  getStateCountByInterviewers: vi.fn((date, cb) => {
    if (cb) {
      cb(pearlJamMocks.stateCountByInterv);
    }
    return new Promise(resolve => {
      resolve(pearlJamMocks.stateCountByInterv);
    });
  }),
  getSurveyUnitsQuestionnaireIdByCampaign: vi.fn((campaignId, cb) =>
    cb(pearlJamMocks.surveyUnitsQuestionnaireId)
  ),
}));

const dataRetreiver = new DataFormatter();
it('Test getInterviewers', async () => {
  const callBack = vi.fn();
  dataRetreiver.getInterviewers(callBack);
  // Should return properly formatted data
  expect(callBack).toHaveBeenLastCalledWith(pearlJamMocks.interviewers);
});

it('Test getUserInfo', async () => {
  const callBack = vi.fn();
  dataRetreiver.getUserInfo(callBack);
  // Should return properly formatted data
  expect(callBack).toHaveBeenLastCalledWith(userData);
});

it('Test getPreferences', async () => {
  const callBack = vi.fn();
  dataRetreiver.getPreferences(callBack);
  // Should return properly formatted data
  await vi.waitFor(() => expect(callBack).toHaveBeenLastCalledWith(preferences));
  // Same when using the returned promise
  const res = await dataRetreiver.getPreferences();
  expect(res).toEqual(preferences);
});

it('Test updatePreferences', async () => {
  const callBack = vi.fn();
  dataRetreiver.updatePreferences(['id'], callBack);
  await vi.waitFor(() => expect(callBack).toHaveBeenCalled());
  // Should return properly formatted data
  expect(callBack).toHaveBeenLastCalledWith({ status: 200 });
  // Same when using the returned promise
  const res = await dataRetreiver.updatePreferences(['id']);
  expect(res).toEqual({ status: 200 });
});

it('Test getDataForCampaignPortal', async () => {
  const callBack = vi.fn();
  dataRetreiver.getDataForCampaignPortal('id', callBack);
  await vi.waitFor(() => expect(callBack).toHaveBeenCalled());
  // Should return properly formatted data
  expect(callBack).toHaveBeenLastCalledWith(campaignPortalData2);
});

it('Test getDataForMainScreen', async () => {
  const callBack = vi.fn();
  dataRetreiver.getDataForMainScreen(null, callBack);
  // Should return properly formatted data
  expect(callBack).toHaveBeenLastCalledWith(formattedSurveys);
});

it('Test getDataForClosePage', async () => {
  const callBack = vi.fn();
  dataRetreiver.getDataForClosePage(callBack);
  // Should return properly formatted data
  expect(callBack).toHaveBeenLastCalledWith(pearlJamMocks.surveyUnitsClosable);
});

it('Test getDataForListSU', async () => {
  const callBack = vi.fn();
  dataRetreiver.getDataForListSU('id', callBack);
  await vi.waitFor(() => expect(callBack).toHaveBeenCalled());
  // Should return properly formatted data
  expect(callBack).toHaveBeenLastCalledWith(formattedListSuData);
});

it('Test getDataForReview', async () => {
  const callBack = vi.fn();
  dataRetreiver.getDataForReview(null, callBack, [
    ...mainScreenData,
    {
      id: 'simpsons2020x00',
      label: 'Survey on the Simpsons tv show 2020',
      managementStartDate: 1576801000000,
      interviewerStartDate: 1575937000000,
      identificationPhaseStartDate: 1577233000000,
      collectionStartDate: 1577837800000,
      collectionEndDate: 1640996200000,
      endDate: 1641514600000,
      allocated: 4,
      toProcessInterviewer: 0,
      toAffect: 0,
      toFollowUp: 0,
      toReview: 16,
      finalized: 0,
      preference: true,
    },
  ]);
  await vi.waitFor(() => expect(callBack).toHaveBeenCalled());
  // Should return properly formatted data
  expect(callBack.mock.calls[0][0].map(a => a.id).sort()).toEqual(
    formattedReviewData.map(a => a.id).sort((a, b) => a.localeCompare(b))
  );
});

it('Test getListSuTerminated', async () => {
  const callBack = vi.fn();
  dataRetreiver.getListSuTerminated('id', callBack);
  await vi.waitFor(() => expect(callBack).toHaveBeenCalled());
  // Should return properly formatted data
  expect(callBack).toHaveBeenLastCalledWith(formattedSuTerminated);
});

it('Test getDataForMonitoringTable (by interviewer 1 survey)', async () => {
  const callBack = vi.fn();
  dataRetreiver.getDataForMonitoringTable(
    surveyVqs,
    new Date('2020-08-20T11:01:58.135Z'),
    null,
    C.BY_INTERVIEWER_ONE_SURVEY,
    callBack
  );
  await vi.waitFor(() => expect(callBack).toHaveBeenCalled());
  // Should return properly formatted data
  expect(callBack).toHaveBeenLastCalledWith(formattedDataMonitoringTableByInterv1surv);
});

it('Test getDataForMonitoringTable (by survey 1 Interviewer)', async () => {
  const callBack = vi.fn();
  dataRetreiver.getDataForMonitoringTable(
    mainScreenData1Survey,
    new Date('2020-08-20T11:01:58.135Z'),
    null,
    C.BY_SURVEY_ONE_INTERVIEWER,
    callBack
  );
  await vi.waitFor(() => expect(callBack).toHaveBeenCalled());
  // Should return properly formatted data
  expect(callBack).toHaveBeenCalledWith(formattedDataMonitoringTableByInterv);
});

it('Test getDataForMonitoringTable (by survey)', async () => {
  const callBack2 = vi.fn();
  const dataRet = new DataFormatter();
  dataRet.getDataForMonitoringTable(
    mainScreenData1Survey,
    new Date('2020-08-20T11:01:58.135Z'),
    null,
    C.BY_SURVEY,
    callBack2,
    mainScreenData
  );
  await vi.waitFor(() => expect(callBack2).toHaveBeenCalled());
  // Should return properly formatted data
  expect(callBack2).toHaveBeenCalledWith(formattedDataMonitoringTableBysurvey);
});

it('Test getDataForMonitoringTable (by site)', async () => {
  const callBack = vi.fn();
  dataRetreiver.getDataForMonitoringTable(
    formattedSurveys,
    new Date('2020-08-20T11:01:58.135Z'),
    null,
    C.BY_SITE,
    callBack
  );
  await vi.waitFor(() => expect(callBack).toHaveBeenCalled());
  // Should return properly formatted data
  expect(callBack).toHaveBeenLastCalledWith(formattedDataMonitoringTableBySite);
});

it('Test getStatesSurvey', async () => {
  const callBack = vi.fn();
  dataRetreiver.getStatesSurvey('id', callBack);
  await vi.waitFor(() => expect(callBack).toHaveBeenCalled());
  // Should return properly formatted data
  expect(callBack).toHaveBeenLastCalledWith(pearlJamMocks.states.states);
  // Same when using the returned promise
  const res = await dataRetreiver.getStatesSurvey('id');
  expect(res).toEqual(pearlJamMocks.states.states);
});

it('Test finalizeSurveyUnits', async () => {
  const callBack = vi.fn();
  dataRetreiver.finalizeSurveyUnits(['id'], callBack);
  await vi.waitFor(() => expect(callBack).toHaveBeenCalled());
  // Should return properly formatted data
  expect(callBack).toHaveBeenLastCalledWith([{ status: 200 }]);
  // Same when using the returned promise
  const res = await dataRetreiver.finalizeSurveyUnits(['id']);
  expect(res).toEqual([{ status: 200 }]);
});

it('Test getListSUToReview', async () => {
  const res = await dataRetreiver.getListSUToReview('simpsons2020x00', mainScreenData);
  // Should return properly formatted data
  expect(res.map(a => a.id).sort((a, b) => a.localeCompare(b))).toEqual(
    formattedLisSuToReviewSimpsons.map(a => a.id).sort((a, b) => a.localeCompare(b))
  );
});

// getInterviewers
// updateSurveyUnitsState
// closeSurveyUnits
// tagWithClosingCauseSurveyUnits
// updateSurveyUnitsComment
// updateSurveyUnitViewed
// getlinesDetails
// getSurveyByInterviewerDataForMonitoringTable
// getDataForCollectionTableBySurvey
// getDataForCollectionTableByInterviewerOneSuvey
// getDataForCollectionTableBySurveyOneInterviewer
// getDataForCollectionTableBySite
// getDataForCollectionTable
// postMessage
// verifyName
// getMessageHistory
