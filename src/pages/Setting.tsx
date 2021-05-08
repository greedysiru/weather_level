import React from 'react';


import { Button, Grid } from 'src/components/elements';
import styled from 'styled-components';

// 리덕스
import { useSelector } from 'react-redux';
// RootState
import { RootState } from '../redux/modules';

import initialize from '../shared/kakao';

// 로고
const logo = '/assets/logo.png';
const Setting = (props) => {
  const todayScore = useSelector((state: RootState) => state.weather.weatherInfo?.dayScoreList[0]);
  const weatherDiscription = useSelector((state: RootState) => state.weather?.todayWeather[1]);
  const { Kakao } = window;
  const { history } = props;

  // 카카오
  React.useEffect(() => {
    initialize();
  }, [])
  const description = `오늘 날씨는 ${weatherDiscription}, 외출 점수는 ${todayScore}점 입니다!`
  // 카카오 공유
  const shareKakao = (imageUrl, description) => {
    Kakao.Link.sendDefault({
      objectType: 'feed',
      content: {
        title: '오늘의 외출 점수는?',
        description,
        imageUrl,
        link: {
          webUrl: 'https://github.com/greedysiru',
          mobileWebUrl: 'https://github.com/greedysiru',
        },
      },
      buttons: [
        {
          title: '나의 외출 점수 보기',
          link: {
            webUrl: 'https://github.com/greedysiru',
            mobileWebUrl: 'https://github.com/greedysiru',
          },
        },
      ],
    });
  };



  const push = (path: string) => {
    history.push(path);
  };
  return (
    <Container>
      <Title>환경 설정</Title>
      <Logo />
      <Grid width="100%" isColumn ai="center">
        <Menu onClick={() => history.push('/setting/preference')}>나만의 외출 난이도 설정하기</Menu>
        <Menu onClick={() => shareKakao(logo, description)}>외출 점수 공유하기</Menu>
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
  ${(props) => props.theme.shadow};
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
