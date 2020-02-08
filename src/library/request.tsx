import axios, { AxiosInstance } from 'axios'
import { message } from './ui'

class Request {
  private axios: AxiosInstance

  constructor() {
    this.axios = axios.create({
      baseURL: 'https://api.kybelehealth.org/v1'
    })

    /**
     * 401 -> token invalid
     *
     */
    this.axios.interceptors.response.use(
      res => res,
      error => {
        const { status } = error.response
        // 401 = token geçerli değil
        // 417 = header içinde token yok
        // TODO:FE auth ekranlarınd burası devre dışı kalması gerekiyor
        if ([401, 417].includes(status)) {
          // localStorage.clear()
          // Router.push('/login')
        }

        if (error.response) {
          message.error(error.response.data)
          return Promise.reject(error.response.data)
        } else {
          message.error(error.message)
          return Promise.reject(error)
        }
      }
    )
  }

  set token(value: String) {
    this.axios.interceptors.request.use(config => {
      config.headers.authorization = value
      return config
    }, Promise.reject)
  }

  get shared() {
    return this.axios
  }
}

export default new Request()
