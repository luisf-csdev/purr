import { ChangeEvent, KeyboardEvent, useState } from 'react'
import { Check, Pencil, Trash } from 'phosphor-react'

import styles from './TaskCard.module.css'

export interface TaskType {
  id: string
  content: string
  isTaskDone: boolean
}

interface TaskCardType {
  task: TaskType
  index: number
  onTaskDelete: (id: string, content: string) => void
  onTaskToggle: (id: string) => void
  onTaskEdit: (id: string, editedContent: string) => void
}

export function TaskCard({
  task,
  index,
  onTaskDelete,
  onTaskToggle,
  onTaskEdit,
}: TaskCardType) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedContent, setEditedContent] = useState(task.content)

  function handleToggleTask() {
    onTaskToggle(task.id)
  }

  function handleDeleteTask() {
    onTaskDelete(task.id, task.content)
  }

  function handleEditTask() {
    if (editedContent === '') {
      setEditedContent(task.content)
      return
    }

    onTaskEdit(task.id, editedContent)
    setIsEditing(false)
  }

  function handleStartEdit() {
    setIsEditing(true)
  }

  function handleEditChange(event: ChangeEvent<HTMLInputElement>) {
    setEditedContent(event.target.value)
  }

  function handleEditKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter') {
      handleEditTask()
    }
  }

  return (
    <div className={`${styles.cardWrapper} ${index < 1 && styles.firstItem}`}>
      <div
        className={`${styles.card} ${task.isTaskDone && styles.completed}`}
        onDoubleClick={handleStartEdit}
      >
        <div className={styles.task}>
          <button
            id={task.id}
            onClick={handleToggleTask}
            title="Check the task"
            className={styles.circle}
            type="button"
          >
            {task.isTaskDone && <Check />}
          </button>

          {isEditing ? (
            <input
              className={styles.content}
              type="text"
              value={editedContent}
              onChange={handleEditChange}
              onBlur={handleEditTask}
              onKeyDown={handleEditKeyDown}
              autoFocus
            />
          ) : (
            <p className={styles.content}>{task.content}</p>
          )}
        </div>

        <div className={styles.action}>
          <button onClick={handleStartEdit} className={styles.edit}>
            <Pencil size={16} />
          </button>

          <button onClick={handleDeleteTask} className={styles.delete}>
            <Trash size={16} />
          </button>
        </div>
      </div>
    </div>
  )
}
