import React from 'react';
import { Grid, Button, Image, Input, Text, Range } from '../components/elements'

// 날씨 관련 모듈
import { weatherActions } from '../redux/modules/weather';

// 리덕스
import { useDispatch } from 'react-redux';

const Main = (props) => {
  const dispatch = useDispatch();
  React.useEffect(() => {
    // 사용자 위치(위도, 경도) state에 기록 후 날씨 정보 불러오기
    dispatch(weatherActions.getLocation());
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
        <Button is_float={false}  _onClick={()=>console.log('호호')}>버튼버튼</Button>
      </Grid>
      
    </React.Fragment >
  )
}


export default Main