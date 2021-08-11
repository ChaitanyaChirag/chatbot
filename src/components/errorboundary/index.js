import React from "react"
import PropTypes from "prop-types"

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ hasError: true }, () => {
      if (this.props.onErrorCallback) {
        this.props.onErrorCallback()
      }
    })
  }

  render() {
    const { children } = this.props
    const { hasError } = this.state
    if (hasError)
      return null
    return children
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
  onErrorCallback: PropTypes.func,
}
