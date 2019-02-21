import React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import { renderRoutes } from 'react-router-config'


export const render = (store, routes, req, context) => {
  const content = renderToString((
    <Provider store={store}>
      <StaticRouter location={req.path} context={context}>
        <Switch>
          { renderRoutes(routes) }
        </Switch>
      </StaticRouter>
    </Provider>
  ))

  const css = context.css.length ? context.css.join('\n') : ''

  return (
    `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>react ssr</title>
        <style>${css}</style>
      </head>
      <body>
          <div id="root">${content}</div>
          <script>
            window.context={
              state: ${JSON.stringify(store.getState())}
            }
          </script>
          <script src='/index.js'></script>
      </body>
      </html>
    `
  )
}