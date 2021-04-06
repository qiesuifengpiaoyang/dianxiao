import axios from 'axios';
import { Dialog } from 'vant';
const instance = axios.create({
    timeout: 0,
    withCredentials: false, // request with cookie
    baseURL:'/apis',
    headers: {
        // 'Content-Type': 'applicasettion/json'
    },
    validateStatus(status) {
        return status >= 200 && status <= 500; // default
    }
});
//请求勾子
instance.interceptors.request.use(function (config) {
    // console.log(config,'config')
    return config;
}, function (error) {
    return Promise.reject(error);
});

//响应勾子
instance.interceptors.response.use((response) => {
    // console.log(response, 'response');
    return response;
}, (error) => {
    console.log(error,'error')
    Dialog({ message: error+'' });
    return Promise.reject(error);
});
instance.cancelToken = axios.CancelToken;
export default instance;