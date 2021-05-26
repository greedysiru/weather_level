import KAKAO_KEY from './config';

// 카카오 링크 객체 불러오기
const { Kakao } = window;

export default function initialize() {
  Kakao.init(KAKAO_KEY);
}