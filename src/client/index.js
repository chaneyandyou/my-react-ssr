import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import routes from '../Routes'
import { Provider } from 'react-redux'
import { getClientStore } from '../store/index'
import { renderRoutes } from 'react-router-config'

const store = getClientStore()

const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        { renderRoutes(routes) }
      </Switch>
    </BrowserRouter>
  </Provider>
)

ReactDOM.hydrate(<App />, document.getElementById('root'))