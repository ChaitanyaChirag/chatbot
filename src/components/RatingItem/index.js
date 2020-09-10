import React, { useState } from 'react'
import PropTypes from 'prop-types'
<<<<<<< HEAD
import classNames from 'classnames'
=======
>>>>>>> (Update) imports

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
            {
                title &&
                <p className='ori-b-mrgn-5 ori-capitalize-first'>{title}</p>
            }
            {
                count &&
                <div className='ori-lr-pad-10'>
                    <div className='ori-border-light ori-border-radius-10 ori-flex' >
                        {[...Array(count)].map((_, index) => {
                            const ratingValue = index + 1
                            return (
                                <div
                                    key={index}
                                    className={classNames('ori-cursor-ptr ori-lr-pad-10 ori-tb-pad-5 ',
                                        {
                                            'ori-font-white': rating === ratingValue,
                                            'ori-bg-danger': rating === ratingValue && ratingValue <= (lowPercent / 100) * count,
                                            'ori-bg-yellow': rating === ratingValue && ratingValue > (lowPercent / 100) * count && ratingValue <= ((lowPercent + midPercent) / 100) * count,
                                            'ori-bg-green': rating === ratingValue && ratingValue > ((lowPercent + midPercent) / 100) * count
                                        })}
                                    onClick={() => setRating(ratingValue)}>
                                    {ratingValue}
                                </div>
                            )
                        })}
                    </div>
                    <div className='ori-flex ori-t-mrgn-5'>
                        <div style={{ width: `${lowPercent}%` }}>
                            <div className='ori-bg-danger' style={{ height: '5px' }}></div>
                            <div className='ori-font-light ori-t-mrgn-5 ori-text-left'>
                                {lowText}
                            </div>
                        </div>
                        <div style={{ width: `${midPercent}%` }}>
                            <div className='ori-bg-yellow' style={{ height: '5px' }}></div>
                            <div className='ori-font-light ori-t-mrgn-5 ori-text-left'>
                                {midText}
                            </div>
                        </div>
                        <div style={{ width: `${highPercent}%` }}>
                            <div className='ori-bg-green' style={{ height: '5px' }}></div>
                            <div className='ori-font-light ori-t-mrgn-5 ori-text-left'>
                                {highText}
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

RatingItem.propTypes = {
    title: PropTypes.string,
    count: PropTypes.number,
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
