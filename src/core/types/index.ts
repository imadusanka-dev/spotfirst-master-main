export type ROLE = 'ROLE_ADMIN' | 'ROLE_ARTIST' | 'ROLE_LABEL'

export interface Submission {
  parentId: number
  _id: string
  trackTitle: string
  songType: string
  songUrl: string
  songPreview: SongPreview
  duration: number
  imageUrl: string
  artistName: string
  remainingTime: string
  createdBy: string | null
  createdAt: string
  lastModifiedAt: string | null
  lastModifiedBy: string | null
  otherArtistsParticipated: boolean
  artistAndVocalistsParticipate: string | null
  englishLyrics: boolean
  genres: string[]
  mood: string[]
  message: string
  credits: number
  curators: Curator[]
  curatorId: string
  userId: string
  userEmail: string
  status: string
  approvalToToWhere: string[]
  approvalToWhen: string | null
  approvalToDate: string | null
  declinedDate: string | null // TODO add declinedDate field for submission
  declinedFeedback: string
  label: string | null
  new: boolean
  releasedDate: string | null
  uri: string | null
  totalSubmission: number
  users: any
  id: string
}

export interface Curator {
  _id: string

  id: string
  curatorName: string
  rating: number
  price: number
  premiumApprovedRate: number
  freeApprovedRate: number
  premiumResponseRate: number
  freeResponseRate: number
  acceptedGenres: string[]
  averageShareTime: number
  type: string
  followerCountOfMedia: null
  curatorAvailability: null
  user: User
  userId: string
}

export type User = {
  _id: string
  email: string
  roles: ROLE[]
  profilePicture: string | null
  description: string | null
  genres: string[] | null
  name: string
}

export interface SongPreview {
  start: number
  end: number
}

export type SocialLink = {
  verified: boolean
  link: string
  type: string
}

export interface Track {
  _id: string
  artistName: string
  imageUrl: string
  songType: string
  songUrl: string
  trackTitle: string
  platform: string | null
}
