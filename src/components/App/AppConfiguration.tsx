import { ToastContainer } from 'react-toastify';
import { App } from './App';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { initializeOidc } from 'components/CustomHooks/useAuth';
import { useConfiguration } from 'components/CustomHooks/useConfiguration';

export const AppConfiguration = () => {
  const configuration = useConfiguration();

  if (!configuration) {
    return <></>;
  }

  const { OidcProvider } = initializeOidc({
    issuerUri: configuration.ISSUER_URI,
    clientId: configuration.OIDC_CLIENT_ID,
    publicUrl: '/',
  });

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 10000,
        refetchOnWindowFocus: false,
        retry: false,
      },
    },
  });

  return (
    <>
      {configuration && (
        <OidcProvider>
          <QueryClientProvider client={queryClient}>
            <App />
          </QueryClientProvider>
        </OidcProvider>
      )}
      <ToastContainer />
    </>
  );
};
