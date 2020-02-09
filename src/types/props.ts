import { ColumnProps } from 'antd/es/table'

export interface PaginationProps {
  current: number
  pageSize: number
}

export interface DatasourceTableProps {
  path: string
  columns: ColumnProps<unknown>[]
  rowKey?: string
  ref: any
}
