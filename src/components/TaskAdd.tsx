import { PlusCircle } from 'phosphor-react'
import styles from './TaskAdd.module.css'
import { ChangeEvent, FormEvent, useState } from 'react'

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
    <form className={styles.addTask}>
      <input
        className={styles.addInput}
        type="text"
        value={newTaskContent}
        onChange={handleNewTaskContentChange}
        placeholder="Add a new task"
      />

      <button
        disabled={!newTaskContent}
        onClick={handleTaskAdd}
        className={styles.addButton}
        type="submit"
      >
        <span>Create</span>
        <PlusCircle />
      </button>
    </form>
  )
}
