import React, { useCallback, useEffect, useState } from 'react';
import moment from 'moment';
import styled from 'styled-components';
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';
import { css } from '@emotion/core';
import BeatLoader from 'react-spinners/BeatLoader';

import { createNewUserId } from 'src/shared/common';
import { useDispatch, useSelector } from 'react-redux';
import { prefereceList, preferenceType, weatherActions } from '../redux/modules/weather';
import { Button, Grid, Range, Title, Toast } from '../components/elements';

import { RootState } from '../redux/modules';

const PreSetting = (props) => {
  let timer;

  const { history, isMain, moveToMain } = props;
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

    if (isMain) {
      moveToMain();
    }
  };

  const goBack = () => {
    history.goBack();
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

  // 터치 이벤트 버블링 방지
  const stopTouchStart = (e) => {
    e.stopPropagation();
  };

  React.useEffect(() => {
    // RangeWrapper
    const wrapper = document.querySelector('.wrapper');
    wrapper.addEventListener('touchstart', stopTouchStart);
    wrapper.addEventListener('mousedown', stopTouchStart);
    return () => {
      wrapper.removeEventListener('touchstart', stopTouchStart);
      wrapper.removeEventListener('mousedown', stopTouchStart);
    };
  }, []);
  return (
    <Container isMain={isMain}>
      <PreHeader>
        <Grid isColumn>
          <span className="title">중요도 설정</span>
          <span className="des">0: 안 중요함, 100:중요함</span>
        </Grid>
        <Button _onClick={onSave} width="75%">
          저장
        </Button>
      </PreHeader>

      <RangeWrapper className="wrapper">
        {rangeList}
        <ShowButton onClick={handleRangeHidden}>
          {isHidden ? <MdKeyboardArrowDown /> : <MdKeyboardArrowUp />}
        </ShowButton>
      </RangeWrapper>

      {/*  {isMain ? (
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
      )} */}
      <Ment>맨 위 저장 버튼을 꼭 눌러주세요!</Ment>
      {isShowToast && <Toast>{msg}</Toast>}
      <BeatLoader color="#738FFF" loading={loading} css={spinnerStyle} />
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  max-width: 450px;
  height: ${(props) => (props.isMain ? `100%` : `90%`)};
  padding: 2rem;
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
  ${(props) => props.theme.shadow};
`;

const PreHeader = styled.div`
  ${(props) => props.theme.flex.row};
  width: 100%;
  margin: 1.5rem 0;

  & span {
    margin: 0.5rem 0;
  }
  & span.title {
    font-size: 1.75rem;
    font-weight: bold;
  }

  & span.des {
    color: ${(props) => props.theme.color.gray3};
    font-size: 1.25rem;
  }
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

const Ment = styled.div`
  color: ${(props) => props.theme.color.gray3};
  font-size: 1.25rem;
  margin: 1rem 0;
`;

const spinnerStyle = css`
  display: block;
  position: absolute;
  top: 50%;
  margin: 0 auto;
`;

export default PreSetting;
