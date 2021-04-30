import React from 'react';

// elements
import { Grid, Text } from './elements'

// 헤더 컴포넌트
const Header = (props) => {
  // 사용자의 현재 지역 정보
  const { bigRegion, smallRegion } = props;
  // 오늘 최대, 최저, 평균 기온
  let { todayMaxTmp, todayMinTmp, todayTmp } = props;
  // 정수화 후 반올림 하기
  todayMaxTmp = Math.round(Number(todayMaxTmp));
  todayMinTmp = Math.round(Number(todayMinTmp));
  todayTmp = Math.round(Number(todayTmp));
  return (
    <React.Fragment>
      <Grid height="5%" ai="center">
        <Grid is_column width="50%" height="100%">
          <Text size="1.8rem" >
            현재 위치
          </Text>
          <Text size="1.8rem" bold>
            {bigRegion} {smallRegion}
          </Text>
        </Grid>
        <Grid width="50%" ai="center" height="100%">
          <Grid
            is_column
            width="50%"
            ai="flex-end"
            height="100%"
          >
            <Text>
              {todayMaxTmp}
            </Text>
            <Text margin="0.5rem 0 0 0">
              {todayMinTmp}
            </Text>
          </Grid>
          <Grid width="50%" height="100%" jc="flex-start" ai="flex-end" >
            <Text size="4rem">
              {todayTmp}
            </Text>
          </Grid>
          그림
        </Grid>
      </Grid>
    </React.Fragment>
  )
}
export default Header;