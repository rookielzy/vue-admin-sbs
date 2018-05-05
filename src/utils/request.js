import axios from 'axios'

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
      return Promise.reject(new Error('Not 200'))
    }

    return response.data
  },
  error => {
    console.log('Intercept Response ', error)

    return Promise.reject(error)
  }
)

export default service
