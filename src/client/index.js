import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import routes from '../Routes'
import { Provider } from 'react-redux'
import { getClientStore } from '../store/index'

const store = getClientStore()

const App = () => (
  <Provider store={store}>
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