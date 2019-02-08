import React from 'react'
import Header from '../../components/Header/index'

const Login = () => {
  return (
    <div>
      Login component
      <Header />
      <button onClick={() => { alert('click') }}>click</button>
    </div>
  )
}

export default Login