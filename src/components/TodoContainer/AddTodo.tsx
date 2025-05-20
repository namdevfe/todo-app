import { useState } from 'react'

interface AddTodoProps {
  onSubmit: (newTodo: string) => void
}

const AddTodo = ({ onSubmit }: AddTodoProps) => {
  const [newTodo, setNewTodo] = useState<string>('')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setNewTodo(value)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (newTodo === '') {
      alert('Do not allow adding empty todo!')
      return
    }

    onSubmit(newTodo)
    setNewTodo('')
  }

  return (
    <form className='flex items-center gap-3 mb-7' onSubmit={handleSubmit}>
      <div className='h-10 w-full overflow-hidden rounded-lg border-2'>
        <input
          type='text'
          placeholder='Add new task'
          className='h-full w-full px-3 outline-none'
          value={newTodo}
          onChange={handleInputChange}
        />
      </div>
      <button
        type='submit'
        className='h-full w-fit px-4 py-2 bg-black text-white rounded-lg cursor-pointer transition-opacity duration-300 hover:opacity-80'
      >
        Add
      </button>
    </form>
  )
}

export default AddTodo
