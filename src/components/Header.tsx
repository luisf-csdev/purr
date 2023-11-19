import styles from './Header.module.css'

import purrIcon from '../assets/purr.png'

export function Header() {
  return (
    <header className={styles.header}>
      <img className={styles.icon} src={purrIcon} alt="purr. logo" />
      <h1 className={styles.title}>
        <span className={styles.titleLight}>pu</span>
        <span className={styles.titleDark}>rr.</span>
      </h1>
    </header>
  )
}
