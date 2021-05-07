import KAKAO_KEY from './config';
const { Kakao } = window;

export default function initialize() {
  Kakao.init('KAKAO_KEY');
}