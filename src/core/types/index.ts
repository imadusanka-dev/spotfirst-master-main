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
  englishLyrics: boolean
  genres: string[]
  message: string
  credits: number
  curator: Curator
  curatorId: string
  userId: User
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
  url: string | null
  totalSubmission: number
}

export interface Curator {
  _id: string
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

export interface Profile {}
