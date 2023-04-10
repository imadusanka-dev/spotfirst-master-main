import { FC, memo } from 'react'
import Image from 'next/legacy/image'
import classNames from 'classnames'

interface ChatItemProps {
  online?: boolean
  id?: string
  name?: string
  email?: string
  profile?: string
  selectedUser: any
  setSelectedUser?: (value) => void
  setChat?: (value) => void
}

const ChatItem: FC<ChatItemProps> = ({
  id,
  name,
  email,
  profile,
  selectedUser,
  setSelectedUser,
  setChat,
}) => {
  const handleSingleChatUser = () => {
    if (selectedUser.id !== id) {
      setChat([])
      setSelectedUser({ id, name, email, profile })
    }
  }
  return (
    <div
      className={classNames(
        'flex rounded-lg transition-all px-2 cursor-pointer py-2 hover:bg-blue-50 space-x-2',
        { 'bg-blue-200': selectedUser.id === id }
      )}
      onClick={handleSingleChatUser}
    >
      <div className="min-w-[40px] relative w-[40px] h-[40px] rounded-full bg-primary-blue">
        {profile && (
          <Image
            layout="fill"
            objectFit="cover"
            src={profile}
            alt="Profile picture"
            className="w-full h-full rounded-full"
          />
        )}
      </div>
      <div className="flex flex-col justify-center">
        <span className="text-sm">{name}</span>
      </div>
    </div>
  )
}

export default memo(ChatItem)
