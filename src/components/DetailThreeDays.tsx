import React, { useEffect, useState } from 'react';

import styled from 'styled-components';

import { convertWeaterInfo } from 'src/shared/common';

import { useSelector } from 'react-redux';
import { RootState } from '../redux/modules';

import { Button, Card, Grid, Image, Title } from './elements';

import uvLogo from '../icons/sun.png';
import windLogo from '../icons/wind.png';
import oakPollenRiskLogo from '../icons/wind.png';
import foodPoisonLogo from '../icons/wind.png';

const DetailThreeDays = (props) => {
  const { category, history } = props;
  const { livingHealthWeather } = useSelector((state: RootState) => state.weather.weatherInfo);

  const [type, setType] = useState(null);
  const [todayDes, setTodayDes] = useState(null);
  const [tomorrowDes, setTomorrowDes] = useState(null);
  const [afterTomorrow, setAfterTomorrow] = useState(null);

  const contents = {
    uv: ['자외선 지수', uvLogo],
    asthma: ['폐질환 위험 지수', windLogo],
    foodPoison: ['식중독 위험 지수', oakPollenRiskLogo],
    oakPollenRisk: ['꽃가루 농도 지수', foodPoisonLogo],
  };

  const setAllDesData = () => {
    const keys = Object.keys(livingHealthWeather);

    const data = keys.forEach((key, idx) => {
      if (key.indexOf(category) > -1) {
        const day = key.split(category)[1];
        const value = livingHealthWeather[key];

        let type = category;
        if (category === 'oakPollenRisk') {
          type = 'pollenRisk';
        }
        if (day === 'Today') {
          setTodayDes(convertWeaterInfo(type, value));
        }

        if (day === 'Tomorrow') {
          setTomorrowDes(convertWeaterInfo(type, value));
        }

        if (day === 'TheDayAfterTomorrow') {
          setAfterTomorrow(convertWeaterInfo(type, value));
        }
      }
    }, []);
  };
  useEffect(() => {
    if (!livingHealthWeather) return;
    setAllDesData();
  }, []);

  return (
    <Container>
      <Title>{contents[category][0]}</Title>
      <Grid isColumn ai="center" margin="2.5rem 0">
        <Image size={18} src={contents[category][1]} />
      </Grid>
      <CardWrapper>
        <Card
          width="30%"
          height="150px"
          cardTitle="오늘"
          cardDescription={todayDes}
          iconName={category === 'oakPollenRisk' ? 'pollenRisk' : category}
        />
        <Card
          width="30%"
          height="150px"
          cardTitle="내일"
          cardDescription={tomorrowDes}
          iconName={category === 'oakPollenRisk' ? 'pollenRisk' : category}
        />
        <Card
          width="30%"
          height="150px"
          cardTitle="모레"
          cardDescription={afterTomorrow}
          iconName={category === 'oakPollenRisk' ? 'pollenRisk' : category}
        />
      </CardWrapper>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 90%;
  ${(props) => props.theme.flex.column};
  justify-content: flex-start;
`;

const CardWrapper = styled.div`
  width: 100%;

  ${(props) => props.theme.border_box};
  ${(props) => props.theme.flex.row};
  padding: 1rem;
`;

export default DetailThreeDays;
