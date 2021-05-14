import React, { useCallback, useEffect, useState } from 'react';
import moment from 'moment';
import styled from 'styled-components';
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';
import { css } from '@emotion/core';
import BeatLoader from 'react-spinners/BeatLoader';

import { createNewUserId } from 'src/shared/common';
import { useDispatch, useSelector } from 'react-redux';
import { prefereceList, preferenceType, weatherActions } from '../redux/modules/weather';
import { Button, Grid, Range, Toast } from '../components/elements';

import { RootState } from '../redux/modules';

const PreSetting = (props) => {
  let timer;

  const { history, isMain } = props;
  const dispatch = useDispatch();

  const { preference } = useSelector((state: RootState) => state.weather);
  const isDesktopMode = useSelector((state: RootState) => state.common.isDesktopMode);
  const { msg, loading } = useSelector((state: RootState) => state.common); // 토스트 관련 store state

  // 대표 지수 이외의 지수 또는 사용자가 중요도 0으로 지정한 데이터 숨기기 위한 state
  const [isHidden, setIsHidden] = useState<boolean>(true);
  const [userId, setUserId] = useState<string>(null);

  const [isShowToast, setIsShowToast] = useState<boolean>(false);
  // 각 range의 상태관리
  const [temp, setTemp] = useState<string>('');
  const [rainPer, setRainPer] = useState<string>('');
  const [weather, setWeather] = useState<string>('');
  const [humidity, setHumidity] = useState<string>('');
  const [wind, setWind] = useState<string>('');
  const [pm10, setPm10] = useState<string>('');
  const [pm25, setPm25] = useState<string>('');
  const [corona, setCorona] = useState<string>('');
  const [uv, setUv] = useState<string>('');
  const [pollenRisk, setPollenRisk] = useState<string>('');
  const [asthma, setAsthma] = useState<string>('');
  const [foodPoison, setFoodPoison] = useState<string>('');
  // localstorage에 저장된 식별자를 가져옴
  useEffect(() => {
    const id = localStorage.getItem('weather-level');
    setUserId(id);

    return () => {
      clearTimeout(timer);
      setIsShowToast(false);
    };
  }, []);

  // type에 맞게 props 넣어주려고
  const propsData = {
    temp: { label: '기온', rangeValue: temp, setRangeValue: setTemp },
    rainPer: { label: '강수확률', rangeValue: rainPer, setRangeValue: setRainPer },
    weather: { label: '하늘상태', rangeValue: weather, setRangeValue: setWeather },
    humidity: { label: '습도', rangeValue: humidity, setRangeValue: setHumidity },
    wind: { label: '바람', rangeValue: wind, setRangeValue: setWind },
    pm10: { label: '미세먼지', rangeValue: pm10, setRangeValue: setPm10 },
    pm25: { label: '초미세먼지', rangeValue: pm25, setRangeValue: setPm25 },
    corona: { label: '코로나', rangeValue: corona, setRangeValue: setCorona },
    uv: { label: '자외선', rangeValue: uv, setRangeValue: setUv },
    pollenRisk: { label: '꽃가루농도', rangeValue: pollenRisk, setRangeValue: setPollenRisk },
    asthma: { label: '폐질환위험', rangeValue: asthma, setRangeValue: setAsthma },
    foodPoison: { label: '식중독위험', rangeValue: foodPoison, setRangeValue: setFoodPoison },
  };

  const rangeList = preference.map((pre, idx) => {
    const key = pre.type;

    const value = pre.value.toString();

    return (
      <Range
        key={idx}
        isHidden={value === '0' ? isHidden : false}
        value={value}
        label={propsData[key].label}
        rangeValue={propsData[key].rangeValue}
        setRangeValue={propsData[key].setRangeValue}
      />
    );
  });
  const onSave = async () => {
    const data = {
      coronaWeight: corona,
      pm10Weight: pm10,
      pm25Weight: pm25,
      tempWeight: temp,
      rainPerWeight: rainPer,
      weatherWeight: weather,
      humidityWeight: humidity,
      windWeight: wind,
      uvWeight: uv,
      pollenRiskWeight: pollenRisk,
      asthmaWeight: asthma,
      foodPoisonWeight: foodPoison,
    };

    await dispatch(weatherActions.fetchUpdatePreference(data));
    setIsHidden(true);
    openToast();
  };

  const goBack = () => {
    history.replace('/setting');
  };

  const handleRangeHidden = () => {
    setIsHidden(!isHidden);
  };

  const openToast = () => {
    if (timer) {
      clearTimeout(timer);
    }
    setIsShowToast(true);

    timer = setTimeout(() => {
      setIsShowToast(false);
    }, 3000);
  };
  return (
    <Container isFull={isDesktopMode && isMain}>
      <Title>
        당신이 외출할 때 <br />
        중요하게 여기는 것을 알려주세요!
      </Title>
      <RangeWrapper>
        {rangeList}
        <ShowButton onClick={handleRangeHidden}>
          {isHidden ? <MdKeyboardArrowDown /> : <MdKeyboardArrowUp />}
        </ShowButton>
      </RangeWrapper>

      {isMain ? (
        <Grid jc="center">
          <Button width="100%" _onClick={onSave}>
            저장
          </Button>
        </Grid>
      ) : (
        <Grid jc="space-between">
          <Button width="47%" _onClick={goBack}>
            이전
          </Button>
          <Button width="47%" _onClick={onSave}>
            저장
          </Button>
        </Grid>
      )}
      {isShowToast && <Toast>{msg}</Toast>}
      <BeatLoader color="#738FFF" loading={loading} css={spinnerStyle} />
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  max-width: 450px;
  height: ${(props) => (props.isFull ? `100%` : `90%`)};
  padding: 1rem;
  ${(props) => props.theme.flex.column};
  justify-content: flex-start;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const RangeWrapper = styled.div`
  ${(props) => props.theme.flex.column};
  margin: 0.5rem;
  background-color: white;
  width: 100%;
  padding: 2rem;
  border-radius: 14px;
  border: solid 0.5px ${(props) => props.theme.color.purple};
  box-shadow: ${(props) => props.theme.shadow};
`;

const Title = styled.div`
  font-size: 1.7rem;
  text-align: center;
  line-height: 2.5rem;
  font-weight: 500;
  margin: 1rem 0;
`;

const ShowButton = styled.div`
  text-align: center;
  width: 100%;
  position: relative;
  top: 10px;
  cursor: pointer;

  &:hover svg {
    color: black;
  }
  & svg {
    font-size: 18px;
    color: ${(props) => props.theme.color.gray3};
    transition: 0.3s;
  }
`;

const spinnerStyle = css`
  display: block;
  position: absolute;
  top: 50%;
  margin: 0 auto;
`;
export default PreSetting;
