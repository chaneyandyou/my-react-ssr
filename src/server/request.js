import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://cnodejs.org'
})

export default instance