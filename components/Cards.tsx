import React from 'react';

// elements
import { Grid, Card } from './elements';

// 리덕스
import { useSelector } from 'react-redux';

// RootState
import { RootState } from '../redux/modules';

// 메인 화면의 카드들을 보여주는 컴포넌트(4열)
const Cards = (props) => {
  // 날씨 정보 가져오기
  const weatherInfo = useSelector((state: RootState) => state.weather.weatherInfo)
  return (
    <React.Fragment>
      <Grid
        margin="1rem 0 1rem 0"
        height="15%"
        jc="space-between"
        wrap
      >
        <Card
          width="22.5%"
          cardTitle="미세먼지"
          cardText={weatherInfo.airPollution.pm25Value}
        />
        <Card
          width="22.5%"
          cardTitle="확진자수"
          cardText={weatherInfo.airPollution.pm25Value}
        />
        <Card
          width="22.5%"
          cardTitle="꽃가루"
          cardText={weatherInfo.airPollution.pm25Value}
        />
        <Card
          width="22.5%"
          cardTitle="자외선"
          cardText={weatherInfo.airPollution.pm25Value}
        />
      </Grid>
    </React.Fragment>
  )
}
export default Cards;