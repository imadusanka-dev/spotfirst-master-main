import { submitSongSlice } from './slices/submitSong'
import { playerSlice } from './slices/player'
import { configureStore, combineReducers, AnyAction } from '@reduxjs/toolkit'
import { createWrapper, HYDRATE } from 'next-redux-wrapper'
import { authSlice } from './slices/auth'
import { submitWalletSlice } from './slices/submitWallet'

const combinedReducers = combineReducers({
  authReducer: authSlice.reducer,
  playerSlice: playerSlice.reducer,
  submitSongSlice: submitSongSlice.reducer,
  submitWalletSlice: submitWalletSlice.reducer,
})
export type AppState = ReturnType<typeof combinedReducers>

const rootReducer = (
  state: ReturnType<typeof combinedReducers>,
  action: AnyAction
) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state,
      ...action.payload,
    }
    return nextState
  }
  return combinedReducers(state, action)
}

export const store = configureStore({
  reducer: rootReducer,
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
})
const makeStore = () => store

export const wrapper = createWrapper(makeStore)

export type AppDispatch = typeof store.dispatch
