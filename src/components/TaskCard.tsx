import { Check, Trash } from 'phosphor-react'

import styles from './TaskCard.module.css'

export interface TaskType {
  id: string
  content: string
  isTaskDone: boolean
}

interface TaskCardType {
  task: TaskType
  onTaskDelete: (id: string) => void
  onTaskToggle: (id: string) => void
}

export function TaskCard({ task, onTaskDelete, onTaskToggle }: TaskCardType) {
  function handleToggleTask() {
    onTaskToggle(task.id)
  }

  function handleDeleteTask() {
    onTaskDelete(task.id)
  }

  return (
    <div className={`${styles.card} ${task.isTaskDone && styles.completed}`}>
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

        <p> {task.content}</p>
      </div>

      <button onClick={handleDeleteTask} className={styles.delete}>
        <Trash size={16} />
      </button>
    </div>
  )
}
