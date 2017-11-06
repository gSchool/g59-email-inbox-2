import React from 'react';


function Toolbar({messages, onUpdate, changePanel}) {

  function MarkRead(messages){
    messages.forEach((message) => {
      if(message.selected){
        message.read = true;
      }
    })
    onUpdate(messages)
  }

  function UnMarkRead(messages){
    messages.forEach((message) => {
      if(message.selected){
        message.read = false;
      }
    })
    onUpdate(messages)
  }
  function addLabel(label){
    messages.forEach((message) => {
      if(message.selected){
        if (message.labels) {
          if(message.labels.indexOf(label) === -1 && label !== ""){
            message.labels.push(label);
          }
        }
      }
    })
    onUpdate(messages)
  }
  function removeLabel(label){
    messages.forEach((message) => {
      if(message.selected){
        if (message.labels) {
          let labelIndex = message.labels.indexOf(label)
          if(labelIndex !== -1 ){
            message.labels.splice(labelIndex, 1);
            // console.log('label', message.labels.pop(label));
          }
        }
      }
    })
    onUpdate(messages)
  }

  function DeleteMsg(messages){
    messages = messages.filter (function(message){
      return !message.selected;
    })
    onUpdate(messages)
  }

    return ( <div>
      <div className="row toolbar">
      <div className="col-md-12">
        <p className="pull-right">
          <span className="badge badge">{messages.filter(m => !m.read).length}</span>
          <span>unread messages</span>
        </p>

        <a onClick= {() => {
           changePanel();
          //  console.log(changePanel(event.target.value));
         }} className="btn btn-danger">
          <i className="fa fa-plus"></i>
        </a>

        <button className="btn btn-default">
          <i className="fa fa-minus-square-o"></i>
        </button>

        <button className="btn btn-default" onClick={() => {
          MarkRead(messages)
        }}>Mark as Read</button>
        <button className="btn btn-default" onClick={() => {
          UnMarkRead(messages)
        }}>Mark as Unread</button>

        <select onChange= {(event) => {
           addLabel(event.target.value);
        }} className="form-control label-select">
          <option value="">Apply Label</option>
          <option value="dev">dev</option>
          <option value="personal">personal</option>
        </select>

        <select onChange= {(event) => {
          console.log('onChnage', event.target.value);
           removeLabel(event.target.value);
        }} className="form-control label-select">
          <option value="">Remove Label</option>
          <option value="dev">dev</option>
          <option value="personal">personal</option>
        </select>

        <button className="btn btn-default">
          <i className="fa fa-trash-o" onClick={() => {
            DeleteMsg(messages)
          }}></i>
        </button>
      </div>
    </div>

    </div>);
  }

export default Toolbar;
