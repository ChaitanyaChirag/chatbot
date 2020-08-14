import React from 'react';
import PropTypes from 'prop-types';

import { poweredby } from '../../data/assets'
import { chatbot_setting, translator } from '../../data/config/urls'

import { LangContext } from '../../modules/context'

const PoweredBy = React.memo(({ container_class }) => {
  return (
    <LangContext.Consumer>
      {
        lang => (
          <a
            href={chatbot_setting.powered_by.target_url}
            target="blank"
            className={`ori-animated ori-fade-in-up ${container_class}`}
          >
            <span className="ori-font-xxs ori-font-light">{translator.text[lang].poweredBy}</span>
            <img src={poweredby} className="ori-l-mrgn-5 ori-height-10 ori-cursor-ptr" alt="" />
          </a>
        )
      }
    </LangContext.Consumer>
  )
})

PoweredBy.propTypes = {
  container_class: PropTypes.string
}

PoweredBy.defaultProps = {
  container_class: "ori-text-center"
}

export default PoweredBy
