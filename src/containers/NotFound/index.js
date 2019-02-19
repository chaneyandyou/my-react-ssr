import React from 'react'

export default class NotFound extends React.Component {
  componentWillMount() {
    const { staticContext } = this.props
    staticContext && (staticContext.NotFound = true)
  }
  render() {
    return (
      <div>
        <h2>404</h2>
        <p>sorry, page not found</p>
      </div>
    )
  }
}