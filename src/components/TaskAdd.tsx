import { ChangeEvent, FormEvent, useState } from 'react'
import { PawPrint } from 'phosphor-react'

import styles from './TaskAdd.module.css'

interface TaskAddType {
  onTaskAdd: (content: string) => void
}

export function TaskAdd({ onTaskAdd }: TaskAddType) {
  const [newTaskContent, setNewTaskContent] = useState('')

  function handleTaskAdd(event: FormEvent) {
    event.preventDefault()
    onTaskAdd(newTaskContent)
    setNewTaskContent('')
  }

  function handleNewTaskContentChange(event: ChangeEvent<HTMLInputElement>) {
    setNewTaskContent(event.target.value)
  }

  return (
    <form className={`${styles.addTask} container`} onSubmit={handleTaskAdd}>
      <input
        className={styles.addInput}
        type="text"
        value={newTaskContent}
        onChange={handleNewTaskContentChange}
        placeholder="Put your meow here"
        autoFocus
      />

      <button
        disabled={!newTaskContent}
        className={styles.addButton}
        type="submit"
      >
        <PawPrint />
      </button>
    </form>
  )
}
