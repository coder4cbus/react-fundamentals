import React from 'react';
import Popular from './Popular';
import Nav from './Nav';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import NavLink from 'react-router-dom';

class App extends React.Component {
  render() {
    return (
      <Router>
        <div className='container'>
          <Nav/>
          <Route exact path="/popular" component={Popular}/>
        </div>
      </Router>
    )
  }
}

module.exports = App;