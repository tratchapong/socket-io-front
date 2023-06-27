/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

export default function MsgTurn(props) {
  const {msg, chatuser , isMe} = props
  return (
    <li className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
      { !isMe && <p className="text-xs me-2">{chatuser} : </p> }
      <div className={`relative max-w-fit w-2/3 px-4 py-2 my-2 text-gray-700 ${isMe ? 'bg-gray-100 text-violet-500 ': ''} rounded shadow`}>
        <span className="block">{msg}</span>
      </div>
    </li>
  );
}
