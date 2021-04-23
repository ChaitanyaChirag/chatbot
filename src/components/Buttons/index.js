import React, { useState } from "react"
import PropTypes from "prop-types"
import Button from "antd/lib/button"

import { chatbot_setting } from "../../data/config/brandSetup"

const Buttons = ({
  message,
  disabled,
  pagination,
  onClick
}) => {
  const [page, setPage] = useState({
    showAll: false,
    displayCount: message.payload && message.payload.btnDisplayCount ? message.payload.btnDisplayCount : chatbot_setting.default_btn_display_count
  })

  const showAllButtons = () => {
    setPage({
      showAll: true,
      displayCount: message.payload.buttons.length
    })
  }

  const showLessButtons = () => {
    setPage({
      showAll: false,
      displayCount: message.payload && message.payload.btnDisplayCount ? message.payload.btnDisplayCount : chatbot_setting.default_btn_display_count
    })
  }

  if (message && message.payload && message.payload.buttons)
    return (
      <div className="ori-flex-row ori-flex-wrap">
        {
          message.payload.buttons.map((button, index) => {
            if (index < page.displayCount || !pagination)
              return (
                <Button
                  key={index}
                  size="small"
                  className="ori-b-mrgn-5 ori-lr-mrgn-3 ori-btn-bubble-outer"
                  disabled={disabled}
                  onClick={() => onClick({ button, message })}
                >
                  {button.text}
                </Button>
              )
          })
        }
        {
          pagination && !page.showAll && message.payload.buttons.length > page.displayCount &&
          <Button
            size="small"
            className="ori-b-mrgn-5 ori-lr-mrgn-3 ori-btn-bubble-outer"
            onClick={showAllButtons}
          >
            Show more
          </Button>
        }
        {
          pagination && page.showAll &&
          <Button
            size="small"
            className="ori-b-mrgn-5 ori-lr-mrgn-3 ori-btn-bubble-outer"
            onClick={showLessButtons}
          >
            Show less
          </Button>
        }
      </div>
    )
  return null
}

Buttons.propTypes = {
  message: PropTypes.object.isRequired,
  pagination: PropTypes.bool,
  disabled: PropTypes.bool,
  onClick: PropTypes.func
}

Buttons.defaultProps = {
  message: null,
  pagination: true,
  disabled: false,
  onClick: () => { }
}

export default Buttons
