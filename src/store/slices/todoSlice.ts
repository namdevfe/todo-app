import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { TodoItem } from '../../types/todo'

interface TodoState {
  todoList: TodoItem[]
}

const initialState: TodoState = {
  todoList: []
}

const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    add(state, action) {
      state.todoList = [action.payload, ...state.todoList]
    },
    update(state, action: PayloadAction<TodoItem>) {
      const matchIndex = state.todoList.findIndex(
        (item) => item.id === action.payload.id
      )

      state.todoList[matchIndex].completed = action.payload.completed
      state.todoList[matchIndex].content = action.payload.content
    },
    deleteTodo(state, action: PayloadAction<Pick<TodoItem, 'id'>>) {
      state.todoList = state.todoList.filter(
        (item) => item.id !== action.payload.id
      )
    }
  }
})

const { actions, reducer: todoReducer } = todoSlice
export const { add, update, deleteTodo } = actions
export default todoReducer
