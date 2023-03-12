import { useState, useEffect } from 'react'
import { BiSun, BiMoon } from 'react-icons/bi'
import { motion, AnimatePresence } from 'framer-motion'

export default function ThemeBtn() {
  const [isDark, setDark] = useState<boolean>(false)
  const icon = isDark ? <BiSun /> : <BiMoon />

  function handleTheme() {
    document.documentElement.classList.toggle('dark')

    if (!isDark) {
      localStorage.setItem('theme', 'dark')
    } else {
      localStorage.removeItem('theme')
    }
    setDark(!isDark)
  }

  useEffect(() => {
    if (localStorage.getItem('theme') === 'dark') {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
      setDark(true)
    }
  }, [])

  return (
    <button
      type="button"
      onClick={handleTheme}
      className="rounded-md border border-zinc-200 p-2 text-base outline-none ring-[#72caaf] hover:bg-zinc-100 focus:ring-2 active:translate-y-px dark:border-zinc-700 hover:dark:bg-zinc-800"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={isDark ? 'dark' : 'light'}
          transition={{ duration: 0.15 }}
          exit={{ opacity: 0, rotate: -40 }}
          animate={{ opacity: 1, rotate: 0 }}
          initial={{ opacity: 0, rotate: 40 }}
        >
          {icon}
        </motion.div>
      </AnimatePresence>
    </button>
  )
}
