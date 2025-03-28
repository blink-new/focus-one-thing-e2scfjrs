
import { createContext, useContext, useEffect } from 'react'
import { useFocusStore, type Theme } from '../lib/store'

type ThemeContextType = {
  theme: Theme
  setTheme: (theme: Theme) => void
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  setTheme: () => null,
})

export const useTheme = () => {
  return useContext(ThemeContext)
}

export function ThemeProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const { settings, updateSettings } = useFocusStore()

  // Update the theme based on system preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    
    const updateTheme = () => {
      if (settings.appearance.theme === 'system') {
        document.documentElement.classList.toggle('dark', mediaQuery.matches)
      }
    }

    mediaQuery.addEventListener('change', updateTheme)
    return () => mediaQuery.removeEventListener('change', updateTheme)
  }, [settings.appearance.theme])

  // Update theme when settings change
  useEffect(() => {
    const isDark = 
      settings.appearance.theme === 'dark' ||
      (settings.appearance.theme === 'system' && 
       window.matchMedia('(prefers-color-scheme: dark)').matches)
    
    document.documentElement.classList.toggle('dark', isDark)
  }, [settings.appearance.theme])

  const setTheme = (theme: Theme) => {
    updateSettings({
      appearance: { theme }
    })
  }

  return (
    <ThemeContext.Provider
      value={{
        theme: settings.appearance.theme,
        setTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}