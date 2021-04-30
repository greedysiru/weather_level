import React from 'react';

// elements
import { Grid, Text } from './elements'


const Header = (props) => {
  const { bigRegion, smallRegion } = props;
  return (
    <React.Fragment>
      <Grid>
        <Grid is_column>
          <Text>
            현재 위치
          </Text>
          <Text>
            {bigRegion} {smallRegion}
          </Text>
        </Grid>
        <Grid>
          {/* {maxTmp[0]} |
          {minTmp[0]} |
           {tmp[0]} */}
        </Grid>
      </Grid>
    </React.Fragment>
  )
}
export default Header;