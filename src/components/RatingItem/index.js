import React, { useState, useRef, useEffect } from "react"
import PropTypes from "prop-types"
import StarIcon from "react-icons/lib/fa/star";

import { chatbot_setting, translator } from "../../data/config/brandSetup"
import { TYPES } from "../../data/config/constants"
import { LangContext } from "../../modules/context"

const RatingItem = ({
  title,
  name,
  totalCount,
  lowCount,
  midCount,
  highCount,
  lowText,
  midText,
  highText,
  onChange,
  includeZero,
  eachItemText
}) => {
  const [selectedValue, setSelectedValue] = useState(undefined)
  const [showEmoji, setShowEmoji] = useState(false)

  let timer = useRef(null)

  const size = !includeZero ? totalCount : totalCount + 1
  const eachWidth = (100 / totalCount).toFixed(2)

  useEffect(() => {
    if (selectedValue !== null) {
      setShowEmoji(true)
      timer.current = setTimeout(() => setShowEmoji(false), 3000)
    }
    return () => {
      if (timer.current)
        clearTimeout(timer.current)
    }
  }, [selectedValue])

  const handleRatingClick = rating => {
    if (rating !== selectedValue) {
      setSelectedValue(rating)
      onChange(name, rating)
    }
  }

  return (
    <LangContext.Consumer>
      {
        lang => (
          <div className="ori-tb-pad-10">
            {
              title &&
              <p className="ori-b-mrgn-10 ori-capitalize-first">{title}</p>
            }
            {
              chatbot_setting.chat_interface.show_feedback_emoji && showEmoji &&
              <img
                src={
                  selectedValue <= lowCount ?
                    translator.assets[lang].lowRating :
                    (selectedValue > lowCount && (selectedValue <= lowCount + midCount) ?
                      translator.assets[lang].midRating :
                      translator.assets[lang].highRating)
                }
                alt=""
                style={{ height: "50px", width: "50px" }}
                className="ori-animated ori-infinite ori-pulse ori-b-mrgn-5"
              />
            }
            <div className={`ori-bg-white ori-border-radius-3 ori-flex ori-overflow-hidden ${chatbot_setting.feedback_form_rating_type === TYPES.DEFAULT ? "ori-border-light" : ""}`}
            >
              {[...Array(size)].map((_, index) => {
                const ratingValue = !includeZero ? index + 1 : index
                if (chatbot_setting.feedback_form_rating_type === TYPES.STAR) {
                  return (
                    <div
                      key={index}
                      style={{ width: `${eachWidth}%` }}
                      className={`ori-cursor-ptr ori-text-center ori-font-light ori-overflow-hidden ori-flex-column ori-flex-center ${(selectedValue >= ratingValue && selectedValue <= lowCount) ? "ori-font-danger" : ""} ${(selectedValue >= ratingValue && selectedValue > lowCount && selectedValue <= (lowCount + midCount)) ? "ori-font-warning" : ""} ${(selectedValue >= ratingValue && selectedValue > (lowCount + midCount)) ? "ori-font-green" : ""}`}
                      onClick={() => handleRatingClick(ratingValue)}
                    >
                      <StarIcon size={26} />
                      {
                        eachItemText.length > 0 && eachItemText.length === totalCount &&
                        <p className="ori-font-light ori-font-xs">{eachItemText[index]}</p>
                      }
                    </div>
                  )
                } else
                  return (
                    <div
                      key={index}
                      style={{
                        width: `${eachWidth}%`,
                        lineHeight: "28px"
                      }}
                      className={`ori-cursor-ptr ori-text-center ori-overflow-hidden ${selectedValue === ratingValue ? "ori-font-white" : ""} ${(selectedValue === ratingValue && ratingValue <= lowCount) ? "ori-bg-danger" : ""} ${(selectedValue === ratingValue && ratingValue > lowCount && ratingValue <= (lowCount + midCount)) ? "ori-bg-yellow" : ""} ${(selectedValue === ratingValue && ratingValue > (lowCount + midCount)) ? "ori-bg-green" : ""}`}
                      onClick={() => handleRatingClick(ratingValue)}
                    >
                      {ratingValue}
                    </div>
                  )
              })}
            </div>
            {
              (eachItemText.length === 0 || eachItemText.length !== totalCount) &&
              <div className="ori-flex ori-t-mrgn-5 ori-font-xs ori-overflow-hidden">
                <div style={{ width: `${includeZero ? (lowCount + 1) * eachWidth : lowCount * eachWidth}%` }}>
                  {
                    chatbot_setting.show_feedback_rating_linebar &&
                    <div className="ori-bg-danger" style={{ height: "5px" }} />
                  }
                  <p className="ori-font-light">{lowText}</p>
                </div>
                <div style={{ width: `${midCount * eachWidth}%` }}>
                  {
                    chatbot_setting.show_feedback_rating_linebar &&
                    <div className="ori-bg-yellow" style={{ height: "5px" }} />
                  }
                  <p className="ori-font-light">{midText}</p>
                </div>
                <div style={{ width: `${highCount * eachWidth}%` }}>
                  {
                    chatbot_setting.show_feedback_rating_linebar &&
                    <div className="ori-bg-green" style={{ height: "5px" }} />
                  }
                  <p className="ori-font-light">{highText}</p>
                </div>
              </div>
            }
          </div>
        )
      }
    </LangContext.Consumer>
  )
}

RatingItem.propTypes = {
  totalCount: PropTypes.number.isRequired,
  lowCount: PropTypes.number,
  midCount: PropTypes.number,
  highCount: PropTypes.number,
  lowText: PropTypes.string,
  midText: PropTypes.string,
  highText: PropTypes.string,
  onChange: PropTypes.func,
  title: PropTypes.string,
  name: PropTypes.string,
  includeZero: PropTypes.bool,
  eachItemText: PropTypes.array
}

RatingItem.defaultProps = {
  totalCount: 10, // total count indicates total size of feedback input box
  lowCount: 6, // means first 6 boxes will refer lowCount
  midCount: 2, // second 2 boxes will indicates midCount
  highCount: 2, //last 2 boxes will indicates highCount
  lowText: "Not at all satisfied", // text for lowCount
  midText: "Satisfied", // text for midCount
  highText: "Extremely satisfied", // text for highCount
  includeZero: false, // either start with zero or one
  eachItemText: [] // if it has value, each text will display below each box 
}

export default RatingItem
