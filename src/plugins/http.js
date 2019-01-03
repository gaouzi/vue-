import axios from 'axios'
//  把axios改变成vue的插件
const httpHlper={}
httpHlper.install=function fn(Vue){
    axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1'
    Vue.prototype.$http = axios
}
export default httpHlper