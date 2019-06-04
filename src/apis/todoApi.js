import axios from 'axios';

export default axios.create({
    baseURL: (window.location.href.search(/localhost/) > -1) ? 'http://localhost:3000' : 'https://rj-todo-app.herokuapp.com'
});