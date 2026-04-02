import { classNames } from '../../utils/classNames'
import eugeniaAvatar from '../../../eugenia.jpg'

export function ChatMessage({ role, message, typing = false }) {
  if (role === 'user') {
    return <div className={classNames('chat-message', 'chat-user')}>{message}</div>
  }

  return (
    <div className="chat-assistant-row">
      <span className="chat-avatar" aria-hidden="true">
        <img src={eugeniaAvatar} alt="" />
      </span>
      <div className={classNames('chat-message', 'chat-assistant', typing && 'chat-typing-bubble')}>
        {typing ? (
          <span className="chat-typing-dots" aria-label="Eugênia está digitando">
            <span />
            <span />
            <span />
          </span>
        ) : (
          message
        )}
      </div>
    </div>
  )
}
