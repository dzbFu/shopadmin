import Vue from "vue";
import axios from 'axios';
import ViewUI from 'view-design';
Vue.use(ViewUI);
// 封装基础路径
axios.defaults.baseURL = 'https://admin-api.macrozheng.com'
const preRequest = (config) => {
    ViewUI.LoadingBar.start();
    config.headers.Authorization = sessionStorage.tokenHead + sessionStorage.token;
    config.headers['Content-Type'] = 'application/json;charset=UTF-8'
    return config
}
const errRequest = (err) =>{
    Vue.prototype.$Message.destroy();
    Vue.prototype.$Message.error({
        content:'请求失败',
    })
    ViewUI.LoadingBar.error();
    return err
}
const response = (res) => { 
    ViewUI.LoadingBar.finish();
    return res
}
const errResponse = (err) => { 
    ViewUI.LoadingBar.error();
    return Promise.reject(err)
}
axios.interceptors.request.use(preRequest, errRequest)
axios.interceptors.response.use(response,errResponse)
export default axios