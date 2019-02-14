import axios from 'axios'
import { CHANGE_LIST } from './constant'
import clientRequest from '../../../client/request'
import serverRequest from '../../../server/request'

const changeList = (list) => ({
  type: CHANGE_LIST,
  list
})

export const getHomeList = (server) => {

  const request = server ? serverRequest : clientRequest

  return (dispatch) => {
    return request.get('/api/v1/topics')
    .then(res => {
      const list = res.data.data
      dispatch(changeList(list))
    })
  }
}