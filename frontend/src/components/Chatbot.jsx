import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { authMe, googleSignIn, sendChat } from '../api'
import { useI18n } from '../i18n'
import { loc } from '../links'

const QUICK_KEYS = ['chat.q1', 'chat.q2', 'chat.q3', 'chat.q4']
const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || ''

const PAGE_KEY = {
  '/products': 'nav.products',
  '/about': 'nav.about',
  '/events': 'nav.events',
  '/careers': 'nav.careers',
  '/contact': 'nav.contact',
}

export default function Chatbot() {
  const { t, lang } = useI18n()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const [greeted, setGreeted] = useState(false)
  const [busy, setBusy] = useState(false)
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState([])
  const [teaser, setTeaser] = useState(false)
  const [teaserGone, setTeaserGone] = useState(false)
  const [signedIn, setSignedIn] = useState('unknown') // 'unknown' | 'no' | 'yes'
  const logRef = useRef(null)
  const inputRef = useRef(null)
  const signinRef = useRef(null)

  useEffect(() => {
    authMe()
      .then(() => setSignedIn('yes'))
      .catch(() => setSignedIn('no'))
  }, [])

  useEffect(() => {
    const t1 = setTimeout(() => setTeaser(true), 2200)
    const t2 = setTimeout(() => {
      setTeaser(false)
      setTeaserGone(true)
    }, 15000)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [])

  useEffect(() => {
    if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight
  }, [messages, busy])

  // Render the Google sign-in button once the panel is open, the visitor
  // isn't signed in yet, and the GSI script has finished loading.
  useEffect(() => {
    if (!open || signedIn !== 'no' || !GOOGLE_CLIENT_ID) return
    let cancelled = false
    let tries = 0
    const tryRender = () => {
      if (cancelled) return
      if (window.google?.accounts?.id && signinRef.current) {
        window.google.accounts.id.initialize({ client_id: GOOGLE_CLIENT_ID, callback: handleCredential })
        signinRef.current.innerHTML = ''
        window.google.accounts.id.renderButton(signinRef.current, { theme: 'outline', size: 'large', width: 260 })
        return
      }
      if (tries++ < 40) setTimeout(tryRender, 150)
    }
    tryRender()
    return () => {
      cancelled = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, signedIn])

  async function handleCredential(response) {
    try {
      await googleSignIn(response.credential)
      setSignedIn('yes')
      if (!greeted) {
        setGreeted(true)
        push(t('chat.greet'), 'bot')
      }
      setTimeout(() => inputRef.current?.focus(), 120)
    } catch {
      // leave signedIn as 'no' — the sign-in button stays available to retry
    }
  }

  const push = (text, who, links = []) => setMessages((m) => [...m, { text, who, links }])

  async function ask(q) {
    setBusy(true)
    try {
      const res = await sendChat(q)
      push(res.reply, 'bot', res.links || [])
    } catch {
      push(t('chat.err'), 'bot')
    } finally {
      setBusy(false)
    }
  }

  function go(to) {
    closeChat()
    navigate(loc(lang, to))
  }

  function openChat() {
    setOpen(true)
    setTeaser(false)
    setTeaserGone(true)
    if (signedIn === 'yes' && !greeted) {
      setGreeted(true)
      push(t('chat.greet'), 'bot')
    }
    setTimeout(() => inputRef.current?.focus(), 120)
  }

  function closeChat() {
    setOpen(false)
  }

  function submit(e) {
    e.preventDefault()
    const q = input.trim()
    if (!q || busy) return
    setInput('')
    push(q, 'me')
    ask(q)
  }

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape' && open) closeChat()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <>
      {!open && !teaserGone && (
        <div
          className={`fixed right-6 bottom-[106px] z-[79] max-sm:right-4 max-sm:bottom-[98px]${teaser ? ' animate-teaserIn' : ' pointer-events-none opacity-0'}`}
        >
          <div className="relative flex items-start gap-[8px] rounded-[16px] rounded-br-[5px] border border-line bg-card px-[15px] py-[11px] text-[.86rem] leading-snug text-fg shadow-[0_22px_44px_-20px_rgba(7,33,63,.45)]">
            <span>{t('chat.teaser')}</span>
            <button
              type="button"
              aria-label={t('chat.teaser.close')}
              onClick={() => {
                setTeaser(false)
                setTeaserGone(true)
              }}
              className="grid h-[20px] w-[20px] flex-none cursor-pointer place-items-center rounded-full border-0 bg-paper-2 text-[.68rem] leading-none text-grey transition-colors duration-150 hover:bg-line-strong hover:text-ink"
            >
              ✕
            </button>
          </div>
          <span className="absolute -bottom-[6px] right-[42px] h-[12px] w-[12px] rotate-45 border-r border-b border-line bg-card" />
        </div>
      )}

      <div className={`fixed right-6 bottom-6 z-[80] max-sm:right-4 max-sm:bottom-4${open ? ' hidden' : ' flex animate-fabFloat'}`}>
        <div className="relative rounded-full bg-gradient-to-br from-yellow via-blue-lite to-red p-[3px] shadow-[0_22px_46px_-18px_rgba(7,33,63,.8)] transition-transform duration-300 ease-brand hover:scale-[1.06]">
          <button
            type="button"
            aria-label={t('chat.fab')}
            onClick={openChat}
            className="grid h-[64px] w-[64px] cursor-pointer place-items-center rounded-full border-0 bg-ink text-white"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-[26px] w-[26px] text-yellow"
            >
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2Z" />
              <path d="M8 9h8M8 13h5" />
            </svg>
          </button>
          <span aria-hidden="true" className="absolute top-[2px] right-[2px] h-[15px] w-[15px] animate-dotPulse rounded-full border-2 border-ink bg-[#3BD37E]" />
        </div>
      </div>

      <div className={`fixed right-6 bottom-6 z-[90] w-[min(460px,calc(100vw-32px))] h-[min(700px,calc(100vh-48px))] flex-col overflow-hidden rounded-[20px] border border-line bg-card shadow-[0_34px_70px_-22px_rgba(7,33,63,.6)] max-sm:right-0 max-sm:bottom-0 max-sm:h-dvh max-sm:w-screen max-sm:rounded-none${open ? ' flex animate-chatIn' : ' hidden'}`} role="dialog" aria-label={t('chat.fab')}>
        <div className="flex items-center gap-[13px] bg-ink px-[18px] py-[17px] text-white">
          <div className="grid h-10 w-10 flex-none place-items-center rounded-xl bg-yellow">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6 text-ink">
              <circle cx="12" cy="12" r="9" />
              <circle cx="12" cy="12" r="4" />
            </svg>
          </div>
          <div>
            <b className="block font-display text-base">UPG Assistant</b>
            <span className="flex items-center gap-[6px] text-[.74rem] text-white/60">
              <i className="block h-[7px] w-[7px] rounded-full bg-[#3BD37E]" /> {t('chat.status')}
            </span>
          </div>
          <button className="ml-auto h-[34px] w-[34px] cursor-pointer rounded-[9px] border-0 bg-white/[0.12] text-[1.1rem] leading-none text-white transition-colors duration-200 hover:bg-white/[0.24]" aria-label="Close chat" onClick={closeChat}>
            ✕
          </button>
        </div>

        {signedIn !== 'yes' ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 bg-paper px-[28px] py-8 text-center">
            <h3 className="m-0 font-display text-[1.05rem] font-bold">{t('chat.signin.title')}</h3>
            <p className="m-0 text-[.88rem] leading-snug text-grey">{t('chat.signin.body')}</p>
            {GOOGLE_CLIENT_ID ? (
              <div ref={signinRef} />
            ) : (
              <p className="m-0 rounded-[10px] border border-line bg-card px-4 py-3 text-[.82rem] text-grey">
                {t('chat.signin.unavailable')}
              </p>
            )}
          </div>
        ) : (
          <>
            <div className="flex flex-1 scroll-smooth flex-col gap-[13px] overflow-y-auto bg-paper px-[18px] py-5" ref={logRef} aria-live="polite">
              {messages.map((m, i) => (
                <div
                  className={`max-w-[84%] rounded-[15px] px-[15px] py-3 text-[.92rem] leading-[1.55] break-words whitespace-pre-wrap ${
                    m.who === 'me'
                      ? 'self-end rounded-br-[5px] bg-blue text-white'
                      : 'self-start rounded-bl-[5px] border border-line bg-card'
                  }`}
                  key={i}
                >
                  {m.text}
                  {m.who === 'bot' && m.links?.length > 0 && (
                    <span className="mt-[10px] flex flex-wrap gap-[7px]">
                      {m.links.map((l, j) => (
                        <button
                          type="button"
                          key={j}
                          onClick={() => go(l.to)}
                          className="cursor-pointer rounded-full border border-line-strong bg-paper px-[11px] py-[6px] text-[.78rem] font-semibold text-ink transition-colors duration-150 hover:border-ink hover:bg-ink hover:text-white"
                        >
                          {PAGE_KEY[l.to] ? t(PAGE_KEY[l.to]) : l.label}
                          <span className="ar"> →</span>
                        </button>
                      ))}
                    </span>
                  )}
                </div>
              ))}
              {busy && (
                <div className="self-start flex gap-[5px] rounded-[15px] rounded-bl-[5px] border border-line bg-card px-4 py-[14px]">
                  <i className="h-[7px] w-[7px] animate-dotBounce rounded-full bg-grey" />
                  <i className="h-[7px] w-[7px] animate-dotBounce rounded-full bg-grey" style={{ animationDelay: '.15s' }} />
                  <i className="h-[7px] w-[7px] animate-dotBounce rounded-full bg-grey" style={{ animationDelay: '.3s' }} />
                </div>
              )}
            </div>

            {greeted && messages.length === 1 && (
              <div className="flex flex-wrap gap-2 bg-paper px-[18px] pb-3">
                {QUICK_KEYS.map((k) => {
                  const q = t(k)
                  return (
                    <button
                      type="button"
                      key={k}
                      onClick={() => {
                        push(q, 'me')
                        ask(q)
                      }}
                      className="cursor-pointer rounded-full border border-line-strong bg-card px-[13px] py-2 text-[.79rem] transition-all duration-150 hover:border-ink hover:bg-ink hover:text-white"
                    >
                      {q}
                    </button>
                  )
                })}
              </div>
            )}

            <form className="flex gap-[9px] border-t border-line bg-card p-[13px]" onSubmit={submit}>
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={t('chat.ph')}
                autoComplete="off"
                aria-label={t('chat.ph')}
                className="flex-1 rounded-full border border-line-strong bg-paper px-[15px] py-3 text-[.92rem] focus:border-blue focus:bg-card focus:outline-none"
              />
              <button
                type="submit"
                aria-label="Send"
                className="grid h-[46px] w-[46px] flex-none cursor-pointer place-items-center rounded-full border-0 bg-yellow transition-all duration-200 hover:scale-105 hover:bg-ink hover:text-white"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-[19px] w-[19px]"
                >
                  <path d="M22 2 11 13M22 2l-7 20-4-9-9-4 20-7Z" />
                </svg>
              </button>
            </form>
          </>
        )}
      </div>
    </>
  )
}
