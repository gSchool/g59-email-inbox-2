const React = require('react')
const ReactDOM = require('react-dom')
require('./index.css');
const App = require('./components/App')
const Popular = require('./components/Popular')

ReactDOM.render(
  <App />,
  document.getElementById('app')
)
