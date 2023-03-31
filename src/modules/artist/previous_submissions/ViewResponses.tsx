import { Dialog, Transition } from '@headlessui/react'
import classNames from 'classnames'
import Button from 'components/Buttons/Button'
import { FC, Fragment, useEffect, useState } from 'react'
import { CheckSquare, Disc, FileText, User } from 'react-feather'
import { MdClose, MdStar, MdStarBorder } from 'react-icons/md'
import Rating from 'react-rating'
import { motion } from 'framer-motion'
import { ARTIST_API } from 'data'
import { Submission } from 'core/types'
import dayjs from 'dayjs'
import Image from 'next/legacy/image'

interface ViewResponsesProps {
  submission: Submission
}

export const ViewResponses: FC<ViewResponsesProps> = ({ submission }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [submissions, setSubmissions] = useState<Submission[]>([])

  useEffect(() => {
    // if (submission._id) {
    //   ARTIST_API.previousSubmissionsOfSong(submission._id, 1, 10).then(
    //     (res) => {
    //       setSubmissions(res.payload)
    //     }
    //   )
    // }
  }, [submission._id])

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  return (
    <>
      <button
        onClick={openModal}
        className={classNames(
          'px-2',
          'py-0.5 text-xs transition-all duration-300 text-white bg-primary-blue rounded-button'
        )}
      >
        <span>View</span>
      </button>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeModal}
        >
          <Dialog.Overlay
            className={
              'w-screen h-screen bg-black bg-opacity-10 backdrop-blur-md saturate-100 fixed'
            }
          />
          <div className="min-h-screen px-4 text-center">
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
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="relative inline-block w-full max-w-5xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white rounded-md shadow-xl">
                <button
                  onClick={closeModal}
                  className="absolute flex items-center justify-center top-4 right-4 text-primary-blue"
                >
                  <MdClose className="w-8 h-8" />
                </button>
                <div className="flex items-center w-3/4">
                  <div className="flex">
                    <div className="min-h-[100px] w-[100px] rounded-lg m-2 flex items-center relative overflow-hidden justify-center bg-slate-200 min-w-[100px] ">
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
                    <div className="flex flex-col justify-center w-full ml-4 space-y-2">
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
                          Responses{' '}
                          {
                            submissions.filter(
                              (item) => item.status !== 'PENDING'
                            ).length
                          }
                        </p>
                      </div>
                      <div className="flex items-center space-x-1">
                        <CheckSquare className="text-gray-500" size={14} />
                        <p className="text-xs text-gray-500">
                          Total Submissions {submissions.length}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-6">
                  <div className="min-w-full overflow-hidden overflow-x-auto align-middle shadow sm:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead>
                        <tr>
                          <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase bg-gray-50"></th>
                          <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase bg-gray-50">
                            Label Name
                          </th>
                          <th className="px-6 py-3 text-xs font-medium tracking-wider text-right text-gray-500 uppercase bg-gray-50">
                            Submitted Date
                          </th>
                          <th className="hidden px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase bg-gray-50 md:block">
                            Scheduled Date
                          </th>
                          <th className="px-6 py-3 text-xs font-medium tracking-wider text-right text-gray-500 uppercase bg-gray-50">
                            Response
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {submission.curators.map((response, index) => (
                          <ResponseItem key={index} response={response} />
                        ))}
                      </tbody>
                    </table>
                    {/* Pagination */}
                    <nav
                      className="flex items-center justify-between px-4 py-3 bg-white border-t border-gray-200 sm:px-6"
                      aria-label="Pagination"
                    >
                      <div className="hidden sm:block">
                        <p className="text-sm text-gray-700">
                          Showing <span className="font-medium">1</span> to{' '}
                          <span className="font-medium">10</span> of{' '}
                          <span className="font-medium">20</span> results
                        </p>
                      </div>
                      <div className="flex justify-between flex-1 sm:justify-end">
                        <a
                          href="#"
                          className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                        >
                          Previous
                        </a>
                        <a
                          href="#"
                          className="relative inline-flex items-center px-4 py-2 ml-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                        >
                          Next
                        </a>
                      </div>
                    </nav>
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

interface ResponseItemProps {
  response: Submission
}

const ResponseItem: FC<ResponseItemProps> = ({ response }) => {
  const [view, setView] = useState(false)
  return (
    <>
      <tr className="bg-white">
        <td className="px-6 py-4 text-sm text-gray-900 max-w-0 whitespace-nowrap">
          {/* {response} */}
        </td>
        <td className="px-6 py-4 text-sm text-gray-900 max-w-0 whitespace-nowrap">
          <div className="flex">
            <a className="inline-flex space-x-2 text-sm truncate group">
              <p className="text-gray-500 truncate group-hover:text-gray-900">
                {response.curatorName}
              </p>
            </a>
          </div>
        </td>
        <td className="px-6 py-4 text-sm text-right text-gray-500 whitespace-nowrap">
          {dayjs(response.createdAt).format('MMM DD, YYYY - hh:mm A')}
        </td>
        <td className="hidden px-6 py-4 text-sm text-gray-500 whitespace-nowrap md:block">
          N/A
        </td>
        <td className="px-6 py-4 text-sm text-right text-gray-500 whitespace-nowrap">
          <Button
            onClick={() => {
              setView(!view)
            }}
            className={classNames(
              // statusStyles[response.status],
              'inline-flex items-center px-3 py-1 rounded-full text-xs font-medium capitalize'
            )}
          >
            {response.songApproveStatuses}
          </Button>
        </td>
      </tr>
      {view && response.status === 'REJECTED' && (
        <motion.tr
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: '100%', opacity: 1 }}
        >
          <td
            className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap"
            colSpan={5}
          >
            <div className="flex flex-col">
              <textarea
                cols={10}
                rows={2}
                placeholder="Feedback"
                className="w-full px-3 py-2 rounded-lg outline-none resize-none bg-gray-50"
              ></textarea>

              <div className="flex items-center mt-3 ml-auto space-x-2">
                <div>
                  <Rating
                    emptySymbol={
                      <MdStarBorder className="w-6 h-6 text-yellow-500" />
                    }
                    fullSymbol={<MdStar className="w-6 h-6 text-yellow-500" />}
                  />
                </div>
                <Button size="sm">Rate</Button>
              </div>
            </div>
          </td>
        </motion.tr>
      )}
      {view && response.status === 'SHARED' && (
        <motion.tr
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: '100%', opacity: 1 }}
        >
          <td
            className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap"
            colSpan={5}
          >
            <div className="flex flex-col">
              <textarea
                readOnly
                cols={10}
                rows={1}
                defaultValue={'Shared Link here'}
                placeholder="Feedback"
                className="w-full px-3 py-2 rounded-lg outline-none resize-none bg-gray-50"
              ></textarea>
            </div>
          </td>
        </motion.tr>
      )}
    </>
  )
}
