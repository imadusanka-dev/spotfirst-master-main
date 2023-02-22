import { Submission } from 'core/types'
import { getFormattedDateString } from 'core/utils'
import Image from 'next/legacy/image'
import { FC } from 'react'
import { Calendar, Disc, FileText, Music, User } from 'react-feather'
import { MarkAsSharedPopup } from './MarkAsSharedPopop'

interface ApprovedSubmssionItemProps {
  submission: Submission
}

export const ApprovedSubmissionItem: FC<ApprovedSubmssionItemProps> = ({
  submission,
}) => {
  return (
    <li>
      <div className="flex items-center w-full">
        <div className="min-h-[180px] h-[180px] w-[180px] rounded-lg m-2 flex items-center relative overflow-hidden justify-center bg-slate-200 min-w-[180px] ">
          <Image
            layout="fill"
            objectFit="cover"
            src={submission.imageUrl}
            placeholder={'blur'}
            blurDataURL={submission.imageUrl}
            className="w-full h-full"
            alt="Album art"
          />
        </div>
        <div className="flex items-start w-full px-2 py-4 sm:px-3">
          <div className="flex-1 min-w-0 sm:flex sm:items-start sm:justify-between">
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
                    <User className="text-gray-500" size={14} />
                    <p className="text-xs text-gray-500">
                      {submission.artistName}
                    </p>
                  </div>
                  <div className="flex items-center space-x-1">
                    <FileText className="text-gray-500" size={14} />
                    <p className="text-xs text-gray-500">
                      {submission.genres.join(', ')}
                    </p>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="text-gray-500" size={14} />
                    <p className="text-xs text-gray-500">
                      {/* {submission.approvalToDate} */}
                      {getFormattedDateString(submission.approvalToDate)}
                    </p>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Music className="text-gray-500" size={14} />
                    <p className="text-xs text-gray-500">
                      {submission.songType}
                    </p>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Music className="text-gray-500" size={14} />
                    <p className="text-xs text-gray-500">
                      Released Under: {submission.label || 'Self-Released'}
                    </p>
                  </div>
                  <div className="w-[300px]">
                    <textarea
                      className="w-full p-2 text-xs rounded-md outline-none resize-none bg-gray-50"
                      placeholder="Add note"
                      rows={1}
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-end space-y-3">
              <div>
                <div className="flex px-4 text- py-1 rounded-full bg-primary-green bg-opacity-5 text-primary-green">
                  ${submission.credits?.toFixed(1)}
                </div>
              </div>
              <button className="px-4 text-sm py-1 transition-all duration-200 bg-primary-blue  rounded-full text-white">
                Contact Artist
              </button>
              <MarkAsSharedPopup />

              <button className="px-4 text-sm py-1 transition-all duration-200 bg-primary-magenta  rounded-full text-white">
                Refund
              </button>
            </div>
          </div>
        </div>
      </div>
    </li>
  )
}
