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
      <Grid width="50%">
        <Button _onClick={()=>console.log('호호')}>버튼버튼</Button>
      </Grid>
      
    </React.Fragment >
  )
}

/* width: string;
        height: string;
        is_column: boolean;
        jc: string;
        ai: string;
        bg: string;
        margin: string;
        children: any; */

export default Main