import styles from './Header.module.css'

import rocketIcon from '../assets/rocket.svg'

export function Header() {
  return (
    <header className={styles.header}>
      <img className={styles.icon} src={rocketIcon} alt="Rocket icon" />
      <h1 className={styles.title}>
        <span className={styles.titleBlue}>to</span>
        <span className={styles.titlePurple}>do</span>
      </h1>
    </header>
  )
}
