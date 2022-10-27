import axios from 'axios'
import config from '../config'
// process.env.NODE_ENV 用于获取当前的运行环境
const baseUrl = process.env.NODE_ENV === 'development' ? config.baseUrl.dev : config.baseUrl.pro

class HttpRequest {
    constructor(baseUrl) {
        this.baseUrl = baseUrl
    }
    // 定义请求时的相关配置的方法
    getInsideConfig() {
        const config = {
            baseUrl: this.baseUrl,
            header: {}
        }
        return config
    }
    interceptors(instance) {
        // instance为axios实例
        // 添加请求拦截器
        instance.interceptors.request.use(function (config) {
            // 在发送请求之前做些什么
            return config;
        }, function (error) {
            // 对请求错误做些什么
            return Promise.reject(error);
        });

        // 添加响应拦截器
        instance.interceptors.response.use(function (response) {
            // 对响应数据做点什么
            return response;
        }, function (error) {
            console.log(error, 'error')
            // 对响应错误做点什么
            return Promise.reject(error);
        });
    }

    // 请求时真正调用的方法，options是请求时传进来的参数，
    request(options) {
        const instance = axios.create()
        // 传进axios的实例的参数options包括请求时的参数，以及一些基本配置...this.getInsideConfig()
        options = { ...this.getInsideConfig(), ...options }
        // 对axios实例进行拦截
        this.interceptors(instance)
        return instance(options)
    }
}

export default new HttpRequest(baseUrl)