import React from 'react'
import { Route } from 'react-router-dom'
import Home from './containers/Home/index'
import Login from './containers/Login/index'

export default (
  <div>
    <Route exact path="/" component={Home} />
    <Route exact path="/login" component={Login} />
  </div>
)
