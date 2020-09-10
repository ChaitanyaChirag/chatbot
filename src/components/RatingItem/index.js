import React, { useState } from 'react'
import PropTypes from 'prop-types'

import './index.scss'

const RatingItem = ({
    title,
    count,
    lowPercent,
    midPercent,
    highPercent,
    lowText,
    midText,
    highText,
}) => {
    const [rating, setRating] = useState(null)

    return (
        <div className='ori-tb-pad-5'>
            {title && (
                <p className='ori-b-mrgn-5 ori-capitalize-first'>{title}</p>
            )}
            {count && (
                <div className='ori-lr-pad-10'>
                    <div className='ori-border-radius-5 ori-flex ori-flex-jsb ori-border-light'>
                        {[...Array(count)].map((rating, i) => {
                            const ratingValue = i + 1
                            return (
                                <div
                                    className='ori-cursor-ptr ori-lr-pad-10 ori-tb-pad-5 ratingItem'
                                    onClick={() => {
                                        setRating(ratingValue)
                                        console.log(ratingValue + ' clicked')
                                    }}>
                                    {ratingValue}
                                </div>
                            )
                        })}
                    </div>
                    <div class='ori-flex ori-t-mrgn-10'>
                        <div style={{ width: `${lowPercent}%` }}>
                            <div class='barHeight bg-red'></div>
                            <div class='ori-font-light ori-t-mrgn-5 textAlign'>
                                {lowText}
                            </div>
                        </div>
                        <div style={{ width: `${midPercent}%` }}>
                            <div class='barHeight bg-yellow'></div>
                            <div class='ori-font-light ori-t-mrgn-5 textAlign'>
                                {midText}
                            </div>
                        </div>
                        <div style={{ width: `${highPercent}%` }}>
                            <div class='barHeight bg-green'></div>
                            <div class='ori-font-light ori-t-mrgn-5 textAlign'>
                                {highText}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

RatingItem.propTypes = {
    title: PropTypes.string,
    count: PropTypes.string,
}

RatingItem.defaultProps = {
    lowPercent: 60,
    midPercent: 20,
    highPercent: 20,
    lowText: 'Not at all satisfied',
    midText: 'Satisfied',
    highText: 'Extremely satisfied',
}

export default RatingItem
