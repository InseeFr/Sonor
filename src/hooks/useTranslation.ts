import { useIntl } from "react-intl";

export const useTranslation = () => {
  const intl = useIntl();

  return {
    translate: (id: string) => {
      return intl.formatMessage({ id });
    },
  };
};
