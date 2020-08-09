import React from 'react';
import PropTypes from 'prop-types';
import CloseIcon from 'react-icons/lib/md/close';
import Button from 'antd/lib/button';

import { chatbot_status } from '../../../../data/config/urls'

const InfoContent = ({ type, onClose }) => {
  if (chatbot_status.info_content[type])
    return (
      <div className="ori-relative ori-bg-white ori-pad-15 ori-border-radius-3 ori-full-width ori-max-width-350 ori-mrgn-auto">
        <CloseIcon
          size={20}
          className="ori-absolute ori-font-light-hover-default"
          style={{ top: "7px", right: "7px" }}
          onClick={onClose}
        />
        <p className="ori-text-center ori-font-md ori-b-mrgn-10">{chatbot_status.info_content[type].header}</p>
        {
          chatbot_status.info_content[type].data && chatbot_status.info_content[type].data.map((info, index) => {
            return (
              <React.Fragment key={index}>
                {
                  info.title &&
                  <p className="ori-font-bold">{info.title}</p>
                }
                {
                  info.subtitle &&
                  <p className="ori-font-xs">{info.subtitle}</p>
                }
                <p className="ori-font-xs ori-font-light ori-b-mrgn-10">{info.content} </p>
              </React.Fragment>
            )
          })
        }
        <div className="ori-flex ori-flex-jc">
          <Button size="small" className="ori-btn-fill-primary" onClick={onClose}>Close</Button>
        </div>
      </div>
    )
  return (
    <div className="ori-bg-white ori-pad-15 ori-max-width-350 ori-mrgn-auto">
      {`${type} is not define in info content. please check it.`}
    </div>
  )
}

InfoContent.protoTypes = {
  type: PropTypes.string,
  onClose: PropTypes.func
}

export default InfoContent;
