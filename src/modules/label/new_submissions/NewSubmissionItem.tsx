import { Submission, Curator } from 'core/types'
import Image from 'next/legacy/image'
import { FC } from 'react'
import { NewSubmissionReview } from './NewSubmissionReview'
import dayjs from 'dayjs'
import { millisToMinutesAndSeconds } from '../../../../utils/helpers'

interface ISubmission {
  curatorId: Curator
  submissionId: Submission
}
interface NewSubmissionItemProps {
  submission: ISubmission
}

export const NewSubmissionItem: FC<NewSubmissionItemProps> = ({
  submission,
}) => {
  return (
    <tr className="bg-white">
      <td className="px-6 py-4 text-sm text-slate-900 min-w-[60px] whitespace-nowrap">
        <div className="relative w-[60px] h-[60px] rounded-lg overflow-hidden min-w-[60px]">
          <Image
            layout="fixed"
            src={submission.submissionId?.imageUrl}
            width={60}
            height={60}
            placeholder="blur"
            blurDataURL={submission.submissionId?.imageUrl}
            alt={submission.submissionId?.trackTitle}
          />
        </div>
      </td>
      <td className="px-6 py-4 text-sm text-slate-900 min-w-[200px] whitespace-nowrap">
        <div className="flex">
          <a className="inline-flex space-x-2 text-sm  group">
            <p className="text-slate-500 group-hover:text-slate-900">
              {submission.submissionId?.trackTitle}
            </p>
          </a>
        </div>
      </td>
      <td className="px-6 py-4 text-sm text-slate-900 max-w-0 whitespace-nowrap">
        <div className="flex">
          <a className="inline-flex space-x-2 text-sm truncate group">
            <p className="text-slate-500 truncate group-hover:text-slate-900">
              {submission.submissionId?.duration
                ? millisToMinutesAndSeconds(submission.submissionId?.duration)
                : 'N/A'}
            </p>
          </a>
        </div>
      </td>
      <td className="px-6 py-4 text-sm text-slate-500 whitespace-nowrap">
        {submission.submissionId?.artistName}
      </td>
      <td className="px-6 py-4 text-sm text-slate-500 whitespace-nowrap">
        <span className="px-4 text- py-1 rounded-full bg-primary-blue bg-opacity-5 text-primary-blue">
          {submission.submissionId?.remainingTime
            ? `${dayjs(new Date()).diff(
                submission.submissionId?.remainingTime,
                'hour'
              )}h`
            : 'N/A'}
        </span>
      </td>
      <td className=" px-6 py-4 text-sm text-slate-500 whitespace-nowrap ">
        {submission.submissionId?.genres.map((genre, index) => (
          <span
            key={index}
            className="inline-flex rounded-full uppercase font-medium bg-primary-magenta bg-opacity-10 px-2 text-xs  leading-5 text-primary-magenta"
          >
            {genre}
          </span>
        ))}
      </td>

      <td className="px-6 py-4 text-sm  text-slate-500 whitespace-nowrap">
        <span className=" uppercase font-medium  text-xs ">
          {submission.submissionId?.songType}
        </span>
      </td>
      <td className="px-6 py-4 text-sm  text-slate-500 whitespace-nowrap">
        <span className="px-4 text- py-1 rounded-full bg-primary-green bg-opacity-5 text-primary-green">
          {/*${submission.credits?.toFixed(1)} */}$ 0.80
        </span>
      </td>
      <td className="px-6 py-4 text-sm text-right text-slate-500 whitespace-nowrap">
        <NewSubmissionReview submission={submission} />
      </td>
    </tr>
  )
}
