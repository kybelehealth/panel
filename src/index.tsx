import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'mobx-react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import store from './store'
import * as serviceWorker from './serviceWorker'

import 'antd/dist/antd.css'
import './index.css'

import Layout from './components/layout'
import LoginView from './views/authentication/login'
import VerifyView from './views/authentication/verify'

const routes = [
  {
    path: '/login',
    component: LoginView
  },
  {
    path: '/verify',
    component: VerifyView
  },
  {
    path: '/',
    component: Layout
  }
]

function RouteWithSubRoutes(route: any) {
  return (
    <Route
      path={route.path}
      render={props => <route.component {...props} routes={route.routes} />}
    />
  )
}

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Switch>
        {routes.map((route, i) => (
          <RouteWithSubRoutes key={i} {...route} />
        ))}
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('root')
)
serviceWorker.unregister()
