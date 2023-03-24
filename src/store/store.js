import { configureStore } from '@reduxjs/toolkit'
import { ToDoSlice, AuthSlice } from './features'

const store = configureStore({
  reducer: {
    auth: AuthSlice,
    todo: ToDoSlice,
  },
})
export default store
