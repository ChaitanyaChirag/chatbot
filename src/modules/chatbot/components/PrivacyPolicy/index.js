import React from 'react';
import PropTypes from 'prop-types';
import CloseIcon from 'react-icons/lib/md/close';
import Button from 'antd/lib/button';

import { chatbot_status } from '../../../../data/config/urls'

const PrivacyPolicy = ({ onClose }) => {
  return (
    <div className="ori-relative ori-bg-white ori-pad-15 ori-border-radius-3 ori-full-width ori-max-width-350 ori-mrgn-auto">
      <CloseIcon
        size={20}
        className="ori-absolute ori-font-light-hover-default"
        style={{ top: "7px", right: "7px" }}
        onClick={onClose}
      />
      <p className="ori-text-center ori-font-md ori-b-mrgn-10">Privacy Policy</p>
      {
        chatbot_status.privacy_policy && chatbot_status.privacy_policy.map((policy, index) => {
          return (
            <React.Fragment key={index}>
              {
                policy.title &&
                <p className="ori-font-bold">{policy.title}</p>
              }
              {
                policy.subtitle &&
                <p className="ori-font-xs">{policy.subtitle}</p>
              }
              <p className="ori-font-xs ori-font-light ori-b-mrgn-10">{policy.content} </p>
            </React.Fragment>
          )
        })
      }
      <div className="ori-flex ori-flex-jc">
        <Button size="small" className="ori-btn-fill-primary" onClick={onClose}>Close</Button>
      </div>
    </div>
  )
}

PrivacyPolicy.protoTypes = {
  onClose: PropTypes.func
}

export default PrivacyPolicy;
