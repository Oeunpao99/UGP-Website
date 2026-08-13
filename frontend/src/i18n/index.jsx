import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import en from './en'
import km from './km'

const DICTS = { en, km }
const I18nContext = createContext(null)

function get(dict, key) {
  return dict[key]
}

export function I18nProvider({ children }) {
  const [lang, setLang] = useState(() => {
    try {
      return localStorage.getItem('upg_lang') === 'km' ? 'km' : 'en'
    } catch {
      return 'en'
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem('upg_lang', lang)
    } catch {
      /* private mode — ignore */
    }
    document.body.classList.toggle('lang-km', lang === 'km')
    document.documentElement.setAttribute('lang', lang === 'km' ? 'km' : 'en')
  }, [lang])

  const value = useMemo(() => {
    const dict = DICTS[lang]
    const other = DICTS[lang === 'km' ? 'en' : 'km']
    const t = (key, params) => {
      let s = get(dict, key) ?? get(en, key) ?? key
      if (params) {
        for (const [k, v] of Object.entries(params)) s = s.replaceAll(`{${k}}`, v)
      }
      return s
    }
    const tAlt = (key) => get(other, key) ?? get(en, key) ?? key
    return { lang, setLang, t, tAlt }
  }, [lang])

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n() {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error('useI18n must be used within <I18nProvider>')
  return ctx
}
