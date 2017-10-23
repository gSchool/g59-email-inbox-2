import React, { Component } from 'react'
import './App.css'
import Toolbar from './Toolbar'
import ComposeForm from './ComposeForm'
import MessageList from './MessageList'

class App extends Component {

  constructor () {
    super()
    this.toggleStarred = this.toggleStarred.bind(this)
    this.toggleSelected = this.toggleSelected.bind(this)
    this.selectAll = this.selectAll.bind(this)
    this.selectNone = this.selectNone.bind(this)
    this.markRead = this.markRead.bind(this)
    this.markUnread = this.markUnread.bind(this)
    this.remove = this.remove.bind(this)
    this.addLabel = this.addLabel.bind(this)
    this.removeLabel = this.removeLabel.bind(this)
    this.toggleForm = this.toggleForm.bind(this)
    this.addMessage = this.addMessage.bind(this)
    this.state = {
      messages: [],
      showForm: false
    }
  }

  componentDidMount () {
    fetch('http://localhost:8082/api/messages', {method: 'GET'})
      .then( (res) => res.json())
      .then( (res) => {
        let messageData = res['_embedded']['messages']
        let messages = messageData
        this.setState({messages: messages})
      })
  }

  addMessage (newMessage) {
    const messages = [...this.state.messages]
    fetch('http://localhost:8082/api/messages', {method: 'POST', body: JSON.stringify(newMessage), headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    }})
      .then( (res) => {
        if (res.ok) {
          messages.push(newMessage)
          this.setState({messages: messages, showForm: false})
        }
      })
  }

  toggleSelected (message) {
    const messages = [...this.state.messages]
    let messageID = message.props.content.id
    for (let i = 0; i < messages.length; i++) {
      if (messages[i]['id'] === messageID) {
        if (messages[i]['selected'] === false || messages[i]['selected'] === undefined) {
          messages[i]['selected'] = true
        }
        else {
          messages[i]['selected'] = false
        }
      }
    }
    this.setState({...this.state, messages: messages})
  }


  toggleStarred (message) {
      let messageID = message.props.content.id
      let messageIds = []
      messageIds.push(messageID)
      let bool;
      const messages = [...this.state.messages]
      for (let i = 0; i < messages.length; i++) {
        if (messages[i]['id'] === messageID) {
          if (messages[i]['starred'] === false || messages[i]['starred'] === undefined) {
            messages[i]['starred'] = true
            bool = true
          }
          else {
            messages[i]['starred'] = false
            bool = false
          }
        }
      }
      let payload = {messageIds: messageIds, command: "star", star: bool}
      fetch('http://localhost:8082/api/messages', {method: 'PATCH', body: JSON.stringify(payload), headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }})
      .then( (res) => {
        if (res.ok) {
          this.setState({messages: messages})
        }
      }).catch( (error) => {
        console.log(error)
      })
  }

  selectAll () {
    const messages = [...this.state.messages]
    for (let i = 0; i < messages.length; i++) {
      messages[i]['selected'] = true
    }
    this.setState({messages: messages})
  }

  selectNone () {
    const messages = [...this.state.messages]
    for (let i = 0; i < messages.length; i++) {
      messages[i]['selected'] = false
    }
    this.setState({messages: messages})
  }

  markRead () {
    const messages = [...this.state.messages]
    let messageIds = []
    for (let i = 0; i < messages.length; i++) {
      if (messages[i]['selected'] === true) {
        messages[i]['read'] = true
        messageIds.push(messages[i]['id'])
      }
    }
    let payload = {messageIds: messageIds, command: "read", read: true}
    fetch('http://localhost:8082/api/messages', {method: 'PATCH', body: JSON.stringify(payload), headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    }})
    .then( (res) => {
      if (res.ok) {
        this.setState({messages: messages})
      }
    }).catch( (error) => {
      console.log(error)
    })
    
  }

  markUnread () {
    const messages = [...this.state.messages]
    let messageIds = []
    for (let i = 0; i < messages.length; i++) {
      if (messages[i]['selected'] === true) {
        messages[i]['read'] = false
        messageIds.push(messages[i]['id'])
      }
    }
    let payload = {messageIds: messageIds, command: "read", read: false}
    fetch('http://localhost:8082/api/messages', {method: 'PATCH', body: JSON.stringify(payload), headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    }})
    .then( (res) => {
      if (res.ok) {
        this.setState({messages: messages})
      }
    }).catch( (error) => {
      console.log(error)
    })
  }

  remove () {
    const messages = [...this.state.messages]
    let messageIds = []
    messages.map( (message) => {
      if (message['selected'] === true) {
        messageIds.push(message['id'])
      }
    })
    const newMessages = messages.filter( (message) => message['selected'] !== true)
    let payload = {messageIds: messageIds, command: "delete"}
    fetch('http://localhost:8082/api/messages', {method: 'PATCH', body: JSON.stringify(payload), headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    }})
    .then( (res) => {
      if (res.ok) {
        this.setState({messages: newMessages})
      }
    }).catch( (error) => {
      console.log(error)
    })
  }

  addLabel (label) {
    let messageIds = []
    if (label !== 'Apply label') {
      const messages = [...this.state.messages]
      for (let i = 0; i < messages.length; i++) {
        if (messages[i]['selected'] === true) {
          if (messages[i]['labels'].includes(label) !== true) {
            messages[i]['labels'].push(label)
            messageIds.push(messages[i]['id'])
          }
        }
      }
      let payload = {messageIds: messageIds, command: "addLabel", label: label}
      fetch('http://localhost:8082/api/messages', {method: 'PATCH', body: JSON.stringify(payload), headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }})
      .then( (res) => {
        if (res.ok) {
          this.setState({messages: messages})
        }
      }).catch( (error) => {
        console.log(error)
      })
    }
  }

  removeLabel (label) {
    const messages = [...this.state.messages]
    let messageIds = []
    for (let i = 0; i < messages.length; i++) {
      if (messages[i]['selected'] === true) {
        messageIds.push(messages[i]['id'])
        const newLabels = messages[i]['labels'].filter( (i) => i !== label)
        messages[i]['labels'] = newLabels
      }
    }
    let payload = {messageIds: messageIds, command: "removeLabel", label: label}
    fetch('http://localhost:8082/api/messages', {method: 'PATCH', body: JSON.stringify(payload), headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    }})
    .then( (res) => {
      if (res.ok) {
        this.setState({messages: messages})
      }
    }).catch( (error) => {
      console.log(error)
    })
  }

  toggleForm () {
    let showForm = this.state.showForm
    showForm = !showForm
    this.setState({showForm: showForm})
  }

  render() {

    let compose = null
    if (this.state.showForm) {
      compose = <ComposeForm addMessage={this.addMessage}/>
    }

    return (
      <div className="main">
        <Toolbar data={this.state.messages} 
          selectAll={this.selectAll} 
          selectNone={this.selectNone} 
          markRead={this.markRead} 
          markUnread={this.markUnread} 
          remove={this.remove} 
          addLabel={this.addLabel} 
          removeLabel={this.removeLabel} 
          showForm={this.showForm} 
          toggleForm={this.toggleForm}/>
        {compose}
        <MessageList details={this.state.messages} toggleSelected={this.toggleSelected} toggleStarred={this.toggleStarred}/>
      </div>
    )
  }
}

export default App
