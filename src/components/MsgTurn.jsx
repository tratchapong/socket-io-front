/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

export default function MsgTurn(props) {
  const {msg, isMe} = props
  return (
    <li className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
      <div className={`relative max-w-xl px-4 py-2 text-gray-700 ${isMe ? 'bg-gray-100': ''} rounded shadow`}>
        <span className="block">{msg}</span>
      </div>
    </li>
  );
}
