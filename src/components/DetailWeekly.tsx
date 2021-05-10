import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/redux/modules';
import styled from 'styled-components';

import { LongCard } from './elements';
import TimeInfo from './TimeInfo';

const DetailWeekly = (props) => {
  const { category } = props;
  const [type, setType] = useState(category);
  const dayOfWeek = useSelector((state: RootState) => state.time.dayOfWeek);

  const weekInfo = useSelector((state: RootState) => state.weather.weatherInfo?.weekInfo);

  useEffect(() => {
    if (category === 'wind') {
      setType('windSpeed');
    }
  }, []);
  const Content = weekInfo?.[type]?.map((data, idx) => {
    return <LongCard isFirst={idx === 0} type={type} key={idx} day={dayOfWeek?.[idx]} data={data} />;
  });

  const title = {
    humidity: '습도',
    wind: '바람',
  };

  return (
    <Container>
      <Title>{title[category]}</Title>
      <Contents>{Content}</Contents>
    </Container>
  );
};
const Container = styled.div`
  width: 100%;
  height: 100%;
  ${(props) => props.theme.flex.column};
`;

const Title = styled.div`
  font-size: 2rem;
  margin: 1rem;
`;

const Contents = styled.div`
  width: 100%;
  height: 100%;
  padding: 1rem;
  ${(props) => props.theme.flex.column};
`;

const Card = styled.div``;
export default DetailWeekly;
