import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Button from 'antd/lib/button';
import Avatar from 'antd/lib/avatar';
import Input from 'antd/lib/input';
import Select from 'antd/lib/select';
// import { Input, Avatar, Button, Select } from 'antd';

import { chatbot_setting, chatbot_client_info } from '../../../../data/config/urls';

import DelayComponent from '../../../../components/delaycomponent';
import PoweredBy from '../../../../components/poweredby';

const { Option } = Select;

class EndChat extends React.PureComponent {
  renderSessionCloseConfirmation = () => {
    const { end_chat, closeEndChatPopup, confirmEndConversation } = this.props;
    if (end_chat.show_confirmation_card)
      return (
        <InfoCard title="Do you want to close this session ?" ok_text="Confirm" onClickCancel={closeEndChatPopup} onClickOk={confirmEndConversation} />
      );
  };

  renderResolvedChatInfo = () => {
    const { end_chat, confirmEndConversation } = this.props;
    if (end_chat.show_resolved_card)
      return (
        <InfoCard title="Agent has ended the conversation" onClickOk={confirmEndConversation} />
      );
  };

  renderDynamicForm = () => {
    const { is_socket_connected, end_chat, closeEndChatPopup, handleFormInputChange, handleFormSelectChange, submitFormData } = this.props;
    if (end_chat.show_form_card)
      return (
        <div className="ori-pad-15 ori-bg-white ori-box-shadow ori-border-radius-5 ori-tb-mrgn-5">
          {
            end_chat.form && end_chat.form.map((form_item, index) => {
              switch (form_item.input_type) {
                case "input":
                  return (
                    <div key={index} className="ori-b-pad-15">
                      {
                        form_item.title &&
                        <div className="ori-capitalize ori-b-mrgn-7 ori-font-13" style={{ lineHeight: '1.3' }}>{form_item.title}</div>
                      }
                      <Input className="ori-font-xs" {...form_item.input_props} onChange={handleFormInputChange} />
                    </div>
                  );

                case "textarea":
                  return (
                    <div key={index} className="ori-b-pad-15">
                      {
                        form_item.title &&
                        <div className="ori-capitalize ori-b-mrgn-7 ori-font-13" style={{ lineHeight: '1.3' }}>{form_item.title}</div>
                      }
                      <Input.TextArea className="ori-font-xs" {...form_item.input_props} onChange={handleFormInputChange} />
                    </div>
                  );

                case "select":
                  return (
                    <div key={index} id={`select-${index}`} className="ori-b-pad-15">
                      {
                        form_item.title &&
                        <div className="ori-capitalize ori-b-mrgn-7 ori-font-13" style={{ lineHeight: '1.3' }}>{form_item.title}</div>
                      }
                      <Select className="ori-full-width ori-font-xs" getPopupContainer={() => document.getElementById(`select-${index}`)} {...form_item.input_props} onChange={handleFormSelectChange} >
                        {
                          form_item.options && form_item.options.map((option, index) => {
                            return (
                              <Option key={index} name={form_item.input_props.name} value={option.value}>{option.name}</Option>
                            );
                          })
                        }

                      </Select>
                    </div>
                  );

                default: return null;
              }
            })
          }
          <div className="ori-flex-row ori-flex-jc">
            <Button className="ori-lr-mrgn-10 ori-lr-pad-15 ori-btn-ghost-primary" size="small" onClick={closeEndChatPopup} >Skip</Button>
            <Button className={classNames("ori-lr-mrgn-10 ori-lr-pad-15", { "ori-btn-fill-primary": is_socket_connected })} size="small" disabled={!is_socket_connected} onClick={submitFormData}>{is_socket_connected ? 'Submit' : "Connecting..."}</Button>
          </div>
        </div>
      );
  };

  renderPoweredBy = () => {
    if (chatbot_setting.powered_by.visibility) {
      return (
        <div className="ori-absolute ori-align-bottom ori-align-left ori-align-right ori-flex-row ori-flex-jc ori-bg-white ori-box-shadow">
          <PoweredBy logo_url={chatbot_setting.powered_by.icon_url} target_url={chatbot_setting.powered_by.target_url} />
        </div>
      );
    }
  };

  render() {
    const { isMounted, end_chat } = this.props;
    return (
      <div className={classNames("ori-absolute ori-animated ori-animation-half ori-bg-white ori-align-full ori-z-index-99994 ori-bg-size-cover ori-bg-no-repeat ori-bg-position-center", { "ori-fade-in": isMounted, "ori-fade-out": !isMounted, "ori-z-index-99995": end_chat.show_resolved_card })} style={{ backgroundImage: chatbot_setting.chat_interface.show_bg_image ? `url(${chatbot_setting.chat_interface.bg_image_url})` : 'none' }}>
        <div className="ori-lr-pad-15 ori-b-pad-15 ori-t-pad-20 ori-bg-gradient-primary-to-light ori-flex-row ori-flex-jc ori-font-white" style={{ height: '220px' }}>
          <div>
            <div className="ori-tb-pad-10 ori-flex-row ori-flex-jc">
              <Avatar style={{ height: '55px', width: '55px' }} src={chatbot_client_info.icon_url} />
            </div>
            <p className="ori-lr-mrgn-10 ori-font-lg ori-text-center">{chatbot_client_info.brand_name}</p>
            {
              end_chat.description &&
              <div className="ori-block-text-overflow-dotted ori-dotted-after-xs-3">
                <p className="ori-animated ori-fade-in ori-font-xs ori-text-center">{end_chat.description}</p>
              </div>
            }
          </div>
        </div>
        <div className="ori-absolute ori-align-full">
          <div className="ori-relative ori-full-parent-height ori-full-width ori-overflow-y-auto ori-text-center" style={{ padding: "190px 15px 30px 15px" }}>
            {this.renderSessionCloseConfirmation()}
            {this.renderResolvedChatInfo()}
            {this.renderDynamicForm()}
          </div>
        </div>
        {this.renderPoweredBy()}
      </div>
    );
  }
}

const InfoCard = (props) => {
  const { title, ok_text, onClickCancel, onClickOk } = props;
  return (
    <div className="ori-bg-white ori-pad-15 ori-tb-mrgn-10 ori-box-shadow ori-border-radius-5">
      <p className="ori-b-mrgn-10">{title}</p>
      <div className="ori-flex-row ori-flex-jc">
        {
          onClickCancel &&
          <Button className="ori-lr-mrgn-10 ori-lr-pad-15 ori-btn-ghost-primary" size="small" onClick={onClickCancel} >Cancel</Button>
        }
        <Button className="ori-lr-mrgn-10 ori-lr-pad-15 ori-btn-fill-primary" size="small" onClick={onClickOk} >{ok_text}</Button>
      </div>
    </div>
  );
};

InfoCard.propTypes = {
  is_socket_connected: PropTypes.bool,
  title: PropTypes.string,
  ok_text: PropTypes.string,
  onClickCancel: PropTypes.func,
  onClickOk: PropTypes.func,
};

InfoCard.defaultProps = {
  is_socket_connected: false,
  ok_text: 'Ok',
};

EndChat.propTypes = {
  isMounted: PropTypes.bool,
  is_socket_connected: PropTypes.bool,
  end_chat: PropTypes.object,
  closeEndChatPopup: PropTypes.func,
  confirmEndConversation: PropTypes.func,
  handleFormInputChange: PropTypes.func,
  handleFormSelectChange: PropTypes.func,
  submitFormData: PropTypes.func,
};

EndChat.defaultProps = {
  is_socket_connected: false,
  end_chat: {},
};

export default DelayComponent(EndChat);
