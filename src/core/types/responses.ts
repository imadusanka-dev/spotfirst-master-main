import { ROLE, User, SocialLink } from 'core/types/'
export interface BaseResponse<T = any> {
  code: number
  success: boolean
  message: string
  payload: T
}

export interface LoginResponse {
  success: boolean
  message: string
  user: User
  token: string
}

export interface MeResponse {
  email: string
  name: string
  profilePicture: string | null
  primaryRole: ROLE
  roles: ROLE[]
  links: SocialLink[]
  tokens: number
}
export interface UsersResponse<T = any> {
  success: boolean
  code: number
  message: string
  payload: T
}
export interface ChatHistory<T = any> {
  success: boolean
  code: number
  message: string
  payload: T
}
