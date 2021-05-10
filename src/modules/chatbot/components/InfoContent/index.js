import React from 'react';
import PropTypes from 'prop-types';
import CloseIcon from 'react-icons/lib/md/close';
import Button from 'antd/lib/button';

import { translator } from '../../../../data/config/brandSetup'

import { LangContext } from '../../../context'

const InfoContent = ({ type, onClose }) => (
  <LangContext.Consumer>
    {
      lang => {
        if (translator.text[lang].info_content[type])
          return (
            <div className="ori-relative ori-bg-popup ori-font-popup ori-pad-15 ori-border-radius-3 ori-full-width ori-max-width-350 ori-mrgn-auto">
              <CloseIcon
                size={20}
                className="ori-absolute ori-popup-light-hover-default"
                style={{ top: "7px", right: "7px" }}
                onClick={onClose}
              />
              {
                translator.text[lang].info_content[type].headerType === 'html' ?
                  <div dangerouslySetInnerHTML={{ __html: translator.text[lang].info_content[type].header }} />
                  :
                  <p className="ori-text-center ori-font-md ori-b-mrgn-10">
                    {translator.text[lang].info_content[type].header}
                  </p>
              }
              {
                translator.text[lang].info_content[type].data &&
                translator.text[lang].info_content[type].data.map((info, index) => {
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
                      {
                        info.type === 'html' ?
                          <div dangerouslySetInnerHTML={{ __html: info.content }} />
                          :
                          <p className="ori-font-xs ori-font-popup ori-b-mrgn-10">{info.content} </p>
                      }
                    </React.Fragment>
                  )
                })
              }
              {
                translator.text[lang].info_content[type].data &&
                translator.text[lang].info_content[type].data.length > 0 &&
                <div className="ori-flex ori-flex-jc">
                  <Button size="small" className="ori-btn-fill-primary" onClick={onClose}>
                    {translator.text[lang].close}
                  </Button>
                </div>
              }
            </div>
          )
        return (
          <div className="ori-bg-popup ori-font-popup ori-pad-15 ori-max-width-350 ori-mrgn-auto">
            {`${type} is not define in info content. please check it.`}
          </div>
        )
      }
    }
  </LangContext.Consumer>
)


InfoContent.protoTypes = {
  type: PropTypes.string,
  onClose: PropTypes.func
}

export default InfoContent;
