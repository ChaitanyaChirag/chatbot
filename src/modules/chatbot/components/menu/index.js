import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import SecurityIcon from 'react-icons/lib/md/security';
import InfoIcon from 'react-icons/lib/md/assignment';
import FeedbackIcon from 'react-icons/lib/md/feedback';
import ClearIcon from 'react-icons/lib/md/clear-all';

import { chatbot_setting } from '../../../../data/config/urls';
import { INFO_CONTENT_TYPE } from '../../../../data/config/constants'

import './index.scss';

import DelayComponent from '../../../../components/delaycomponent';

class MenuComponent extends React.PureComponent {
  onClickPrivacyPolicy = () => {
    this.props.showInfoContent(INFO_CONTENT_TYPE.PRIVACY_POLICY)
  }

  onClickTermsAndConditions =() => {
    this.props.showInfoContent(INFO_CONTENT_TYPE.TERMS_AND_CONDITIONS)
  }

  render() {
    let { handleResetChat, isMounted, closeMenu, showFeedback } = this.props;
    if (chatbot_setting.menu)
      return (
        <React.Fragment>
          <div className={classNames("ori-absolute ori-animated ori-animation-half menuOverlay", { "ori-fade-in": isMounted, "ori-fade-out": !isMounted })} onClick={closeMenu}> &nbsp;
          </div>
          <div className={classNames("ori-animated ori-animation-half ori-absolute ori-bg-white ori-pad-10 oriMenuContainer ", { "ori-zoom-in-bottom-left": isMounted, "ori-zoom-out-bottom-left": !isMounted })}>
            {
              chatbot_setting.menu.children.clear_chat &&
              <div className="ori-pad-5 ori-cursor-ptr menuItem" onClick={handleResetChat}>
                <ClearIcon size={16} />
                <span className="ori-l-mrgn-10">Clear Chat</span>
              </div>
            }
            {
              chatbot_setting.menu.children.feedback &&
              <div className="ori-pad-5 ori-cursor-ptr menuItem" onClick={showFeedback}>
                <FeedbackIcon size={16} />
                <span className="ori-l-mrgn-10">Feedback</span>
              </div>
            }
            {
              chatbot_setting.menu.children.privacy_policy &&
              <div className="ori-pad-5 ori-cursor-ptr menuItem" onClick={this.onClickPrivacyPolicy}>
                <SecurityIcon size={16} />
                <span className="ori-l-mrgn-10">Privacy Policy</span>
              </div>
            }
            {
              chatbot_setting.menu.children.terms_and_conditions &&
              <div className="ori-pad-5 ori-cursor-ptr menuItem" onClick={this.onClickTermsAndConditions}>
                <InfoIcon size={16} />
                <span className="ori-l-mrgn-10">Terms & Conditions</span>
              </div>
            }
          </div>
        </React.Fragment>
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
