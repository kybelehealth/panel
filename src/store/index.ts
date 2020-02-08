import { observable } from 'mobx'
import { createBrowserHistory } from 'history'

class Store {
  @observable token = null
  history: any

  constructor() {
    this.history = createBrowserHistory({})
  }
}

export default new Store()
