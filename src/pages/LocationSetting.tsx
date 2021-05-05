import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Button, Grid } from 'src/components/elements';
import styled from 'styled-components';
import { RootState } from '../redux/modules';
/* global kakao */
const { kakao } = window;

declare global {
    interface Window {
        kakao: any;
    }
  }

const LocationSetting = props => {
    
    const mapRef = useRef(null)
    const queryInput = useRef(null)
    const [region, setRegion] = useState(null)
    const [query, setQuery] = useState(null)

    const weatherInfo = useSelector((state:RootState) => state.weather.weatherInfo)
    
    useEffect(()=>{

        if(!mapRef.current) return 
        // 초기에 마커를 띄워줌
        const lat = Number(localStorage.getItem('latitude'))
        const log = Number(localStorage.getItem('longitude'))        
        paintMap(lat,log)        
        console.log('useEffect',weatherInfo)
      
    }, [])

    useEffect(()=>{
        console.log('useEffect weatherInfo',weatherInfo)
    },[weatherInfo])

    // 위도 경도 localStorage에 저장
    const setLocation = (latitude:string, longitude:string)=>{
        localStorage.setItem('longitude',longitude)
        localStorage.setItem('latitue',latitude)
    }

    // 현재위치 설정
    const setCurrentLocation = ()=>{
        
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
              // GPS 정보 제공을 허용한 경우
              (position)=> {
                // 현재 사용자 위치의 위도, 경도 정보를 가져오기        
                const { latitude, longitude } = position.coords                
                setLocation(latitude.toString(),longitude.toString())
                paintMap(latitude, longitude)
                alert('현재 위치로 설정했습니다')
              },
              (error)=>{
                alert('위치 정보 제공을 허용해주세요.');
                console.log(error);
              }              
            )} else {
            alert('GPS를 지원하지 않습니다.')
          }        
    }

    const onEnter = (e)=>{        
        if(e.code === 'Enter'){
            setSearchedLocation()
        }
        
    }

    const setSearchedLocation = ()=>{  
        
        const ps = new kakao.maps.services.Places()      
        const callBackSearchPlaces = (data, status, pagination)=>{
            
            if (status === kakao.maps.services.Status.OK) {
                paintMap(Number(data[0].y),Number(data[0].x))
                setLocation(data[0].y,data[0].x)
                const region = data[0].address_name // .split()
                setRegion(region)
                alert(`${region[0]} ${region[1]}로 설정했습니다`)
              }

            if (status === kakao.maps.services.Status.ZERO_RESULT){
                alert('정확한 주소를 입력해주세요')
            }
        }
        console.log(query)
        ps.keywordSearch(query, callBackSearchPlaces); 
    }

    const paintMap = (lat:number, log:number)=>{
        
        const options = {
            center: new kakao.maps.LatLng(lat, log),
            level: 9      
        };
        const map = new kakao.maps.Map(mapRef.current, options);
        const markerPosition  = new kakao.maps.LatLng(lat, log); 
        
        const marker = new kakao.maps.Marker({
                map,
                position: markerPosition
        });
        
    }

    const onChangeInput = (e)=>{
        setQuery(e.target.value)
    }

    return (
        <Container>            
            {region}
            <Grid>                
                <Input onKeyUp={onEnter} type="text" onChange={onChangeInput}  />                  
            </Grid>            
            <Map ref={mapRef} />
            <Button _onClick={setSearchedLocation}>검색 위치로 저장</Button>
            <Button _onClick={setCurrentLocation}>현재 위치로 설정</Button>
            

        </Container>
    )
}

const Container = styled.div`
    
`

const Map = styled.div`
    width:300px;
    height:300px;
`

const Input = styled.input`
    
    width: 100%;
    padding: 12px 4px;
    box-sizing: border-box;
`


export default LocationSetting
