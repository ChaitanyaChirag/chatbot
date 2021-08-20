import React, { lazy, Suspense, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import Button from "antd/lib/button";
import Avatar from "antd/lib/avatar";
import Input from "antd/lib/input";
import Select from "antd/lib/select";

import { chatbot_setting, translator } from "../../../../data/config/brandSetup";
import chatbotStyle from "../../../../data/config/chatbotStyle"

import { LangContext } from "../../../context";

import DelayComponent from "../../../../components/delaycomponent";

import { showMessage } from "../../../../data/config/utils"

const PoweredBy = lazy(() => import("../../../../components/PoweredBy"));
const RatingItem = lazy(() => import("../../../../components/RatingItem"))

const { Option } = Select;

const EndChat = ({
  isMounted,
  is_socket_connected,
  end_chat,
  cancelEndConversation,
  confirmEndConversation,
  handleFormItemChange,
  submitForm,
  skipForm
}) => {
  const timer = useRef(false)

  useEffect(() => {
    if (end_chat.show_form_card) {
      timer.current = setTimeout(() => {
        showMessage("warning", "Feedback Form Timeout")
        skipForm()
      }, chatbot_setting.auto_close_feedback_form)
    }
    return () => {
      if (timer.current)
        clearTimeout(timer.current)
    }
  }, [skipForm, end_chat.show_form_card])


  const handleFormInputChange = event => {
    handleFormItemChange(event.target.name, event.target.value)
  }

  const handleFormSelectChange = (value, option) => {
    if (option && option.props && option.props.name)
      handleFormItemChange(option.props.name, value)
  }

  const renderSessionCloseConfirmation = lang => {
    if (end_chat.show_confirmation_card)
      return (
        <InfoCard
          title={translator.text[lang].sessionCloseConfirmation}
          ok_text={translator.text[lang].confirm}
          onClickCancel={cancelEndConversation}
          onClickOk={confirmEndConversation}
        />
      );
  };

  const renderResolvedChatInfo = lang => {
    if (end_chat.show_resolved_card)
      return (
        <InfoCard
          title={translator.text[lang].resolveChatInfo}
          ok_text={translator.text[lang].ok}
          onClickOk={confirmEndConversation}
        />
      );
  };

  const renderDynamicForm = lang => {
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
                        <div
                          className="ori-b-mrgn-7"
                          style={{ lineHeight: "1.3" }}
                        >
                          {form_item.title}
                        </div>
                      }
                      <Input
                        style={{ fontSize: window.innerWidth <= 768 ? "16px" : "12px" }}
                        {...form_item.input_props}
                        onChange={handleFormInputChange}
                      />
                    </div>
                  );

                case "textarea":
                  return (
                    <div key={index} className="ori-b-pad-15">
                      {
                        form_item.title &&
                        <div
                          className="ori-b-mrgn-7"
                          style={{ lineHeight: "1.3" }}
                        >
                          {form_item.title}
                        </div>
                      }
                      <Input.TextArea
                        style={{ fontSize: window.innerWidth <= 768 ? "16px" : "12px" }}
                        {...form_item.input_props}
                        onChange={handleFormInputChange}
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
                        <div className="ori-b-mrgn-7" style={{ lineHeight: "1.3" }}>{form_item.title}</div>
                      }
                      <Select
                        className="ori-full-width"
                        style={{ fontSize: window.innerWidth <= 768 ? "16px" : "12px" }}
                        getPopupContainer={() => document.getElementById(`select-${index}`)}
                        {...form_item.input_props}
                        onChange={handleFormSelectChange}
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
              onClick={skipForm}
            >
              {translator.text[lang].skip}
            </Button>
            <Button
              className={`ori-lr-mrgn-10 ori-lr-pad-15 ${is_socket_connected ? "ori-btn-fill-primary": ""}`}
              size="small"
              disabled={!is_socket_connected}
              onClick={submitForm}
            >
              {is_socket_connected ? translator.text[lang].submit : translator.text[lang].connecting}
            </Button>
          </div>
        </div>
      );
  };

  return (
    <LangContext.Consumer>
      {
        lang => (
          <div
            className={`ori-absolute ori-animated ori-animation-half ori-bg-default ori-align-full ori-z-index-99994" ${isMounted ? "ori-fade-in" : ori-fade-out} ${end_chat.show_resolved_card ? "ori-z-index-99995" : ""}`}
            style={chatbotStyle.endChatContainer}
          >
            <div
              className="ori-lr-pad-15 ori-b-pad-15 ori-t-pad-20 ori-bg-gradient ori-flex-row ori-flex-jc ori-font-white"
              style={{ height: "220px" }}
            >
              <div>
                <div className="ori-tb-pad-10 ori-flex-row ori-flex-jc">
                  <Avatar
                    style={{
                      height: "55px",
                      width: "55px"
                    }}
                    src={translator.assets[lang].logo}
                  />
                </div>
                {
                  chatbot_setting.image_type_brand_name ?
                    <img
                      style={{
                        height: "40px",
                        margin: "0 auto",
                        display: "block"
                      }}
                      src={translator.assets[lang].brandName}
                      alt={translator.text[lang].brandName}
                    /> :
                    <p className="ori-lr-mrgn-10 ori-font-lg ori-text-center">{translator.text[lang].brandName}</p>
                }
                {
                  end_chat.formTitle &&
                  <p className="ori-animated ori-fade-in ori-font-bold ori-font-md ori-text-center">{end_chat.formTitle}</p>
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
                {renderSessionCloseConfirmation(lang)}
                {renderResolvedChatInfo(lang)}
                {renderDynamicForm(lang)}
              </div>
            </div>
            {
              chatbot_setting.powered_by.visibility &&
              <Suspense fallback={null}>
                <PoweredBy container_class="ori-absolute ori-align-bottom ori-align-left ori-align-right ori-text-center" />
              </Suspense>
            }
          </div>
        )
      }
    </LangContext.Consumer>
  );
}


const InfoCard = props => {
  const { title, ok_text, onClickCancel, onClickOk } = props;
  return (
    <LangContext.Consumer>
      {
        lang => (
          <div className="ori-bg-popup ori-font-popup ori-pad-15 ori-tb-mrgn-10 ori-box-shadow ori-border-radius-5">
            <p className="ori-b-mrgn-10">{title}</p>
            <div className="ori-flex-row ori-flex-jc">
              {
                onClickCancel &&
                <Button
                  className="ori-lr-mrgn-10 ori-lr-pad-15 ori-btn-ghost-primary"
                  size="small"
                  onClick={onClickCancel}
                >
                  {translator.text[lang].cancel}
                </Button>
              }
              <Button
                className="ori-lr-mrgn-10 ori-lr-pad-15 ori-btn-fill-primary"
                size="small"
                onClick={onClickOk}
              >
                {ok_text}
              </Button>
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
  cancelEndConversation: PropTypes.func,
  confirmEndConversation: PropTypes.func,
  handleFormItemChange: PropTypes.func,
  submitForm: PropTypes.func,
  skipForm: PropTypes.func
};

EndChat.defaultProps = {
  is_socket_connected: false,
  end_chat: {},
};

export default DelayComponent(EndChat);
