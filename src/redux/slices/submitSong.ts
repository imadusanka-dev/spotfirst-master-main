import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Submission } from 'core/types'
import { ARTIST_API } from 'data'

type Tab = {
  name: string
  href: string
}

type Step = {
  name: string
  description: string
  href: string
  step: number
  completed: boolean
}

type SongInfo = {
  title: string | null
  artistName: string | null
  albumArt?: string | null
  type?: string
  otherArtistsParticipated: boolean
  artistAndVocalistsParticipate: string | null
  englishLyrics: boolean
  genres: string[] | null
  moods: string[] | null
  message: string | null
  otherLanguage: string | null
  songUrl?: string | null
  songPreview?: string | null
  songDuration?: string | null
  uri: string | null
}

const steps = [
  {
    name: 'Drop your song',
    description: 'Upload your song or pick an existing demo',
    href: '#',
    step: 1,
    completed: false,
  },
  {
    name: 'Tell us more',
    description: 'Add important info about you and your song',
    href: '#',
    step: 2,
    completed: false,
  },
  {
    name: 'Select your curators',
    description: 'Pick out your preferred promoters',
    href: '#',
    step: 3,
    completed: false,
  },
]

type SongPreviewDuration = {
  start: number
  end: number
}

export interface SubmitSongState {
  parentId: number | null
  isSubmitting: boolean
  step: number
  steps: Step[]
  audio: File | null
  preview: SongPreviewDuration
  playing: boolean
  albumArt: File | null
  albumArtPreview: string | null
  activeTab: string
  releasedTrackEnabled: boolean
  releasedDate: Date | null
  releasedUnderLabelEnabled: boolean
  releasedLabelName: string | null
  tabs: Tab[]
  useLink: boolean
  songInfo: SongInfo
  curators: string[]
  errors: { field: string; message: string }[]
  curatorGenresFilter: string[]
}

const tabs = [
  { name: 'Use Spotify Link', href: '#use-link' },
  { name: 'Upload your song', href: '#upload-song' },
]

export const submitSong = createAsyncThunk(
  'submitSong/artist',
  async (data: { data }, thunkAPI) => {
    try {
      const response = await ARTIST_API.submitSong(data.data)

      return response
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message })
    }
  }
)

const internalInitialState: SubmitSongState = {
  parentId: null,
  isSubmitting: false,
  step: 1,
  steps: steps,
  audio: null,
  preview: {
    start: 0,
    end: 20,
  },
  playing: false,
  albumArt: null,
  albumArtPreview: null,
  tabs: tabs,
  activeTab: tabs[0].href,
  releasedTrackEnabled: false,
  releasedUnderLabelEnabled: false,
  releasedDate: null,
  releasedLabelName: null,
  useLink: false,
  songInfo: {
    title: null,
    songUrl: null,
    songPreview: null,
    songDuration: null,
    artistName: null,
    otherArtistsParticipated: false,
    artistAndVocalistsParticipate: null,
    englishLyrics: true,
    otherLanguage: null,
    genres: [],
    moods: [],
    message: null,
    type: 'original',
  },
  curators: [],
  errors: [],
  curatorGenresFilter: [],
}

