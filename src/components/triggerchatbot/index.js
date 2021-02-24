import React, { Suspense } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import CloseIcon from 'react-icons/lib/md/close';
import ConversationIcon from 'react-icons/lib/fa/comments';

import './index.scss';

import { chatbot_client_info, chatbot_setting, translator } from '../../data/config/brandSetup';
import { LangContext } from '../../modules/context'

const LottieContainer = React.lazy(() => import('./lottiecontainer'));

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
            <div
              className="ori-fixed ori-animated ori-zoom-in oriTriggerChatBotContainer"
              onClick={this.handleChatInterfaceView}
            >
              <Suspense fallback={null}>
                {
                  !is_chat_open && chatbot_client_info.trigger.lottie_visibility &&
                  <LottieContainer />
                }
              </Suspense>
              {
                chatbot_client_info.trigger.visibility && !is_chat_open &&
                <div
                  className="ori-animated ori-pulse ori-infinite"
                  style={{
                    height: `${mobile ? chatbot_client_info.trigger.mobile_icon_height : chatbot_client_info.trigger.icon_height}px`,
                    animationDuration: `${chatbot_client_info.trigger.animation_duration}ms`
                  }}
                >
                  <img
                    src={translator.assets[lang].trigger}
                    alt=""
                    className="ori-full-parent-height"
                  />
                </div>
              }
              {
                !chatbot_client_info.trigger.visibility && !chatbot_client_info.trigger.lottie_visibility && !is_chat_open &&
                <div className={classNames("ori-flex-row ori-flex-center triggerIconContainer",
                  {
                    "ori-bg-gradient": chatbot_setting.gradient.trigger,
                    "ori-bg-primary": !chatbot_setting.gradient.trigger
                  }
                )}
                >
                  <ConversationIcon size={30} />
                </div>
              }
              {
                is_chat_open && chatbot_client_info.trigger.show_close_icon &&
                <div className={classNames("ori-flex-row ori-flex-center triggerIconContainer",
                  {
                    "ori-bg-gradient": chatbot_setting.gradient.trigger,
                    "ori-bg-primary": !chatbot_setting.gradient.trigger
                  }
                )}
                >
                  <CloseIcon size={28} />
                </div>
              }
            </div>
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
