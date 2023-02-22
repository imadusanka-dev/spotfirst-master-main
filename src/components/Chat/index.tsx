import { FC, memo } from 'react'
import Image from 'next/legacy/image'

interface ChatItemProps {
  online?: boolean
  id?: string
  name?: string
  email?: string
  profile?: string
  setSelectedUser?: (value) => void
  setChat?: (value) => void
}

const ChatItem: FC<ChatItemProps> = ({
  id,
  name,
  email,
  profile,
  setSelectedUser,
  setChat,
}) => {
  const handleSingleChatUser = () => {
    setChat([])
    setSelectedUser({
      id,
      name,
      email,
      profile,
    })
  }
  return (
    <div
      className="flex rounded-lg transition-all px-2 cursor-pointer py-2 hover:bg-gray-50 space-x-2"
      onClick={() => handleSingleChatUser()}
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
      <div className="flex flex-col">
        <span className="text-sm">{name}</span>
        <span className="text-[12px] text-gray-500">{email}</span>
      </div>
    </div>
  )
}

export default memo(ChatItem)
