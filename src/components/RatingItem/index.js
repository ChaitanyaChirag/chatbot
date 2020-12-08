import React, { useState, useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { chatbot_setting } from '../../data/config/urls'
import { emojiHappy, emojiSad, emojiSmile } from '../../data/assets'

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
  includeZero
}) => {
  const [selectedValue, setSelectedValue] = useState(null)
  const [showEmoji, setShowEmoji] = useState(false)

  let timer = useRef(null)

  const size = !includeZero ? totalCount : totalCount + 1
  const eachWidth = (100 / totalCount).toFixed(2)
  const imageSrc = selectedValue <= lowCount ? emojiSad : (selectedValue > lowCount && selectedValue <= lowCount + midCount ? emojiSmile : emojiHappy)

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
    <div className='ori-tb-pad-5'>
      {
        title &&
        <p className='ori-b-mrgn-5 ori-capitalize-first'>{title}</p>
      }
      {
        chatbot_setting.chat_interface.show_feedback_emoji && showEmoji &&
        <img
          src={imageSrc}
          alt=""
          style={{height: '50px', width: '50px'}}
          className="ori-animated ori-infinite ori-pulse ori-b-mrgn-5"
        />
      }
      <div className='ori-bg-white ori-border-light ori-border-radius-3 ori-flex ori-overflow-hidden' >
        {[...Array(size)].map((_, index) => {
          const ratingValue = !includeZero ? index + 1 : index
          return (
            <div
              key={index}
              style={{
                width: `${eachWidth}%`,
                lineHeight: '28px'
              }}
              className={classNames('ori-cursor-ptr ori-text-center ori-overflow-hidden',
                {
                  'ori-font-white': selectedValue === ratingValue,
                  'ori-bg-danger': selectedValue === ratingValue && ratingValue <= lowCount,
                  'ori-bg-yellow': selectedValue === ratingValue && ratingValue > lowCount && ratingValue <= (lowCount + midCount),
                  'ori-bg-green': selectedValue === ratingValue && ratingValue > (lowCount + midCount),
                }
              )}
              onClick={() => handleRatingClick(ratingValue)}
            >
              {ratingValue}
            </div>
          )
        })}
      </div>
      <div className='ori-flex ori-t-mrgn-5 ori-font-xs ori-overflow-hidden'>
        <div style={{ width: `${includeZero ? (lowCount + 1) * eachWidth : lowCount * eachWidth}%` }}>
          <div className='ori-bg-danger' style={{ height: '5px' }} />
          <p className='ori-font-light'>{lowText}</p>
        </div>
        <div style={{ width: `${midCount * eachWidth}%` }}>
          <div className='ori-bg-yellow' style={{ height: '5px' }} />
          <p className='ori-font-light'>{midText}</p>
        </div>
        <div style={{ width: `${highCount * eachWidth}%` }}>
          <div className='ori-bg-green' style={{ height: '5px' }} />
          <p className='ori-font-light'>{highText}</p>
        </div>
      </div>

    </div>
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
}

RatingItem.defaultProps = {
  totalCount: 10,
  lowCount: 6,
  midCount: 2,
  highCount: 2,
  lowText: 'Not at all satisfied',
  midText: 'Satisfied',
  highText: 'Extremely satisfied',
  includeZero: false,
}

export default RatingItem
