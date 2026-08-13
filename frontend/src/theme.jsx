import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const ThemeContext = createContext(null)

function initialTheme() {
  try {
    const saved = localStorage.getItem('upg_theme')
    if (saved === 'light' || saved === 'dark') return saved
  } catch {
    /* private mode — ignore */
  }
  return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(initialTheme)

  useEffect(() => {
    document.documentElement.classList.toggle('theme-dark', theme === 'dark')
    try {
      localStorage.setItem('upg_theme', theme)
    } catch {
      /* private mode — ignore */
    }
  }, [theme])

  const value = useMemo(() => {
    const toggle = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))
    return { theme, toggle }
  }, [theme])

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within <ThemeProvider>')
  return ctx
}
