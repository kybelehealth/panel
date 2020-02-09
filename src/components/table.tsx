import React, { useEffect } from 'react'
import { Table, message } from '../library/ui'

import { DatasourceTableProps } from '../types/props'
import { useDatasource } from '../helpers/hooks'

export default function(props: any) {
  const { path, columns, rowKey = 'id' }: DatasourceTableProps = props
  const { execute, pending, rows, pagination, onChange, error } = useDatasource(
    path
  )
  props.functions.set('execute', execute)

  useEffect(() => {
    if (error) {
      message.error(error.message)
    }
  }, [error])

  return (
    <Table
      scroll={{ x: 1400 }}
      columns={columns}
      size="middle"
      rowKey={rowKey}
      dataSource={rows}
      pagination={pagination}
      loading={pending}
      onChange={onChange}
    />
  )
}
