import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './components/Home';
import Form from './components/Form';
import './App.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Switch>
            <Route exact path='/' component={Home}/>
            <Route exact path='/Form' render={(history) =>(
              <Form onHistory={history}/>
            )}/>
          </Switch>
        </div>
      </BrowserRouter>
      
    );
  }
}

export default App;
