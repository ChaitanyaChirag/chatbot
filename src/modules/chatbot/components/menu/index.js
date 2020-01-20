import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import CloseIcon from 'react-icons/lib/md/close';
import FeedbackIcon from 'react-icons/lib/md/feedback';
import ClearIcon from 'react-icons/lib/md/clear-all';

import { chatbot_setting } from '../../../../data/config/urls';

import './index.scss';

import DelayComponent from '../../../../components/delaycomponent';

class MenuComponent extends React.PureComponent {

  render() {
    let { handleResetChat, isMounted, closeMenu, showFeedback } = this.props;

    return (
      <React.Fragment>
        <div className={classNames("ori-absolute ori-animated ori-animation-half menuOverlay", { "ori-fade-in": isMounted, "ori-fade-out": !isMounted })} onClick={closeMenu}> &nbsp;
                </div>
        <div className={classNames("ori-animated ori-animation-half ori-absolute ori-bg-white ori-font-light oriMenuContainer ", { "ori-zoom-in-bottom-left": isMounted, "ori-zoom-out-bottom-left": !isMounted })}>
          <div className="ori-relative ori-b-border-light ori-tb-pad-10 ori-l-pad-10 ori-r-pad-20 ori-bg-primary ori-font-white">
            <div className="ori-absolute ori-flex ori-cursor-ptr ori-pad-5 alignMenuClose" onClick={closeMenu}>
              <CloseIcon size={16} />
            </div>
            <p className="ori-no-b-mrgn ori-font-md ori-font-white ori-font-medium  title">Menu</p>
          </div>
          {
            chatbot_setting.menu && chatbot_setting.menu.children.feedback &&
            <div className="ori-pad-10 ori-flex-row ori-cursor-ptr menuItem" onClick={showFeedback}>
              <div className="ori-r-mrgn-15 ori-flex-column ori-flex-jc">
                <FeedbackIcon size={20} />
              </div>
              <p className="ori-no-b-mrgn ori-font-md">Feedback</p>
            </div>
          }
          {
            chatbot_setting.menu && chatbot_setting.menu.children.clear_chat &&
            <div className="ori-pad-10 ori-flex-row ori-cursor-ptr menuItem" onClick={handleResetChat}>
              <div className="ori-r-mrgn-15 ori-flex">
                <ClearIcon size={20} />
              </div>
              <p className="ori-no-b-mrgn  ori-font-md">Clear Chat</p>
            </div>
          }
        </div>
      </React.Fragment>
    );
  }
}
const Menu = DelayComponent(MenuComponent);

Menu.propTypes = {
  closeMenu: PropTypes.func,
  handleResetChat: PropTypes.func,
  showFeedback: PropTypes.func,
};

export default Menu;
