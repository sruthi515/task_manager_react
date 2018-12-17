import React from 'react';
import './App.css';
import {
  Switch,
  Route
} from 'react-router-dom'
import ListTasks from './components/ListTasks';
import AddTask from './components/AddTask';
import UpdateTask from './components/UpdateTask';

const App = (props) => {
    return ( 
      <Switch > 
        <Route exact path = '/'component = {ListTasks}/> 
        <Route path = '/add'component = {AddTask}/>
        <Route path = '/update/:taskId'component = {UpdateTask}/>
      </Switch>
    );
}

export default App;