import React from 'react';

// elements
import { Grid, Text, Image } from './elements';

import theme from '../styles/theme';

// 외출 점수와 캐릭터를 보여주는 컴포넌트
const Score = (props) => {
  const { todayScore } = props
  const { color } = theme
  return (
    <>
      <Grid
        isColumn
        padding="0 2rem 2rem 2rem"
        height="49%"
        jc="flex-start"
        ai="center"
      >
        <Image
          size={196}
        />
        <Grid
          isColumn
          width="100%"
          margin="2rem 0 0 0 "
          ai="center"
        >
          <Grid
            ai="center"
          >
            <Text
              size="1.6rem"
              margin="0 0.5rem 0 0"
              bold="700"
            >
              외출 점수
            </Text>
            <Text
              size="2.2rem"
              bold="700"
            >
              {todayScore}점
          </Text>
          </Grid>
          <Grid
            margin="0.5rem 0 0 0"
          >
            <Text
              size="1.4rem"
              color={color.gray3}
            >
              오늘 날씨는 구름 조금
            </Text>
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}
export default Score;