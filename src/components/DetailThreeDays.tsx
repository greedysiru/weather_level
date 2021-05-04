import React from 'react'
import PropTypes from 'prop-types'

const DetailThreeDays = props => {
    const {category} = props
    console.log(category)
    return (
        <div>
            {category}
        </div>
    )
}

DetailThreeDays.propTypes = {

}

export default DetailThreeDays
