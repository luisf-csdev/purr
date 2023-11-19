import { ClipboardText } from 'phosphor-react'

import styles from './TaskPlaceholder.module.css'

export function TaskPlaceholder() {
  return (
    <div className={styles.placeholder}>
      <ClipboardText />
      <div className={styles.placeholderText}>
        <strong>You don&apos;t have any tasks registered yet</strong>
        <p> Create tasks and organize your to-do items</p>
      </div>
    </div>
  )
}
