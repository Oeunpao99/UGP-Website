import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const EN = {
  'studio': 'Content studio',
  'eyebrow': 'Content management',
  'administrator': 'Administrator',
  'logout': 'Log out',
  'back': 'Back',
  'save': 'Save',
  'saving': 'Saving…',
  'cancel': 'Cancel',
  'edit': 'Edit',
  'delete': 'Delete',
  'preview': 'Preview',
  'img.upload': 'Upload image',
  'img.replace': 'Replace',
  'img.remove': 'Remove',
  'img.uploading': 'Uploading…',
  'deleteConfirm': 'Delete "{name}"? This can\'t be undone.',

  'nav.products': 'Products',
  'nav.events': 'Events',
  'nav.careers': 'Careers',
  'nav.clients': 'Clients',
  'nav.settings': 'Company info',
  'nav.chats': 'Chat conversations',

  'th.name': 'Name',
  'th.id': 'ID',
  'th.brands': 'Brands',
  'th.date': 'Date',
  'th.title': 'Title',
  'th.kind': 'Kind',
  'th.department': 'Department',
  'th.location': 'Location',
  'th.international': 'International',
  'th.visitor': 'Visitor',
  'th.email': 'Email',
  'th.messages': 'Messages',
  'th.lastActive': 'Last active',

  'kind.Quality': 'Quality',
  'kind.Customers': 'Customers',
  'kind.Supply chain': 'Supply chain',
  'kind.Community': 'Community',

  'lang.en': 'English',
  'lang.km': 'ភាសាខ្មែរ',
}

const KM = {
  'studio': 'ស្ទូឌីយោមាតិកា',
  'eyebrow': 'គ្រប់គ្រងមាតិកា',
  'administrator': 'អ្នកគ្រប់គ្រង',
  'logout': 'ចាកចេញ',
  'back': 'ត្រឡប់ក្រោយ',
  'save': 'រក្សាទុក',
  'saving': 'កំពុងរក្សាទុក…',
  'cancel': 'បោះបង់',
  'edit': 'កែសម្រួល',
  'delete': 'លុប',
  'preview': 'មើលជាមុន',
  'img.upload': 'ផ្ទុករូបភាព',
  'img.replace': 'ជំនួស',
  'img.remove': 'ដកចេញ',
  'img.uploading': 'កំពុងផ្ទុក…',
  'deleteConfirm': 'លុប "{name}"? សកម្មភាពនេះមិនអាចធ្វើវិញបានទេ។',

  'nav.products': 'ផលិតផល',
  'nav.events': 'ព្រឹត្តិការណ៍',
  'nav.careers': 'អាជីព',
  'nav.clients': 'អតិថិជន',
  'nav.settings': 'ព័ត៌មានក្រុមហ៊ុន',
  'nav.chats': 'ការសន្ទនាជជែក',

  'th.name': 'ឈ្មោះ',
  'th.id': 'លេខសម្គាល់',
  'th.brands': 'ម៉ាក',
  'th.date': 'កាលបរិច្ឆេទ',
  'th.title': 'ចំណងជើង',
  'th.kind': 'ប្រភេទ',
  'th.department': 'នាយកដ្ឋាន',
  'th.location': 'ទីតាំង',
  'th.international': 'អន្តរជាតិ',
  'th.visitor': 'អ្នកទស្សនា',
  'th.email': 'អ៊ីមែល',
  'th.messages': 'សារ',
  'th.lastActive': 'សកម្មភាពចុងក្រោយ',

  'kind.Quality': 'គុណភាព',
  'kind.Customers': 'អតិថិជន',
  'kind.Supply chain': 'ខ្សែសង្វាក់ផ្គត់ផ្គង់',
  'kind.Community': 'សហគមន៍',

  'lang.en': 'English',
  'lang.km': 'ភាសាខ្មែរ',
}

const DICT = { en: EN, km: KM }
const AdminLangContext = createContext(null)
const KEY = 'upg_admin_lang'

export function AdminLangProvider({ children }) {
  const [lang, setLang] = useState(() => {
    try {
      return localStorage.getItem(KEY) === 'km' ? 'km' : 'en'
    } catch {
      return 'en'
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(KEY, lang)
    } catch {
      /* ignore */
    }
    document.body.classList.toggle('lang-km', lang === 'km')
    document.documentElement.setAttribute('lang', lang === 'km' ? 'km' : 'en')
  }, [lang])

  const value = useMemo(() => {
    const table = DICT[lang] || EN
    return {
      lang,
      setLang,
      s: (key) => table[key] ?? EN[key] ?? key,
      fmt: (key, vars) => (table[key] ?? EN[key] ?? key).replace(/\{(\w+)\}/g, (_, k) => vars?.[k] ?? ''),
      pick: (enVal, kmVal) => (lang === 'km' && kmVal ? kmVal : enVal),
    }
  }, [lang])

  return <AdminLangContext.Provider value={value}>{children}</AdminLangContext.Provider>
}

export function useAdminLang() {
  const ctx = useContext(AdminLangContext)
  if (!ctx) throw new Error('useAdminLang must be used inside <AdminLangProvider>')
  return ctx
}

export function usePageLang(pageDict) {
  const ctx = useAdminLang()
  const t = (key) => pageDict[ctx.lang]?.[key] ?? pageDict.en[key] ?? ctx.s(key)
  return { ...ctx, t }
}
