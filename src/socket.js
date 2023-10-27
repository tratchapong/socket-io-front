import {io} from 'socket.io-client'

// const URL = 'http://localhost:8080'
const URL = 'https://socket-io-back-pteh.onrender.com'

export const socket = io(URL, {
  autoConnect : false,
  reconnection : false
})
