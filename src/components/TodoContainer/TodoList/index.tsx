import useAppSelector from '../../../hooks/useAppSelector'
import type { TodoItem as TodoItemType } from '../../../types/todo'
import TodoItem from './TodoItem'

interface TodoListProps {
  onEdit: (item: TodoItemType) => void
  onDelete: (id: string) => void
}

const TodoList = ({ onEdit, onDelete }: TodoListProps) => {
  const todoList = useAppSelector((state) => state.todo.todoList)

  return (
    <div className='w-full flex flex-col gap-3'>
      {todoList.length > 0 &&
        todoList.map((item, index) => {
          const key = new Date().getTime() + index

          return (
            <TodoItem
              key={key}
              data={item}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          )
        })}
    </div>
  )
}

export default TodoList
