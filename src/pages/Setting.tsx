import React from 'react';

import { Button, Grid, Title } from 'src/components/elements';
import styled from 'styled-components';

// 리덕스
import { useSelector } from 'react-redux';
// RootState
import { RootState } from '../redux/modules';

// 로고
const logo = '/assets/weather/03d.png';
const Setting = (props) => {
  const todayScore = useSelector((state: RootState) => state.weather.weatherInfo?.dayScoreList[0]);
  const weatherDiscription = useSelector((state: RootState) => state.weather?.todayWeather[1]);
  const todayWeather = useSelector((state: RootState) => state.weather?.todayWeather);
  const { Kakao } = window;
  const { history } = props;

  React.useEffect(() => {}, []);
  const description = `오늘 날씨는 ${weatherDiscription}, 외출 점수는 ${todayScore}점 입니다!`;
  // 카카오 공유
  const shareKakao = (description) => {
    const imageUrl = `https://weather-service-images.s3.ap-northeast-2.amazonaws.com/${todayWeather[3]}.png`;
    console.log(imageUrl);
    Kakao.Link.sendDefault({
      objectType: 'feed',
      content: {
        title: '오늘의 날씨 점수는?',
        description,
        imageUrl,
        link: {
          webUrl: 'https://theweatherlevel.com/',
          mobileWebUrl: 'https://theweatherlevel.com/',
        },
      },
      buttons: [
        {
          title: '날씨 점수 보기',
          link: {
            webUrl: 'https://theweatherlevel.com/',
            mobileWebUrl: 'https://theweatherlevel.com/',
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
        <Menu onClick={() => shareKakao(description)}>외출 점수 공유하기</Menu>
        <Menu onClick={() => history.push('/setting/complain')}>불편/개선 사항 보내기</Menu>
      </Grid>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 80%;
  padding: 1.5rem;
  ${(props) => props.theme.flex.column};
  justify-content: space-around;
`;

const Menu = styled.div`
  ${(props) => props.theme.flex.row};
  justify-content: space-between;
  width: 98%;
  height: 55px;
  font-size: 1.5rem;
  font-weight: 550;
  padding: 0 2rem;
  border-radius: 12px;
  ${(props) => props.theme.shadow};
  border: solid 0.5px ${(props) => props.theme.color.purple};
  margin: 0.5rem;
  cursor: pointer;
  ${(props) => props.theme.border_box}
  background-color:white;
`;

const Logo = styled.div`
  background-image: url(${logo});
  width: 22rem;
  height: 22rem;
  background-size: contain;
  background-position: center;
`;
export default Setting;
