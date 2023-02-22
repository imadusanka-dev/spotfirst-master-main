import { getCookie } from '../hooks/useCookie'
import axios from 'axios'

// Create axios instance.
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_API_URL,
})

// Add a request interceptor
axiosInstance.interceptors.request.use(
  function (config) {
    const authToken = getCookie('auth-token')
    config.headers.Authorization = `Bearer ${authToken}`

    return config
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error)
  }
)

export default axiosInstance
