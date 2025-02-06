import { cleanup } from '@testing-library/react';
import Utils from './Utils';
import D from '../i18n';
import { vi, it, expect, afterEach } from 'vitest';

const toLocaleDateString = Date.prototype.toLocaleString;
const getHours = Date.prototype.getUTCHours;
const getMinutes = Date.prototype.getUTCMinutes;
Date.prototype.toLocaleDateString = function () {
  return toLocaleDateString.call(this, 'en-EN', {
    timeZone: 'UTC',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  });
};
Date.prototype.getHours = function () {
  return getHours.call(this);
};
Date.prototype.getMinutes = function () {
  return getMinutes.call(this);
};
const OriginalDate = global.Date;
vi.spyOn(global, 'Date').mockImplementation(a =>
  a ? new OriginalDate(a) : new OriginalDate('2020-08-20T11:01:58.135Z')
);
Date.now = vi.fn(() => 1597916474000);

afterEach(cleanup);

it('Test function convertToDateString', async () => {
  // Should equal '5/26/2020'
  expect(Utils.convertToDateString(1590504561350)).toEqual('5/26/2020');
});

it('Test function convertMsToHoursMinutes', async () => {
  // Should equal '14:49'
  expect(Utils.convertMsToHoursMinutes(1590504561350)).toEqual('14:49');
});

it('Test function calculateCompletionRate', async () => {
  // Should equal 7/9
  expect(
    Utils.calculateCompletionRate({ tbrCount: 4, finCount: 3, cloCount: 2, total: 11 })
  ).toEqual(9 / 11);
});

it('Test isVisible', async () => {
  // Should equal true
  expect(
    Utils.isVisible(
      {
        managementStartDate: 1576801000000,
        interviewerStartDate: 1575937000000,
        identificationPhaseStartDate: 1577233000000,
        collectionStartDate: 1577837800000,
        collectionEndDate: 1640996200000,
        endDate: 1641514600000,
      },
      '08-20-2020'
    )
  ).toEqual(true);
});

it('Test getCampaignPhase', async () => {
  // Should equal 0
  expect(Utils.getCampaignPhase(1620504561350, 1622035845000, 1622025045000)).toEqual(0);
});

it('Test displayCampaignPhase', async () => {
  // Should return correct string
  expect(Utils.displayCampaignPhase(0)).toEqual(D.initialAssignment);
  expect(Utils.displayCampaignPhase(1)).toEqual(D.collectionInProgress);
  expect(Utils.displayCampaignPhase(2)).toEqual(D.collectionOver);
  expect(Utils.displayCampaignPhase(3)).toEqual(D.treatmentOver);
});

it('Test getCampaignPhase treatment over', async () => {
  // Should equal 3
  expect(Utils.getCampaignPhase(1000000000, 1000000000, 1000000000)).toEqual(3);
});

it('Test handleSort default case', async () => {
  // Should return correct object
  expect(Utils.handleSort('sortOn', [], {}, null, null)).toEqual([
    {},
    { asc: null, sortOn: 'sortOn' },
  ]);
});
