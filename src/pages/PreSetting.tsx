import React, { useCallback, useEffect, useState } from 'react';
import moment from 'moment';
import styled from 'styled-components';
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';
import { createNewUserId } from 'src/shared/common';
import { useDispatch, useSelector } from 'react-redux';
import { prefereceList, preferenceType, weatherActions } from '../redux/modules/weather';
import { Button, Grid, Range } from '../components/elements';

import { RootState } from '../redux/modules';

const PreSetting = (props) => {
  const { history, isMain } = props;
  const { preference, isLoadedPreference, isLoaded } = useSelector((state: RootState) => state.weather);

  // 대표 지수 이외의 지수 또는 사용자가 중요도 0으로 지정한 데이터 숨기기 위한 state
  const [isHidden, setIsHidden] = useState<boolean>(true);
  const [userId, setUserId] = useState<string>(null);
  const dispatch = useDispatch();

  const [toastMsg, setToastMsg] = useState<string>(null); // 토스트 메시지
  const [isShowToast, setIsShowToast] = useState<boolean>(false);
  const [timerState, setTimerState] = useState(null);
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
  }, []);

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
    foodPoison: { label: '식중독위험', rangeValue: foodPoison, setRangeValue: setFoodPoison },
  };
  console.log('rendering');
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

    dispatch(weatherActions.fetchUpdatePreference(data));
    setIsHidden(true);
  };

  const goBack = () => {
    history.replace('/setting');
  };

  const handleRangeHidden = () => {
    setIsHidden(!isHidden);
  };
  return (
    <Container >
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
          <Button width="45%" _onClick={goBack}>
            이전
          </Button>
          <Button width="45%" _onClick={onSave}>
            저장
          </Button>
        </Grid>
      )}
    </Container>
  );
};

const Container = styled.div`
  width: 360px;
  height: 100%;
  padding: 1rem;
  ${(props) => props.theme.flex.column};
  justify-content: center;
`;

const RangeWrapper = styled.div`
  ${(props) => props.theme.flex.column};
  margin: 1rem;
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
  margin: 1rem;
`;

const ShowButton = styled.div`
  text-align: center;
  width: 100%;
  margin-top: 10px;
  position: relative;
  top: 15px;
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
export default PreSetting;
