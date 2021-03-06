import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, compose, applyMiddleware } from 'redux';
import rootReducer from './redux/reducers';
import thunk from 'redux-thunk'
import App from './App';
import * as serviceWorker from './serviceWorker';

const store = createStore(rootReducer, compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
))
ReactDOM.render(
    <Provider store= {store}>
        <BrowserRouter>
            <App />   
        </BrowserRouter>
    </Provider>, 
    document.getElementById('root')
)

serviceWorker.unregister();
