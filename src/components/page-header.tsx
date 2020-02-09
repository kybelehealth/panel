import React from 'react'
import { PageHeader as Header } from '../library/ui'

interface PageHeaderProps {
  title: string
  totalData?: number
  extra?: any
}

export default function PageHeader({
  title,
  totalData = 0,
  extra
}: PageHeaderProps) {
  return (
    <Header
      style={{ padding: 0, marginBottom: 24 }}
      backIcon={null}
      onBack={undefined}
      title={title}
      subTitle={totalData ? `${totalData} records found` : undefined}
      extra={extra}
    />
  )
}
