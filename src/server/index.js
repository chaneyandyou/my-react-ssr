import express from 'express'
import { render } from './utils'
import { getStore } from '../store/index'
import { matchRoutes } from "react-router-config"
import routes from '../Routes'
import proxy from 'express-http-proxy'

const app = express()

app.use(express.static('public'))

app.use('/api/cnode', proxy('https://cnodejs.org', {
  proxyReqPathResolver: function(req) {
    return `/api${req.url}`
  }
}));

app.get('*', (req, res) => {
  const store = getStore(req)

  // 根据match的路由组件，请求数据添加到store
  const matchedRoutes = matchRoutes(routes, req.path)

  let promises = []
  matchedRoutes.forEach(item => {
    if (item.route.loadData) {
      const newPromise =  new Promise((resolve, reject) => {
        item.route.loadData(store).then(resolve).catch(resolve)
      })
      promises.push(newPromise)
    }
  })

  Promise.all(promises).then(() => {
    const context = { css: [] }
    const html = render(store, routes, req, context)
    if (context.action === 'REPLACE') { // 服务端渲染路由staticRouter组件会在存在Redirect时，会注入相关信息
      res.redirect(301, context.url)
    } else if (context.NotFound) {
      res.status(404)
      res.send(html)
    } else {
      res.send(html)
    }
  })

})

const server = app.listen(3000)