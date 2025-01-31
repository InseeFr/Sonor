import { useEffect, useState, useRef } from 'react';
import { useIsAuthenticated } from '../../Authentication/useAuth';
import D from '../../i18n';
import View from '../View/View';
import DataFormatter from '../../utils/DataFormatter';
import { OIDC, ANONYMOUS } from '../../utils/constants.json';

export const App = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [contactFailed, setContactFailed] = useState(false);
  const [data, setData] = useState(null);
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
    if (window.localStorage.getItem('AUTHENTICATION_MODE') === ANONYMOUS) {
      const dataRetreiver = new DataFormatter();
      dataRetreiver.getUserInfo(data => {
        if (data.error) {
          setContactFailed(true);
        } else {
          setAuthenticated(true);
          setData(data);
        }
      });
    } else if (window.localStorage.getItem('AUTHENTICATION_MODE') === OIDC && tokens?.accessToken) {
      const dataRetreiver = new DataFormatter(tokens.accessToken);
      dataRetreiver.getUserInfo(data => {
        setAuthenticated(data !== undefined);
        setData(data);
      });
    }
  }, [tokens]);

  if (!tokens?.accessToken) {
    return <div>{D.initializationFailed}</div>;
  }

  if (authenticated && tokens?.accessToken && data) {
    return (
      <div className="App">
        <View token={tokens.accessToken} userData={data} />
      </div>
    );
  }

  if (contactFailed) {
    return <div>{D.cannotContactServer}</div>;
  }

  return <div>{D.initializing}</div>;
};
