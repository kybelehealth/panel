import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'mobx-react'
import { Route, Switch } from 'react-router-dom'
import { Router } from 'react-router'

import * as serviceWorker from './serviceWorker'

import 'antd/dist/antd.css'
import './index.css'

import Layout from './components/layout'
import LoginView from './views/authentication/login'
import VerifyView from './views/authentication/verify'

import { syncHistoryWithStore } from 'mobx-react-router'

import stores from './store'
import History from './store/history'
import routingStore from './store/routing'

const history = syncHistoryWithStore(History, routingStore)

const routes = [
  {
    path: '/login',
    component: LoginView,
    exact: true
  },
  {
    path: '/verify',
    component: VerifyView,
    exact: true
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
      exact={route.exact}
      render={props => <route.component {...props} routes={route.routes} />}
    />
  )
}

ReactDOM.render(
  <Provider {...stores}>
    <Router history={history}>
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
