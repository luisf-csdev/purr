import styles from './TaskStats.module.css'

interface TaskStatsType {
  total: number
  completed: number
}

export function TaskStats({ total, completed }: TaskStatsType) {
  return (
    <div className={styles.stats}>
      <div className={styles.stat}>
        <strong className={styles.light}>Meows</strong>
        <strong className={styles.count}>{total}</strong>
      </div>
      <div className={styles.stat}>
        <strong className={styles.dark}>Completed</strong>
        <strong className={styles.count}>
          {completed > 0 ? `${completed} of ${total}` : completed}
        </strong>
      </div>
    </div>
  )
}
