# weather_level

![logo](readme_images/logo.png)

😊[사이트 링크](https://theweatherlevel.com)

🎬 [유튜브 링크]()

📁 [백엔드 Repositroy 링크](https://github.com/joychae/SpringBoot-Project-WeatherService)

📕[팀 노션](https://www.notion.so/2004f97193f04be080e06e08898dfa9b)

**weather_level 프로젝트의 프론트 엔드 Repositroy 입니다.**

## 개요

- 명칭 : weather level (외출 난이도)
- 개발 인원 : 6명
  - Front end: **전재민, 조윤경**
  - Back end: **채수연, 강상연, 김동현**
  - Designer: **공은지**
- 개발 기간 : 2021.04.23 ~
- 주요 기능
  - 사용자의 선호도를 토대로 알고리즘을 통해 날씨 점수 출력
  - 날씨 정보 큐레이팅
- 개발 언어 : JavaScript
- 개발 라이브러리 : React.js
- 형상 관리 툴 : git
- 협업 툴 : [notion](https://www.notion.so/2004f97193f04be080e06e08898dfa9b), [구글 스프레드 시트](https://docs.google.com/spreadsheets/d/1Wbv10czlXBtes6mJF3kTe4gOyI3SjJDe1Q8nZSkBa2A/edit#gid=0), 구글 드라이브
- 간단 소개 : 리액트 - 스프링 협업의 날씨 정보 제공 서비스

## 프로젝트 특징

- weather level (외출 난이도)

  - 날씨 정보와 사용자의 선호도를 토대로, 알고리즘을 통해 날씨 점수를 제공하는 서비스
  - 직관적이고 알아보기 쉬운 날씨 정보 큐레이팅

- 프론트엔드와 백엔드를 분리하여 프로젝트 개발

  - 각 파트별로 Repository를 생성 후 작업
  - 프론트: AWS S3, Cloud Front
  - 백엔드: AWS EC2
  - 빌드 후, S3와 EC2를 연동
    - API 명세서에 따라 API호출 및 응답 확인
  - HTTPS 통신
    - SSL 인증서 적용

- 사용자의 현재 GPS 정보를 기반으로한 날씨 정보 제공

  - 사용자가 원하는 지역 선택 가능

- 사용자가 설정한 우선순위에따라서 날씨 정보 카드를 우선적으로 보여줌

- 카카오톡으로 자신의 오늘 날씨 점수를 공유

- 뉴모피즘과 귀여운 날씨 캐릭터가 가미된 UI

- 반응형 디자인

  - 포터블 모드: 주요 모델 지원 UI
  - 데스크탑 모드: 데스크탑 환경에서 한눈에 볼 수 있는 UI

- PWA

  - Progressive Web Apps
  - Lighthouse 조건을 충족
  - 안드로이드 -크롬, iOS - 사파리에서 홈 화면에 바로가기 설치 가능
  - 안드로이드 플레이 스토어 배포 예정

  

## 기능 상세 소개

### 1



## 상세페이지

### 로그인, 카카오 소셜 로그인

### 회원가입

### 비밀번호 찾기 기능

### 회원정보 수정

### 채팅방 생성✨

### 채팅✨

### 반응형 - 모바일 / 태블릿



## 사용 패키지

- 

## Trouble shooting

**프로젝트를 하며 마주친 문제들과 해결한 방법을 정리**

### 1. withcredential?



### 2. 로그인 유지할 때 어떻게 하지?



### 3. 채팅이 끊기는 문제

#### 원인

- 웹소켓 객체의 readyState라는 프로퍼티의 상태
- send 메소드를 보낼 때, readyState가 0이면 위의 오류가 발생하는 것이었음

| Value | State      | Description                                |
| ----- | ---------- | ------------------------------------------ |
| 0     | CONNECTING | 소켓이 생성, 연결이 아직 되지 않음         |
| 1     | OPEN       | 연결이 열려 있고 , 통신할 준비가 되어 있음 |

#### 해결





<hr/>



## 개발 타임라인

| 일자       | 진행 목록 |
| ---------- | --------- |
| 2021.04.09 |           |
| 2021.04.10 |           |
| 2021.04.12 |           |
| 2021.04.13 |           |
| 2021.04.14 |           |
| 2021.04.15 |           |
| 2021.04.16 |           |
| 2021.04.17 |           |
| 2021.04.18 |           |
| 2021.04.19 |           |
| 2021.04.20 |           |
| 2021.04.21 |           |

## Contetnts

### 반응형 디자인(스마트폰)





### 반응형 디자인 (태블릿)



## License



### MIT



## Reference
