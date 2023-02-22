import AppLayout from 'core/layouts/AppLayout'
import { ROLE } from 'core/types'
import { FC, ReactElement, useEffect, useRef, useState } from 'react'
import { Socket } from 'socket.io'
import { useAppSelector } from 'core/hooks/useRedux'
import Image from 'next/legacy/image'
import { checkUserRole } from '../../utils/helpers'
import ChatItem from 'components/Chat'
import { COMMON_API } from 'data'
import toast from 'react-hot-toast'
import { useSocketConnection } from 'core/hooks/useSocket'
interface IMsg {
  message: string
  senderId: string
}
interface IUsers {
  _id: string
  name: string
  email: string
  profilePicture: string
}
interface IUser {
  id: string
  name: string
  email: string
  profilePicture: string
}

const MessagesInbox = () => {
  const inputRef = useRef(null)

  // connected flag
  const { chatSocketConnection } = useSocketConnection()
  const [users, setUsers] = useState<IUsers[]>([])
  const [selectedUser, setSelectedUser] = useState<IUser>(null)

  // init chat and message
  const [chat, setChat] = useState<IMsg[]>([])
  const [msg, setMsg] = useState<string>('')

  const authState = useAppSelector((state) => state.authReducer)

  useEffect(() => {
    fetchChatUsers()
    fetchChatHistory()
  }, [])

  useEffect(() => {
    setChat([])
    fetchChatHistory()
  }, [selectedUser, selectedUser?.id, authState?.me?.id])

  useEffect(() => {
    if (chatSocketConnection) {
      chatSocketConnection.emit('joinRoom', {
        receiverId: selectedUser?.id,
        senderId: authState?.me?.id,
      })

      chatSocketConnection.on('roomJoined', (data) => {
        console.log('Room joined', data)
      })

      chatSocketConnection.on('receiveChat', (message) => {
        chat.push(message)
        setChat([...chat])
      })
    }

    return () => {
      chatSocketConnection.off('receiveChat')
      setChat([])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedUser?.id, authState?.me?.id])

  const fetchChatHistory = async () => {
    try {
      const res = await COMMON_API.getChatHistory(selectedUser?.id)
      setChat([...chat, ...res.payload])
    } catch (error) {
      toast.error('chat history error')
    }
  }

  const fetchChatUsers = async () => {
    try {
      const res = await COMMON_API.getAllUsers()
      if (res.success) {
        setUsers(res.payload)
        setSelectedUser(res.payload[0])
      }
    } catch (error) {
      toast.error('chat user list error')
    }
  }

  const sendMessage = () => {
    if (msg && chatSocketConnection) {
      chatSocketConnection.emit('sendChat', {
        message: msg,
        senderId: authState?.me?.id,
        receiverId: selectedUser?.id,
      })
    }
    // focus after click
    inputRef?.current?.focus()
    // clear text field
    setMsg('')
  }

  return (
    <div className="relative mx-auto md:px-8 xl:px-0">
      <div>
        <h4 className="text-xl text-slate-800 dark:text-white">Chat</h4>
      </div>
      <section className="mt-4">
        <div className="flex space-x-4">
          <div
            style={{ minHeight: '74vh' }}
            className="shadow-normal  px-5 py-5 rounded-lg h-full w-3/12"
          >
            <h4 className="text-xl text-slate-800 dark:text-white">
              Other users
            </h4>
            <section className="mt-4 space-y-2">
              {users?.map((user, i) => {
                return (
                  <ChatItem
                    key={i}
                    id={user._id}
                    name={user.name ? user.name : 'N/A'}
                    email={user.email}
                    profile={user.profilePicture}
                    setSelectedUser={setSelectedUser}
                    setChat={setChat}
                  />
                )
              })}
            </section>
          </div>
          <div
            style={{ minHeight: '74vh' }}
            className="shadow-normal space-y-3 px-5 py-5 flex flex-col rounded-lg w-9/12"
          >
            <div className="flex border-b pb-3 items-center justify-between">
              <div className="flex space-x-2 w-full">
                <div className="min-w-[40px] relative w-[40px] h-[40px] rounded-full bg-primary-blue">
                  {selectedUser?.profilePicture && (
                    <Image
                      layout="fill"
                      objectFit="cover"
                      src={selectedUser?.profilePicture}
                      alt="Profile picture"
                      className="w-full h-full rounded-full"
                    />
                  )}
                </div>
                <div>
                  <p className="text-md">{selectedUser?.name}</p>
                  <span className="text-xs select-none text-primary-green bg-primary-green bg-opacity-5 py-1 rounded-full">
                    {selectedUser?.email}
                  </span>
                </div>
              </div>
            </div>

            {/* Begin Chat view */}
            <div className="flex flex-col px-3 flex-grow h-full min-h-max overflow-y-scroll rounded-lg">
              {chat.length ? (
                chat.map((chat, i) => (
                  <div
                    key={'msg_' + i}
                    style={{ maxWidth: '45%', minWidth: '20%' }}
                    className={
                      chat.senderId == authState?.me?.id
                        ? 'self-end bg-primary-magenta px-4 py-3 rounded-lg text-white text-sm mt-2'
                        : 'text-gray-600 border self-start text-sm px-4 py-3 rounded-lg mt-2'
                    }
                  >
                    {chat.message}
                  </div>
                ))
              ) : (
                <div className="text-sm text-center text-gray-400 py-6">
                  No chat messages
                </div>
              )}
            </div>

            {/* End Chat view */}

            {/* Chat input */}
            <div className="flex justify-between items-center h-[60px] overflow-hidden rounded-lg bg-gray-50">
              <div className="flex w-full px-5 py-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={msg}
                  placeholder={'Type a message...'}
                  onChange={(e) => {
                    setMsg(e.target.value)
                  }}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      sendMessage()
                    }
                  }}
                  className="bg-transparent text-sm  outline-none w-full"
                />
              </div>
              <button
                className="bg-primary-blue text-sm text-white h-full px-4"
                onClick={() => sendMessage()}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

MessagesInbox.getLayout = function getLayout(page: ReactElement, role: ROLE) {
  return <AppLayout role={role}>{page}</AppLayout>
}

export default MessagesInbox
