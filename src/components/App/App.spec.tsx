import { screen, cleanup, render, act } from '@testing-library/react';
import { App } from './App';
import { mockOidcForUser, mockOidcFailed } from '../../Authentication/useAuth';
import { afterEach, describe, expect, it, vi } from 'vitest';
import D from '../../i18n';

vi.mock('react-notifications');

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
