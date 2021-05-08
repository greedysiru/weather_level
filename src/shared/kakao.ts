import KAKAO_KEY from './config';

const { Kakao } = window;

export default function initialize() {
  console.log('init')
  Kakao.init(KAKAO_KEY);
}