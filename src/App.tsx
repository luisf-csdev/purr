import { useState } from 'react'
import { v4 as uuid } from 'uuid'
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from '@hello-pangea/dnd'

import { Header } from './components/Header'
import { TaskAdd } from './components/TaskAdd'
import { TaskCard, TaskType } from './components/TaskCard'
import { TaskPlaceholder } from './components/TaskPlaceholder'
import { TaskStats } from './components/TaskStats'
import { TaskDeleteModal, TaskToDeleteType } from './components/TaskDeleteModal'

import styles from './App.module.css'
import { Footer } from './components/Footer'

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

  function editTask(id: string, editedContent: string) {
    setTasks((tasks) => {
      const updatedTasks = tasks.map((task) => {
        if (task.id === id) {
          return { ...task, content: editedContent }
        }

        return task
      })

      setTaskItemOnLocalStorage(updatedTasks)

      return updatedTasks
    })
  }

  function handleOnDragEnd(dropResult: DropResult) {
    if (!dropResult.destination) return

    const reorderedTasks = Array.from(tasks)
    const [reorderedItem] = reorderedTasks.splice(dropResult.source.index, 1)
    reorderedTasks.splice(dropResult.destination.index, 0, reorderedItem)

    setTasks(reorderedTasks)
    setTaskItemOnLocalStorage(reorderedTasks)
  }

  return (
    <div className={styles.app}>
      <div className={styles.headerAndTaskAddWrapper}>
        <Header />
        <TaskAdd onTaskAdd={addTask} />
      </div>
      <div className={styles.statsAndTaskWrapper}>
        <div className="container">
          <TaskStats total={totalTasks} completed={completedTasks} />

          {tasks.length === 0 ? (
            <TaskPlaceholder />
          ) : (
            <DragDropContext onDragEnd={handleOnDragEnd}>
              <Droppable droppableId="tasks">
                {(provided) => (
                  <main
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className={styles.taskList}
                  >
                    {tasks.map((task, index) => (
                      <Draggable
                        key={task.id}
                        draggableId={task.id}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <TaskCard
                              task={task}
                              index={index}
                              onTaskDelete={toggleDeleteTaskModal}
                              onTaskToggle={toggleTask}
                              onTaskEdit={editTask}
                            />
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </main>
                )}
              </Droppable>
            </DragDropContext>
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
      <Footer />
    </div>
  )
}
