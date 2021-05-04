import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Button, Input } from 'src/components/elements';
import { weatherActions } from 'src/redux/modules/weather';
import { weatherAPI } from 'src/shared/api';
import useInput from 'src/shared/useInput';
import styled from 'styled-components';


const LocationSetting = props => {
    const dispatch = useDispatch()
    const [query, setQuery] = useState<string>(null)

    const onChagneQuery = (e:any)=>{
        setQuery(e.target.value)
    }
    const setLocation = (latitude:string, longitude:string)=>{
        localStorage.setItem('longitude',longitude)
        localStorage.setItem('latitue',latitude)
    }
    const getCurrentLocation = ()=>{
        // dispatch(weatherActions.getLocation())
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
              // GPS 정보 제공을 허용한 경우
              (position)=> {
                // 현재 사용자 위치의 위도, 경도 정보를 가져오기        
                const { latitude, longitude } = position.coords                
                setLocation(latitude.toString(),longitude.toString())
                
              },
              (error)=>{
                alert('위치 정보 제공을 허용해주세요.');
                console.log(error);
              }              
            )} else {
            alert('GPS를 지원하지 않습니다.')
          }        
    }

    const saveLocation = () =>{

    }

    const searchLocation = async()=>{
        try {
            const res = await weatherAPI.getLocation(query)    
            console.log(res)
        } catch (error) {
            console.error(error)
        }

        
    }
    return (
        <div>
            <Button _onClick={getCurrentLocation}>현재 위치로 설정</Button>
            <Input _onChange={onChagneQuery}/>
            <Button _onClick={searchLocation}>검색</Button>
            <Button _onClick={saveLocation}>저장</Button>

        </div>
    )
}



export default LocationSetting
