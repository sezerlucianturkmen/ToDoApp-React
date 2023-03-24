import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import ToDoService from '../../config/ToDoService'

const initialStateToDo = {
  todo: {},
  todoList: [],
  toDoListDone: [],
  toDoListProgress: [],
  todoid: null,
  isUpdated: false,
  isCreated: false,

  data: [],
  error: {
    code: '',
    message: '',
    fields: [],
  },
}

export const checkDone = createAsyncThunk('todo/done', async (payload) => {
  try {
    const response = await fetch(ToDoService.done, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .catch((error) => console.log(error))
    return response
  } catch (err) {
    return err.response
  }
})

export const deleteTodo = createAsyncThunk('todo/delete', async (payload) => {
  try {
    const response = await fetch(ToDoService.delete, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .catch((error) => console.log(error))
    return response
  } catch (err) {
    return err.response
  }
})

export const updateToDo = createAsyncThunk('todo/update', async (payload) => {
  try {
    const response = await fetch(ToDoService.update, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .catch((error) => console.log(error))
    return response
  } catch (err) {
    return err.response
  }
})

export const findInProgress = createAsyncThunk('todo/findinprogress', async (payload) => {
  try {
    const response = await fetch(ToDoService.findAllInProgress, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .catch((error) => console.log(error))
    return response
  } catch (err) {
    return err.response
  }
})

export const findAllDones = createAsyncThunk('todo/findalldone', async (payload) => {
  try {
    const response = await fetch(ToDoService.findAllDone, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .catch((error) => console.log(error))
    return response
  } catch (err) {
    return err.response
  }
})

export const findAllToday = createAsyncThunk('todo/findalltoday', async (payload) => {
  try {
    const response = await fetch(ToDoService.todayTodo, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .catch((error) => console.log(error))
    return response
  } catch (err) {
    return err.response
  }
})

export const filter = createAsyncThunk('todo/filter', async (payload) => {
  try {
    const response = await fetch(ToDoService.filterByKeyword, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .catch((error) => console.log(error))
    return response
  } catch (err) {
    return err.response
  }
})

export const create = createAsyncThunk('todo/create', async (payload) => {
  try {
    const response = await fetch(ToDoService.create, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .catch((error) => console.log(error))
    return response
  } catch (err) {
    return err.response
  }
})

const toDoSlice = createSlice({
  name: 'todo',
  initialState: initialStateToDo,

  reducers: {},
  extraReducers: (build) => {
    //findAllProgress
    build.addCase(findInProgress.pending, (state) => {
      state.isLoading = true
    })
    build.addCase(findInProgress.fulfilled, (state, action) => {
      console.log('Extra Reducer', action.payload)
      state.toDoListProgress = action.payload.sort((a, b) => b.id - a.id)
      state.isLoading = false
      if (state.isUpdated === false) {
        state.isUpdated = true
      } else {
        state.isUpdated = false
      }
    })
    build.addCase(findInProgress.rejected, (state) => {
      state.isLoading = false
    })
    //findAlldone
    build.addCase(findAllDones.pending, (state) => {
      state.isLoading = true
    })
    build.addCase(findAllDones.fulfilled, (state, action) => {
      console.log('Extra Reducer', action.payload)
      state.toDoListDone = action.payload.sort((a, b) => b.id - a.id)
      state.isLoading = false
      if (state.isUpdated === false) {
        state.isUpdated = true
      } else {
        state.isUpdated = false
      }
    })
    build.addCase(findAllDones.rejected, (state) => {
      state.isLoading = false
    })
    //findAllToday
    build.addCase(findAllToday.pending, (state) => {
      state.isLoading = true
    })
    build.addCase(findAllToday.fulfilled, (state, action) => {
      console.log('Extra Reducer', action.payload)
      state.todoList = action.payload.sort((a, b) => b.id - a.id)
      state.isLoading = false
      if (state.isUpdated === false) {
        state.isUpdated = true
      } else {
        state.isUpdated = false
      }
    })
    build.addCase(findAllToday.rejected, (state) => {
      state.isLoading = false
    })
    //filter
    build.addCase(filter.pending, (state) => {
      state.isLoading = true
    })
    build.addCase(filter.fulfilled, (state, action) => {
      console.log('Extra Reducer', action.payload)
      state.toDoListProgress = action.payload.sort((a, b) => b.id - a.id)
      state.toDoListDone = action.payload.sort((a, b) => b.id - a.id)
      state.isLoading = false
      if (state.isUpdated === false) {
        state.isUpdated = true
      } else {
        state.isUpdated = false
      }
    })
    build.addCase(filter.rejected, (state) => {
      state.isLoading = false
    })
    //create
    build.addCase(create.pending, (state) => {
      state.isLoading = true
    })
    build.addCase(create.fulfilled, (state, action) => {
      console.log('Extra Reducer', action.payload)
      state.isLoading = false
      if (state.isCreated === false) {
        state.isCreated = true
      } else {
        state.isCreated = false
      }
    })
    build.addCase(create.rejected, (state) => {
      state.isLoading = false
    })
    //done
    build.addCase(checkDone.pending, (state) => {
      state.isLoading = true
    })
    build.addCase(checkDone.fulfilled, (state, action) => {
      console.log('Extra Reducer', action.payload)
      state.isLoading = false
      if (state.isCreated === false) {
        state.isCreated = true
      } else {
        state.isCreated = false
      }
    })
    build.addCase(checkDone.rejected, (state) => {
      state.isLoading = false
    })
    //delete
    build.addCase(deleteTodo.pending, (state) => {
      state.isLoading = true
    })
    build.addCase(deleteTodo.fulfilled, (state, action) => {
      console.log('Extra Reducer', action.payload)
      state.isLoading = false
      if (state.isCreated === false) {
        state.isCreated = true
      } else {
        state.isCreated = false
      }
    })
    build.addCase(deleteTodo.rejected, (state) => {
      state.isLoading = false
    })
    //update
    build.addCase(updateToDo.pending, (state) => {
      state.isLoading = true
    })
    build.addCase(updateToDo.fulfilled, (state, action) => {
      console.log('Extra Reducer', action.payload)
      state.isLoading = false
      if (state.isCreated === false) {
        state.isCreated = true
      } else {
        state.isCreated = false
      }
    })
    build.addCase(updateToDo.rejected, (state) => {
      state.isLoading = false
    })
  },
})

export default toDoSlice.reducer
