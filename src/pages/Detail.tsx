import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import AirPollution from 'src/components/DetailAirPollution';
import Corona from 'src/components/DetailCorona';
import DetailDaily from 'src/components/DetailDaily';
import DetailThreeDays from 'src/components/DetailThreeDays';
import DetailWeekly from 'src/components/DetailWeekly';
import { Button, Grid } from 'src/components/elements';
import Header from 'src/components/Header';
import styled from 'styled-components';
import { RootState } from '../redux/modules';

const Detail = (props) => {
  const { match, history } = props;

  const isLoaded = useSelector((state: RootState) => state.weather.isLoaded);

  const components = {
    daily: DetailDaily,
    weekly: DetailWeekly,
    three: DetailThreeDays,
    corona: Corona,
    airPollution: AirPollution,
  };

  const Component = components[match.params.type];

  const goBack = () => {
    history.push('/');
  };

  if (!isLoaded) {
    return null;
  }
  return (
    <Container>
      {/* <Header /> */}
      <Component category={match.params.category} />
      <Button _onClick={goBack}>이전으로</Button>
    </Container>
  );
};

const Container = styled.div`
  padding: 1.5rem;
  width: ${(props) => props.theme.view.width};
  height: 80%;
  ${(props) => props.theme.border_box};
  ${(props) => props.theme.flex.column};
  justify-content: flex-start;
`;

export default Detail;
