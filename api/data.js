import axios from './axios'

export const getMenu = (param) => {
    return axios.request({
        // url是同级的mock.js文件定义的模拟数据接口
        url: '/permission/getMenu',
        method: 'post',
        data: param
    })
}

export const getData = () => {
    return axios.request({
        url: '/home/getData',
        method: 'get'
    })
}

export const getUser = (params) => {
    return axios.request({
        url: '/user/getUser',
        method: 'get',
        params
    })
}

// export const getMenu = (params) => {
//     return axios.request({
//         url: '/permission/getMenu',
//         method: 'post',
//         data: param
//     })
// }