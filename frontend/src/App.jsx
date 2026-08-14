import { lazy, Suspense, useEffect } from 'react'
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
import FactDetail from './pages/FactDetail'
import FeatureDetail from './pages/FeatureDetail'
import Careers from './pages/Careers'
import Contact from './pages/Contact'
import { useI18n } from './i18n'

// The admin panel (and its rich-text editor) is a separate chunk so public
// site visitors never download it — only fetched when someone actually
// navigates to /admin.
const AdminApp = lazy(() => import('./admin/AdminApp'))

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

function PublicSite() {
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
            <Route path="facts/:id" element={<FactDetail />} />
            <Route path="features/:id" element={<FeatureDetail />} />
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

export default function App() {
  const { pathname } = useLocation()

  // Resolved before any <Routes> tree is built, so the admin area never
  // competes with the public "/:locale" pattern in React Router's route
  // ranking — "/admin/products" would otherwise also match ":locale=admin"
  // + "products" and (depending on ranking) could beat "/admin/*".
  if (pathname === '/admin' || pathname.startsWith('/admin/')) {
    return (
      <Suspense fallback={null}>
        <AdminApp />
      </Suspense>
    )
  }
  return <PublicSite />
}
