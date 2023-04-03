import Image from 'next/legacy/image'
import {
  faFacebook,
  faInstagram,
  faSpotify,
} from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Dialog, Transition } from '@headlessui/react'

import { FC, Fragment, useState, useEffect } from 'react'
import { AlertCircle } from 'react-feather'
import { Helmet } from 'react-helmet'
import { Curator, Submission } from 'core/types'
import { ApproveRejectSubmission } from './ApproveRejectSubmission'
import { NewSubmissionSongInfo } from './NewSubmissionSongInfo'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { ARTIST_API } from 'data'
import { getSocialMediaUrl } from '../../../../utils/helpers'

interface NewSubmissionReviewPopupProps {
  submission: Submission
}

export const NewSubmissionReview: FC<NewSubmissionReviewPopupProps> = ({
  submission,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [action, setAction] = useState<'IDLE' | 'APPROVE' | 'REJECT'>('IDLE')
  const [previousSubmissions, setPreviousSubmissions] = useState([])

  useEffect(() => {
    ARTIST_API.previousSubmissionsByArtistId(1, 4, submission.userId)
      .then((response) => setPreviousSubmissions(response.payload))
      .catch((error) => console.log(error))
  }, [submission.userId])

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  const getSocialIcons = () => {
    const links = getSocialMediaUrl(submission.userId?.links)

    return (
      <div className="grid grid-cols-3 gap-4 mt-3">
        <a href={links?.facebook || ''} target="_blank" rel="noreferrer">
          <button className="text-white bg-primary-blue min-w[30px] w-[30px] rounded-full h-[30px]">
            <FontAwesomeIcon icon={faFacebook as IconProp} />
          </button>
        </a>
        <a href={links?.instagram || ''} target="_blank" rel="noreferrer">
          <button className="text-white bg-primary-blue min-w[30px] w-[30px] rounded-full h-[30px]">
            <FontAwesomeIcon icon={faInstagram as IconProp} />
          </button>
        </a>
        <a href={links?.spotify || ''} target="_blank" rel="noreferrer">
          <button className="text-white bg-primary-blue min-w[30px] w-[30px] rounded-full h-[30px]">
            <FontAwesomeIcon icon={faSpotify as IconProp} />
          </button>
        </a>
      </div>
    )
  }

  return (
    <>
      <button
        onClick={openModal}
        className="px-3 py-0.5 text-sm text-white bg-primary-blue rounded-button"
      >
        Review
      </button>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          // eslint-disable-next-line @typescript-eslint/no-empty-function
          onClose={() => {}}
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
        >
          <Dialog.Overlay
            className={
              'w-screen h-screen bg-black bg-opacity-10 backdrop-blur-md saturate-100 fixed'
            }
          />
          <div className="min-h-[100vh] px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0" />
            </Transition.Child>
            {/* This element is to trick the browser into centering the modal contents. */}

            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="relative inline-block w-full max-h-[83vh] max-w-6xl my-8 text-left  transition-all transform bg-white rounded-lg shadow-xl">
                <Helmet bodyAttributes={{ className: 'overflow-hidden' }} />
                <main>
                  <div className="flex">
                    {/* -------- left side ------- */}
                    <div className="flex flex-col max-h-[83vh] overflow-y-scroll scrollbar-hide w-3/12 py-10 border-r">
                      <div className="flex flex-col items-center px-8 py-5 ">
                        <Image
                          src={submission.users?.profilePicture}
                          width={160}
                          height={160}
                          className="w-40 min-w-[160px] relative h-40 rounded-full bg-primary-blue"
                        />
                        <h4 className="pt-4 text-lg font-medium">
                          {submission.users?.name}
                        </h4>

                        {/* ------ social icons ----- */}
                        {getSocialIcons()}

                        {/* -------- artist bio secion --------- */}
                        <div className="py-4">
                          <p className="text-sm text-center text-gray-500">
                            {submission.users?.description}
                          </p>
                        </div>

                        {/* ------- some stats ----- */}
                        <div className="w-full pt-5 space-y-2">
                          <div className="flex items-center justify-between w-full">
                            <span className="text-sm text-gray-500">
                              Total Submissions
                            </span>

                            <span className="px-2 py-0.5 text-sm text-white rounded-full bg-primary-blue">
                              {submission.totalSubmission}
                            </span>
                          </div>
                          <div className="flex items-center justify-between w-full">
                            <span className="text-sm text-gray-500">
                              Approved Ratio
                            </span>
                            <span className="px-2 py-0.5 text-sm text-white rounded-full bg-primary-blue">
                              9
                            </span>
                          </div>
                        </div>

                        <div className="w-full h-[1px] bg-gray-300 mt-8 mb-8" />

                        <div className="w-full">
                          <h5>Previous Submissions</h5>
                          <ul className="mt-4 space-y-2">
                            {previousSubmissions.map((item, index) => {
                              return (
                                <li key={index}>
                                  <div className="flex items-center">
                                    <div className="w-10 h-10 mr-2 min-w-[40px] min-h-[40px] bg-primary-blue rounded-md">
                                      <Image
                                        src={item.imageUrl}
                                        width={40}
                                        height={40}
                                      />
                                    </div>
                                    <div className="flex flex-col">
                                      <div className="text-xs">
                                        {item.trackTitle}
                                      </div>
                                      <span className="text-xs text-primary-blue capitalize">
                                        {item.status?.toLowerCase()}
                                      </span>
                                    </div>
                                  </div>
                                </li>
                              )
                            })}
                          </ul>
                        </div>
                      </div>
                    </div>
                    {/* -------  right side ----- */}
                    <div className="flex relative flex-col max-h-[83vh] scrollbar-hide overflow-y-scroll w-9/12">
                      <div className="flex  justify-end w-full pb-10">
                        <button
                          onClick={closeModal}
                          className="flex fixed text-sm py-1 items-center px-3 bg-red-500 shadow-md  rounded-full self-end justify-center  top-4 right-4 text-white"
                        >
                          Close
                        </button>
                      </div>
                      <div className="flex flex-col p-5 m-5 space-y-4 bg-white border divide-y rounded-lg">
                        <div className="flex justify-between">
                          <NewSubmissionSongInfo
                            artist={submission.artistName}
                            songName={submission.trackTitle}
                            genres={submission.genres}
                            songType={submission.songType}
                            imageUrl={submission.imageUrl}
                            songUrl={submission.songUrl}
                            preview={submission.songPreview}
                            releasedDate={submission.releasedDate}
                            label={submission.label}
                            uri={submission.url}
                          />
                          <div>
                            <button>
                              <AlertCircle className="text-gray-500" />
                            </button>
                          </div>
                        </div>
                        <div className="py-3">
                          <span className="text-xs text-slate-400">
                            Message
                          </span>
                          <blockquote className="text-slate-600 italic">
                            {submission.message}
                          </blockquote>
                        </div>
                        <ApproveRejectSubmission
                          submission={submission}
                          setAction={setAction}
                          action={action}
                        />
                      </div>
                    </div>
                  </div>
                </main>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
