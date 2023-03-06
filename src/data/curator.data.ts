import { BaseResponse } from 'core/types/responses'
import { api } from 'core/axios'
import { Curator } from 'core/types'

export interface ICuratorFilterRequest {
  page?: number
  perPage?: number
  sort?: 'asc' | 'desc'
  sortField?: string
  filters?: {
    field: string
    operator: string
    value: string
  }[]
  genres?: string[]
  pricing: number
  ratings?: number[]
}

export interface ICuratorAvailabilityUpdate {
  unavailableFrom?: any
  unavailableTill?: any
  isActive: boolean
  message?: string
  unavailableDates: object
}

export default {
  curatorFilter: ({
    page = 1,
    perPage = 10,
    sort,
    sortField,
    filters,
    genres,
    pricing,
    ratings,
  }: ICuratorFilterRequest) =>
    api
      .post<BaseResponse<Curator[]>>('/curator/filter', {
        page: page,
        perPage: perPage,
        sort: sort,
        sortField: sortField,
        filters: filters,
        genres,
        pricing,
        ratings,
      })
      .then((res) => res.data),
  updateCuratorAvailable: (data: ICuratorAvailabilityUpdate) =>
    api.put<BaseResponse>('/curator/availability', data),
}
