import { Transition } from '@headlessui/react'
import { PlusIcon } from '@heroicons/react/outline'
import classNames from 'classnames'
import { useAppSelector } from 'core/hooks/useRedux'
import { FC, Fragment, useState, useEffect } from 'react'
import { motion, Variants } from 'framer-motion'
import { getSocialMediaByName } from 'core/utils'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { X } from 'react-feather'
import dayjs from 'dayjs'
import ReactSelect from 'components/Select/Select'
import CustomDatePicker from 'components/DatePicker'
import toast from 'react-hot-toast'
import { LABEL_API } from 'data'
import { Submission } from 'core/types'
import { SpinnerCircular } from 'spinners-react'
import { useRouter } from 'next/router'
import { getMyPlaylists, addTrackToPlaylist } from 'core/spotify'

interface ApproveRejectSubmissionProps {
  submission: Submission
  action: 'IDLE' | 'APPROVE' | 'REJECT'
  setAction: (action: 'IDLE' | 'APPROVE' | 'REJECT') => void
}

interface SelectedPlaylist {
  id: string
  total: number
}

const plusButtonVariants: Variants = {
  open: {
    rotate: '45deg',
  },
  closed: {
    rotate: '0deg',
  },
}

// const whenToShareValues = [
//   {
//     label: 'Within a day',
//     value: dayjs().add(1, 'day'),
//   },
//   {
//     label: 'Within a week',
//     value: dayjs().add(1, 'week'),
//   },
//   {
//     label: 'Within a month',
//     value: dayjs().add(1, 'month'),
//   },
//   {
//     label: 'Custom',
//     value: null,
//   },
// ]

const whenToShareValues = [
  {
    label: 'Right Now',
    value: dayjs(),
  },
  {
    label: 'Custom',
    value: null,
  },
]

