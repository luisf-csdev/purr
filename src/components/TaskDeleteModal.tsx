import { X } from 'phosphor-react'
import { useCallback, useEffect, useRef } from 'react'

import styles from './TaskDeleteModal.module.css'

export interface TaskToDeleteType {
  id: string
  state: boolean
  content: string
}

interface TaskAddType {
  onCloseTaskDeleteModal: () => void
  onTaskDeleteConfirmation: (id: string) => void
  task: TaskToDeleteType
}

export function TaskDeleteModal({
  onCloseTaskDeleteModal,
  onTaskDeleteConfirmation,
  task,
}: TaskAddType) {
  const modalRef = useRef<HTMLDivElement>(null)

  const handleDeleteConfirmation = useCallback(() => {
    onTaskDeleteConfirmation(task.id)
  }, [onTaskDeleteConfirmation, task.id])

  const handleCloseModal = useCallback(() => {
    onCloseTaskDeleteModal()
  }, [onCloseTaskDeleteModal])

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        handleCloseModal()
      }
      if (event.key === 'Delete') {
        handleDeleteConfirmation()
      }
    }

    function handleClickOutside(event: MouseEvent) {
      if (!modalRef.current?.contains(event.target as Node)) {
        handleCloseModal()
      }
    }

    document.body.classList.add('modal-open')
    document.addEventListener('mousedown', handleClickOutside)
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      window.removeEventListener('keydown', handleKeyDown)
      document.body.classList.remove('modal-open')
    }
  }, [handleCloseModal, handleDeleteConfirmation])

  return (
    <div className={styles.curtain}>
      <div className={styles.modalWrapper}>
        <div className={styles.modal} ref={modalRef}>
          <header className={styles.header}>
            <h2 className={styles.title}>Delete Meow</h2>

            <button
              type="button"
              onClick={handleCloseModal}
              className={styles.cancelIcon}
            >
              <X />
            </button>
          </header>

          <p className={styles.text}>
            Are you <strong>sure</strong> to delete this meow?
            <span>{task.content}</span>
          </p>

          <div className={styles.control}>
            <button
              onClick={handleCloseModal}
              type="button"
              className={styles.cancel}
            >
              Cancel
            </button>

            <button
              type="button"
              className={styles.delete}
              onClick={handleDeleteConfirmation}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
