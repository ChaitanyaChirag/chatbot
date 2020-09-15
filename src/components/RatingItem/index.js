import React from 'react'
import PropTypes from 'prop-types'

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
    const eachWidth = (100/count).toFixed(2)

    const handleRatingChange = ({ ratingValue, index }) => {
        count = ratingValue
        let selectedRating = document.getElementById(`rating-${index}`)
        console.log(selectedRating)
        if (count <= lowCount)
            selectedRating.classList.add('ori-bg-danger', 'ori-font-white')
        else if (count > lowCount && ratingValue <= lowCount + midCount)
            selectedRating.classList.add('ori-bg-yellow', 'ori-font-white')
        else if (count > lowCount + midCount)
            selectedRating.classList.add('ori-bg-green', 'ori-font-white')
    }

    return (
        <div className='ori-tb-pad-5'>
            {
                title &&
                <p className='ori-b-mrgn-5 ori-capitalize-first'>{title}</p>
            }
            {
                count &&
                <div className='ori-lr-pad-10'>
                    <div className='ori-bg-white ori-border-light ori-border-radius-5 ori-flex' >
                        {[...Array(count)].map((_, index) => {
                            const ratingValue = index + 1
                            return (
                                <div
                                    key={index}
                                    id={`rating-${index}`}
                                    style={{ width: `${eachWidth}%` }}
                                    className='ori-cursor-ptr ori-lr-pad-10 ori-tb-pad-5'
                                    onClick={() => handleRatingChange({ ratingValue, index })}>
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
