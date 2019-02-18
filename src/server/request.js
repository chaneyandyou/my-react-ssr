import axios from 'axios'

const createInstance = (req) =>  axios.create({
  baseURL: 'https://cnodejs.org',
  headers: {
    cookie: req.get('cookie') || ''
  }
})

export default createInstance