import { Cat } from 'phosphor-react'

import styles from './TaskPlaceholder.module.css'

export function TaskPlaceholder() {
  return (
    <div className={styles.placeholder}>
      <Cat />
      <div className={styles.placeholderText}>
        <strong>You don&apos;t have any meows registered yet</strong>
        <p>Create meows and organize your routine</p>
      </div>
    </div>
  )
}
