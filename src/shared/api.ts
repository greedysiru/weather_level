import axios from 'axios';
import { CLIENT_SECRET, CLIENT_ID } from './secrete';

// axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'http://13.125.127.68:8080';

type preferenceType = {
  coronaRange: React.SetStateAction<string>,
  pm10Range: React.SetStateAction<string>,
  pm24Range: React.SetStateAction<string>,
  tempRange: React.SetStateAction<string>,
  rainPerRange: React.SetStateAction<string>,
  weatherRange: React.SetStateAction<string>,
  humidityRange: React.SetStateAction<string>,
  windRange: React.SetStateAction<string>,
  uvRange: React.SetStateAction<string>,
  pollenRiskRange: React.SetStateAction<string>,
  asthmaRange: React.SetStateAction<string>,
  foodPoisonRange: React.SetStateAction<string>
}

// 날씨 정보 관련 api
export const weatherAPI = {
  getWeather(latitude: number, longitude: number) {
    axios.defaults.headers.common.token = '';
    return axios.get(`/api/weather/data?longitude=${longitude}&latitude=${latitude}`);
    // return axios.get(`/api/weather/data?longitude=126.9996417&latitude=37.56100278`);
  },
  fetchPreference(id:string) {    
    axios.defaults.headers.common.token = `${id}`;
    
    return axios.get('/api/user/preferences')
  },
  createPreference(id: string, preferece: preferenceType) {
    axios.defaults.headers.common.token = `${id}`;// 여기 들어가는거 괜찮나?
    return axios.post('/api/user/preferences', preferece)
  },
  updatePreference(id: string, preferece: preferenceType) {
    axios.defaults.headers.common.token = `${id}`;// 여기 들어가는거 괜찮나?
    return axios.put('/api/user/preferences', preferece)
  },
  getLocation(query: string) {

    const mapAxios = axios.create();
    mapAxios.defaults.headers.common['X-NCP-APIGW-API-KEY-ID'] = CLIENT_ID;
    mapAxios.defaults.headers.common['X-NCP-APIGW-API-KEY'] = CLIENT_SECRET;
    mapAxios.defaults.withCredentials = false;
    return mapAxios.get('https://naveropenapi.apigw.ntruss.com/map-geocode/v2/geocode', {
      params: {
        query: '인계동'
      }
    })

    /* return axios({
      url:`https://naveropenapi.apigw.ntruss.com/map-geocode/v2/geocode?query=${query}`,
      method:'get',
      headers: { 'X-NCP-APIGW-API-KEY-ID': CLIENT_ID,
                 'X-NCP-APIGW-API-KEY':CLIENT_SECRET
      }
    }) */

    /* return mapAxios.get(`http://api.vworld.kr/req/search`,{
      params:{
        service:'search',
        request:'search',
        version:'2.0',
        crs:'EPSG:4326',
        size:'10',
        page:'1',
        type:'district',
        category:'L4',
        format:'json',
        errorformat:'json',
        key : MAP_KEY,
        query : query
      }      
    }) */
  }
}