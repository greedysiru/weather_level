import React from 'react';
import styled from 'styled-components';

// 로고 컴포넌트
const logo = '/assets/logo.png';
const Logo = (props) => {
  const { history } = props;
  // main 페이지로 넘어가는 함수
  const moveToMain = () => {
    history.push('/main')
  }
  // 1.5초뒤에 /main으로 이동
  React.useEffect(() => {
    setTimeout(moveToMain, 1500);
  }, []);
  return (
    <ElLogo />
  )
}

const ElLogo = styled.div`
  position:fixed;
  z-index: 3;
  background-image: url(${logo});
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center center;
`



export default Logo;