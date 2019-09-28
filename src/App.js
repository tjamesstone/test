import React from 'react';
import './App.css';
import routes from './routes'
import Nav from './Components/Nav/Nav'
import {withRouter} from 'react-router-dom'


function App (props){
  
  return (
    <div className="App">
      {props.location.pathname !== '/' ? <Nav /> : <></>}
      {routes}
    </div>
  )
  
}

export default withRouter(App)
