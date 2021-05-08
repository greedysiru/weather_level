import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Grid } from 'src/components/elements';
import { locationActions } from 'src/redux/modules/location';
import styled from 'styled-components';
import { RootState } from '../redux/modules';

const LocationSetting = (props) => {
  const { history } = props;

  const dispatch = useDispatch();

  const weatherInfo = useSelector((state: RootState) => state.weather.weatherInfo);

  useEffect(() => {
    dispatch(locationActions.fetchUserRegion());
    dispatch(locationActions.fetchAllResions());
  }, []);

  // 위도 경도 localStorage에 저장
  const setLocation = (latitude: string, longitude: string) => {
    localStorage.setItem('longitude', longitude);
    localStorage.setItem('latitude', latitude);
  };

  // 현재위치 설정
  const setCurrentLocation = () => { };

  const onEnter = (e) => {
    if (e.code === 'Enter') {
      setSearchedLocation();
    }
  };

  const setSearchedLocation = () => { };

  const goAddPage = () => {
    console.log('ㅎㅎ');
    history.push('/setting/location/add');
  };
  return (
    <Container>
      <Grid width="100%">
        <span>위치 설정</span>
        <button type="button" onClick={goAddPage}>
          추가
        </button>
      </Grid>
      <Wrapper>
        <LocationCard>현재 위치 : 하동군 진교면</LocationCard>
        <LocationCard>경남 하동군</LocationCard>
        <LocationCard>수원시 팔달구</LocationCard>
        <LocationCard>서울시 중구</LocationCard>
      </Wrapper>
    </Container>
  );
};

const Container = styled.div`
  width: 360px;
  border: 1px solid black;
  height: 100%;
`;

const Title = styled.div``;

const Wrapper = styled.div`
  width: 100%;
  ${(props) => props.theme.border_box};
  padding: 1rem;
`;

const LocationCard = styled.div`
  width: 100%;
  height: 50px;
  border-radius: 20px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  border: solid 0.5px ${(props) => props.theme.color.purple};
  margin: 1rem 0;
  ${(props) => props.theme.border_box};
  ${(props) => props.theme.flex.row};
  padding: 1rem;
`;
export default LocationSetting;
