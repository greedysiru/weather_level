import React from 'react';
import { Grid, Button, Image, Input, Text, Range } from '../components/elements'

// 날씨 관련 모듈
import { weatherActions } from '../redux/modules/weather';

// 리덕스
import { useDispatch } from 'react-redux';

const Main = (props) => {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(weatherActions.getWeatherInfo());
  }, [])


  return (
    <React.Fragment >
      메인
      <Text>
        props
      </Text>
      <Input label="하" />
      <Grid>
        <Range />
      </Grid>
    </React.Fragment >
  )
}

export default Main