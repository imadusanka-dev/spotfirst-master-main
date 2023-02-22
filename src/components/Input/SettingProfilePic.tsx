import { useAppDispatch } from 'core/hooks/useRedux'
import { ROLE } from 'core/types'
import { COMMON_API } from 'data'
import Image from 'next/legacy/image'
import { FC, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { fetchUser } from 'redux/slices/auth'
import { SpinnerCircular } from 'spinners-react'

type Profile = {
  name?: string
  email?: string
  profilePicture?: string
  primaryRole?: ROLE
  roles?: ROLE[]
  tokens?: number
}

interface SettingsProfilePicProps {
  profile: Profile
}

const SettingsProfilePic: FC<SettingsProfilePicProps> = ({ profile }) => {
  const [loading, setLoading] = useState(false)

  const inputRef = useRef<HTMLInputElement>(null)

  const dispatch = useAppDispatch()

  async function updateProfilePicture(file: File) {
    setLoading(true)
    try {
      const response = await COMMON_API.updateDisplayImage(file)
      if (response.status === 200) {
        setLoading(false)
        await dispatch(fetchUser())
      }
    } catch (error) {
      console.log(error)
      toast.error('Something went wrong!')
    }
  }

  async function removeProfilePicture() {
    setLoading(true)
    try {
      const response = await COMMON_API.removeDisplayImage()
      if (response.status === 200) {
        toast.success('Display image deleted')
        await dispatch(fetchUser())
        setLoading(false)
      }
    } catch (error) {
      console.log(error)
      toast.error('Something went wrong!')
    }
  }

  return (
    <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:pt-5">
      <dt className="text-sm font-medium text-gray-500">Photo</dt>
      <dd className="flex mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
        <span className="flex-grow">
          <div className="w-8 min-w-8 relative bg-primary-magenta h-8 min-h-8 rounded-full">
            {profile.profilePicture && (
              <Image
                layout="fill"
                objectFit="cover"
                className="rounded-full w-full h-full"
                src={profile.profilePicture}
                alt="Profile Picture"
              />
            )}
            <input
              disabled={loading}
              ref={inputRef}
              hidden
              type="file"
              onChange={(event) => {
                const file = event.target.files[0]
                updateProfilePicture(file)
              }}
            />
          </div>
        </span>
        <span className="flex items-start flex-shrink-0 ml-4 space-x-4">
          {!loading ? (
            <>
              {' '}
              <button
                disabled={loading}
                onClick={() => {
                  inputRef.current.click()
                }}
                type="button"
                className="font-medium bg-white rounded-md text-primary-magenta hover:text-purple-500 focus:outline-none"
              >
                Update
              </button>
              <span className="text-gray-300" aria-hidden="true">
                |
              </span>
              <button
                onClick={removeProfilePicture}
                type="button"
                className="font-medium bg-white rounded-md text-gray-500 hover:text-gray-600 focus:outline-none "
              >
                Remove
              </button>
            </>
          ) : (
            <div className="flex-shrink-0">
              <SpinnerCircular
                size={30}
                secondaryColor={'transparent'}
                color="#C93FC0"
              />
            </div>
          )}
        </span>
      </dd>
    </div>
  )
}

export default SettingsProfilePic
