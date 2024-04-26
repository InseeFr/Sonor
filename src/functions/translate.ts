import { IntlShape } from "react-intl";

export const translate = (id: string, intl: IntlShape) => {
  return intl.formatMessage({ id });
};
