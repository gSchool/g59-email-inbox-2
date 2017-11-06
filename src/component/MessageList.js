import React from "react";

function getMessageType(message) {
  let classType = ["message", "row"];
  if (message.read) {
    classType.push("read");
  } else {
    classType.push("unread");
  }
  if (message.selected) {
    classType.push("selected");
  }

  return classType.join(" ");
}

function getMessageStar(message) {
  let classType = ["star", "fa"];
  if (message.starred) {
    classType.push("fa-star");
  } else {
    classType.push("fa-star-o");
  }
  return classType.join(" ");
}


function MessageList({ messages, onUpdate }) {
  return (
    <div>
      {messages.map(message => {
        return (
          <div key={message.id} className={getMessageType(message)}>
            <div className="col-xs-1">
              <div className="row">
                <div className="col-xs-2">
                  <input type="checkbox" defaultChecked = {message.selected}   onClick={() => {
                      message.selected = !message.selected;
                      onUpdate(messages)}} />
                </div>
                <div className="col-xs-2">
                  <i className={getMessageStar(message)}
                    onClick={() => {
                      message.starred = !message.starred;
                      onUpdate(messages)}} />
                </div>
              </div>
            </div>
            <div className="col-xs-11">
              {message.labels.map((label) => {
                return (<span key={label} className="label label-warning">{label}</span>)})}

              {/* <span className={getLabel(message)}
                onSelect={() => {
                  onUpdate(messages)}}>dev</span> */}
              <a href="">{message.subject}</a>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default MessageList;
