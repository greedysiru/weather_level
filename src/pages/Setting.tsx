import React, { useCallback, useState } from 'react';
import styled from 'styled-components'
import useInput from '../shared/useInput';
import { Button, Grid, Range } from '../components/elements';
// TODO : value 값 기준으로 정렬, 0인거 숨기기, 숨기기-펼침처리, 
// 각 Range 컴포넌트에 value와 onchange를 어떻게 주입하지? 하드코딩?
const Setting = (props) => {
  // 대표 지수 이외의 지수 또는 사용자가 중요도 0으로 지정한 데이터 숨기기 위한 state
  const [isHidden, setIsHidden] = useState(true)

  // 각 range의 상태관리
  const [temp, setTemp, onChangeTemp] = useInput();
  const [rainPer, setRainPer, onChangeRainPer] = useInput();
  const [weather, setWeather, onChangeWeather] = useInput();
  const [humidity, setHumidity, onChangeHumidity] = useInput();
  const [wind, setWind, onChangeWind] = useInput();
  const [pm10, setPm10, onChangePm10] = useInput();
  const [pm25, setPm25, onChangePm25] = useInput();
  const [corona, setCorona, onChangeCorona] = useInput();
  const [uv, setUv, onChangeUv] = useInput();
  const [pollenRisk, setPollenRisk, onChangePollenRisk] = useInput();
  const [cold, setCold, onChangeCold] = useInput();
  const [asthma, setAsthma, onChangeAsthma] = useInput();
  const [foodPoison, setFoodPoison, onChangeFoodPoison] = useInput();

  // type에 맞게 props 넣어주려고
  const data = {
    temp: { label: '기온', rangeValue: temp, setRangeValue: setTemp, _onChange: onChangeTemp },
    rainPer: { label: '강수확률', rangeValue: rainPer, setRangeValue: setRainPer, _onChange: onChangeRainPer },
    weather: { label: '하늘', rangeValue: weather, setRangeValue: setWeather, _onChange: onChangeWeather },
    humidity: { label: '습도', rangeValue: humidity, setRangeValue: setHumidity, _onChange: onChangeHumidity },
    wind: { label: '바람', rangeValue: wind, setRangeValue: setWind, _onChange: onChangeWind },
    pm10: { label: '미세먼지', rangeValue: pm10, setRangeValue: setPm10, _onChange: onChangePm10 },
    pm25: { label: '초미세먼지', rangeValue: pm25, setRangeValue: setPm25, _onChange: onChangePm25 },
    corona: { label: '코로나', rangeValue: corona, setRangeValue: setCorona, _onChange: onChangeCorona },
    uv: { label: '자외선', rangeValue: uv, setRangeValue: setUv, _onChange: onChangeUv },
    pollenRisk: { label: '꽃가루농도', rangeValue: pollenRisk, setRangeValue: setPollenRisk, _onChange: onChangePollenRisk },
    cold: { label: '감기 가능성', rangeValue: cold, setRangeValue: setCold, _onChange: onChangeCold },
    asthma: { label: '폐질환위험', rangeValue: asthma, setRangeValue: setAsthma, _onChange: onChangeAsthma },
    foodPoison: { label: '식중독위험', rangeValue: foodPoison, setRangeValue: setFoodPoison, _onChange: onChangeFoodPoison }
  }
  //  샘플데이터
  const list = [
    { type: 'temp', value: '10' },
    { type: 'rainPer', value: '6' },
    { type: 'weather', value: '9' },
    { type: 'humidity', value: '3' },
    { type: 'wind', value: '0' },
    { type: 'pm10', value: '0' },
    { type: 'pm25', value: '0' },
    { type: 'corona', value: '0' },
    { type: 'uv', value: '0' },
    { type: 'pollenRisk', value: '0' },
    { type: 'cold', value: '0' },
    { type: 'asthma', value: '0' },
    { type: 'foodPoison', value: '0' },
  ]
  // 정렬
  list.sort((a, b) => {
    return parseInt(b.value, 10) - parseInt(a.value, 10)
  })

  const RangeList = list.map((ele, idx) => {

    return <Range key={idx}
      isHidden={ele.value === "0" ? isHidden : false}
      value={ele.value}
      label={data[ele.type].label}
      _onChange={data[ele.type]._onChange}
      rangeValue={data[ele.type].rangeValue}
      setRangeValue={data[ele.type].setRangeValue}
    />

  })


  const onSave = () => {
    console.log('temp', temp,
      'rainPer', rainPer,
      'weather', weather,
      'humidiy', humidity,
      'wind', wind,
      'pm10', pm10,
      'pm25', pm25,
      'corona', corona,
      'uv', uv,
      'pollenRisk', pollenRisk,
      'cold', cold,
      'asthma', asthma,
      'foodPoison', foodPoison)
  }

  const onCancle = () => {
    // 데이터 다시 불러오기..? 렌더링 수가 너무 많나?껄껄껄    
  }

  return (
    <Container>
      {RangeList}
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