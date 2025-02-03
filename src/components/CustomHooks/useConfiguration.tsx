import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import D from '../../i18n';

const useConfiguration = () => {
  const publicUrl = new URL(import.meta.env.PUBLIC_URL, window.location.href);
  const [configuration, setConfiguration] = useState<any>(undefined);

  useEffect(() => {
    async function getResponse() {
      const fetchedResponse = await fetch(`${publicUrl.origin}/configuration.json`);

      const responseConfig = await fetchedResponse.json();

      if (!responseConfig) toast.error(D.configLoadFailed);

      window.localStorage.setItem('AUTHENTICATION_MODE', responseConfig.AUTHENTICATION_MODE);
      window.localStorage.setItem('PEARL_JAM_URL', responseConfig.PEARL_JAM_URL);
      window.localStorage.setItem('QUEEN_URL_BACK_END', responseConfig.QUEEN_URL_BACK_END);
      window.localStorage.setItem('QUEEN_URL_FRONT_END', responseConfig.QUEEN_URL_FRONT_END);

      setConfiguration(responseConfig);
    }

    getResponse();
  }, []);

  return configuration;
};

export default useConfiguration;
