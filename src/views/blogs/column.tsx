export default [
  {
    title: 'id',
    dataIndex: 'id',
    ellipsis: true,
    sorter: true,
    width: 80,
    fixed: 'left',
    key: 'id'
  },
  {
    title: 'Blog posts',
    dataIndex: 'BlogPosts',
    ellipsis: true,
    sorter: true,
    render: (posts: any) => posts.length
  },
  { title: 'imageUrl', dataIndex: 'fullName', ellipsis: true, sorter: true },
  {
    title: 'internalName',
    dataIndex: 'birthDate',
    ellipsis: true,
    sorter: true
  }
]
