import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'src/redux/modules';
import { convertWeaterInfo } from 'src/shared/common';
import styled from 'styled-components';
import { Card, Grid, Title } from './elements';

const DetailAirPollution = (props) => {
  const [pm10Des, setPm10Des] = useState(null);
  const [pm25Des, setPm25Des] = useState(null);

  const { pm10Value, pm25Value } = useSelector((state: RootState) => state.weather.weatherInfo.airPollution);

  useEffect(() => {
    setPm10Des(convertWeaterInfo('pm10', pm10Value));
    setPm25Des(convertWeaterInfo('pm25', pm25Value));
  }, []);

  if (pm10Des && pm25Des) {
    return (
      <Container>
        <Title>미세먼지 지수</Title>
        <CardWrapper>
          <Card width="30%" height="150px" cardTitle="미세먼지" cardDescription={pm10Des} iconName="pm10" />
          <Card width="30%" height="150px" cardTitle="초미세먼지" cardDescription={pm25Des} iconName="pm25" />
        </CardWrapper>
      </Container>
    );
  }

  return null;
};

const Container = styled.div`
  width: ${(props) => props.theme.view.width};
  height: 100%;
  ${(props) => props.theme.flex.column};
  justify-content: space-around;
`;

const CardWrapper = styled.div`
  width: 100%;
  height: 50%;
  ${(props) => props.theme.border_box};
  ${(props) => props.theme.flex.row};
  justify-content: space-around;
  padding: 1rem;
`;

export default DetailAirPollution;
