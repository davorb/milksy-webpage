import en from './locales/en.json';
import sv from './locales/sv.json';
import de from './locales/de.json';
import es from './locales/es.json';
import fr from './locales/fr.json';
import it from './locales/it.json';
import nl from './locales/nl.json';
import ja from './locales/ja.json';
import ptBR from './locales/pt-BR.json';
import bs from './locales/bs.json';
import hr from './locales/hr.json';
import srLatn from './locales/sr-Latn.json';

export const locales = ['en', 'sv', 'de', 'es', 'fr', 'it', 'nl', 'ja', 'pt-BR', 'bs', 'hr', 'sr-Latn'] as const;
export type Locale = typeof locales[number];
export type HomeCopy = typeof en;
export const translations = { en, sv, de, es, fr, it, nl, ja, 'pt-BR': ptBR, bs, hr, 'sr-Latn': srLatn } satisfies Record<Locale, HomeCopy>;
export const languageNames: Record<Locale, string> = {
 en: 'English', sv: 'Svenska', de: 'Deutsch', es: 'Español', fr: 'Français', it: 'Italiano',
 nl: 'Nederlands', ja: '日本語', 'pt-BR': 'Português (Brasil)', bs: 'Bosanski', hr: 'Hrvatski', 'sr-Latn': 'Srpski (latinica)',
};
export const socialLocales: Record<Locale, string> = {
 en: 'en_US', sv: 'sv_SE', de: 'de_DE', es: 'es_ES', fr: 'fr_FR', it: 'it_IT',
 nl: 'nl_NL', ja: 'ja_JP', 'pt-BR': 'pt_BR', bs: 'bs_BA', hr: 'hr_HR', 'sr-Latn': 'sr_RS',
};
export const homePath = (locale: Locale) => locale === 'en' ? '/' : `/${locale}/`;
// Only languages with existing raw captures in the iOS screenshot project.
export const screenshotLocales: Record<Locale, Locale> = {
 en: 'en', sv: 'sv', de: 'de', es: 'es', fr: 'fr', it: 'it', nl: 'nl', ja: 'ja',
 'pt-BR': 'pt-BR', hr: 'hr', bs: 'hr', 'sr-Latn': 'hr',
};
// Apple does not provide Bosnian or Serbian Latin badge artwork. Keep its official
// English badge unchanged for these languages and localize the accessible label.
export const badgePath = (locale: Locale) => ['en', 'bs', 'sr-Latn'].includes(locale) ? '/app-store-badge.svg' : `/badges/${locale}.svg`;
export function homeFAQs(copy: HomeCopy) {
 return [
  { question: copy.faq1q, answer: copy.faq1a }, { question: copy.faq2q, answer: copy.faq2a },
  { question: copy.faq3q, answer: copy.faq3a }, { question: copy.faq4q, answer: copy.faq4a },
  { question: copy.faq5q, answer: copy.faq5a },
 ];
}
