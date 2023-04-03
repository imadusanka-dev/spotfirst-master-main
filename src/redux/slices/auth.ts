import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
  SerializedError,
} from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { setCookie } from 'core/hooks/useCookie'
import { ROLE, SocialLink } from 'core/types'
import { BaseResponse } from 'core/types/responses'
import { AUTH_API } from 'data'

export enum AuthStates {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
}

const getMeQuery =
  'enabled=true&accountNonExpired=true&accountNonLocked=true&credentialsNonExpired=true'

export const fetchUser = createAsyncThunk('profile/me', async (_, thunkAPI) => {
  try {
    const response = await AUTH_API.me(getMeQuery)

    if (response.success) {
      return response.payload
    }
  } catch (error) {
    const err: AxiosError<BaseResponse> = error
    return thunkAPI.rejectWithValue({ error: err.response.data.message })
  }
})

export const login = createAsyncThunk(
  'auth/login',
  async (credentials: { email: string; password: string }, thunkAPI) => {
    try {
      const response = await AUTH_API.login(
        credentials.email,
        credentials.password
      )

      if (typeof response.success !== 'undefined' && !response.success) {
        return thunkAPI.rejectWithValue({ error: response.message })
      }

      setCookie('auth-token', response.token, 1)

      const refetch = await AUTH_API.me(getMeQuery)

      const data = {
        accessToken: response.token,
        me: { ...refetch.payload },
        error: null,
      }

      typeof window !== 'undefined' &&
        window.localStorage.setItem('primaryRole', data.me.primaryRole)

      return data
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message })
    }
  }
)

export const logout = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    setCookie('auth-token', null, 1)

    return thunkAPI.dispatch(reset())
  } catch (error) {
    return thunkAPI.rejectWithValue({ error: error.message })
  }
})

export const getTokens = createAsyncThunk(
  'user/tokens',
  async (_, thunkAPI) => {
    try {
      const response = await AUTH_API.getTokenCount()

      if (response.success) {
        return response.payload
      }
    } catch (error) {
      const err: AxiosError<BaseResponse> = error
      return thunkAPI.rejectWithValue({ error: err.response.data.message })
    }
  }
)

export interface AuthSliceState {
  accessToken: string
  loading: AuthStates
  me?: {
    id?: string
    name?: string
    email?: string
    profilePicture?: string
    primaryRole?: ROLE
    roles?: ROLE[]
    social?: SocialLink[]
    tokens?: number
    description?: string
    genres?: string[]
  }
  roles: ROLE[]
  tokens: any
  error?: SerializedError
}

const internalInitialState = {
  accessToken: '',
  loading: AuthStates.IDLE,
  me: null,
  roles: [],
  error: null,
  tokens: null,
} as AuthSliceState

export const authSlice = createSlice({
  name: 'auth',
  initialState: internalInitialState,
  reducers: {
    updateAccessToken(
      state: AuthSliceState,
      action: PayloadAction<{ token: string }>
    ) {
      state.accessToken = action.payload.token
    },
    reset: () => internalInitialState,
  },
  extraReducers: (builder) => {
    // login
    builder.addCase(login.fulfilled, (state, action) => {
      state.accessToken = action.payload.accessToken
      state.me = action.payload.me
      state.roles = action.payload.me.roles
    })
    builder.addCase(login.rejected, (state, action) => {
      state.error = action.payload['error']
    })

    // fetch user
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.me = action.payload
      state.me.social = action.payload.links
      state.roles = action.payload?.roles
      state.loading = AuthStates.SUCCESS
    })
    builder.addCase(fetchUser.pending, (state) => {
      state.loading = AuthStates.LOADING
    })

    builder.addCase(fetchUser.rejected, (state) => {
      state.loading = AuthStates.SUCCESS
    })

    builder.addCase(getTokens.fulfilled, (state, action) => {
      state.tokens = action.payload
    })
    builder.addCase(getTokens.rejected, (state, action) => {
      state.error = action.payload['error']
    })
  },
})

export const { updateAccessToken, reset } = authSlice.actions
