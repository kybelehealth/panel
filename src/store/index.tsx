import { observable, action } from 'mobx'
import request from '../library/request'

class Store {
  @observable token: string | null = localStorage.getItem('TOKEN')

  constructor() {
    if (this.token) {
      request.token = this.token
    }
  }
  @action onLogin(token: string) {
    this.token = token
    localStorage.setItem('TOKEN', token)
    request.token = token
  }
}

export default new Store()
