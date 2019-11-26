import React, { Component, Suspense } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import CloseIcon from 'react-icons/lib/md/close';
import Button from 'antd/lib/button';

import { chatbot_setting, chatbot_client_info } from '../../data/config/urls';
import { LOCAL_STORAGE, isAndroid, getDefaultMessages, scrollToBottom, fileToBase64, checkImageTypeFile } from '../../data/config/utils';
import { EVENTS } from '../../data/config/constants';

import './index.scss';

import ChatBotHeader from './components/chatbotheader';
import ChatBotConversation from '../../components/chatbotconversation';
import InputComposer from '../../components/inputcomposer';
import PoweredBy from '../../components/poweredby';

const Menu = React.lazy(() => import('./components/menu'));
const QuickReply = React.lazy(() => import('./components/quickreply'));
const Feedback = React.lazy(() => import('./components/feedback'));
const EndChat = React.lazy(() => import('./components/endchat'));
const PreviewFile = React.lazy(() => import('./components/previewfile'));


const androidTabletStyle = {
  width: '100%',
  height: '100%',
  top: '0',
  bottom: '0',
  left: '0',
  right: '0',
  maxHeight: 'none',
  minHeight: 'none',
  borderRadius: '1px'
};

class ChatBot extends Component {
  state = {
    show_menu: false,
    show_feedback: false,
    end_chat_form_data: {},
    file: null,
    fileUrl: "",
    show_file_preview: false,
  };

  componentDidMount() {
    scrollToBottom(this.messagesContainer);
  }

  setMessageContainerRef = el => {
    this.messagesContainer = el;
  }

  openMenu = () => {
    this.setState({ show_menu: true });
  };

  closeMenu = () => {
    this.setState({ show_menu: false });
  };

  scrollContainerToBottom = () => {
    scrollToBottom(this.messagesContainer);
  };

  handleResetChat = () => {
    const { psid, is_socket_connected } = this.props.chat_details;
    const { actions } = this.props;
    if (is_socket_connected) {
      const payload = { psid };
      actions.resetChat(payload, () => {
        const default_messages = getDefaultMessages();
        localStorage.setItem(LOCAL_STORAGE.MESSAGES(), JSON.stringify(default_messages));
        localStorage.setItem(LOCAL_STORAGE.LAST_EMIT, null);
        actions.setDefaultState();
        this.closeMenu();
      });
    }
  };

  showFeedback = () => {
    this.setState({ show_menu: false }, () => { setTimeout(this.setState({ show_feedback: true }), 400) });
  };

  closeFeedback = () => {
    this.setState({ show_feedback: false });
  };

  minimizeChatbotInterface = () => {
    this.props.actions.handleChatbotInterface(false);
  };

  onClickCloseIcon = () => {
    const { end_chat } = this.props.chat_details;
    const { actions } = this.props;
    const payload = end_chat.visible ? {
      visible: false,
      show_confirmation_card: false,
      show_form_card: false,
      show_resolved_card: false,
      form: [],
      description: null,
    } : {
        visible: true,
        show_confirmation_card: true,
        show_form_card: false,
        form: [],
        description: null,
      };
    actions.updateEndChat(payload);
  };

  handleFormInputChange = event => {
    this.setState({
      end_chat_form_data: {
        ...this.state.end_chat_form_data,
        [event.target.name]: event.target.value,
      }
    });
  };

  handleFormSelectChange = (value, option) => {
    if (option && option.props && option.props.name) {
      this.setState({
        end_chat_form_data: {
          ...this.state.end_chat_form_data,
          [option.props.name]: value,
        }
      });
    }
  };

  confirmEndConversation = () => {
    const { actions, chat_details } = this.props;
    const payload = {
      psid: chat_details.psid,
    };
    actions.emitCustomEvent(EVENTS.END_CONVERSATION, payload, (err, res) => {
      console.log(payload, err, res);
      if (!err && res && res.data && res.data.formData) {
        this.handleResetChat();
        const data = {
          show_confirmation_card: false,
          show_resolved_card: false,
          show_form_card: true,
          form: res.data.formData,
          description: res.data.formTitle ? res.data.formTitle : null,
        };
        actions.updateEndChat(data);
      } else {
        actions.handleChatbotInterface(false);
        this.onClickCloseIcon();
      }
    });
  };

  submitEndFormFormData = () => {
    const { end_chat_form_data } = this.state;
    const { actions, chat_details } = this.props;
    const payload = {
      psid: chat_details.psid,
      formData: end_chat_form_data
    };
    actions.emitCustomEvent(EVENTS.END_CONVERSATION_FORM_SUBMIT, payload, () => {
      actions.handleChatbotInterface(false);
      this.onClickCloseIcon();
    });
  };

  beforeFileUpload = file => {
    console.log('file', file);
    if (file && file.name && checkImageTypeFile(file.name))
      fileToBase64(file).then(fileUrl => {
        this.setState({
          file,
          fileUrl,
          show_file_preview: true
        });
      })
    return false;
  };

  onFileRemove = () => {
    this.setState({
      file: null,
      fileUrl: "",
    });
  };

  onFilePreviewCancel = () => {
    this.setState({
      show_file_preview: false,
    });
  };

  onClickFileSend = () => {
    const { file, fileUrl } = this.state;
    const { handleFileUpload } = this.props;
    handleFileUpload({ file, fileUrl });
    this.onFilePreviewCancel();
  };

