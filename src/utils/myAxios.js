import axios from "axios";
import {ElMessage} from "element-plus";

const myAxios = axios.create({
    // baseURL: 'http://localhost:8081',
    baseURL: 'http://121.37.242.83:8081',
});

// 添加请求拦截器
myAxios.interceptors.request.use(function (config) {
    console.log("我要发请求了！")
    // 在发送请求之前做些什么
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
myAxios.interceptors.response.use(function (response) {
    console.log("我接收到请求了！")
    // 对响应数据做点什么
    if (response.data.code === 0) {
        return response.data;
    } else {
        ElMessage.error(response.data.msg ? response.data.msg : '服务异常')
    }
}, function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error);
});

export default myAxios;
