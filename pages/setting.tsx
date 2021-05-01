import { Button, Grid, Range } from 'components/elements';
import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components'
// TODO : value 값 기준으로 정렬, 0인거 숨기기, 숨기기-펼침처리, 
// 각 Range 컴포넌트에 value와 onchange를 어떻게 주입하지? 하드코딩?
const Setting = (props) => {
  // 대표 지수 이외의 지수 또는 사용자가 중요도 0으로 지정한 데이터 숨기기 위한 state
  const [isHidden, setIsHidden] = useState(true)
  
  // 각 range의 상태관리
  const [temp,setTemp] = useState<string>();
  const [rainPer,setRainPer] = useState<string>();
  const [weather,setWeather] = useState<string>();
  const [humidiy,setHumidiy] = useState<string>();
  const [wind,setWind] = useState<string>();
  const [pm10,setPm10] = useState<string>();
  const [pm25,setPm25] = useState<string>();
  const [corona,setCorona] = useState<string>();
  const [uv,setUv] = useState<string>();
  const [pollenRisk,setPollenRisk] = useState<string>();
  const [cold,setCold] = useState<string>();
  const [asthma,setAsthma] = useState<string>();
  const [foodPoison,setFoodPoison] = useState<string>();

  // type에 맞게 props 넣어주려고
  const data = {
    temp: {label:'기온',rangeValue:temp,setRangeValue:setTemp},
    rainPer:{label:'강수확률',rangeValue:rainPer,setRangeValue:setRainPer},
    weather:{label:'하늘',rangeValue:weather,setRangeValue:setWeather},
    humidiy:{label:'습도',rangeValue:humidiy,setRangeValue:setHumidiy},
    wind:{label:'바람',rangeValue:wind,setRangeValue:setWind},
    pm10:{label:'미세먼지',rangeValue:pm10,setRangeValue:setPm10},
    pm25:{label:'초미세먼지',rangeValue:pm25,setRangeValue:setPm25},
    corona:{label:'코로나',rangeValue:corona,setRangeValue:setCorona},
    uv:{label:'자외선',rangeValue:uv,setRangeValue:setUv},
    pollenRisk:{label:'꽃가루농도',rangeValue:pollenRisk,setRangeValue:setPollenRisk},
    cold:{label:'감기 가능성',rangeValue:cold,setRangeValue:setCold},
    asthma:{label:'폐질환위험',rangeValue:asthma,setRangeValue:setAsthma},
    foodPoison:{label:'식중독위험',rangeValue:foodPoison,setRangeValue:setFoodPoison}
  }
  //  샘플데이터
  const list = [
    {type:'temp',value:'10'},
    {type:'rainPer',value:'6'},
    {type:'weather',value:'9'},
    {type:'humidiy',value:'3'},
    {type:'wind',value:'0'},
    {type:'pm10',value:'0'},
    {type:'pm25',value:'0'},
    {type:'corona',value:'0'},
    {type:'uv',value:'0'},
    {type:'pollenRisk',value:'0'},
    {type:'cold',value:'0'},
    {type:'asthma',value:'0'},
    {type:'foodPoison',value:'0'},
  ]
  // 정렬
  list.sort((a,b)=>{
    return parseInt(b.value) - parseInt(a.value)
  })
  const onChageRangeValue = (e)=>{
    console.log(e.target.value)
    //setTemp(e.target.value)
    setTemp('10')
  }

  useEffect(()=>{
    console.log(temp)
  },[temp])
  const RangeList = list.map((ele,idx)=>{

          return <Range key={idx} 
                        isHidden={ele.value==="0"? isHidden:false} 
                        value={ele.value}                         
                        label={data[ele.type].label} 
                        rangeValue={data[ele.type].rangeValue}
                        setRangeValue={data[ele.type].setRangeValue}
                        _onChange={onChageRangeValue}
                        />
    
  })

  
  const onSave = ()=>{
    console.log('temp',temp,
      'rainPer',rainPer,
      'weather',weather,
      'humidiy',humidiy,
      'wind',wind,
      'pm10',pm10,
      'pm25',pm25,
      'corona',corona,
      'uv',uv,
      'pollenRisk',pollenRisk,
      'cold',cold,
      'asthma',asthma,
      'foodPoison',foodPoison,)
  }

  const onCancle = ()=>{
    // 데이터 다시 불러오기..? 렌더링 수가 너무 많나?껄껄껄    
  }
  
  return (
    <Container>      
        {RangeList}
        <Grid>
          <Button _onClick={()=>{setIsHidden(!isHidden)}}>{isHidden?'더보기':'숨기기'}</Button>
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