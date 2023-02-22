import axios from 'axios'
import { getCookie } from '../hooks/useCookie'

// Create axios instance.
const axiosInstance = axios.create({
  baseURL:
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:3000'
      : process.env.NEXT_PUBLIC_BASE_URL,
  withCredentials: true,
})

// Add a request interceptor
axiosInstance.interceptors.request.use(
  function (config) {
    const authToken = getCookie('auth-token')
    return config
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error)
  }
)

export default axiosInstance
