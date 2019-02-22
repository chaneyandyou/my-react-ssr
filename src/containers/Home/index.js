import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import Helmet from 'react-helmet'
import Header from '../../components/Header/index'
import { getHomeList } from './store/action'
import styles from './index.css'
import withStyle from '../../withStyle'

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
    return (
      <Fragment>
        <Helmet>
            <title>chaney chan的个人网站</title>
            <meta name="description" content="chaney chan的个人网站, 陈其林" />
        </Helmet>
        <div className={styles.test}>
          { this.getListElement() }
        </div>
      </Fragment>
    )
  }
}

const mapStateToProps = state => ({
  list: state.home.newsList
})

const mapDispatchToProps = dispatch => ({
  getHomeList() {
    dispatch(getHomeList())
  }
})

const exportHome = connect(mapStateToProps, mapDispatchToProps)(withStyle(Home, styles))

// 在服务器渲染之前，把这个路由需要的数据提前加载好
exportHome.loadData = (store) => {
  return store.dispatch(getHomeList())
}

export default exportHome
