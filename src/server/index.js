import express from 'express'
import React from 'react'
import { renderToString } from 'react-dom/server'
import Home from '../containers/Home/index'
const app = express()
const content = renderToString(<Home />)

app.use(express.static('public'))

app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <title>react ssr</title>
    </head>
    <body>
        <div id="root">${content}</div>
        <script src='/index.js'></script
    </body>
    </html>
  `)
})

const server = app.listen(3000);