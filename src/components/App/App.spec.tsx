import { screen, render, act, waitFor } from '@testing-library/react';
import { App } from './App';
import { mockOidcForUser, mockOidcFailed } from '../CustomHooks/useAuth';
import { describe, expect, it } from 'vitest';
import D from '../../i18n';

describe('Component display', { timeout: 30000 }, () => {
  it('Component is displayed ', async () => {
    mockOidcForUser();

    await act(async () => {
      render(<App />);
    });

    expect(await screen.findByText(D.surveyList, {}, { timeout: 30000 }));
  });

  it('Component is not displayed ', async () => {
    mockOidcFailed();

    await act(async () => {
      render(<App />);
    });

    expect(await screen.findByText(D.cannotAuth));
  });
});
