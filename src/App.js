import React, {Component} from 'react';
import './App.css';
import routes from './routes'
import Nav from './Components/Nav/Nav'

class App extends Component {
  constructor(props){
    super(props)
    this.state={}
  }
  render(){
  return (
    <div className="App">
      <Nav />
      {routes}
    </div>
  )
  }
}

export default App;
