import React from 'react';
import {Router, Route} from "react-router-dom";
import TodosList from './todos/TodosList';
import TodoCreate from './todos/TodoCreate';
import history from '../history';


class App extends React.Component {
  render() {
    return (
        <div>
            <Router history={history}>
                <Route path="/" exact component={TodosList} />
                <Route path="/todos/add" component={TodoCreate} />
                <Route path="/todos/:id" component={TodoEdit} />
            </Router>
        </div>
    );
  }
}

export default App;
