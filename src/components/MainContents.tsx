import React from 'react';

// 리덕스
import { useSelector } from 'react-redux';

// elements
import { Grid, Card } from './elements';

// componetns
import TimeInfo from './TimeInfo';
import Cards from './Cards';

// RootState
import { RootState } from '../redux/modules';

// 메인 화면의 콘텐츠를 보여주는 컴포넌트
// 타입 선언
type mainContentsType = {
  isFirst?: boolean;
}
// isFirst 참이면, 첫번째 슬라이드를 렌더링
const MainContents = (props: mainContentsType) => {
  // 날씨 정보 가져오기
  const weatherInfo = useSelector((state: RootState) => state.weather.weatherInfo);
  // timeIndex 가져오기
  const timeIndex = useSelector((state: RootState) => state.time.timeIndex);
  // 현재 시간
  const hours = useSelector((state: RootState) => state.time.hours);
  // dailyTime
  const dailyTime = useSelector((state: RootState) => state.weather.weatherInfo.dayInfo.dailyTime);
  // dayOfWeek
  const dayOfWeek = useSelector((state: RootState) => state.time.dayOfWeek);
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
          <Cards
            isFirst
            weatherInfo={weatherInfo}
          />
        </Grid>
        {/* 시간별 기온 정보 */}
        <TimeInfo
          info={weatherInfo.dayInfo.tmp}
          timeIndex={timeIndex}
          hours={hours}
          dailyTime={dailyTime}
          label='시간대별 기온 날씨'
        />
      </>
    )
  }

  // 두번째 슬라이드를 렌더링
  return (
    <Grid
      height="100%"
      overFlow
      isColumn
      padding="2rem 2rem 0 2rem"
    >
      {/* 이번주 외출 점수 */}
      <TimeInfo
        info={weatherInfo.dayScoreList}
        label="이번주 외출 점수"
        dayOfWeek={dayOfWeek}
        score
      />
      {/* 시간대별 강수 확률 */}

      <TimeInfo
        info={weatherInfo.dayInfo.rainPer}
        timeIndex={timeIndex}
        hours={hours}
        dailyTime={dailyTime}
        label='시간대별 강수 확률'
      />
      <Grid
        margin="1rem 0 1rem 0"
        height="45.8%"
        jc="space-between"
        wrap
      >
        <Cards
          weatherInfo={weatherInfo}
        />
        <Cards
          weatherInfo={weatherInfo}
        />
      </Grid>
    </Grid>
  )
}

MainContents.defaultProps = {
  isFirst: false,
}
export default MainContents;