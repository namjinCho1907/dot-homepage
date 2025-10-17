import { getRequestConfig } from 'next-intl/server';
import { routing } from './i18n/routing';

export default getRequestConfig(async ({ requestLocale }) => {
  // Typically this is the same locale as the `locale` parameter in
  // `[locale]/layout.tsx`
  let locale = await requestLocale;

  console.log('[i18n.ts] Received locale:', locale, 'Available locales:', routing.locales);

  // Validate that the incoming `locale` parameter is valid
  if (!locale || !routing.locales.includes(locale as any)) {
    console.error('[i18n.ts] Invalid locale, using default:', locale);
    locale = routing.defaultLocale;
  }

  console.log('[i18n.ts] Loading messages for locale:', locale);
  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
    onError(error) {
      // Ignore missing message errors during build
      if (error.code === 'MISSING_MESSAGE') {
        console.warn('[i18n.ts] Missing message:', error.message);
      } else {
        console.error('[i18n.ts] i18n error:', error);
      }
    },
    getMessageFallback({namespace, key}) {
      return key;
    }
  };
});
