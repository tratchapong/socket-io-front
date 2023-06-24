import { useState, useEffect } from "react";
import { socket } from "./socket";
import ChatBox from "./ChatBox";

function App() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [socketId, setSocketId] = useState(0);
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [allMsg, setAllMsg] = useState([]);

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

    function onGetMessage(roomMsg) {
      console.log("getMessage", roomMsg);
      setAllMsg(roomMsg);
    }
    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("getMessage", onGetMessage);

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("getMessage")
    };
  }, []);

  const hdlEnter = () => {
    if (username.trim() && room.trim()) {
      socket.connect().emit("enter", { username, room });
    } else {
      alert("incomplete input");
    }
  };

  const hdlLeave = () => {
    socket.disconnect();
    setAllMsg([]);
  };
  return (
    <div className="max-w-2xl mx-auto grid grid-cols-1 gap-3 w-3/4">
      <div className="grid grid-cols-2 ">
        {/* <input
          type="text"
          className="input input-primary"
          placeholder="Room"
          value={room}
          onChange={(e) => {
            setRoom(e.target.value);
          }}
          disabled={isConnected}
        /> */}
        <select
          className="select select-info w-full max-w-xs"
          onChange={(e) => {
            setRoom(e.target.value);
          }}
          disabled={isConnected}
        >
          <option disabled selected>
            Select Room
          </option>
          <option value='room01'>Room 01</option>
          <option value='room02'>Room 02</option>
          <option value='room03'>Room 03</option>
        </select>
        <div className="text-sm text-purple-500 text-right">Socket Id : {socketId} </div>
      </div>
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
      <ChatBox username={username} allMsg={allMsg} socketId={socketId} room={room} />
    </div>
  );
}

export default App;
