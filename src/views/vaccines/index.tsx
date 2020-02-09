import React from 'react'
import { Layout, Button } from 'antd'
import VaccineColumn from './column'
import PageHeader from '../../components/page-header'

import { inject, observer } from 'mobx-react'
import DatasourceTable from '../../components/table'

const { Content } = Layout

function VaccinesView() {
  const functions = new Map()

  return (
    <>
      <PageHeader
        title="Vaccines"
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
          path="vaccines"
          columns={VaccineColumn}
        />
      </Content>
    </>
  )
}

export default inject('routing')(observer(VaccinesView))
