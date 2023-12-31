import axios from 'axios'
import { ElLoading,ElMessage } from 'element-plus'
const ConfigBaseURL = 'http://localhost:3000/' //默认路径，这里也可以使用env来判断环境
const options ={
    lock: true,
    text: 'Loading',
    background: 'rgba(0, 0, 0, 0.7)',
  }
let loadingInstance = null//这里是ElLoading
//使用create方法创建axios实例
export const Service = axios.create({
  timeout: 7000, // 请求超时时间
  baseURL: ConfigBaseURL,
  method: 'post',
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  }
})
// 添加请求拦截器
Service.interceptors.request.use(config => {
    loadingInstance = ElLoading.service(options)
  return config
})
// 添加响应拦截器
Service.interceptors.response.use(response => {
    loadingInstance.close()
  // console.log(response)
  return response.data
}, error => {
  console.log('TCL: error', error)
  const msg = error.Message !== undefined ? error.Message : ''
  ElMessage({
    message: '网络错误' + msg,
    type: 'error',
    duration: 3 * 1000
  })
  loadingInstance.close()
  return Promise.reject(error)
})
