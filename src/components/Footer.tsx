import React, { useState, useEffect } from 'react';

import styled from 'styled-components';


// 푸터 컴포넌트
const Footer = (props) => {
  const { height, margin, history } = props;
  const style = {
    height,
    margin,
  };
  // Footer 활성화 표시
  const [selectedMenu, setSelectedMenu] = useState('');
  // 새로고침시 효과 유지위해서 pathname을 selectedMenu에 넣기
  useEffect(() => {
    setSelectedMenu(history.location.pathname);
  }, [])
  return (
    <FooterWrap {...style}>
      <ElFooter
        onClick={() => {
          history.replace('/setting/location');
          setSelectedMenu('/setting/location');
        }}
        isSelected={selectedMenu === '/setting/location'}
      >
        위치 아이콘
      </ElFooter>
      <ElFooter
        onClick={() => {
          history.replace('/main');
          setSelectedMenu('/main');
        }}
        isSelected={selectedMenu === '/main'}
      >
        메인 아이콘
      </ElFooter>
      <ElFooter
        onClick={() => {
          history.replace('/setting');
          setSelectedMenu('/setting');
        }}
        isSelected={selectedMenu === '/setting'}
      >
        설정 아이콘
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
`;

const ElFooter = styled.div`
  width:30%;
  height:90%;
  display:flex;
  justify-content: center;
  align-items: center;
  color: ${(props) => props.isSelected ? 'red' : ''};
`

export default Footer;
