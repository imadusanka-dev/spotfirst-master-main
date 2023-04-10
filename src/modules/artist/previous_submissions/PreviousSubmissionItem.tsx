import { useAppSelector } from 'core/hooks/useRedux'
import { Submission } from 'core/types'
import Image from 'next/legacy/image'
import { useRouter } from 'next/router'
import { FC } from 'react'
import { Disc, FileText, Star, User } from 'react-feather'
import { useDispatch } from 'react-redux'
import {
  continueWithLinkSubmit,
  reSubmit,
  setReleasedDate,
  setReleasedLabel,
  setReleasedTrackEnabled,
  setReleasedUnderLabelEnabled,
  setSongInfo,
  setUsingLink,
  submitSong,
  setOtherArtistsParticipated,
  setCurators,
} from 'redux/slices/submitSong'
import { ViewResponses } from './ViewResponses'
import { roleNameToPath } from 'core/utils'
import Link from 'next/link'

interface PreviousSubmissionItemProps {
  submission: Submission
}

export const PreviousSubmissionItem: FC<PreviousSubmissionItemProps> = ({
  submission,
}) => {
  const role = useAppSelector((state) => state.authReducer.me.primaryRole)
  const dispatch = useDispatch()
  const router = useRouter()
  const handleReSubmit = async (submission: Submission) => {
    dispatch(reSubmit(submission))
    router.push(`/${roleNameToPath(role)}/submit`)
  }

  const addSubmitSongData = () => {
    dispatch(setReleasedTrackEnabled(!!submission.releasedDate))
    submission.releasedDate &&
      dispatch(setReleasedDate(new Date(submission.releasedDate)))
    dispatch(setUsingLink(true))
    dispatch(
      continueWithLinkSubmit({
        albumArt: submission.imageUrl,
        songPreview: '',
        songUrl: submission.songUrl,
        name: submission.trackTitle,
        artistName: submission.artistName,
        songDuration: submission.duration,
        uri: submission.uri,
      })
    )
    dispatch(setReleasedLabel(submission.label))
    dispatch(setReleasedUnderLabelEnabled(!!submission.label))
    dispatch(setOtherArtistsParticipated(submission.otherArtistsParticipated))
    dispatch(
      setSongInfo({
        field: 'artistAndVocalistsParticipate',
        value: submission.artistAndVocalistsParticipate,
      })
    )
    dispatch(setSongInfo({ field: 'type', value: submission.songType }))
    dispatch(setSongInfo({ field: 'genres', value: submission.genres }))
    dispatch(setSongInfo({ field: 'moods', value: submission.mood }))
    dispatch(setSongInfo({ field: 'message', value: submission.message }))
    dispatch(setCurators(submission.curators.map((curator) => curator._id)))
  }

  return (
    <li>
      <div className="flex w-full">
        {submission.imageUrl ? (
          <div className="min-h-[180px] w-[180px] rounded-lg m-2 flex items-center relative overflow-hidden justify-center bg-slate-200 min-w-[180px] ">
            <Image
              layout="fill"
              src={submission.imageUrl}
              placeholder={'blur'}
              blurDataURL={submission.imageUrl}
              className="w-full h-full"
              alt="Album art"
              objectFit="cover"
            />
          </div>
        ) : (
          <div className="min-h-[180px] flex items-center justify-center bg-primary-blue min-w-[180px] ">
            <Disc className="text-white text-opacity-20" size={130} />
          </div>
        )}
        <div className="flex items-start w-full px-2 py-4 sm:px-3">
          <div className="flex-1 min-w-0 sm:flex sm:items-center sm:justify-between">
            <div className="truncate">
              <div className="flex">
                <div className="flex flex-col justify-between w-full ml-4 space-y-2 ">
                  <div className="flex items-center space-x-1">
                    <Disc className="text-primary-blue-dark" size={14} />
                    <p className="text-primary-blue-dark">
                      {submission.trackTitle}
                    </p>
                  </div>
                  <div className="flex items-center space-x-1">
                    <User className="text-slate-500" size={14} />
                    <p className="text-xs text-slate-500">
                      {submission.artistName}
                    </p>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="text-slate-500" size={14} />
                    <p className="text-xs text-slate-500">Approved Rate: 50%</p>
                  </div>

                  <div className="flex items-center space-x-1">
                    <FileText className="text-slate-500" size={14} />
                    <p className="text-xs text-slate-500">
                      Total Submissions: {submission.totalSubmission}
                    </p>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="flex space-x-1">
                      <FileText className="text-slate-500" size={14} />
                      <p className="text-xs text-slate-500">Responses</p>
                    </div>
                    <ViewResponses submission={submission} />
                  </div>
                  {/* <div className="flex items-center space-x-1">
                          <CheckSquare className="text-slate-500" size={14} />
                          <p className="text-xs text-slate-500">
                            Total Submissions 1
                          </p>
                        </div> */}
                </div>
              </div>
            </div>
            <div className="flex flex-col items-end space-y-3">
              <button
                onClick={() => handleReSubmit(submission)}
                className="px-4 text-sm py-1 transition-all duration-200 bg-primary-blue  rounded-full text-white"
              >
                Submit
              </button>
              <Link
                href={`/${roleNameToPath(role)}/previous-submissions/edit/${
                  submission._id
                }`}
              >
                <button
                  className="px-4 text-sm py-1 transition-all duration-200 bg-slate-100  rounded-full text-slate-600"
                  onClick={() => addSubmitSongData()}
                >
                  Edit
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </li>
  )
}
