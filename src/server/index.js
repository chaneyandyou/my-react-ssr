import express from 'express'
import { render } from './utils'
import { getStore } from '../store/index'
import { matchRoutes } from "react-router-config"
import routes from '../Routes'

const app = express()

app.use(express.static('public'))

app.get('*', (req, res) => {
  const store = getStore()

  // 根据match的路由组件，请求数据添加到store
  const matchedRoutes = matchRoutes(routes, req.path)

  let promises = []
  matchedRoutes.forEach(item => {
    if (item.route.loadData) {
      promises.push(item.route.loadData(store))
    }
  })

  Promise.all(promises).then(() => {
    res.send(render(store, routes, req))
  })

})

const server = app.listen(3000)