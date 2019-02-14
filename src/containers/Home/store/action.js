import axios from 'axios'
import { CHANGE_LIST } from './constant'

const changeList = (list) => ({
  type: CHANGE_LIST,
  list
})

export const getHomeList = () => {
  return (dispatch, getState, axiosInstance) => {
    return axiosInstance.get('/api/v1/topics')
    .then(res => {
      const list = res.data.data
      dispatch(changeList(list))
    })
  }
}