
import { createContext, useContext, useEffect, useState } from 'react'
import { useFocusStore, type Theme } from '../lib/store'

type ThemeContextType = {
  theme: Theme
  setTheme: (theme: Theme) => void
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'system',
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
  const [systemTheme, setSystemTheme] = useState<'dark' | 'light'>(
    window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  )

  // Update the theme based on system preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    
    const updateSystemTheme = (e: MediaQueryListEvent | MediaQueryList) => {
      const newTheme = e.matches ? 'dark' : 'light'
      setSystemTheme(newTheme)
    }

    // Initial check
    updateSystemTheme(mediaQuery)

    // Listen for changes
    mediaQuery.addEventListener('change', updateSystemTheme)
    return () => mediaQuery.removeEventListener('change', updateSystemTheme)
  }, [])

  // Apply theme changes
  useEffect(() => {
    const theme = settings.appearance.theme
    const isDark = theme === 'dark' || (theme === 'system' && systemTheme === 'dark')
    
    document.documentElement.classList.remove('light', 'dark')
    document.documentElement.classList.add(isDark ? 'dark' : 'light')
  }, [settings.appearance.theme, systemTheme])

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