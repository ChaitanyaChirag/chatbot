import React from "react"
import PropTypes from "prop-types"

const DelayComponent = Component => {
  return class extends React.Component {
    state = {
      shouldRender: this.props.isMounted
    }

    componentDidUpdate(prevProps) {
      const { isMounted, delayMountTime, delayUnmountTime } = this.props
      if (prevProps.isMounted && !isMounted) {
        setTimeout(() => this.setState({ shouldRender: false }), delayUnmountTime)
      } else if (!prevProps.isMounted && isMounted) {
        setTimeout(() => this.setState({ shouldRender: true }), delayMountTime)
      }
    }

    render() {
      return this.state.shouldRender ? <Component {...this.props} /> : null
    }
  }
}

DelayComponent.propTypes = {
  delayMountTime: PropTypes.number,
  delayUnmountTime: PropTypes.number,
  isMounted: PropTypes.bool
}

DelayComponent.defaultProps = {
  delayMountTime: 0,
  delayUnmountTime: 0,
}

export default DelayComponent
