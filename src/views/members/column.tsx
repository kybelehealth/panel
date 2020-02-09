import { ColumnProps } from 'antd/es/table'

const columns: ColumnProps<unknown>[] = [
  {
    title: 'id',
    dataIndex: 'id',
    ellipsis: true,
    sorter: true,
    width: 80,
    fixed: 'left',
    key: 'id'
  },
  { title: 'firstName', dataIndex: 'firstName', ellipsis: true, sorter: true },
  { title: 'lastName', dataIndex: 'lastName', ellipsis: true, sorter: true },
  { title: 'email', dataIndex: 'email', ellipsis: true, sorter: true },
  {
    title: 'phoneNumber',
    dataIndex: 'phoneNumber',
    ellipsis: true,
    sorter: true
  },
  { title: 'birthDate', dataIndex: 'birthDate', ellipsis: true, sorter: true },
  { title: 'gender', dataIndex: 'gender', ellipsis: true, sorter: true }
]

export default columns