export const ApproveRejectSubmission: FC<ApproveRejectSubmissionProps> = ({
  submission,
  action = 'IDLE',
  setAction,
}) => {
  const [openSocialMenu, setOpenSocialMenu] = useState(false)
  const [whereToShare, setWhereToShare] = useState([])
  const profile = useAppSelector((state) => state.authReducer.me)
  const [whenToShare, setWhenToShare] = useState(whenToShareValues[0])
  const [selectedPlaylist, setSelectedPlaylist] =
    useState<SelectedPlaylist | null>(null)
  const [feedback, setFeedback] = useState<string | null>(null)
  const [playlists, setPlaylists] = useState([])
  const [position, setPosition] = useState<number>(0)
  const [loading, setLoading] = useState(false)

  const router = useRouter()

  const actionHanlder = (action: 'APPROVE' | 'REJECT') => {
    setAction(action)
  }

  const addTrackToSpotifyPlaylist = async () => {
    const payload = {
      uris: [submission.url],
      position: position,
      playlistId: selectedPlaylist.id,
    }
    await addTrackToPlaylist(payload)
  }

  const markAsApproved = async () => {
    // if (whereToShare.length == 0) {
    //   return toast.error('Select more than one social')
    // }

    if (!submission._id) {
      return toast.error('Submission id required!')
    }

    try {
      setLoading(true)

      //add track to spotify playlist
      await addTrackToSpotifyPlaylist()

      const response = await LABEL_API.approveSubmission({
        submissionId: submission._id,
        date: whenToShare.value.toISOString(),
        when: whenToShare.label,
        // where: whereToShare,
      })

      setLoading(false)

      if (response.success) {
        router.push(`/label/approved`)
      }
    } catch (error) {
      setLoading(false)
      toast.error('Something went wrong')
    }
  }
  const markAsRejected = async () => {
    if (!feedback || feedback.trim().length == 0) {
      return toast.error('Give feedback for rejection')
    }

    if (feedback.trim().length < 100) {
      return toast.error('Feedback should exceed 100 characters')
    }

    try {
      setLoading(true)
      const response = await LABEL_API.rejectSubmission(
        submission._id,
        feedback
      )
      setLoading(false)
      if (response.success) {
        router.push(`/label/rejected`)
      }
    } catch (error) {
      setLoading(false)
      toast.error('Something went wrong')
    }
  }

  const getCurrentUsersPlaylists = async () => {
    try {
      const response = await getMyPlaylists()
      setPlaylists(response.data.items)
    } catch (error) {
      toast.error('Something went wrong')
    }
  }

  useEffect(() => {
    getCurrentUsersPlaylists()
  }, [whenToShare])

  return (
    <div>
      <div className="flex py-3 space-x-2">
        <button
          className={classNames(
            action !== 'APPROVE'
              ? action === 'IDLE'
                ? ''
                : 'bg-opacity-40 hover:bg-opacity-50'
              : 'shadow-md',
            'px-4 text-sm py-1 transition-all duration-200 bg-primary-green  rounded-full text-white'
          )}
          onClick={() => actionHanlder('APPROVE')}
        >
          Approve
        </button>
        <button
          className={classNames(
            action !== 'REJECT'
              ? action === 'IDLE'
                ? ''
                : 'bg-opacity-40 hover:bg-opacity-50'
              : 'shadow-md',
            'px-4 text-sm py-1 transition-all duration-200 bg-primary-yellow  rounded-full text-white'
          )}
          onClick={() => actionHanlder('REJECT')}
        >
          Reject
        </button>
      </div>

      <div>
        {action === 'APPROVE' && (
          <div>
            {/*<div className="mt-4">*/}
            {/*  <p className="text-sm text-slate-500">Where you want to share?</p>*/}
            {/*  <div className="flex items-center my-3">*/}
            {/*    <div className="flex space-x-2 mr-2">*/}
            {/*      {whereToShare.map((share, index) => {*/}
            {/*        const social = getSocialMediaByName(share)*/}

            {/*        return (*/}
            {/*          <div*/}
            {/*            className="text-sm select-none px-4 py-1.5 flex items-center  bg-slate-100  rounded-full "*/}
            {/*            key={share}*/}
            {/*          >*/}
            {/*            <div>*/}
            {/*              <FontAwesomeIcon*/}
            {/*                className="text-slate-400 text-md mr-2"*/}
            {/*                icon={social.icon}*/}
            {/*              />*/}
            {/*              <span className="text-slate-600">{social.label}</span>*/}
            {/*            </div>*/}

            {/*            <button*/}
            {/*              onClick={() => {*/}
            {/*                const array = [...whereToShare]*/}
            {/*                if (index !== -1) {*/}
            {/*                  array.splice(index, 1)*/}
            {/*                  setWhereToShare(array)*/}
            {/*                }*/}
            {/*              }}*/}
            {/*            >*/}
            {/*              <X*/}
            {/*                className="w-5 ml-2 text-primary-blue"*/}
            {/*                strokeWidth={1.5}*/}
            {/*              />*/}
            {/*            </button>*/}
            {/*          </div>*/}
            {/*        )*/}
            {/*      })}*/}
            {/*    </div>*/}
            {/*    <div className="relative">*/}
            {/*      <motion.button*/}
            {/*        animate={openSocialMenu ? 'open' : 'closed'}*/}
            {/*        variants={plusButtonVariants}*/}
            {/*        onClick={() => {*/}
            {/*          setOpenSocialMenu(!openSocialMenu)*/}
            {/*        }}*/}
            {/*        className={classNames(*/}
            {/*          'bg-primary-blue  hover:bg-opacity-90',*/}
            {/*          'flex items-center shadow-md justify-center text-gray-600 h-9 w-9 min-w-9  rounded-button'*/}
            {/*        )}*/}
            {/*      >*/}
            {/*        <PlusIcon className="w-5 text-white h-5" />*/}
            {/*      </motion.button>*/}
            {/*      {openSocialMenu && (*/}
            {/*        <div*/}
            {/*          onClick={() => {*/}
            {/*            setOpenSocialMenu(false)*/}
            {/*          }}*/}
            {/*          className="h-screen w-screen z-0 overflow-hidden fixed top-0 left-0"*/}
            {/*        ></div>*/}
            {/*      )}*/}
            {/*      <div className="absolute z-10">*/}
            {/*        <Transition appear show={openSocialMenu}>*/}
            {/*          <Transition.Child*/}
            {/*            as={Fragment}*/}
            {/*            enter="ease-out duration-300"*/}
            {/*            enterFrom="opacity-0 scale-95"*/}
            {/*            enterTo="opacity-100 scale-100"*/}
            {/*            leave="ease-in duration-200"*/}
            {/*            leaveFrom="opacity-100 scale-100"*/}
            {/*            leaveTo="opacity-0 scale-95"*/}
            {/*          >*/}
            {/*            <div className="flex mt-1 flex-col min-w-[200px] rounded-lg bg-white shadow-md py-3 items-start">*/}
            {/*              <span className="text-sm px-3 select-none text-gray-600">*/}
            {/*                Verified Social*/}
            {/*              </span>*/}
            {/*              <div className="px-2 space-y-1 pt-2">*/}
            {/*                {profile.social.map((item) => {*/}
            {/*                  const social = getSocialMediaByName(item.type)*/}
            {/*                  const isAdded = whereToShare.some(*/}
            {/*                    (sc) => sc === item.type*/}
            {/*                  )*/}

            {/*                  return (*/}
            {/*                    <button*/}
            {/*                      className={classNames(*/}
            {/*                        'w-full text-left px-2 py-1 rounded-lg text-sm transitiona-all duration-200 text-slate-500 hover:bg-slate-50'*/}
            {/*                      )}*/}
            {/*                      onClick={() => {*/}
            {/*                        if (!isAdded) {*/}
            {/*                          setWhereToShare([*/}
            {/*                            item.type,*/}
            {/*                            ...whereToShare,*/}
            {/*                          ])*/}
            {/*                        }*/}
            {/*                      }}*/}
            {/*                      key={item.type}*/}
            {/*                    >*/}
            {/*                      {isAdded ? (*/}
            {/*                        <FontAwesomeIcon*/}
            {/*                          strokeWidth={1}*/}
            {/*                          className="text-green-500 text-md  mr-2"*/}
            {/*                          icon={faCheck}*/}
            {/*                        />*/}
            {/*                      ) : (*/}
            {/*                        <FontAwesomeIcon*/}
            {/*                          className="text-slate-400 text-lg  mr-2"*/}
            {/*                          icon={social.icon}*/}
            {/*                        />*/}
            {/*                      )}*/}

            {/*                      {social.label}*/}
            {/*                    </button>*/}
            {/*                  )*/}
            {/*                })}*/}
            {/*              </div>*/}
            {/*            </div>*/}
            {/*          </Transition.Child>*/}
            {/*        </Transition>*/}
            {/*      </div>*/}
            {/*    </div>*/}
            {/*  </div>*/}
            {/*</div>*/}
            <div className="mt-4">
              <p className="text-sm text-slate-500">When you want to share?</p>
              <div className="flex items-center space-x-3 mt-3 mb-10">
                <div className="min-w-[200px] max-w-[200px]">
                  <ReactSelect
                    onChange={(date) => {
                      setWhenToShare(date.value)
                    }}
                    defaultValue={{
                      label: whenToShareValues[0].label,
                      value: whenToShareValues[0],
                    }}
                    options={whenToShareValues.map((item) => ({
                      label: item.label,
                      value: item,
                    }))}
                  />
                </div>

                {whenToShare.value ? (
                  <div className="text-sm text-slate-500">
                    Share date will be:{' '}
                    {whenToShare.value.format('MMM DD, YYYY - hh:mm A')}
                  </div>
                ) : (
                  <div>
                    <CustomDatePicker
                      showTimeSelect
                      onChange={function (date: Date): void {
                        setWhenToShare({
                          label: 'Custom',
                          value: dayjs(date),
                        })
                      }}
                    />
                  </div>
                )}
              </div>
            </div>

            {/*{whenToShare.label == 'Right Now' && getCurrentUsersPlaylists()}*/}

            <div className="mt-4 flex">
              <div>
                <p className="text-sm text-slate-500">Select the playlists</p>
                <div className="flex items-center space-x-3 mt-3 mb-10">
                  <div className="min-w-[200px] max-w-[200px]">
                    <ReactSelect
                      onChange={(date) => {
                        setSelectedPlaylist(date.value)
                      }}
                      defaultValue={null}
                      options={playlists?.map((item) => ({
                        label: item.name,
                        value: {
                          id: item.id,
                          total: item.tracks.total,
                        },
                      }))}
                    />
                  </div>
                </div>
              </div>
              <div className="ml-3">
                <p className="text-sm text-slate-500">Position</p>
                <div className="flex items-center space-x-3 mt-3 mb-10">
                  <div className="min-w-[200px] max-w-[200px]">
                    <ReactSelect
                      onChange={(date) => {
                        setPosition(date.value)
                      }}
                      defaultValue={null}
                      options={Array.from(
                        { length: selectedPlaylist?.total },
                        (_, i) => i + 1
                      ).map((num) => ({
                        label: num,
                        value: num - 1,
                      }))}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end mt-5">
              <button
                disabled={loading}
                onClick={markAsApproved}
                className={classNames(
                  loading ? 'p-2 cursor-not-allowed' : 'px-4 py-2',
                  'bg-primary-blue transition-all h-[40px] flex justify-center items-center duration-300  rounded-full text-white text-sm'
                )}
              >
                {loading ? (
                  <SpinnerCircular
                    size={25}
                    secondaryColor={'transparent'}
                    color="#fff"
                  />
                ) : (
                  'Mark as Approved'
                )}
              </button>
            </div>
          </div>
        )}

        {action === 'REJECT' && (
          <div>
            <div>
              <textarea
                onChange={(event) => {
                  setFeedback(event.target.value)
                }}
                cols={10}
                rows={6}
                className="w-full bg-transparent outline-none rounded-lg placeholder:font-light !bg-gray-50 focus:outline-none px-5 py-3.5 text-sm "
                placeholder="Feedback"
              ></textarea>
            </div>
            <div className="flex justify-end mt-10">
              <button
                disabled={loading}
                onClick={markAsRejected}
                className={classNames(
                  loading ? 'p-2 cursor-not-allowed' : 'px-4 py-2',
                  'bg-red-500 transition-all h-[40px] flex justify-center items-center duration-300  rounded-full text-white text-sm'
                )}
              >
                {loading ? (
                  <SpinnerCircular
                    size={25}
                    secondaryColor={'transparent'}
                    color="#fff"
                  />
                ) : (
                  'Mark as Rejected'
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
