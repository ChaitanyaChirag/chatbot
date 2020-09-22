import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'

import './index.scss'

import { chatbot_setting } from '../../data/config/urls'

const defaultState = {
  text: "",
  message: "",
  isDeleting: false,
  loopNum: 0,
  typingSpeed: chatbot_setting.chat_interface.type_writer.typing_speed
}

const TypeWriter = ({ textData, className, onClick }) => {
  const [state, setState] = useState(defaultState);
  const containerRef = useRef()

  useEffect(() => {
    let timer = "";
    const handleType = () => {
      setState(cs => ({
        ...cs,
        text: getCurrentText(cs),
        typingSpeed: getTypingSpeed(cs)
      }));
      timer = setTimeout(handleType, state.typingSpeed);
    };
    handleType();
    return () => clearTimeout(timer);
  }, [state.isDeleting]);

  useEffect(() => {
    if (!state.isDeleting && state.text === state.message) {
      setTimeout(() => {
        setState(cs => ({
          ...cs,
          isDeleting: true
        }))
      }, 500);
    } else if (state.isDeleting && state.text === "") {
      setState(cs => ({
        ...cs,
        isDeleting: false,
        loopNum: cs.loopNum + 1,
        message: getMessage(cs, textData)
      }));
    }
  }, [state.text, state.message, state.isDeleting, textData]);

  useEffect(() => {
    if (containerRef && containerRef.current)
      containerRef.current.scrollLeft += 10
  }, [state.text])

  const getCurrentText = currentState => {
    return currentState.isDeleting
      ? currentState.message.substring(0, currentState.text.length - 1)
      : currentState.message.substring(0, currentState.text.length + 1);
  }

  const getMessage = (currentState, data) => {
    return data[Number(currentState.loopNum) % Number(data.length)];
  }

  const getTypingSpeed = currentState => {
    return currentState.isDeleting
      ? chatbot_setting.chat_interface.type_writer.typing_speed
      : chatbot_setting.chat_interface.type_writer.deleting_speed;
  }

  return (
    <div
      ref={containerRef}
      className={`oriTypeWritterContainer ${className}`}
      onClick={onClick}
    >
      <p className="typeWritterText">{state.text} <span className="cursorBlink" /></p>
    </div>
  );
}


TypeWriter.propTypes = {
  textData: PropTypes.array.isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func
}

TypeWriter.defaultProps = {
  textData: ['type your query...'],
  className: ''
}

export default TypeWriter
