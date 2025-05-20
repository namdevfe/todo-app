import { v4 as uuidv4 } from 'uuid'
import useAppDispatch from '../../hooks/useAppDispatch'
import { add, deleteTodo, update } from '../../store/slices/todoSlice'
import type { TodoItem } from '../../types/todo'
import AddTodo from './AddTodo'
import TodoList from './TodoList'

const TodoContainer = () => {
  const dispatch = useAppDispatch()

  const handleAddTodo = (newTodo: string) => {
    const payload: TodoItem = {
      id: uuidv4(),
      content: newTodo,
      completed: false
    }

    dispatch(add(payload))
  }

  const handleEditTodo = (editedTodo: TodoItem) => {
    dispatch(update(editedTodo))
  }

  const handleDeleteTodo = (todoId: string) => {
    const payload = { id: todoId }
    dispatch(deleteTodo(payload))
  }

  return (
    <div className='w-full max-w-[500px] px-4'>
      <h1 className='text-4xl capitalize font-extrabold mb-6'>Your to do</h1>
      <AddTodo onSubmit={handleAddTodo} />
      <TodoList onEdit={handleEditTodo} onDelete={handleDeleteTodo} />
    </div>
  )
}

export default TodoContainer
