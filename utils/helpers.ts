import { io } from 'socket.io-client'

export const checkUserRole = (role) => {
  switch (role) {
    case 'ROLE_LABEL':
      return 'Label'
    case 'ROLE_ARTIST':
      return 'Artist'
    case 'ROLE_ADMIN':
      return 'Admin'
  }
}

/**
 * @description To make connection with diffrent socket namespaces
 * @returns like socket object - comment socket object - chat socket object
 */
const socketConfig = {
  reconnectionDelayMax: 10000,
  autoConnect: true,
}

export const makeSocketConnection = () => {
  const chatSocketConnection = io(process.env.NEXT_PUBLIC_SOCKET_URL, {
    ...socketConfig,
  })

  return {
    chatSocketConnection,
  }
}

export const getSocialMediaUrl = (links: object[]) => {
  return links?.reduce((obj, item) => {
    return {
      ...obj,
      [item['type']]: item?.link,
    }
  }, {})
}

export const millisToMinutesAndSeconds = (millis) => {
  const minutes = Math.floor(millis / 60000)
  const seconds = ((millis % 60000) / 1000).toFixed(0)
  return seconds === '60'
    ? minutes + 1 + ':00'
    : minutes + ':' + (parseInt(seconds) < 10 ? '0' : '') + seconds
}
