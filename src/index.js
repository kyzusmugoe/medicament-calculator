import React ,{createContext}from 'react';
import ReactDOM from 'react-dom';

import {createStore} from 'redux'
import {Provider} from 'react-redux'
import rootReducer from './reducers/rootReducer'

import App from './App';
import * as serviceWorker from './serviceWorker';


import WebService from './webservice/WebService'
import WebServiceContext from './webservice/WebServiceContext'


const store = createStore(rootReducer)
const webservice = new WebService()

ReactDOM.render(
  
  <Provider store={store}>
      <WebServiceContext.Provider value={webservice}>
         <App/>
      </WebServiceContext.Provider>
  </Provider>
, document.getElementById('root'));

serviceWorker.unregister();