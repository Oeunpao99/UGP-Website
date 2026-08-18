import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

export default function ProgressBar() {
  const { pathname } = useLocation()
  const [progress, setProgress] = useState(0)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    setProgress(0)
    setVisible(true)

    const t1 = setTimeout(() => setProgress(40), 50)
    const t2 = setTimeout(() => setProgress(70), 200)
    const t3 = setTimeout(() => setProgress(90), 400)
    const t4 = setTimeout(() => {
      setProgress(100)
      setTimeout(() => setVisible(false), 200)
    }, 550)

    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
      clearTimeout(t4)
    }
  }, [pathname])

  if (!visible) return null

  return (
    <div className="fixed inset-x-0 top-0 z-[9999] h-[3px]">
      <div
        className="h-full rounded-r-full bg-yellow transition-all duration-300 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  )
}
