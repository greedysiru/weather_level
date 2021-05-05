import React, { useCallback, useEffect, useState } from 'react';
import moment from 'moment'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux';
import { weatherActions } from '../redux/modules/weather';
import { Button, Grid, Range } from '../components/elements';
import { RootState } from '../redux/modules';

const Setting = (props) => {
  const preference = useSelector((state: RootState) => state.weather.preference);
  // 대표 지수 이외의 지수 또는 사용자가 중요도 0으로 지정한 데이터 숨기기 위한 state
  const [isHidden, setIsHidden] = useState<boolean>(true);
  const [userId, setUserId] = useState<string>(null);
  const dispatch = useDispatch();
  // 각 range의 상태관리
  const [temp, setTemp] = useState<string>();
  const [rainPer, setRainPer] = useState<string>();
  const [weather, setWeather] = useState<string>();
  const [humidity, setHumidity] = useState<string>();
  const [wind, setWind] = useState<string>();
  const [pm10, setPm10] = useState<string>();
  const [pm25, setPm25] = useState<string>();
  const [corona, setCorona] = useState<string>();
  const [uv, setUv] = useState<string>();
  const [pollenRisk, setPollenRisk] = useState<string>();

  const [asthma, setAsthma] = useState<string>();
  const [foodPoison, setFoodPoison] = useState<string>();


  // localstorage에 저장된 식별자를 가져옴
  useEffect(() => {
    const id = localStorage.getItem('weather-level')
    setUserId(id)
    dispatch(weatherActions.fetchPreference(id))

  }, [])

  // type에 맞게 props 넣어주려고
  const propsData = {
    temp: { label: '기온', rangeValue: temp, setRangeValue: setTemp },
    rainPer: { label: '강수확률', rangeValue: rainPer, setRangeValue: setRainPer },
    weather: { label: '날씨', rangeValue: weather, setRangeValue: setWeather },
    humidity: { label: '습도', rangeValue: humidity, setRangeValue: setHumidity },
    wind: { label: '바람', rangeValue: wind, setRangeValue: setWind },
    pm10: { label: '미세먼지', rangeValue: pm10, setRangeValue: setPm10 },
    pm25: { label: '초미세먼지', rangeValue: pm25, setRangeValue: setPm25 },
    corona: { label: '코로나', rangeValue: corona, setRangeValue: setCorona },
    uv: { label: '자외선', rangeValue: uv, setRangeValue: setUv },
    pollenRisk: { label: '꽃가루농도', rangeValue: pollenRisk, setRangeValue: setPollenRisk },
    asthma: { label: '폐질환위험', rangeValue: asthma, setRangeValue: setAsthma },
    foodPoison: { label: '식중독위험', rangeValue: foodPoison, setRangeValue: setFoodPoison }
  }

  const rangeList = preference?.map((pre, idx) => {

    const key = pre.type
    const value = pre.value.toString()
    return <Range key={idx}
      isHidden={value === "0" ? isHidden : false}
      value={value}
      label={propsData[key].label}
      rangeValue={propsData[key].rangeValue}
      setRangeValue={propsData[key].setRangeValue}
    />
  })


  const onSave = () => {
    const data = {
      coronaRange: corona,
      pm10Range: pm10,
      pm25Range: pm25,
      tempRange: temp,
      rainPerRange: rainPer,
      weatherRange: weather,
      humidityRange: humidity,
      windRange: wind,
      uvRange: uv,
      pollenRiskRange: pollenRisk,
      asthmaRange: asthma,
      foodPoisonRange: foodPoison
    }


    if (userId) {
      dispatch(weatherActions.fetchUpdatePreference(userId, data))
    } else {
      const id = `wl${moment().format('YYMMDDhhmmsss') + Math.floor(Math.random() * 10000)}`
      localStorage.setItem('weather-level', id)
      dispatch(weatherActions.fetchCreatePreference(id, data))
    }

  }

  const onCancle = () => {
    setIsHidden(true)
    dispatch(weatherActions.fetchPreference(userId))
  }

  return (
    <Container>
      {rangeList}
      <Grid>
        <Button _onClick={() => { setIsHidden(!isHidden) }}>{isHidden ? '더보기' : '숨기기'}</Button>
      </Grid>
      <Grid>
        <Button _onClick={onSave}>저장</Button>
        <Button _onClick={onCancle}>취소</Button>
      </Grid>
    </Container>
  )
}


const Container = styled.div`
  width:50%;
  border:1px solid black;   
`
export default Setting;