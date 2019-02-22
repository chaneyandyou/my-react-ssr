import React, { Fragment } from 'react'
import Helmet from 'react-helmet'

const Login = () => {
  return (
    <div>
      <Helmet>
          <title>chaney chan的个人网站登录页面</title>
          <meta name="description" content="chaney chan的个人网站登录页面, 陈其林" />
      </Helmet>
      Login component
      <button onClick={() => { alert('click') }}>click</button>
    </div>
  )
}

export default Login