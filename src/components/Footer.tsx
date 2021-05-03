import React, { Fragment } from 'react';

import styled from 'styled-components';

// elements
import { Grid } from './elements';

type footerType = {
  height?: string;
}

// 푸터 컴포넌트
const Footer = (props: footerType) => {
  const { height } = props;
  const style = {
    height
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
  height: ' 100%'
}

const ElFooter = styled.div<footerType>`
display:flex;
align-items: center;
jutify-contents: center;
width: 100%;
height: ${(props) => props.height};
border-radius: 20px;
box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
`

export default Footer;