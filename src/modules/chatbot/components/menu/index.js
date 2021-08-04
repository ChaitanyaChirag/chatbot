import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import SecurityIcon from 'react-icons/lib/md/security';
import InfoIcon from 'react-icons/lib/md/assignment';
import FeedbackIcon from 'react-icons/lib/md/feedback';
import ClearIcon from 'react-icons/lib/md/clear-all';
import CloseIcon from 'react-icons/lib/md/close'

import './index.scss';

import { chatbot_setting, translator } from '../../../../data/config/brandSetup';
import { INFO_CONTENT_TYPE } from '../../../../data/config/constants'

import { LangContext } from "../../../context"

import DelayComponent from '../../../../components/delaycomponent';

class MenuComponent extends React.PureComponent {
  onClickPrivacyPolicy = () => {
    this.props.showInfoContent(INFO_CONTENT_TYPE.PRIVACY_POLICY)
  }

  onClickTermsAndConditions = () => {
    this.props.showInfoContent(INFO_CONTENT_TYPE.TERMS_AND_CONDITIONS)
  }

  render() {
    let { handleResetChat, isMounted, closeMenu, showFeedback, handleEndChat } = this.props;
    if (chatbot_setting.menu)
      return (
        <LangContext.Consumer>
          {
            lang => (
              <React.Fragment>
                <div className={classNames("ori-absolute ori-animated ori-animation-half menuOverlay", { "ori-fade-in": isMounted, "ori-fade-out": !isMounted })} onClick={closeMenu}> &nbsp;
                </div>
                <div className={classNames("ori-animated ori-animation-half ori-absolute ori-pad-10 oriMenuContainer ", { "ori-zoom-in-bottom-left": isMounted, "ori-zoom-out-bottom-left": !isMounted })}>
                  {
                    chatbot_setting.menu.children.end_chat &&
                    <div className="ori-pad-5 ori-cursor-ptr menuItem" onClick={handleEndChat}>
                      <CloseIcon size={16} />
                      <span className="ori-l-mrgn-10">{translator.text[lang].endChat}</span>
                    </div>
                  }
                  {
                    chatbot_setting.menu.children.clear_chat &&
                    <div className="ori-pad-5 ori-cursor-ptr menuItem" onClick={handleResetChat}>
                      <ClearIcon size={16} />
                      <span className="ori-l-mrgn-10">{translator.text[lang].clearChat}</span>
                    </div>
                  }
                  {
                    chatbot_setting.menu.children.feedback &&
                    <div className="ori-pad-5 ori-cursor-ptr menuItem" onClick={showFeedback}>
                      <FeedbackIcon size={16} />
                      <span className="ori-l-mrgn-10">{translator.text[lang].feedback}</span>
                    </div>
                  }
                  {
                    chatbot_setting.menu.children.privacy_policy &&
                    <div className="ori-pad-5 ori-cursor-ptr menuItem" onClick={this.onClickPrivacyPolicy}>
                      <SecurityIcon size={16} />
                      <span className="ori-l-mrgn-10">{translator.text[lang].privacyPolicy}</span>
                    </div>
                  }
                  {
                    chatbot_setting.menu.children.terms_and_conditions &&
                    <div className="ori-pad-5 ori-cursor-ptr menuItem" onClick={this.onClickTermsAndConditions}>
                      <InfoIcon size={16} />
                      <span className="ori-l-mrgn-10">{translator.text[lang].termsAndConditions}</span>
                    </div>
                  }
                </div>
              </React.Fragment>
            )
          }
        </LangContext.Consumer>
      );
    return null;
  }
}
const Menu = DelayComponent(MenuComponent);

Menu.propTypes = {
  closeMenu: PropTypes.func,
  handleResetChat: PropTypes.func,
  showFeedback: PropTypes.func,
  showInfoContent: PropTypes.func
};

export default Menu;
