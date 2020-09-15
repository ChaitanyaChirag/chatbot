import React, { useState } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

const RatingItem = ({
    title,
    count,
    lowCount,
    midCount,
    highCount,
    lowText,
    midText,
    highText,
}) => {
    const [rating, setRating] = useState(null)
    const eachWidth = (100/count).toFixed(2)

    return (
        <div className='ori-tb-pad-5'>
            {
                title &&
                <p className='ori-b-mrgn-5 ori-capitalize-first'>{title}</p>
            }
            {
                count &&
                <div className='ori-lr-pad-10'>
                    <div className='ori-bg-white ori-border-light ori-border-radius-3 ori-flex' >
                        {[...Array(count)].map((_, index) => {
                            const ratingValue = index + 1
                            return (
                                <div
                                    key={index}
                                    style={{ width: `${eachWidth}%`}}
                                    className={classNames('ori-cursor-ptr ori-lr-pad-10 ori-tb-pad-5 ',
                                        {
                                            'ori-font-white': rating === ratingValue,
                                            'ori-bg-danger': rating === ratingValue && ratingValue <= lowCount ,
                                            'ori-bg-yellow': rating === ratingValue && ratingValue > lowCount && ratingValue <= (lowCount + midCount),
                                            'ori-bg-green': rating === ratingValue && ratingValue > (lowCount + midCount)
                                        })}
                                    onClick={() => setRating(ratingValue)}>
                                    {ratingValue}
                                </div>
                            )
                        })}
                    </div>
                    <div className='ori-flex ori-t-mrgn-5'>
                        <div style={{ width: `${lowCount * eachWidth}%` }}>
                            <div className='ori-bg-danger' style={{ height: '5px' }}></div>
                            <div className='ori-font-light ori-t-mrgn-5 ori-text-left'>
                                {lowText}
                            </div>
                        </div>
                        <div style={{ width: `${midCount * eachWidth}%` }}>
                            <div className='ori-bg-yellow' style={{ height: '5px' }}></div>
                            <div className='ori-font-light ori-t-mrgn-5 ori-text-left'>
                                {midText}
                            </div>
                        </div>
                        <div style={{ width: `${highCount * eachWidth}%` }}>
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
    count: 10,
    lowCount: 6,
    midCount: 2,
    highCount: 2,
    lowText: 'Not at all satisfied',
    midText: 'Satisfied',
    highText: 'Extremely satisfied',
}

export default RatingItem
