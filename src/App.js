import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import 'font-awesome/css/font-awesome.css';
import './App.css';

import Compose from './components/Compose';
import Navbar from './components/Navbar';
import Toolbar from './components/Toolbar';
import MessageList from './components/MessageList';

class App extends Component {

  constructor(){
    super()
    this.newMess = this.newMess.bind(this)
    this.deleteMessage = this.deleteMessage.bind(this)
    this.markAsRead = this.markAsRead.bind(this)
    this.markAsUnread = this.markAsUnread.bind(this)
  }

  state = {
    messages : [],
    showForm : false
  }

  componentDidMount() {
    fetch(`http://localhost:8082/api/messages`)
      .then(res => res.json())
      .then(data => {
        this.setState({
          messages: data['_embedded']['messages']
        })
      })
  }

  newMess = (message) => {
      const body = {
        "subject": message.subject,
        "body": message.body
      }
      const settings = {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      }
      fetch(`http://localhost:8082/api/messages`, settings)
      .then(res => {
        if(res.ok) {
          this.setState({messages: this.state.messages})
          window.location.reload()
        }
      })
    }


  getMessageById = (id) => {
    return this.state.messages.find(message => message.id === id);
  }

  setMessageClass = (id) => {
    const message = this.getMessageById(id)
    if (message.read && message.selected) {
      return "row message read selected";
    } else if (!message.read && message.selected) {
      return "row message unread selected";
    } else if (message.read) {
      return "row message read";
    } else if (!message.read) {
      return "row message unread";
    }
  }

  markRead = (id, e) => {
    if (e.target.type !== 'checkbox') {
      this.getMessageById(id).read = true;
      this.setState({
        messages: this.state.messages
      })
    }
  }

  markStar = (id) => {
    let starred;
    this.state.messages.forEach(message => {
      if(message.id === id) {
        starred = !message.starred
      }
    })
    let body = {
      "messageIds": [ id ],
      "command": "star",
      "star": starred
    }
    const settings = {
      method: 'PATCH',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    }
    fetch(`http://localhost:8082/api/messages`, settings)
      .then(res => {
        if(res.ok) {
          const newMessages = this.state.messages.map(message => {
            if(message.id === id) {
              message.starred = !message.starred
            }
            return message;
          })
          this.setState(newMessages)
        }
      })
  }

  markSelect = (id) => {
    this.getMessageById(id).selected = !this.getMessageById(id).selected;
    this.setState({
      messages: this.state.messages
    })
  }


  selectBoxChange = () => {
    let all = this.state.messages.every(message => message.selected);
    let some = this.state.messages.some(message => message.selected);
    if (all) {
      return "fa fa-check-square-o";
    } else if (some) {
      return "fa fa-minus-square-o";
    } else {
      return "fa fa-square-o";
    }
  }

  selectBoxClick = () => {
    let all = this.state.messages.every(message => message.selected);
    let some = this.state.messages.some(message => message.selected);
    for (let message of this.state.messages) {
      if (some || !all) message.selected = true;
      if (all) message.selected = false;
      this.setState({
        messages: this.state.messages
      })
    }
  }

  markAsRead() {
      const messageIds = []
      const newMessages = this.state.messages.map((message) => {
        if(message.selected) {
          message.read = true
          messageIds.push(message.id)
        }
        return message;
      })
      const body = {
        "messageIds": messageIds,
        "command": "read",
        "read": true
      }
      const settings = {
        method: 'PATCH',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      }
      fetch(`http://localhost:8082/api/messages`, settings)
        .then(res => {
          if(res.ok) {
            this.setState({messages: newMessages})
          }
      })
    }
  // markAsRead = () => {
  //   let selected = this.state.messages.filter(message => message.selected);
  //   for (let message of selected) {
  //     message.read = true;
  //   }
  //   this.setState({
  //     messages: this.state.messages
  //   })
  // }

  markAsUnread() {
      const messageIds = []
      const newMessages = this.state.messages.map((message) => {
        if(message.selected) {
          message.read = false
          messageIds.push(message.id)
        }
        return message;
      })
      const body = {
        "messageIds": messageIds,
        "command": "read",
        "read": false
      }
      const settings = {
        method: 'PATCH',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      }
      fetch(`http://localhost:8082/api/messages`, settings)
        .then(res => {
          if(res.ok) {
            this.setState({messages: newMessages})
          }
      })
    }
  // markAsUnread = () => {
  //   let selected = this.state.messages.filter(message => message.selected);
  //   for (let message of selected) {
  //     message.read = false;
  //   }
  //   this.setState({
  //     messages: this.state.messages
  //   })
  // }

  addLabel = (val) => {
    let selected = this.state.messages.filter(message => message.selected);
    for (let message of selected) {
      if (!message.labels.includes(val))
      message.labels = message.labels.concat(val);
      this.setState({
        messages: this.state.messages
      })
    }
  }

  removeLabel = (val) => {
    let selected = this.state.messages.filter(message => message.selected);
    for (let message of selected) {
      message.labels.splice(message.labels.indexOf(val), 1);
      message.labels = message.labels;
      this.setState({
        messages: this.state.messages
      })
    }
  }

  deleteMessage() {
     const messageIds = []
     this.state.messages.map((message) => {
       if(message.selected) {
         messageIds.push(message.id)
       }
       return message;
     })
     const body = {
       "messageIds": messageIds,
       "command": "delete"
     }
     const settings = {
       method: 'PATCH',
       body: JSON.stringify(body),
       headers: {
         'Content-Type': 'application/json',
         'Accept': 'application/json'
       }
     }
     fetch(`http://localhost:8082/api/messages`, settings)
     .then(res => {
       if(res.ok) {
         this.setState((prevState) => {
           const messages = prevState.messages.filter(message => !message.selected)
           return {messages};
         })
       }
     })
   }

  unreadCount = () => {
    return this.state.messages.filter(message => message.read === false).length
  }

  showComposeForm = () => {
    this.setState({
      showForm : !this.state.showForm
    })
    console.log("yo");
  }

  render() {
    let compose = null;
    if (this.state.showForm) {
      compose = <Compose newMess = {this.newMess} />
    }

    return (
      <div>
        <Navbar />
        {compose}
        <Toolbar
          showComposeForm={ this.showComposeForm }
          selectBoxChange={ this.selectBoxChange }
          selectBoxClick={ this.selectBoxClick }
          markAsRead={ this.markAsRead }
          markAsUnread={ this.markAsUnread }
          addLabel={ this.addLabel }
          removeLabel={ this.removeLabel }
          deleteMessage={ this.deleteMessage }
          unreadCount={ this.unreadCount } />
        <MessageList
          messages={ this.state.messages }
          setMessageClass={ this.setMessageClass }
          markRead={ this.markRead }
          markStar={ this.markStar }
          markSelect={ this.markSelect }  />
      </div>
    );
  }
}

export default App;
