import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authService from '../../config/AuthService'

const initialStateAuth = {
  token: '',
  isAuthanticated: false,
  isLoading: false,
  isLoadingRegister: false,
  isSave: false,
  isExist: false,
  code: 0,
  alertMessage: '',
  error: {
    code: '',
    message: '',
    fields: [],
  },
}

export const fetchLogin = createAsyncThunk('auth/fetchLogin', async (payload) => {
  try {
    const response = await fetch(authService.login, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Accept-Encoding': 'gzip;q=1.0, compress;q=0.5',
      },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((data) => {
        localStorage.setItem('token', data.token)
        localStorage.setItem('email', data.email)
        localStorage.setItem('firstName', data.firstName)
        localStorage.setItem('lastName', data.lastName)
      })

    console.log(response.success)
    return response
  } catch (e) {}
})

export const fecthRegister = createAsyncThunk(
  'auth/register',

  async (payload) => {
    try {
      const response = await fetch(authService.register, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })
        .then((response) => response.json())
        .catch((error) => console.log(error))
      return response
    } catch (err) {
      return err.response
    }
  },
)

const authSlice = createSlice({
  name: 'auth',
  initialState: initialStateAuth,

  reducers: {
    setAllertMsssage: (state, action) => {
      state.alertMessage = action.payload
    },
    setIsSave: (state, action) => {
      state.isSave = false
      state.alertMessage = ''
    },

    logout: (state, action) => {
      state.token = ''
      state.isAuthanticated = false
    },
    setAuth: (state, action) => {
      state.auth = action.payload
    },
  },
  extraReducers: (build) => {
    build.addCase(fecthRegister.fulfilled, (state, action) => {
      state.auth = action.payload
      state.alertMessage = 'succesful'
      state.isLoadingRegister = false
      state.isSave = true
    })

    build.addCase(fecthRegister.pending, (state, action) => {
      state.isLoadingRegister = true
      state.isSave = false
    })
    build.addCase(fecthRegister.rejected, (state, action) => {
      state.isLoadingRegister = false
      state.isSave = false
      state.alertMessage = state.error.message
    })

    build.addCase(fetchLogin.fulfilled, (state, action) => {
      state.isAuthanticated = true
    })
    build.addCase(fetchLogin.pending, (state, action) => {
      state.isLoading = true
      state.isAuthanticated = false
    })
    build.addCase(fetchLogin.rejected, (state, action) => {
      state.isLoading = false
      state.isAuthanticated = false
      alert('Something went wrong')
    })
  },
})

export const { setAllertMsssage, logout, setIsSave, setAuth } = authSlice.actions

export default authSlice.reducer
