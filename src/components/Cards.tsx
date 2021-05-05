import React from 'react';

// Elemtes
import { Card, Grid } from './elements';

type cardsType = {
  isFirst?: boolean;
  weatherInfo: any;
  preference: any;
}
// 카드목록 컴포넌트
const Cards = (props: cardsType) => {
  const { isFirst, weatherInfo, preference } = props;
  // 첫 슬라이드의 카드 목록이면 4열로 보여주기
  if (isFirst) {
    return (
      <>
        <Card
          width="22.5%"
          cardTitle="미세먼지"
          cardText={weatherInfo.airPollution.pm25Value}
        />
        <Card
          width="22.5%"
          cardTitle="확진자 수"
          cardText={weatherInfo.coronaTotalNewCaseCount}
        />
        <Card
          width="22.5%"
          cardTitle="꽃가루"
          cardText={weatherInfo.livingHealthWeather.oakPollenRiskToday}
        />
        <Card
          width="22.5%"
          cardTitle="자외선"
          cardText={weatherInfo.livingHealthWeather.uvToday}
        />
      </>
    )
  }


  // 두번째 슬라이드 3열 카드 보여주기
  return (
    <Grid
      height="100%"
    >
      <Grid
        $wrap
        height="100%"
        jc="space-between"
      >
        <Card
          width="30.8%"
          height="45%"
          cardTitle="강수 확률"
          cardText={weatherInfo.weekInfo.rainPer[0]}
        />
        <Card
          width="30.8%"
          height="45%"
          cardTitle="기온"
          cardText={weatherInfo.weekInfo.tmp[0]}
        />
        <Card
          width="30.8%"
          height="45%"
          cardTitle="미세먼지"
          cardText={weatherInfo.airPollution.pm25Value}
        />
        <Card
          width="30.8%"
          height="45%"
          cardTitle="확진자수"
          cardText={weatherInfo.coronaTotalNewCaseCount}
        />
        <Card
          width="30.8%"
          height="45%"
          cardTitle="꽃가루"
          cardText={weatherInfo.livingHealthWeather.oakPollenRiskToday}
        />
        <Card
          width="30.8%"
          height="45%"
          cardTitle="자외선"
          cardText={weatherInfo.livingHealthWeather.uvToday}
        />
      </Grid>
    </Grid>
  )
}

Cards.defaultProps = {
  isFirst: false,
}


export default Cards;