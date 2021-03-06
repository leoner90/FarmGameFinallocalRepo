/* eslint-disable no-unused-expressions */
/* eslint-disable no-sequences */
import { createSlice } from '@reduxjs/toolkit'
import { api } from '../services'

const json = localStorage.getItem('user')
const initialState = json ? JSON.parse(json) : { token: true }

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: () => {
      localStorage.removeItem('user')
      return {}
    },
  },
  extraReducers: builder => {
    builder.addMatcher(api.endpoints.login.matchFulfilled, (state, action) => {
      state.username = action.payload.name
      state.token = action.payload.token

      localStorage.setItem(
        'user',
        JSON.stringify({
          token: action.payload.token,
          user: action.payload.user,
        }),
      )
    }),
      builder.addMatcher(
        api.endpoints.logout.matchFulfilled,
        (state, action) => {
          state.username = ''
          state.token = null
        },
      )
  },
})

export const { logout } = userSlice.actions

export default userSlice.reducer
