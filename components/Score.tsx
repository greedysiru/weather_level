import React from 'react';

// elements
import { Grid, Text } from './elements';

// 외출 점수와 캐릭터를 보여주는 컴포넌트
const Score = (props) => {
  return (
    <React.Fragment>
      <Grid
        is_column
        padding="2rem"
        margin="1rem 0 1rem 0"
        height="40%"
        jc="flex-start"
        ai="center"
      >
        <Text size="1.6rem">
          오늘의 외출 점수
        </Text>
        <Text size="3.2rem" bold>
          점수
        </Text>
      </Grid>
    </React.Fragment>
  )
}
export default Score;