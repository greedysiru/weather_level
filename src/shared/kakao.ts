// 카카오 링크 객체 불러오기
const { Kakao } = window;

export default function initialize() {
  Kakao.init(process.env.REACT_APP_KAKAO_KEY);
}