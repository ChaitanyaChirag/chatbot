import React, { lazy, Suspense } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Button from 'antd/lib/button';
import Avatar from 'antd/lib/avatar';
import Input from 'antd/lib/input';
import Select from 'antd/lib/select';

import { chatbot_setting, translator } from '../../../../data/config/urls';
import { background, logo } from '../../../../data/assets'

import { LangContext } from '../../../context';

import DelayComponent from '../../../../components/delaycomponent';

const PoweredBy = lazy(() => import('../../../../components/poweredby'));
const RatingItem = lazy(() => import('../../../../components/RatingItem'))

const { Option } = Select;

class EndChat extends React.PureComponent {
  handleFormInputChange = event => {
    const { handleFormItemChange } = this.props;
    handleFormItemChange(event.target.name, event.target.value)
  }

  handleFormSelectChange = (value, option) => {
    const { handleFormItemChange } = this.props;
    if (option && option.props && option.props.name)
      handleFormItemChange(option.props.name, value)
  }

  renderSessionCloseConfirmation = lang => {
    const { end_chat, closeEndChatPopup, confirmEndConversation } = this.props;
    if (end_chat.show_confirmation_card)
      return (
        <InfoCard
          title={translator.text[lang].sessionCloseConfirmation}
          ok_text={translator.text[lang].confirm}
          onClickCancel={closeEndChatPopup}
          onClickOk={confirmEndConversation}
        />
      );
  };

  renderResolvedChatInfo = lang => {
    const { end_chat, confirmEndConversation } = this.props;
    if (end_chat.show_resolved_card)
      return (
        <InfoCard
          title={translator.text[lang].resolveChatInfo}
          ok_text={translator.text[lang].ok}
          onClickOk={confirmEndConversation}
        />
      );
  };

