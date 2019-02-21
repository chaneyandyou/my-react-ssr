import { CHANGE_LIST } from './constant'

const initState = {
  newsList: []
}

export default (state = initState, action) => {
  switch(action.type) {
    case CHANGE_LIST:
      return {
        ...state,
        newsList: action.list
      }
    default:
      return state
  }
}