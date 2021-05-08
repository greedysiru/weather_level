import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'src/redux/modules';
import { convertWeaterInfo } from 'src/shared/common';
import styled from 'styled-components';
import { Card, Grid } from './elements';

const Corona = (props) => {
  const { coronaCurrentBigRegionNewCaseCount, coronaAllNewCaseCount } = useSelector(
    (state: RootState) => state.weather.weatherInfo,
  );

  console.log(coronaAllNewCaseCount);
  return (
    <Container>
      <Title>코로나 지수</Title>
      <Grid isColumn width="100%" height="100%">
        <div>그림</div>
        <CardWrapper>
          {/*  <Card width="30%" height="150px" cardTitle="전국 신규 확진자" cardDescription={['good', 12]} />
          <Card width="30%" height="150px" cardTitle="내 지역 신규 확진자" cardDescription={['good', 12]} /> */}
          {/*  <Card width="30%" height="150px" cardTitle="모레" cardDescription={afterTomorrow} /> */}
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
  padding: 1rem;
`;

export default Corona;