  renderDynamicForm = lang => {
    const { is_socket_connected, end_chat, closeEndChatPopup, handleFormItemChange, submitFormData } = this.props;
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
                        <div className="ori-capitalize ori-b-mrgn-7" style={{ lineHeight: '1.3' }}>{form_item.title}</div>
                      }
                      <Input
                        className="ori-font-xs"
                        {...form_item.input_props}
                        onChange={this.handleFormInputChange}
                      />
                    </div>
                  );

                case "textarea":
                  return (
                    <div key={index} className="ori-b-pad-15">
                      {
                        form_item.title &&
                        <div className="ori-capitalize ori-b-mrgn-7" style={{ lineHeight: '1.3' }}>{form_item.title}</div>
                      }
                      <Input.TextArea
                        className="ori-font-xs"
                        {...form_item.input_props}
                        onChange={this.handleFormInputChange}
                      />
                    </div>
                  );

                case "rating":
                  return (
                    <Suspense key={index} fallback={null}>
                      <RatingItem
                        title={form_item.title}
                        {...form_item.input_props}
                        onChange={handleFormItemChange}
                      />
                    </Suspense>
                  );

                case "select":
                  return (
                    <div key={index} id={`select-${index}`} className="ori-b-pad-15">
                      {
                        form_item.title &&
                        <div className="ori-capitalize ori-b-mrgn-7" style={{ lineHeight: '1.3' }}>{form_item.title}</div>
                      }
                      <Select
                        className="ori-full-width ori-font-xs"
                        getPopupContainer={() => document.getElementById(`select-${index}`)}
                        {...form_item.input_props}
                        onChange={this.handleFormSelectChange}
                      >
                        {
                          form_item.options && form_item.options.map((option, index) => {
                            return (
                              <Option
                                key={index}
                                name={form_item.input_props.name}
                                value={option.value}
                                style={{ whiteSpace: "normal" }}
                              >
                                {option.name}
                              </Option>
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
            <Button
              className="ori-lr-mrgn-10 ori-lr-pad-15 ori-btn-ghost-primary"
              size="small"
              onClick={closeEndChatPopup}
            >
              {translator.text[lang].skip}
            </Button>
            <Button
              className={classNames("ori-lr-mrgn-10 ori-lr-pad-15",
                {
                  "ori-btn-fill-primary": is_socket_connected
                }
              )}
              size="small"
              disabled={!is_socket_connected}
              onClick={submitFormData}
            >
              {is_socket_connected ? translator.text[lang].submit : translator.text[lang].connecting}
            </Button>
          </div>
        </div>
      );
  };

  render() {
    const { isMounted, end_chat } = this.props;
    return (
      <LangContext.Consumer>
        {
          lang => (
            <div
              className={classNames("ori-absolute ori-animated ori-animation-half ori-bg-default ori-align-full ori-z-index-99994",
                {
                  "ori-fade-in": isMounted,
                  "ori-fade-out": !isMounted,
                  "ori-z-index-99995": end_chat.show_resolved_card,
                }
              )}
              style={{
                backgroundImage: chatbot_setting.chat_interface.show_bg_image ? `url(${background})` : 'none'
              }}
            >
              <div className="ori-lr-pad-15 ori-b-pad-15 ori-t-pad-20 ori-bg-gradient ori-flex-row ori-flex-jc ori-font-white" style={{ height: '220px' }}>
                <div>
                  <div className="ori-tb-pad-10 ori-flex-row ori-flex-jc">
                    <Avatar style={{ height: '55px', width: '55px' }} src={logo} />
                  </div>
                  <p className="ori-lr-mrgn-10 ori-font-lg ori-text-center">{translator.text[lang].brandName}</p>
                  {
                    end_chat.formTitle &&
                    <p className="ori-animated ori-fade-in ori-font-bold ori-font-sm ori-text-center">{end_chat.formTitle}</p>
                  }
                  {
                    end_chat.formSubTitle &&
                    <div className="ori-block-text-overflow-dotted ori-dotted-after-xs-3">
                      <p className="ori-animated ori-fade-in ori-font-xs ori-text-center">{end_chat.formSubTitle}</p>
                    </div>
                  }
                </div>
              </div>
              <div className="ori-absolute ori-align-full">
                <div className="ori-relative ori-full-parent-height ori-full-width ori-overflow-y-auto ori-text-center" style={{ padding: "190px 15px 30px 15px" }}>
                  {this.renderSessionCloseConfirmation(lang)}
                  {this.renderResolvedChatInfo(lang)}
                  {this.renderDynamicForm(lang)}
                </div>
              </div>
              {
                chatbot_setting.powered_by.visibility &&
                <Suspense fallback={null}>
                  <PoweredBy container_class="ori-absolute ori-align-bottom ori-align-left ori-align-right ori-text-center ori-bg-white ori-box-shadow" />
                </Suspense>
              }
            </div>
          )
        }
      </LangContext.Consumer>
    );
  }
}

const InfoCard = props => {
  const { title, ok_text, onClickCancel, onClickOk } = props;
  return (
    <LangContext.Consumer>
      {
        lang => (
          <div className="ori-bg-white ori-pad-15 ori-tb-mrgn-10 ori-box-shadow ori-border-radius-5">
            <p className="ori-b-mrgn-10">{title}</p>
            <div className="ori-flex-row ori-flex-jc">
              {
                onClickCancel &&
                <Button className="ori-lr-mrgn-10 ori-lr-pad-15 ori-btn-ghost-primary" size="small" onClick={onClickCancel} >{translator.text[lang].cancel}</Button>
              }
              <Button className="ori-lr-mrgn-10 ori-lr-pad-15 ori-btn-fill-primary" size="small" onClick={onClickOk} >{ok_text}</Button>
            </div>
          </div>
        )
      }
    </LangContext.Consumer>
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
};

EndChat.propTypes = {
  isMounted: PropTypes.bool,
  is_socket_connected: PropTypes.bool,
  end_chat: PropTypes.object,
  closeEndChatPopup: PropTypes.func,
  confirmEndConversation: PropTypes.func,
  handleFormItemChange: PropTypes.func,
  submitFormData: PropTypes.func,
};

EndChat.defaultProps = {
  is_socket_connected: false,
  end_chat: {},
};

export default DelayComponent(EndChat);
