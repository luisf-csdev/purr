import purrIconDark from '../assets/purr.png'
import purrIconCherry from '../assets/purr-cherry.png'

import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'

interface ThemeContextType {
  cherry: boolean
  setThemeSettings: () => void
  getLogoURL: () => string
}

const ThemeContext = createContext({} as ThemeContextType)

interface CartContextProviderProps {
  children: ReactNode
}

export function ThemeContextProvider({ children }: CartContextProviderProps) {
  const [cherry, setCherry] = useState(false)
  const THEME_KEY = '@purr:has-cherry-theme-state-1.0.0'

  const getLogoURL = useCallback(() => {
    if (cherry) {
      return purrIconCherry
    }

    return purrIconDark
  }, [cherry])

  const setFavicon = useCallback(() => {
    const favicon = document.querySelector(
      'link[rel*="icon"]',
    ) as HTMLLinkElement

    if (!favicon) {
      return
    }

    favicon.href = getLogoURL()
  }, [getLogoURL])

  const setTitle = useCallback(() => {
    const title = document.querySelector('title')
    if (!title) {
      return
    }

    const BASE_TITLE = 'purr.'

    if (cherry) {
      title.innerText = `${BASE_TITLE} 🩷`
      return
    }

    title.innerText = BASE_TITLE
  }, [cherry])

  useEffect(() => {
    setFavicon()
    setTitle()
  }, [cherry, setFavicon, setTitle])

  useEffect(() => {
    setFavicon()
  }, [cherry, setFavicon])

  function setCherryThemeOnStorage() {
    localStorage.setItem(THEME_KEY, 'true')
  }

  function removeCherryThemeFromStorage() {
    localStorage.removeItem(THEME_KEY)
  }

  function hasCherryOnStorage() {
    const hasCherry = localStorage.getItem(THEME_KEY)
    return hasCherry === 'true'
  }

  function removeCherryThemeFromDocument() {
    const rootClassList = document.documentElement.classList
    rootClassList.remove('cherry')

    setCherry(false)
  }

  function setCherryThemeOnDocument() {
    const rootClassList = document.documentElement.classList
    rootClassList.add('cherry')

    setCherry(true)
  }

  function setInitialTheme() {
    const hasCherry = hasCherryOnStorage()

    if (!hasCherry) {
      removeCherryThemeFromDocument()
      return
    }

    setCherryThemeOnDocument()
  }

  function setThemeByURL() {
    const query = location.search
    const params = new URLSearchParams(query)

    const cherryParam = params.get('cherry')
    const useCherry = cherryParam === 'true'
    const removeCherry = cherryParam === 'false'

    if (cherry && removeCherry) {
      removeCherryThemeFromStorage()
      return
    }

    if (!cherry && useCherry) {
      setCherryThemeOnStorage()
    }
  }

  function setThemeSettings() {
    setThemeByURL()
    setInitialTheme()
  }

  return (
    <ThemeContext.Provider
      value={{
        cherry,
        setThemeSettings,
        getLogoURL,
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}

export const useThemeContext = () => useContext(ThemeContext)
