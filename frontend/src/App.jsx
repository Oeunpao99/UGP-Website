import { useEffect } from 'react'
import { Navigate, Outlet, Route, Routes, useLocation, useNavigate, useParams } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Chatbot from './components/Chatbot'
import Home from './pages/Home'
import About from './pages/About'
import Products from './pages/Products'
import ProductDetail from './pages/ProductDetail'
import Events from './pages/Events'
import EventDetail from './pages/EventDetail'
import Careers from './pages/Careers'
import Contact from './pages/Contact'
import { useI18n } from './i18n'

function RootRedirect() {
  const { lang } = useI18n()
  return <Navigate to={`/${lang}/home`} replace />
}

function LocaleShell() {
  const { locale } = useParams()
  const { lang, setLang } = useI18n()
  const navigate = useNavigate()
  const { pathname } = useLocation()

  useEffect(() => {
    if (locale !== 'en' && locale !== 'km') {
      navigate(`/${lang}/home`, { replace: true })
      return
    }
    if (locale !== lang) setLang(locale)
  }, [locale, lang, navigate, setLang])

  return (
    <div className="animate-pageIn" key={pathname}>
      <Outlet />
    </div>
  )
}

function PageEffects() {
  const { pathname } = useLocation()
  const { t } = useI18n()
  const parts = pathname.split('/').filter(Boolean)
  const page = parts[1] || 'home'
  useEffect(() => {
    window.scrollTo(0, 0)
    document.title = t(`page.${page}`)
  }, [pathname, page, t])
  return null
}

export default function App() {
  return (
    <>
      <PageEffects />
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<RootRedirect />} />
          <Route path="/:locale" element={<LocaleShell />}>
            <Route index element={<Home />} />
            <Route path="home" element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="products" element={<Products />} />
            <Route path="products/:id" element={<ProductDetail />} />
            <Route path="events" element={<Events />} />
            <Route path="events/:id" element={<EventDetail />} />
            <Route path="careers" element={<Careers />} />
            <Route path="contact" element={<Contact />} />
          </Route>
          <Route path="*" element={<RootRedirect />} />
        </Routes>
      </main>
      <Footer />
      <Chatbot />
    </>
  )
}
