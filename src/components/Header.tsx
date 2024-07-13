import styles from './Header.module.css'

import purrIconDark from '../assets/purr.png'
import purrIconCherry from '../assets/purr-cherry.png'
import { useThemeContext } from '../context/ThemeContext'

export function Header() {
  const { cherry } = useThemeContext()
  const purrIcon = cherry ? purrIconCherry : purrIconDark

  return (
    <header className={styles.header}>
      <img className={styles.icon} src={purrIcon} alt="purr. logo" />
      <h1 className={styles.title}>
        <span className={styles.titleLight}>pu</span>
        <span className={styles.titleDark}>rr.</span>
        {cherry && (
          <span className={styles.cherryVersion}>🌸 cherry version 🍒 </span>
        )}
      </h1>
    </header>
  )
}
