import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import routes from '../Routes'
import { Provider } from 'react-redux'
import getStore from '../store/index'

const App = () => (
  <Provider store={getStore()}>
    <BrowserRouter>
      <Switch>
        {
          routes.map(route => (
            <Route {...route} />
          )) 
        }
      </Switch>
    </BrowserRouter>
  </Provider>
)

ReactDOM.hydrate(<App />, document.getElementById('root'))