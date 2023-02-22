import { useState } from 'react'

export const getCookie = (key: string) =>
  document.cookie.split('; ').reduce((total, currentCookie) => {
    const item = currentCookie.split('=')
    const storedKey = item[0]
    const storedValue = item[1]
    return key === storedKey ? decodeURIComponent(storedValue) : total
  }, '')

export const setCookie = (key: string, value: any, numberOfDays: number) => {
  const now = new Date()
  // set the time to be now + numberOfDays
  now.setTime(now.getTime() + numberOfDays * 60 * 60 * 24 * 1000)
  document.cookie = `${key}=${value};     expires=${now.toUTCString()}; path=/`
}

const useCookie = (key: string, defaultValue: any) => {
  const getItem = () => getCookie(key) || defaultValue
  const [cookie, setStateCookie] = useState(getItem())

  const updateCookie = (value: any, numberOfDays: number) => {
    setStateCookie(value)
    setCookie(key, value, numberOfDays)
  }
  return [cookie, updateCookie]
}
export default useCookie
