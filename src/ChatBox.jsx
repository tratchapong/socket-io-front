/* eslint-disable react/prop-types */
import MsgSendBox from './components/MsgSendBox'
import MsgTurn from './components/MsgTurn'

export default function ChatBox(props) {
  const {username} = props
  return (
    <div className="container mx-auto">
  <div className="max-w-2xl border rounded">
    <div>
      <div className="w-full">
        <div className="relative flex items-center p-3 border-b border-gray-300">
          <img
            className="object-cover w-10 h-10 rounded-full"
            src="https://www.svgrepo.com/show/508199/user-square.svg"
            alt="username"
          />
          <span className="block ml-2 font-bold text-gray-600">{username}</span>
          <span className="absolute w-3 h-3 bg-green-600 rounded-full left-10 top-3"></span>
        </div>
        <div className="relative w-full p-6 overflow-y-auto h-[40rem]">
          <ul className="space-y-2">
            <MsgTurn msg="Hello" isMe/>
            <MsgTurn msg="Hi" />
            <MsgTurn msg="How are you?" isMe/>
            <MsgTurn msg="I am fine, thank you, and you?" />
            <MsgTurn msg="So so, thank you" isMe />
          </ul>
        </div>
        <MsgSendBox />
      </div>
    </div>
  </div>
</div>

  )
}
