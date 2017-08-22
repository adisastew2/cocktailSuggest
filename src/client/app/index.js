import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './components/app.jsx';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import RecipePage from './components/RecipePage.jsx';


ReactDOM.render(
  <BrowserRouter >
    <Switch>
      <Route exact path="/" component={App} />
      <Route exact path="/recipes/:id" render={ (props) => 
        <RecipePage {...props} /> 
      }/>
    </Switch>
  </BrowserRouter>
, document.getElementById('app'));