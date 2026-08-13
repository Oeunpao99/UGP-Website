export const loc = (lang, path) => `/${lang}${path.startsWith('/') ? path : `/${path}`}`
