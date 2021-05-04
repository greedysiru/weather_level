import React from 'react';

// 리덕스
import { useSelector } from 'react-redux';

// elements
import { Grid, Card } from './elements';

// componetns
import TimeInfo from './TimeInfo';

// RootState
import { RootState } from '../redux/modules';

// 메인 화면의 콘텐츠를 보여주는 컴포넌트
// 타입 선언
type mainContentsType = {
  isFirst?: boolean;
}
// isFirst 참이면, 첫번째 슬라이드를 렌더링
// 거짓이면 두번째 슬라이드를 렌더링
const MainContents = (props: mainContentsType) => {
  // 날씨 정보 가져오기
  const weatherInfo = useSelector((state: RootState) => state.weather.weatherInfo);
  // timeIndex 가져오기
  const timeIndex = useSelector((state: RootState) => state.time.timeIndex);
  // 현재 시간
  const hours = useSelector((state: RootState) => state.time.hours);
  // dailyTime
  const dailyTime = useSelector((state: RootState) => state.weather.weatherInfo.dayInfo.dailyTime);
  // isFirst
  const { isFirst } = props;

  // 첫번째 슬라이드
  if (isFirst) {
    return (
      <>
        {/* 카드 콘텐츠(4열) */}
        <Grid
          margin="1rem 0 1rem 0"
          height="17%"
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
        </Grid>
        <Grid
          margin="1rem 0 1rem 0"
          height="18%"
        >
          {/* 시간별 기온 정보 */}
          <TimeInfo
            info={weatherInfo.dayInfo.tmp}
            timeIndex={timeIndex}
            hours={hours}
            dailyTime={dailyTime}
            label='시간대별 기온 날씨'
          />
        </Grid>
      </>
    )
  }
  // 거짓이면 두번째 슬라이드를 렌더링
  return (
    <>
      {/* 카드 콘텐츠(4열) */}
      <Grid
        margin="1rem 0 1rem 0"
        height="18%"
      >
        {/* 이번주 외출 점수 */}
        <TimeInfo
          info={weatherInfo.dayScoreList}
          label="이번주 외출 점수"
        />
      </Grid>
    </>
  )
}

MainContents.defaultProps = {
  isFirst: false,
}
export default MainContents;