import React from 'react';
import { render } from 'react-dom'

//functional stateless component
//when passing you don't need this.props.whatever
//improves performance 

const Contact = ({contact, item}) =>
    <li>
      {contact.name} {contact.phone} {item}
    </li>

// class Contact extends React.Component {
//   render() {
//     return (
//           <li>
//             {this.props.contact.name} {this.props.contact.phone}
//           </li>
//       )
//   }
// }

export default Contact;
