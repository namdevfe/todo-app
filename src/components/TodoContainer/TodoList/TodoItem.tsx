import { useEffect, useState } from 'react'
import useAppDispatch from '../../../hooks/useAppDispatch'
import { update } from '../../../store/slices/todoSlice'
import type { TodoItem as TodoItemType } from '../../../types/todo'

interface TodoItemProps {
  data: TodoItemType
  onEdit: (item: TodoItemType) => void
  onDelete: (id: string) => void
}

const TodoItem = ({ data, onEdit, onDelete }: TodoItemProps) => {
  const { content, completed, id } = data || {}
  const dispatch = useAppDispatch()
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [editedTodo, setEditedTodo] = useState<string>('')

  const handleStatusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(update({ ...data, completed: e.target.checked }))
  }

  const handleEditingMode = () => {
    setIsEditing(true)
  }

  const handleTodoValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedTodo(e.target.value)
  }

  const handleSave = () => {
    const payload: TodoItemType = {
      ...data,
      content: editedTodo
    }

    onEdit(payload)
  }

  const handleDelete = () => {
    if (!id) return
    onDelete(id)
  }

  useEffect(() => {
    setEditedTodo(content)
  }, [content])

  return (
    <div className='flex items-center justify-between gap-2 px-4 bg-white border-2 rounded-lg overflow-hidden h-14'>
      <div className='flex items-center gap-2 flex-1'>
        {/* Status */}
        <input
          type='checkbox'
          className='block w-4 h-4 cursor-pointer shrink-0'
          checked={completed}
          onChange={handleStatusChange}
        />

        {/* Content (Can edit) */}
        {isEditing ? (
          <input
            type='text'
            value={editedTodo}
            className='border-2 h-10 w-full px-2 rounded block'
            onChange={handleTodoValueChange}
          />
        ) : (
          <div className={completed ? 'line-through text-gray-400' : ''}>
            {content}
          </div>
        )}
      </div>

      {/* Actions */}
      <div className='flex items-center gap-2'>
        <button
          className='text-sm font-semibold text-blue-500 px-4 py-2 cursor-pointer transition-colors duration-300 hover:bg-blue-100 rounded-lg'
          onClick={isEditing ? handleSave : handleEditingMode}
        >
          {isEditing ? 'Save' : 'Edit'}
        </button>
        <button
          className='text-sm font-semibold text-red-500 px-4 py-2 cursor-pointer transition-colors duration-300 hover:bg-red-100 rounded-lg'
          onClick={handleDelete}
        >
          Delete
        </button>
      </div>
    </div>
  )
}

export default TodoItem
