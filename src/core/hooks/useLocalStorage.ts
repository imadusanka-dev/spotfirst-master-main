import { useState } from 'react'

export const useLocalStorage = (key: string, initialValue?: any) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item =
        typeof window !== 'undefined' && window.localStorage.getItem(key)
      return item ? item : initialValue
    } catch (error) {
      console.error(error)
      return initialValue
    }
  })

  const setValue = (value: any) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      typeof window !== 'undefined' &&
        window.localStorage.setItem(key, JSON.stringify(valueToStore))
    } catch (error) {
      console.error(error)
    }
  }

  return { storedValue, setValue }
}
