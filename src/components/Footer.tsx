import React, { useState, useEffect } from 'react';

import styled from 'styled-components';

// elements
import { Grid, Icon } from './elements'

// 푸터 컴포넌트
const Footer = (props) => {
  const { height, margin, history } = props;
  const style = {
    height,
    margin,
  };
  // Footer 활성화 표시
  const [selectedMenu, setSelectedMenu] = useState('/');
  // 새로고침시 효과 유지위해서 pathname을 selectedMenu에 넣기
  useEffect(() => {
  }, []);
  return (
    <FooterWrap {...style}>
      <ElFooter
        onClick={() => {
          history.replace('/setting/location');
          setSelectedMenu('/setting/location');
        }}
        isSelected={selectedMenu === '/setting/location'}
      >
        <Icon name='location' />
      </ElFooter>
      <ElFooter
        onClick={() => {
          history.replace('/');
          setSelectedMenu('/');
        }}
        isSelected={selectedMenu === '/'}
      >
        <Icon name='main' />
      </ElFooter>
      <ElFooter
        onClick={() => {
          history.replace('/setting');
          setSelectedMenu('/setting');
        }}
        isSelected={selectedMenu === '/setting'}
      >
        <Icon name='setting' />
      </ElFooter>
    </FooterWrap>
  );
};

Footer.defaultProps = {
  height: ' 100%',
  margin: '',
};

const FooterWrap = styled.div`
  position: fixed;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 9.5%;
  background-color: white;
  ${(props) => props.theme.shadow};
  z-index: 10;
`;

const ElFooter = styled.div`
  width: 30%;
  height: 90%;
  display: flex;
  justify-content: center;
  align-items: center;
  & svg {
  fill: ${(props) => (props.isSelected ? 'black' : (props.theme.color.gray1))};
  transition: 0.3s;
}
  &:hover svg {
    fill: black;
  }

`;

export default Footer;
