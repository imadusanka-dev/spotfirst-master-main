import { api } from 'core/axios'

export default {
  getTopTenTracks: () => api.get('/tracks/top-list').then((res) => res.data),
}
