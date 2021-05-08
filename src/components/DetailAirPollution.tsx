import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'src/redux/modules';
import { convertWeaterInfo } from 'src/shared/common';
import styled from 'styled-components';
import { Card, Grid } from './elements';

const DetailAirPollution = (props) => {
  const [pm10Des, setPm10Des] = useState(null);
  const [pm25Des, setPm25Des] = useState(null);

  const { pm10Value, pm25Value } = useSelector((state: RootState) => state.weather.weatherInfo.airPollution);

  useEffect(() => {
    setPm10Des(convertWeaterInfo('pm10', pm10Value));
    setPm25Des(convertWeaterInfo('pm25', pm25Value));
  }, []);
  return (
    <Container>
      <Title>미세먼지 지수</Title>
      <Grid isColumn width="100%" height="100%">
        <div>그림</div>
        <CardWrapper>
          <Card width="30%" height="150px" cardTitle="미세먼지" cardDescription={pm10Des} />
          <Card width="30%" height="150px" cardTitle="초미세먼지" cardDescription={pm25Des} />
        </CardWrapper>
      </Grid>
    </Container>
  );
};

const Container = styled.div`
  width: ${(props) => props.theme.view.width};
  height: 100%;
  border: 1px solid black;
  ${(props) => props.theme.flex.column};
  justify-content: center;
`;

const Title = styled.div`
  font-size: 2rem;
  font-weight: bold;
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
