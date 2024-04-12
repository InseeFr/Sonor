import { messagesEn } from "../i18n-en";
import { messagesFr } from "../i18n-fr";

export type LocaleType = "fr" | "en";

export const getMessages = (locale: LocaleType) => {
  return locale === "fr" ? messagesFr : messagesEn;
};
