import React, { Component } from 'react'
import Header from '../../components/Header/index'
import { connect } from 'react-redux'
import { getHomeList } from './store/action'

class Home extends Component {
  componentDidMount() {
    if (!this.props.list.length) {
      this.props.getHomeList()
    }
  }

  getListElement() {
    const { list } = this.props
    return list && list.map(item => (
      <div key={item.id}>
        { item.title }
      </div>
    ))
  }

  render() {
    const { name } = this.props
    return (
      <div>
        Home component, this is { name }
        { this.getListElement() }
      </div>
    )
  }
}

// 在服务器渲染之前，把这个路由需要的数据提前加载好
Home.loadData = (store) => {
  return store.dispatch(getHomeList())
}

const mapStateToProps = state => ({
  list: state.home.newsList,
  name: state.home.name
})

const mapDispatchToProps = dispatch => ({
  getHomeList() {
    dispatch(getHomeList())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)
