import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react'
import { PawPrint } from 'phosphor-react'

import styles from './TaskAdd.module.css'

interface TaskAddType {
  onTaskAdd: (content: string) => void
}

export function TaskAdd({ onTaskAdd }: TaskAddType) {
  const [newTaskContent, setNewTaskContent] = useState('')
  const addInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Enter') {
        handleAddInputFocus()
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  })

  function handleAddInputFocus() {
    addInputRef.current?.focus()
  }

  function handleTaskAdd(event: FormEvent) {
    event.preventDefault()
    onTaskAdd(newTaskContent)
    setNewTaskContent('')
    handleAddInputFocus()
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
        ref={addInputRef}
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