export const submitSongSlice = createSlice({
  name: 'submitSong',
  initialState: internalInitialState,
  reducers: {
    reset: () => internalInitialState,
    reSubmit: (state, action: PayloadAction<Submission>) => {
      state.step = 3
      state.steps[0].completed = true
      state.steps[1].completed = true
      state.useLink = true
      state.songInfo.title = action.payload.trackTitle
      state.songInfo.albumArt = action.payload.imageUrl
      state.songInfo.artistName = action.payload.artistName
      state.songInfo.englishLyrics = action.payload.englishLyrics
      state.songInfo.genres = action.payload.genres
      state.songInfo.moods = action.payload.genres
      state.songInfo.message = action.payload.message
      state.songInfo.otherArtistsParticipated =
        action.payload.otherArtistsParticipated
      state.songInfo.songUrl = action.payload.songUrl
      state.songInfo.songPreview = action.payload.songUrl
      state.songInfo.type = action.payload.songType
      state.activeTab = tabs[0].href
      state.parentId = action.payload.parentId
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
    setPlaying(state, action: PayloadAction<boolean>) {
      state.playing = action.payload
    },
    resetLinkSubmitData(state) {
      state.useLink = false
      state.songInfo.songUrl = null
      state.albumArtPreview = null
      state.songInfo.title = null
    },
    continueWithLinkSubmit(
      state,
      action: PayloadAction<{
        songUrl: string
        songPreview: string
        albumArt: string
        name: string
        artistName: string | null
        songDuration: string | null
        uri: string
      }>
    ) {
      state.songInfo.albumArt = action.payload.albumArt
      state.songInfo.songUrl = action.payload.songUrl
      state.songInfo.songPreview = action.payload.songPreview
      state.songInfo.title = action.payload.name
      state.songInfo.artistName = action.payload.artistName
      state.songInfo.songDuration = action.payload.songDuration
      state.songInfo.uri = action.payload.uri
    },
    setUsingLink(state, action: PayloadAction<boolean>) {
      state.useLink = action.payload
    },
    setAlbumArt(state, action: PayloadAction<File>) {
      state.albumArt = action.payload
    },
    setAlbumArtPreview(state, action: PayloadAction<string>) {
      state.albumArtPreview = action.payload
    },
    setAudio(state, action: PayloadAction<File | null>) {
      state.audio = action.payload
    },
    setActiveTab(state, action: PayloadAction<string>) {
      state.activeTab = action.payload
    },
    setReleasedTrackEnabled(state, action: PayloadAction<boolean>) {
      state.releasedTrackEnabled = action.payload
    },
    setReleasedDate(state, action: PayloadAction<Date>) {
      state.releasedDate = action.payload
    },
    setReleasedUnderLabelEnabled(state, action: PayloadAction<boolean>) {
      state.releasedUnderLabelEnabled = action.payload
    },
    setReleasedLabel(state, action: PayloadAction<string>) {
      state.releasedLabelName = action.payload
    },
    setCompletedStep(
      state,
      action: PayloadAction<{ step: number; completed: boolean }>
    ) {
      const stepIndex = action.payload.step - 1
      state.steps[stepIndex].completed = action.payload.completed
    },
    setPreviewDuration(state, action: PayloadAction<SongPreviewDuration>) {
      state.preview = action.payload
    },
    setSongInfo(
      state,
      action: PayloadAction<{ field: keyof SongInfo; value: any }>
    ) {
      const value = action.payload.value
      switch (action.payload.field) {
        case 'title':
          state.songInfo.title = value
          break
        case 'artistName':
          state.songInfo.artistName = value
          break
        case 'type':
          state.songInfo.type = value
          break
        case 'message':
          state.songInfo.message = value
          break
        case 'englishLyrics':
          state.songInfo.englishLyrics = value
          break
        case 'otherArtistsParticipated':
          state.songInfo.otherArtistsParticipated = value
          break
        case 'artistAndVocalistsParticipate':
          state.songInfo.artistAndVocalistsParticipate = value
          break
        case 'genres':
          state.songInfo.genres = value
          break
        case 'moods':
          state.songInfo.moods = value
          break
        case 'otherLanguage':
          state.songInfo.genres = value
          break
      }
    },
    setOtherArtistsParticipated(state, action: PayloadAction<boolean>) {
      state.songInfo.otherArtistsParticipated = action.payload
    },
    setOtherLanguage(state, action: PayloadAction<string>) {
      state.songInfo.otherLanguage = action.payload
    },
    setCurators(state, action: PayloadAction<string[]>) {
      state.curators = action.payload
    },
    setCuratorGenresFilter(state, action: PayloadAction<string[]>) {
      state.curatorGenresFilter = action.payload
    },
    resetSelectedCurators(state) {
      state.curators = []
    },
  },
  extraReducers: (builder) => {
    builder.addCase(submitSong.pending, (state) => {
      state.isSubmitting = true
    })
    builder.addCase(submitSong.rejected, (state, action) => {
      state = {
        ...internalInitialState,
        errors: [
          ...state.errors,
          { field: action.error.code, message: action.error.message },
        ],
      }
    })
    builder.addCase(submitSong.fulfilled, (state) => {
      state.isSubmitting = false
      state = internalInitialState
    })
  },
})

export const {
  setAlbumArt,
  setAudio,
  setActiveTab,
  setPlaying,
  setAlbumArtPreview,
  setReleasedTrackEnabled,
  setReleasedUnderLabelEnabled,
  setStep,
  continueWithLinkSubmit,
  setReleasedDate,
  setReleasedLabel,
  setPreviewDuration,
  setCompletedStep,
  setSongInfo,
  setCurators,
  setSubmitting,
  reset,
  setError,
  resetErrors,
  setUsingLink,
  resetLinkSubmitData,
  reSubmit,
  setCuratorGenresFilter,
  resetSelectedCurators,
} = submitSongSlice.actions
