import React, { useCallback, useEffect, useState } from 'react';
import moment from 'moment'
import styled from 'styled-components'
import { useDispatch } from 'react-redux';
import { weatherActions } from '../redux/modules/weather';
import { Button, Grid, Range } from '../components/elements';


const Setting = (props) => {
 // 대표 지수 이외의 지수 또는 사용자가 중요도 0으로 지정한 데이터 숨기기 위한 state
 const [isHidden, setIsHidden] = useState<boolean>(true)
 const [isNewUser, setIsNewUser] = useState<boolean>(true)
 const [userId, setUserId] = useState<string>(null)
 const dispatch = useDispatch()
 // 각 range의 상태관리
 const [temp,setTemp] = useState();
 const [rainPer,setRainPer] = useState();
 const [weather,setWeather] = useState();
 const [humidity,setHumidity] = useState();
 const [wind,setWind] = useState();
 const [pm10,setPm10] = useState();
 const [pm25,setPm25] = useState();
 const [corona,setCorona] = useState();
 const [uv,setUv] = useState();
 const [pollenRisk,setPollenRisk] = useState();
 const [cold,setCold] = useState();
 const [asthma,setAsthma] = useState();
 const [foodPoison,setFoodPoison] = useState();

 // localstorage에 저장된 식별자를 가져옴
 useEffect(() => {
   let id = localStorage.getItem('weather-level')
   
   if(id){
     setIsNewUser(false)      
     
   }else{
     id = `wl${moment().format('YYMMdhhmmsss')+Math.floor(Math.random()*10000)}`      
     localStorage.setItem('weather-level',id)      
   }

   setUserId(id)
   
 }, [])

 // type에 맞게 props 넣어주려고
 const data = {
   temp: {label:'기온',rangeValue:temp,setRangeValue:setTemp},
   rainPer:{label:'강수확률',rangeValue:rainPer,setRangeValue:setRainPer},
   weather:{label:'하늘',rangeValue:weather,setRangeValue:setWeather},
   humidity:{label:'습도',rangeValue:humidity,setRangeValue:setHumidity},
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
   {type:'humidity',value:'3'},
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
   return parseInt(b.value,10) - parseInt(a.value,10)
 })

 const RangeList = list.map((ele,idx)=>{

         return <Range key={idx} 
                       isHidden={ele.value==="0"? isHidden:false} 
                       value={ele.value}                         
                       label={data[ele.type].label}                        
                       rangeValue={data[ele.type].rangeValue}
                       setRangeValue={data[ele.type].setRangeValue}
                       />
   
 })

 
 const onSave = ()=>{
   const data = {
     coronaRange:corona,
     pm10Range:pm10,
     pm24Range:pm25,
     tempRange:temp,
     rainPerRange:rainPer,
     weatherRange:weather,
     humidityRange:humidity,
     windRange:wind,
     uvRange:uv,
     pollenRiskRange:pollenRisk,
     asthmaRange:asthma,
     foodPoisonRange:foodPoison
   }

   dispatch(weatherActions.fetchCreatePreference(userId,data))
       
   /* if(isNewUser){
     dispatch(weatherActions.fetchCreatePreference(userId,data))
   }else{
     dispatch(weatherActions.fetchUpdatePreference(userId,data))
   }  */
  
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