import { useState, useEffect } from "react";
import { socket } from "./socket";
import ChatBox from "./ChatBox";

function App() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [socketId, setSocketId] = useState(0);
  const [username, setUsername] = useState("");
  const [allMsg, setAllMsg] = useState([])

  useEffect(() => {
    function onConnect() {
      console.log("Connected", socket.id);
      // socket.emit('enter', {name: username, id: socket.id})
      setSocketId(socket.id);
      setIsConnected(true);
    }
    function onDisconnect() {
      setIsConnected(false);
    }

    function onGetMessage(msg) {
      console.log("getMessage", msg)
      setAllMsg(msg)
    }
    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("getMessage", onGetMessage)

    return () => {
      socket.off("connect");
      socket.off("disconnect");
    };
  }, []);

  const hdlEnter = () => {
    if(username.trim())
      socket.connect().emit("enter", username);
  };

  const hdlLeave = () => {
    socket.disconnect()
    setAllMsg([])
  }
  return (
    <div className="max-w-6xl mx-auto grid grid-cols-1 gap-3 w-3/4">
      <div className="text-2xl text-purple-500">Socket Id : {socketId} </div>
      <div className="grid grid-cols-4 gap-2">
        <input
          type="text"
          className="input input-primary col-span-2"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          disabled={isConnected}
        />
        <button className="btn" onClick={hdlEnter} disabled={isConnected}>
          Enter
        </button>
        <button className="btn" onClick={hdlLeave}>
          Leave
        </button>
      </div>
      <ChatBox username={username} allMsg={allMsg} socketId={socketId} />
    </div>
  );
}

export default App;
