
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
  const settings = useFocusStore(state => state.settings)
  const updateSettings = useFocusStore(state => state.updateSettings)
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

  // Initialize settings if they don't exist
  useEffect(() => {
    if (!settings?.appearance?.theme) {
      updateSettings({
        appearance: { 
          theme: 'system',
        },
        ...settings
      })
    }
  }, [])

  // Apply theme changes
  useEffect(() => {
    const theme = settings?.appearance?.theme || 'system'
    const isDark = theme === 'dark' || (theme === 'system' && systemTheme === 'dark')
    
    document.documentElement.classList.toggle('dark', isDark)
    document.documentElement.classList.toggle('light', !isDark)
  }, [settings?.appearance?.theme, systemTheme])

  const setTheme = (theme: Theme) => {
    updateSettings({
      ...settings,
      appearance: { 
        ...settings?.appearance,
        theme 
      }
    })
  }

  const currentTheme = settings?.appearance?.theme || 'system'

  return (
    <ThemeContext.Provider
      value={{
        theme: currentTheme,
        setTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}