  render() {
    const { show_menu, show_feedback, show_file_preview, file, fileUrl } = this.state;
    const { is_adster_bot, chat_details, sendTextToServer, handleMsgBtnClick, handleFileUpload, handleOfferSelection, onChangeCheckbox, actions } = this.props;
    const android = isAndroid();
    let containerStyle = {
      bottom: chatbot_client_info.trigger.show_close_icon ? 'calc(20px + 70px + 20px)' : 0,
      borderRadius: chatbot_client_info.trigger.show_close_icon ? '8px' : '8px 8px 0px 0px',
    };
    if (android) {
      containerStyle = { ...containerStyle, ...androidTabletStyle };
    }
    return (
      <div className={classNames("ori-fixed ori-animated ori-z-index-99992 oriChatBotContainer", { "ori-fade-in-up": !chatbot_client_info.trigger.show_close_icon, "ori-fade-in": chatbot_client_info.trigger.show_close_icon })} style={containerStyle}>
        <div className="ori-relative ori-flex-column chatBotContentContainer" style={{ backgroundImage: chatbot_setting.chat_interface.show_bg_image ? `url(${chatbot_setting.chat_interface.bg_image_url})` : 'none' }}>
          <Suspense fallback={null}>
            <EndChat
              isMounted={chat_details.end_chat.visible}
              delayUnmountTime={400}
              is_socket_connected={chat_details.is_socket_connected}
              end_chat={chat_details.end_chat}
              closeEndChatPopup={this.onClickCloseIcon}
              confirmEndConversation={this.confirmEndConversation}
              handleFormInputChange={this.handleFormInputChange}
              handleFormSelectChange={this.handleFormSelectChange}
              submitFormData={this.submitEndFormFormData}
            />
          </Suspense>
          <Suspense fallback={null}>
            <PreviewFile
              isMounted={show_file_preview}
              delayUnmountTime={400}
              is_socket_connected={chat_details.is_socket_connected}
              file={file}
              fileUrl={fileUrl}
              onClickCancel={this.onFilePreviewCancel}
              onClickSend={this.onClickFileSend}
              onFileRemove={this.onFileRemove}
            />
          </Suspense>
          <Suspense fallback={null}>
            <Menu
              isMounted={show_menu}
              delayUnmountTime={400}
              closeMenu={this.closeMenu}
              handleResetChat={this.handleResetChat}
              showFeedback={this.showFeedback}
            />
          </Suspense>
          <Suspense fallback={null}>
            <Feedback
              isMounted={show_feedback}
              delayUnmountTime={650}
              is_socket_connected={chat_details.is_socket_connected}
              closeFeedback={this.closeFeedback}
              psid={chat_details.psid}
              sendFeedback={actions.sendFeedback}
            />
          </Suspense>
          <div className="ori-absolute ori-z-index-99994 ori-flex-row " style={{ top: '22px', right: '10px' }}>
            {
              !android && !is_adster_bot && !chat_details.end_chat.visible &&
              <div className="ori-pad-5 ori-cursor-ptr chatIcons" onClick={this.minimizeChatbotInterface}>
                <div className="minimizeIcon" style={{ height: '16px', width: '13px' }} />
              </div>
            }
            {
              !android && !is_adster_bot &&
              <div className="ori-lr-pad-5 ori-cursor-ptr chatIcons" onClick={this.onClickCloseIcon}>
                {
                  chat_details.end_chat.visible ?
                    <div className="ori-font-default-hover-white">
                      <CloseIcon size={18} />
                    </div>
                    :
                    <Button className="ori-font-xs ori-btn-default" size="small">End chat</Button>
                }
              </div>
            }
          </div>
          <div className="headerContainer">
            <ChatBotHeader is_socket_connected={chat_details.is_socket_connected} is_internet_connected={chat_details.is_internet_connected} />
          </div>
          <div className="ori-b-pad-40 ori-full-flex ori-full-parent-height chatBodyContainer" id="messages_container" ref={this.setMessageContainerRef} >
            <ChatBotConversation btn_disabled={!chat_details.is_socket_connected} messages={chat_details.messages} onMessageVoting={actions.onMessageVoting} handleMsgBtnClick={handleMsgBtnClick} handleFileUpload={handleFileUpload} messagesContainer={this.messagesContainer} handleOfferSelection={handleOfferSelection} onChangeCheckbox={onChangeCheckbox} is_typing={chat_details.is_typing} typing_text={chat_details.typing_text} />
          </div>
          <div className={classNames("ori-relative ori-flex-column ori-flex-jc chatFooterContainer")}>
            {
              chatbot_setting.powered_by && chatbot_setting.powered_by.visibility &&
              <div className="ori-absolute ori-flex-row ori-flex-jc alignPoweredBy">
                <PoweredBy target_url={chatbot_setting.powered_by.target_url} logo_url={chatbot_setting.powered_by.icon_url} />
              </div>
            }
            {
              chat_details.quick_replies && chat_details.quick_replies.length > 0 &&
              <Suspense fallback={null}>
                <div className="ori-absolute carouselContainer">
                  <QuickReply quick_replies={chat_details.quick_replies} sendTextToServer={sendTextToServer} />
                </div>
              </Suspense>
            }
            <InputComposer psid={chat_details.psid} sendTextToServer={sendTextToServer} is_input_lock={chat_details.is_input_lock} input_lock_text={chat_details.input_lock_text} onInputFocus={this.scrollContainerToBottom} onClickMenu={this.openMenu} emitCustomEvent={actions.emitCustomEvent} beforeUpload={this.beforeFileUpload} onRemove={this.onFileRemove} />
          </div>
        </div>
      </div>
    );
  }
}

ChatBot.propTypes = {
  chat_details: PropTypes.object,
  actions: PropTypes.object,
  sendTextToServer: PropTypes.func,
  handleMsgBtnClick: PropTypes.func,
  handleFileUpload: PropTypes.func,
  handleOfferSelection: PropTypes.func,
  onChangeCheckbox: PropTypes.func,
  is_adster_bot: PropTypes.bool,
};

ChatBot.defaultProps = {
  is_adster_bot: false,
};

export default ChatBot;
