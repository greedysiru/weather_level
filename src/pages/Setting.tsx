import React from 'react';
import { Button, Grid } from 'src/components/elements';
import styled from 'styled-components';

import logo from '../static/images/logo.png';

const Setting = (props) => {
  const { history } = props;

  const push = (path: string) => {
    history.push(path);
  };
  return (
    <Container>
      <Title>환경 설정</Title>
      <Logo />
      <Grid width="100%" isColumn ai="center">
        <Menu onClick={() => history.push('/setting/preference')}>나만의 외출 난이도 설정하기</Menu>
        <Menu>외출 점수 공유하기</Menu>
        <Menu>불편/개선 사항 보내기</Menu>
      </Grid>
      <Button
        _onClick={() => {
          history.push('/');
        }}
      >
        이전으로
      </Button>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100%;
  padding: 1.5rem;
  ${(props) => props.theme.flex.column};
  justify-content: space-around;
`;

const Title = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
`;
const Menu = styled.div`
  ${(props) => props.theme.flex.row};
  justify-content: space-between;
  width: 250px;
  height: 50px;
  font-size: 1.3rem;
  font-weight: 550;
  padding: 0 2rem;
  border-radius: 12px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  margin: 0.5rem;
  cursor: pointer;
  ${(props) => props.theme.border_box}
`;

const Logo = styled.div`
  background-image: url(${logo});
  width: 200px;
  height: 200px;
  background: contain no-repeat;
  background-position: center;
`;
export default Setting;
