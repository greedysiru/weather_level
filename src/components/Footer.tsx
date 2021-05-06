import React, { Fragment } from 'react';

import styled from 'styled-components';

// elements
import { Grid } from './elements';

// 푸터 컴포넌트
const Footer = (props) => {
  const { height, margin } = props;
  const style = {
    height, margin
  }
  return (

    <ElFooter
      {...style}
    >
      <Grid>
        Footer
        </Grid>
    </ElFooter>
  )
}

Footer.defaultProps = {
  height: ' 100%',
  margin: '',
}

const ElFooter = styled.div`
position: absolute;
bottom: 0;
display:flex;
align-items: center;
jutify-contents: center;
width: 100%;
height: 9%;
box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
`

export default Footer;