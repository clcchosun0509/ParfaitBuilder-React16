import axios from 'axios';

//axios의 baseURL을 instance에 저장했다.
//다른 URL도 사용할 수 있으므로, index.js에 작성안하고 따로 파일로 만들었다.
const instance = axios.create({
   baseURL: 'https://react-my-parfait.firebaseio.com/'
});

export default instance;