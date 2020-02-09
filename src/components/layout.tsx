import React from 'react'
import { Route, Switch } from 'react-router-dom'

import { ComponentProps } from '../types/routing'
import { Layout, Menu, Icon } from '../library/ui'
import HomeView from '../views/home'
import MembersView from '../views/members'
import ChildrenView from '../views/children'
import VaccinesView from '../views/vaccines'
import BlogsView from '../views/blogs'
import LanguagesView from '../views/languages'

import { inject, observer } from 'mobx-react'

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
    path: '/children',
    title: 'Children',
    icon: 'member',
    component: ChildrenView
  },
  {
    path: '/vaccines',
    title: 'Vaccines',
    icon: 'member',
    component: VaccinesView
  },
  {
    path: '/blogs',
    title: 'Blogs',
    icon: 'member',
    component: BlogsView
  },
  {
    path: '/languages',
    title: 'Languages',
    icon: 'member',
    component: LanguagesView
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
          <Switch>
            {routes.map((route, i) => (
              <RouteWithSubRoutes key={i} {...route} />
            ))}
          </Switch>
        </Content>
      </Layout>
    </Layout>
  )
}

export default inject('routing')(observer(LayoutMaster))
