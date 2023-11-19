import { GithubLogo, LinkedinLogo } from 'phosphor-react'
import styles from './Footer.module.css'

export function Footer() {
  return (
    <footer className={styles.footer}>
      <address>
        <a
          target="_blank"
          rel="noreferrer nooper"
          className={styles.link}
          href="https://github.com/luisf-csdev/"
        >
          <GithubLogo />
        </a>
        <a
          target="_blank"
          rel="noreferrer nooper"
          className={styles.link}
          href="https://www.linkedin.com/in/luisf-csdev/"
        >
          <LinkedinLogo />
        </a>
      </address>
      <strong>Made with 💜 by Luís Felipe</strong>
    </footer>
  )
}
