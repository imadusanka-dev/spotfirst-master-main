import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Submission } from 'core/types'
import { ARTIST_API } from 'data'

type Step = {
  name: string
  description: string
  href: string
  step: number
  completed: boolean
}

const steps = [
  {
    name: 'Add Tokens',
    description: 'Add credit tokens to your wallet',
    href: '#',
    step: 1,
    completed: false,
  },
  {
    name: 'Bank Card Detail',
    description: 'Fill card detail',
    href: '#',
    step: 2,
    completed: false,
  },
  {
    name: 'Final',
    description: 'Complete the payment process',
    href: '#',
    step: 3,
    completed: false,
  },
]

export interface SubmitSongState {
  isSubmitting: boolean
  step: number
  steps: Step[]
  errors: { field: string; message: string }[]
}

const internalInitialState: SubmitSongState = {
  isSubmitting: false,
  step: 1,
  steps: steps,
  errors: [],
}

export const submitWalletSlice = createSlice({
  name: 'submitWallet',
  initialState: internalInitialState,
  reducers: {
    reset: () => internalInitialState,
    reSubmit: (state, action: PayloadAction<Submission>) => {
      state.step = 3
      state.steps[0].completed = true
      state.steps[1].completed = true
    },
    setError(state, action: PayloadAction<{ field: string; message: string }>) {
      state.errors.push(action.payload)
    },
    resetErrors(state) {
      state.errors = []
    },
    setSubmitting(state, action: PayloadAction<boolean>) {
      state.isSubmitting = action.payload
    },
    setStep(state, action: PayloadAction<number>) {
      state.step = action.payload
    },
    setCompletedStep(
      state,
      action: PayloadAction<{ step: number; completed: boolean }>
    ) {
      const stepIndex = action.payload.step - 1
      state.steps[stepIndex].completed = action.payload.completed
    },
  },
})

export const {
  setStep,
  setCompletedStep,
  setSubmitting,
  reset,
  setError,
  resetErrors,
  reSubmit,
} = submitWalletSlice.actions
