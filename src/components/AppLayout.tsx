import React, { ReactChild, useEffect } from 'react';
import styled from 'styled-components';

import Footer from './Footer';

import { history } from '../redux/configureStore';

function AppLayout(props) {
  const { children } = props;
  useEffect(() => {
    // 가로모드 감지, 경고창
    window.addEventListener(
      'orientationchange',
      function () {
        if (window.orientation === -90 || window.orientation === 90) {
          if (window.innerWidth > 375) {
            return;
          }
          window.alert('이 웹사이트는 세로모드를 권장합니다. 세로모드로 전환해주세요 🙏');
        }
      },
      false,
    );
  }, []);
  return (
    <Container>
      <Contents>{children}</Contents>
      <Footer history={history} />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background-color: ${(props) => props.theme.color.main};
`;

const Contents = styled.div`
  height: 100%;
  width: 100vw;
  ${(props) => props.theme.flex.row};
  justify-content: center;
  align-items: flex-start;
`;

export default AppLayout;
