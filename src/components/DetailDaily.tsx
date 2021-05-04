import React from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/modules';

const DetailDaily = props => {
    const {category} = props
    // category : rainPer, tmp, weather
    const state = useSelector((state: RootState) => state.weather.weatherInfo?.dayInfo)
    console.log(state)
    return (
        <div>
            {category}
        </div>
    )
}


export default DetailDaily
