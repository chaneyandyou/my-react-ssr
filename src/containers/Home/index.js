import React from 'react'
import Header from '../../components/Header/index'

const Home = () => {
  return (
    <div>
      Home component, this is chaney
      <Header />
      <button onClick={() => { alert('click') }}>click</button>
    </div>
  )
}

export default Home