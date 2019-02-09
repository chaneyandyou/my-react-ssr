import axios from 'axios'
import { CHANGE_LIST } from './constant'

const changeList = (list) => ({
  type: CHANGE_LIST,
  list
})

export const getHomeList = () => {
  return (dispatch) => {
    return axios.get('https://cnodejs.org/api/v1/topics')
    .then(res => {
      const list = res.data.data
      dispatch(changeList(list))
    })
  }
}