import {useState, useEffect} from 'react'
import {socket} from './socket'
import ChatBox from './ChatBox'

function App() {
  const [isConnected, setIsConnected] = useState(socket.connected)

  useEffect( ()=> {
    socket.on('connect', ()=> {
      setIsConnected(true)
    })
    socket.on('disconnect', ()=> {
      setIsConnected(false)
    })
    console.log(socket.connected)

    return ()=> {
      // socket.off('connect', ()=> {
      //   setIsConnected(true)
      // })
      // socket.off('disconnect', ()=> {
      //   setIsConnected(false)
      // })
    }
  },[])

  // const hdlClick = () => {
  //   socket.connect()
  // }
  return (
    <div className='max-w-6xl mx-auto grid grid-cols-1 gap-3 w-3/4'>
      <div className="text-2xl">App</div>
      <div className="text-2xl">Connected : {`${isConnected}`}</div>
      <button className="btn btn-primary" onClick={()=>socket.connect()}>Connect</button>
      <button className="btn btn-primary" onClick={()=>socket.disconnect()}>Disconnect</button>
      <div className="divider"></div>
      <ChatBox />
    </div>
  )
}

export default App
