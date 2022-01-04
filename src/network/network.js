import axios from 'axios';
import { BASEURL } from './network_constant'

export default class RestTemplate {
  constructor(config) {
    this.axios_ins = axios.create({
      // headers,
      withCredentials: true,
      config,
      baseURL: BASEURL,
    })
    this.axios_ins.interceptors.response.use(res => {
      // 去除掉 axios 框架自带的那些 信息，只返回需要的 那份数据
      let data = res.data
      return data
    })
  }

  get(url, config) {
    return new Promise((resolve, reject) => {
      this.axios_ins.get(url, config)
        .then(res => {
          res.errorCode === "00000" ? resolve(res) : reject(res)
        })
        .catch(err => {
          reject(err)
        })
    })
  }
  post(url, config) {
    return new Promise((resolve, reject) => {
      this.axios_ins.post(url, config)
        .then(res => {
          res.errorCode === "00000" ? resolve(res) : reject(res)
        })
        .catch(err => {
          reject(err)
        })
    })
  }
  delete(url, config) {
    return new Promise((resolve, reject) => {
      this.axios_ins.delete(url, config)
        .then(res => {
          resolve(res)
        })
        .catch(err => {
          reject(err)
        })
    })
  }
  patch(url, config) {
    return new Promise((resolve, reject) => {
      this.axios_ins.patch(url, config)
        .then(res => {
          resolve(res)
        })
        .catch(err => {
          reject(err)
        })
    })
  }
  put(url, config) {
    return new Promise((resolve, reject) => {
      this.axios_ins.put(url, config)
        .then(res => {
          resolve(res)
        })
        .catch(err => {
          reject(err)
        })
    })
  }
}
