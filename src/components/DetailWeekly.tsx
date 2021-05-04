import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'src/redux/modules'
import { timeActions } from 'src/redux/modules/time'
import styled from 'styled-components'
import TimeInfo from './TimeInfo'
import { LongCard } from './elements'

const DetailWeekly = props => {
    const {category} = props
    const dispatch = useDispatch()
    const dayOfWeek = useSelector((state: RootState) => state.time.dayOfWeek);
    const state = useSelector((state: RootState) => state.weather.weatherInfo?.weekInfo)

    useEffect(()=>{        
        dispatch(timeActions.getTimeInfo());                
    },[])
    
    const {humidity,maxTmp,minTmp,rainPer,tmp,weather,weatherDes,windSpeed} = state

    const titles = {
        humidity:'습도',
        temp:'기온',
        rainPer:'강수확률',
        weather:'날씨',
        windSpeed:'바람'
    }

    // temp정보

    // 날씨정보

    // 나머지
    const EtcCompo = state[category].map((data,idx)=>{
        console.log(data)
        return <LongCard key={idx} day={dayOfWeek?.[idx]} data={data} />
    })
    return (
        <Container>
            <Title>{titles[category]}</Title>
            {EtcCompo}
            {/* <Contents>                
                <TimeInfo
                    info={humidity}
                    label="습도"
                    dayOfWeek={dayOfWeek}
                    score
                />
                <TimeInfo
                    info={weather}
                    label="날씨"
                    dayOfWeek={dayOfWeek}
                    score
                />
                <TimeInfo
                    info={rainPer}
                    label="강수확률"
                    dayOfWeek={dayOfWeek}
                    score
                />
                <TimeInfo
                    info={windSpeed}
                    label="풍속"
                    dayOfWeek={dayOfWeek}
                    score
                /> 
            </Contents> */}
        </Container>
    )
}
const Container = styled.div`
    width:100%;
    height:100%;
    ${props=>props.theme.flex.column};
`

const Title = styled.div`
    font-size:2rem;
`

const Contents = styled.div`
    width:100%;
    height:100%;
`

const Card = styled.div`

`
export default DetailWeekly
