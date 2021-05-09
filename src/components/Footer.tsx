import React, { Fragment } from 'react';

import styled from 'styled-components';

// elements
import { Grid } from './elements';

// 푸터 컴포넌트
const Footer = (props) => {
  const { height, margin, history } = props;
  const style = {
    height,
    margin,
  };
  return (
    <ElFooter {...style}>
      <Grid
        width="30%"
        height="90%"
        ai="center"
        jc="center"
        _onClick={() => {
          history.replace('/setting/location');
        }}
      >
        위치 아이콘
      </Grid>
      <Grid
        width="30%"
        height="90%"
        ai="center"
        jc="center"
        _onClick={() => {
          history.replace('/main');
        }}
      >
        메인 아이콘
      </Grid>
      <Grid
        width="30%"
        height="90%"
        ai="center"
        jc="center"
        _onClick={() => {
          history.replace('/setting');
        }}
      >
        설정 아이콘
      </Grid>
    </ElFooter>
  );
};

Footer.defaultProps = {
  height: ' 100%',
  margin: '',
};

const ElFooter = styled.div`
  position: fixed;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 9.5%;
  background-color: white;

  ${(props) => props.theme.shadow};
`;

export default Footer;
