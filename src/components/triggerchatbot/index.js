import React, { Suspense } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import CloseIcon from 'react-icons/lib/md/close';

import './index.scss';

import { chatbot_setting, brand_features, translator } from '../../data/config/brandSetup';
import { TYPES } from '../../data/config/constants'
import { LangContext } from '../../modules/context'

const LottieContainer = React.lazy(() => import('./lottiecontainer'));

const SHOW_TRIGGER = brand_features.enable_trigger_brand_logic ? brand_features.showTriggerByBrandLogic() : true

class TriggerChatBot extends React.PureComponent {
  handleChatInterfaceView = () => {
    const { is_chat_open, handleSocketConnection } = this.props;
    handleSocketConnection(!is_chat_open)
  };

  render() {
    const { is_chat_open, mobile } = this.props;
    return (
      <LangContext.Consumer>
        {
          lang => (
            <React.Fragment>
              {
                is_chat_open && chatbot_setting.show_trigger_close &&
                <div
                  className={classNames("ori-fixed ori-zindex-99991 ori-cursor-ptr ori-flex-row ori-flex-center closeIconContainer",
                    {
                      "ori-bg-gradient": chatbot_setting.gradient.trigger,
                      "ori-bg-primary": !chatbot_setting.gradient.trigger
                    }
                  )}
                  style={chatbot_setting.trigger.close_style}
                  onClick={this.handleChatInterfaceView}
                >
                  <CloseIcon size={28} />
                </div>
              }
              {
                !is_chat_open && chatbot_setting.trigger_type === TYPES.LOTTIE && SHOW_TRIGGER &&
                <Suspense fallback={null}>
                  <div
                    className="ori-fixed ori-zindex-99991 ori-cursor-ptr"
                    style={mobile ? chatbot_setting.trigger.lottie_style_sm : chatbot_setting.trigger.lottie_style_lg}
                    onClick={this.handleChatInterfaceView}
                  >
                    <LottieContainer />
                  </div>
                </Suspense>
              }
              {
                !is_chat_open && chatbot_setting.trigger_type === TYPES.DEFAULT && SHOW_TRIGGER &&
                <div
                  className="ori-fixed ori-zindex-99991 ori-cursor-ptr ori-animated ori-pulse"
                  style={mobile ? chatbot_setting.trigger.image_style_sm : chatbot_setting.trigger.image_style_lg}
                  onClick={this.handleChatInterfaceView}
                >
                  <img
                    src={translator.assets[lang].trigger}
                    alt=""
                    className="ori-full-parent-height"
                  />
                </div>
              }
            </React.Fragment>
          )
        }
      </LangContext.Consumer>
    );
  }
}

TriggerChatBot.propTypes = {
  is_chat_open: PropTypes.bool.isRequired,
  handleSocketConnection: PropTypes.func,
  mobile: PropTypes.bool
};

TriggerChatBot.defaultProps = {
  mobile: false
}

export default TriggerChatBot;
