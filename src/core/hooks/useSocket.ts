import React, { useMemo } from 'react'
import { makeSocketConnection } from '../../../utils/helpers'

export const useSocketConnection = () => {
  const { chatSocketConnection } = useMemo(() => makeSocketConnection(), null)

  return {
    chatSocketConnection,
  }
}
