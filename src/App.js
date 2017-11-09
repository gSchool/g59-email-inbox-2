import React from 'react';
import {render} from 'react-dom';
import ContactsList from './ContactsList';

let contacts = [
  { id: 1,
    name: 'Maire',
    phone: '505 801 6291'
  }, {
    id: 2,
    name: 'Bobby',
    phone: '702 449 7587'
  }, {
    id: 3,
    name: 'Maria',
    phone: '505 801 6292'
  }
]

class App extends React.Component {
  render() {
    return (
      <div>
        <h1>Contacts List</h1>
        <ContactsList contacts={this.props.contacts}/>
      </div>
    )
  }
}

render(
  <App contacts={contacts}/>, document.getElementById('app'));
