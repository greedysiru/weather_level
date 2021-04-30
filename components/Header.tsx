import React from 'react';

// elements
import { Grid, Text } from './elements'


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
      <Grid>
        <Grid is_column width="50%">
          <Text size="1.8rem" >
            현재 위치
          </Text>
          <Text size="1.8rem" bold>
            {bigRegion} {smallRegion}
          </Text>
        </Grid>
        <Grid width="50%">
          <Grid is_column width="50%" ai="flex-end">
            <Text>
              {todayMaxTmp}
            </Text>
            <Text>
              {todayMinTmp}
            </Text>
          </Grid>
          <Grid width="50%" jc="flex-start">
            <Text>
              {todayTmp}
            </Text>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  )
}
export default Header;