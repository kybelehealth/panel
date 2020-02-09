import React from 'react'
import { Layout, Button } from 'antd'
import ChildrenColumn from './column'
import PageHeader from '../../components/page-header'

import { inject, observer } from 'mobx-react'
import DatasourceTable from '../../components/table'

const { Content } = Layout

function ChildrenView() {
  const functions = new Map()

  return (
    <>
      <PageHeader
        title="Children"
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
          path="children"
          columns={ChildrenColumn}
        />
      </Content>
    </>
  )
}

export default inject('routing')(observer(ChildrenView))
