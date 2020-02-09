import React from 'react'
import { Layout, Button } from 'antd'
import MemberColumn from './column'
import PageHeader from '../../components/page-header'

import DatasourceTable from '../../components/table'

const { Content } = Layout

function Index() {
  const functions = new Map()

  return (
    <>
      <PageHeader
        title="Members"
        totalData={0}
        extra={[
          <Button
            key="reload"
            type="ghost"
            icon="reload"
            loading={false}
            onClick={() => {
              functions.has('execute') && functions.get('execute')()
            }}
          >
            Reload Data
          </Button>,
          <Button
            key="add"
            type="primary"
            icon="plus"
            onClick={() => {
              // Router.push('/applications?id=new')
            }}
          >
            Add
          </Button>
        ]}
      />

      <Content style={{ padding: 8, backgroundColor: '#fff' }}>
        <DatasourceTable
          functions={functions}
          path="users"
          columns={MemberColumn}
        />
      </Content>
    </>
  )
}

export default Index
