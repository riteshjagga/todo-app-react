import React from 'react';
import {Router, Route} from 'react-router-dom';
import TodosList from './todos/TodosList';
import TodoCreate from './todos/TodoCreate';
import TodoEdit from './todos/TodoEdit';
import TagsList from './tags/TagsList';
import TagCreate from './tags/TagCreate';
import TagEdit from './tags/TagEdit';
import history from '../history';
import AppHeader from "./common/AppHeader";

class App extends React.Component {
  render() {
    return (
        <div>
            <Router history={history}>
                <AppHeader/>
                <Route path="/todos" exact component={TodosList} />
                <Route path="/todos/new" component={TodoCreate} />
                <Route path="/todos/edit/:id" component={TodoEdit} />
                <Route path="/tags" exact component={TagsList} />
                <Route path="/tags/new" component={TagCreate} />
                <Route path="/tags/edit/:id" component={TagEdit} />
            </Router>
        </div>
    );
  }
}

export default App;
