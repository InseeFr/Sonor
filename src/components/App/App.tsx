import { useEffect, useRef, useState } from 'react';
import { ANONYMOUS, OIDC } from '../../utils/constants.json';
import DataFormatter from '../../utils/DataFormatter';
import D from '../../i18n';
import View from 'components/View/View';
import { useIsAuthenticated } from 'components/CustomHooks/useAuth';
import { toast } from 'react-toastify';
import { useConfiguration } from 'components/CustomHooks/useConfiguration';

export const App = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [contactFailed, setContactFailed] = useState(false);
  const [data, setData] = useState(null);

  const configuration = useConfiguration();

  const timeoutIdRef = useRef<NodeJS.Timeout | null>(null);
  const { tokens, renewTokens } = useIsAuthenticated();

  useEffect(() => {
    const resetInactivityTimeout = () => {
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current);
      }
      timeoutIdRef.current = setTimeout(() => renewTokens, 5 * 60 * 1000);
    };

    const events = ['mousemove', 'mousedown', 'keypress', 'touchstart', 'click'];

    events.forEach(event => {
      window.addEventListener(event, resetInactivityTimeout);
    });

    resetInactivityTimeout();

    return () => {
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current);
      }
      events.forEach(event => {
        window.removeEventListener(event, resetInactivityTimeout);
      });
    };
  }, [renewTokens]);

  useEffect(() => {
    if (configuration.AUTHENTICATION_MODE === ANONYMOUS) {
      const dataRetreiver = new DataFormatter();
      dataRetreiver.getUserInfo(data => {
        if (data.error) {
          setContactFailed(true);
        } else {
          setAuthenticated(true);
          setData(data);
        }
      });
    } else if (configuration.AUTHENTICATION_MODE === OIDC && tokens?.accessToken) {
      const dataRetreiver = new DataFormatter(tokens.accessToken, configuration);
      dataRetreiver.getUserInfo(data => {
        setAuthenticated(data !== undefined);
        setData(data);
      });
    }
  }, [tokens]);

  if (!tokens?.accessToken) {
    toast.error(D.cannotAuth);
  }

  if (contactFailed) {
    toast.error(D.cannotContactServer);
  }

  console.log(data);

  return (
    <>
      {authenticated && tokens?.accessToken && data && (
        <div className="App">
          <View token={tokens.accessToken} userData={data} />
        </div>
      )}
      {!authenticated && !tokens?.accessToken && D.cannotAuth}
    </>
  );
};
