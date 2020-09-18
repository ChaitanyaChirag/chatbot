import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

const CONSTANTS = {
  DELETING_SPEED: 30,
  TYPING_SPEED: 150,
}

const defaultState = {
  text: "",
  message: "",
  isDeleting: false,
  loopNum: 0,
  typingSpeed: CONSTANTS.TYPING_SPEED,
}

const TypeWriter = ({ textData, className, onClick }) => {
  const [state, setState] = useState(defaultState);

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
      ? CONSTANTS.TYPING_SPEED
      : CONSTANTS.DELETING_SPEED;
  }

  return (
    <div className={className} onClick={onClick}>
      <span>{state.text}</span>
      <span className="ori-cursor" />
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
