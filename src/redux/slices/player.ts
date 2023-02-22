import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

export type PlayerLoadingState = 'IDLE' | 'PENDING' | 'SUCCESS'

export interface PlayerSliceState {
  title: string | null
  loading: PlayerLoadingState
  isPlaying: boolean
  audioUrl: string | null
  albumArt: string | null
  duration: number | null
  currentTime: number | null
  volume: number
  artist: string | null
  uri: string | null
  platform: 'spotify' | 'mp3' | 'soundcloud' | 'applemusic' | 'youtube' | null
}

interface SongInfo {
  title: string
  artist: string
  isPlaying: boolean
  audioUrl: string
  albumArt: string
  currentTime: number
  uri: string
}

const initialState = {
  title: '-',
  artist: '-',
  isPlaying: false,
  loading: 'IDLE',
  audioUrl: null,
  albumArt: null,
  duration: 0,
  currentTime: 0,
  volume: 0.5,
  platform: null,
} as PlayerSliceState

export const setSong = createAsyncThunk(
  'player/setSong',
  async (songInfo: SongInfo, thunkAPI) => {
    try {
      // const is_spotify = /^(spotify:|https:\/\/[a-z]+\.spotify\.com\/)/

      // // fetch preview url from spotify WEB API
      // if (is_spotify.test(songInfo.audioUrl)) {
      //   const spotify_token = await SPOTIFY_API.getAccessToken()

      //   if (spotify_token.error) {
      //     return toast.error('Spotify Client Error!')
      //   }

      //   const url = new URL(songInfo.audioUrl)
      //   const track_id = url.pathname.split('/')[2]

      //   const track = await SPOTIFY_API.getTrack(
      //     track_id,
      //     spotify_token.access_token,
      //     spotify_token.token_type
      //   )

      //   return Object.assign(songInfo, {
      //     audioUrl: track.preview_url,
      //   })
      // } else {
      // }
      return songInfo
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message })
    }
  }
)

export const playerSlice = createSlice({
  name: 'player',
  initialState: initialState,
  reducers: {
    setVolume(state: PlayerSliceState, action: PayloadAction<number>) {
      state.volume = action.payload
      if (typeof window !== 'undefined') {
        window.localStorage.setItem('player_volume', action.payload.toString())
      }
    },
    setDuration(state: PlayerSliceState, action: PayloadAction<number>) {
      state.duration = action.payload
    },
    setCurrentTime(state: PlayerSliceState, action: PayloadAction<number>) {
      state.currentTime = action.payload
    },
    setIsPlaying(state: PlayerSliceState, action: PayloadAction<boolean>) {
      state.isPlaying = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(setSong.pending, (state) => {
      state.loading = 'PENDING'
      state.isPlaying = false
    })
    builder.addCase(setSong.rejected, (state) => {
      state.loading = 'IDLE'
    })
    builder.addCase(setSong.fulfilled, (state, action: any) => {
      state.title = action.payload.title
      state.artist = action.payload.artist
      state.audioUrl = action.payload.audioUrl
      state.albumArt = action.payload.albumArt
      state.currentTime = action.payload.currentTime
      state.isPlaying = action.payload.isPlaying
      state.uri = action.payload.uri
      state.loading = 'SUCCESS'
    })
  },
})

export const { setIsPlaying, setVolume, setDuration, setCurrentTime } =
  playerSlice.actions
