import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  // Define supported locales
  const locales = ['en', 'pt'];
  if (!locale || !locales.includes(locale)) {
    locale = 'pt';
  }

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default
  };
});
