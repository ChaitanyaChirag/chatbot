import React from "react"
import PropTypes from "prop-types"

import { chatbot_setting, translator } from "../../data/config/brandSetup"

import { LangContext } from "../../modules/context"

const PoweredBy = ({ container_class }) => {
  const goToUrl = () => {
    if (chatbot_setting.powered_by.target_url) {
      let win = window.open(chatbot_setting.powered_by.target_url, "_blank")
      win.focus()
    }
  }

  return (
    <LangContext.Consumer>
      {
        lang => (
          <p className={`ori-animated ori-fade-in-up ${container_class}`} style={{ lineHeight: "1.2" }}>
            <span className="ori-font-xxs ori-font-light">{translator.text[lang].poweredBy}</span>
            <img
              src={translator.assets[lang].poweredby}
              className="ori-l-mrgn-5 ori-height-10 ori-cursor-ptr"
              alt=""
              onClick={goToUrl}
            />
          </p>
        )
      }
    </LangContext.Consumer>
  )
}

PoweredBy.propTypes = {
  container_class: PropTypes.string
}

PoweredBy.defaultProps = {
  container_class: "ori-text-center"
}

export default PoweredBy
