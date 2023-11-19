import { useState } from 'react'
import { v4 as uuid } from 'uuid'

import { Header } from './components/Header'
import { TaskAdd } from './components/TaskAdd'
import { TaskCard, TaskType } from './components/TaskCard'
import { TaskPlaceholder } from './components/TaskPlaceholder'
import { TaskStats } from './components/TaskStats'
import { TaskDeleteModal, TaskToDeleteType } from './components/TaskDeleteModal'

import styles from './App.module.css'

export function App() {
  const TASKS = 'tasks'
  const savedTasksItem = localStorage.getItem(TASKS)

  const savedTasks: TaskType[] = savedTasksItem
    ? JSON.parse(savedTasksItem)
    : []

  const [tasks, setTasks] = useState(savedTasks)
  const [deleteTaskModal, setDeleteTaskModal] = useState<TaskToDeleteType>({
    id: '',
    content: '',
    state: false,
  })

  const totalTasks = tasks.length

  const completedTasks = tasks.filter((task) => task.isTaskDone).length

  function setTaskItemOnLocalStorage(tasks: TaskType[]) {
    const updatedTasksItem = JSON.stringify(tasks)
    localStorage.setItem(TASKS, updatedTasksItem)
  }

  function addTask(content: string) {
    const newTask: TaskType = {
      id: uuid(),
      content,
      isTaskDone: false,
    }

    setTasks((tasks) => {
      const updatedTasks = [...tasks, newTask]
      setTaskItemOnLocalStorage(updatedTasks)

      return updatedTasks
    })
  }

  function deleteTask(id: string) {
    setTasks((tasks) => {
      const tasksWithoutDeletedOne = tasks.filter((task) => task.id !== id)
      setTaskItemOnLocalStorage(tasksWithoutDeletedOne)

      return tasksWithoutDeletedOne
    })

    toggleDeleteTaskModal()
  }

  function toggleDeleteTaskModal(id = '', content = '') {
    setDeleteTaskModal(({ state }) => {
      return {
        state: !state,
        content,
        id,
      }
    })
  }

  function toggleTask(id: string) {
    setTasks((tasks) => {
      const updatedTasks = tasks.map((task) => {
        if (task.id === id) {
          return { ...task, isTaskDone: !task.isTaskDone }
        }

        return task
      })

      setTaskItemOnLocalStorage(updatedTasks)

      return updatedTasks
    })
  }

  return (
    <div>
      <div className={styles.headerAndTaskAddWrapper}>
        <Header />
        <TaskAdd onTaskAdd={addTask} />
      </div>
      <div className={styles.statsAndTaskWrapper}>
        <TaskStats total={totalTasks} completed={completedTasks} />

        {tasks.length === 0 ? (
          <TaskPlaceholder />
        ) : (
          <div className={styles.taskContainer}>
            {tasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onTaskDelete={toggleDeleteTaskModal}
                onTaskToggle={toggleTask}
              />
            ))}
          </div>
        )}
        {deleteTaskModal.state && (
          <TaskDeleteModal
            onCloseTaskDeleteModal={toggleDeleteTaskModal}
            onTaskDeleteConfirmation={deleteTask}
            task={deleteTaskModal}
          />
        )}
      </div>
    </div>
  )
}
