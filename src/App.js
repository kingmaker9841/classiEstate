import React from 'react';
//React_Router_DOM
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

//CSS import 
import './components/forall.css'

//Components Import 
import Register from './components/Register/Register';
import Home from './components/Home/Home';
import Login from './components/Login/Login';

// FontAwesome Imports
import {library} from '@fortawesome/fontawesome-svg-core';
import {faUnlockAlt} from '@fortawesome/free-solid-svg-icons'
import {faFacebookSquare, faGooglePlusSquare} from '@fortawesome/free-brands-svg-icons';
import {} from '@fortawesome/free-solid-svg-icons'

library.add(faUnlockAlt, faFacebookSquare, faGooglePlusSquare);

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/register" component={Register}/>
          <Route path="/login" component={Login} />
        </Switch> 
      </Router> 
    </div>
  );
}

export default App;
