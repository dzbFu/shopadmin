import Vue from "vue";
import axios from 'axios';
// 封装基础路径
axios.defaults.baseURL = 'https://admin-api.macrozheng.com'
const preRequest = (config) => {
    return config
}
const errRequest = (err) =>{
    Vue.prototype.$Message.destroy();
    Vue.prototype.$Message.error({
        content:'请求失败',
    })
    return err
}
axios.interceptors.request.use(preRequest , errRequest)
export default axios