import { screen, cleanup, render, act } from '@testing-library/react';
import { NotificationManager } from 'react-notifications';
import { App } from './App';
import mocks from '../../tests/mocks';
import C from '../../utils/constants.json';
import { mockOidcForUser, mockOidcFailed } from '../../Authentication/useAuth';
import { afterEach, describe, expect, it, vi } from 'vitest';
import D from '../../i18n';

vi.mock('../../../package.json', () => ({
  version: '1.0.0',
}));

vi.mock('react-notifications');

const toLocaleDateString = Date.prototype.toLocaleString;
Date.prototype.toLocaleDateString = function () {
  return toLocaleDateString.call(this, 'en-EN', {
    timeZone: 'UTC',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  });
};
const OriginalDate = global.Date;
vi.spyOn(global, 'Date').mockImplementation(a =>
  a ? new OriginalDate(a) : new OriginalDate('2020-08-20T11:01:58.135Z')
);
Date.now = vi.fn(() => 1597916474000);

afterEach(cleanup);

vi.mock('react-notifications');
vi.mock('../../initConfiguration');

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

const mockSuccess = vi.fn();
const mockError = vi.fn();
NotificationManager.success = mockSuccess;
NotificationManager.error = mockError;

const updatePreferences = vi.fn((newPrefs, cb) => {
  if (newPrefs.includes('simpsonkgs2020x00')) {
    cb({ status: 500 });
  } else {
    cb({ status: 200 });
  }
});

describe('Component display', () => {
  it('Component is displayed ', async () => {
    mockOidcForUser();

    await act(async () => {
      render(<App />);
    });

    expect(await screen.findByText(D.mySurveys));
  });

  it('Component is not displayed ', async () => {
    mockOidcFailed();

    await act(async () => {
      render(<App />);
    });

    expect(await screen.findByText(D.initializationFailed));
  });
});
