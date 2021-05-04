import React from 'react'
import PropTypes from 'prop-types'

const DetailWeekly = props => {
    const {category} = props
    console.log(category)
    return (
        <div>
            {category}
        </div>
    )
}

DetailWeekly.propTypes = {

}

export default DetailWeekly
