import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import { Layout, Menu, Icon } from '../library/ui'
import HomeView from '../views/home'
import MembersView from '../views/members'
import { ComponentProps } from '../types/routing'

const { Sider, Content } = Layout

const routes = [
  {
    path: '/',
    title: 'Dashboard',
    icon: 'pie-chart',
    component: HomeView,
    exact: true
  },
  {
    path: '/members',
    title: 'Members',
    icon: 'member',
    component: MembersView
  },
  {
    path: '/vaccines',
    title: 'Vaccines',
    icon: 'member',
    component: HomeView
  },
  {
    path: '/blogs',
    title: 'Blogs',
    icon: 'member',
    component: HomeView
  },
  {
    path: '/languages',
    title: 'Languages',
    icon: 'member',
    component: HomeView
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

const LayoutMaster = ({ history }: ComponentProps) => {
  const onChangePage = (item: any) => {
    history.push(item.key)
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider width={230} theme="light">
        <div
          style={{
            height: 80,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          Kybele
        </div>

        <Menu
          theme="light"
          mode="inline"
          defaultSelectedKeys={[history.location.pathname]}
          onClick={onChangePage}
        >
          <Menu.ItemGroup>
            {routes.map(route => (
              <Menu.Item key={route.path}>
                <Icon type={route.icon} />
                <span>{route.title}</span>
              </Menu.Item>
            ))}
          </Menu.ItemGroup>
        </Menu>
      </Sider>

      <Layout>
        <Content style={{ padding: 24 }}>
          <Router>
            <Switch>
              {routes.map((route, i) => (
                <RouteWithSubRoutes key={i} {...route} />
              ))}
            </Switch>
          </Router>
        </Content>
      </Layout>
    </Layout>
  )
}

export default LayoutMaster
