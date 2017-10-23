import React from 'react';
import Message from './Message';

const MessageList = ({ messages, setMessageClass, markRead, markStar , markSelect}) => (
  <div className="row">
    <div className="container">
      { messages.map((message, i) =>
        <Message
          key={ i }
          setMessageClass={ setMessageClass }
          markRead={ markRead }
          markStar={ markStar }
          markSelect={ markSelect }
          message={ message } />
      ) }
    </div>
  </div>
)

export default MessageList;
