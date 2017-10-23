import React from 'react';

const Toolbar = ({ showComposeForm, selectBoxChange, selectBoxClick, markAsRead, markAsUnread, addLabel, removeLabel, deleteMessage, unreadCount }) => (
  <div className="row toolbar">
    <div className="container">
      <div className="col-md-12">
        <p className="pull-right">
          <span className="badge badge">{ unreadCount() }</span>
          Unread Messages
        </p>

        <a className="btn btn-danger" onClick={ e => showComposeForm() }>
          <i className="fa fa-plus"></i>
        </a>

        <button className="btn btn-default" onClick={ e => selectBoxClick() }>
          <i className={ selectBoxChange() }></i>
        </button>

        <button className="btn btn-default" onClick={ e => markAsRead() }>
          Mark As Read
        </button>

        <button className="btn btn-default" onClick={ e => markAsUnread() }>
          Mark As Unread
        </button>

        <select className="form-control label-select" onChange={ e => addLabel(e.target.value) }>
          <option>Apply Label</option>
          <option value="dev">Dev</option>
          <option value="personal">Personal</option>
          <option value="gschool">gSchool</option>
        </select>

        <select className="form-control label-select" onChange={ e => removeLabel(e.target.value) }>
          <option>Remove Label</option>
          <option value="dev">Dev</option>
          <option value="personal">Personal</option>
          <option value="gschool">gSchool</option>
        </select>

        <button className="btn btn-default" onClick={ e => deleteMessage() }>
          <i className="fa fa-trash-o"></i>
        </button>
      </div>
    </div>
  </div>
)

export default Toolbar;
