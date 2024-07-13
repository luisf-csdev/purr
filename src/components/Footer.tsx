import { GithubLogo, LinkedinLogo } from 'phosphor-react'
import styles from './Footer.module.css'
import { useThemeContext } from '../context/ThemeContext'

export function Footer() {
  const { cherry } = useThemeContext()

  return (
    <footer className={styles.footer}>
      <address>
        <a
          target="_blank"
          rel="noreferrer noopener"
          className={styles.link}
          href="https://github.com/luisf-csdev/"
        >
          <GithubLogo />
        </a>
        <a
          target="_blank"
          rel="noreferrer noopener"
          className={styles.link}
          href="https://www.linkedin.com/in/luisf-csdev/"
        >
          <LinkedinLogo />
        </a>
      </address>
      <strong>
        Made with <span>{cherry ? '🩷' : '💜'}</span> by {''}
        <span>{cherry ? 'Pituxo' : 'Luís Felipe'} </span>
      </strong>
    </footer>
  )
}
