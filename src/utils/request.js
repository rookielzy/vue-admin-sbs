import axios from 'axios'
import { Message } from 'element-ui'

const service = axios.create({
  baseURL: process.env.BASE_API,
  timeout: 15000
})

service.interceptors.request.use(config => {
  // 每个请求携带token
  return config
}, error => {
  console.log('Intercept Request ', error)
  Promise.reject(error)
})

service.interceptors.response.use(
  response => {
    const res = response.data

    console.log(res)

    if (res.code !== 200) {
      Message({
        message: 'Not 200',
        type: 'error',
        duration: 5 * 1000
      })
      return Promise.reject(new Error('Not 200'))
    }

    Message({
      message: 'Success',
      type: 'success',
      duration: 1000
    })
    return response.data
  },
  error => {
    console.log('Intercept Response ', error)

    return Promise.reject(error)
  }
)

export default service
