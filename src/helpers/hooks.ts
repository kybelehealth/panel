import { useEffect, useState, useRef } from 'react'
import { PaginationProps } from '../types/props'
import { PaginationResponse } from '../types/response'
import request from '../library/request'

function useInterval(callback: any, delay?: number) {
  const savedCallback: any = useRef()

  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  useEffect(() => {
    function tick() {
      savedCallback.current()
    }
    if (delay !== null) {
      let id = setInterval(tick, delay)
      return () => clearInterval(id)
    }
  }, [delay])
}

function useDatasource(url: string) {
  let defaultPagination: PaginationProps = {
    current: 1,
    pageSize: 10
  }
  let defaultSorter: string[] = ['id DESC']
  const defaultError: any = null

  const [pending, setPending] = useState(false)
  const [rows, setRows] = useState([])
  const [pagination, setPagination] = useState(defaultPagination)
  const [count, setCount] = useState(0)
  const [sorter, setSorter] = useState(defaultSorter)
  const [error, setError] = useState(defaultError)

  const onChange = (page: any, filter: any, sorter: any) => {
    const order = sorter.order === 'ascend' ? 'ASC' : 'DESC'

    if (sorter.field) {
      setSorter([`${sorter.field} ${order}`])
    }

    setPagination({
      ...pagination,
      current: page.current
    })
  }
  /* eslint-disable */

  const execute = () => {
    setPending(true)
    setError(null)

    request.shared
      .get(url, {
        params: {
          page: pagination.current,
          limit: pagination.pageSize,
          order: sorter
        }
      })
      .then((response: any) => {
        const data: PaginationResponse = response.data
        setRows(data.rows)
        setCount(data.count)
      })
      .catch(setError)
      .finally(() => setPending(false))
  }

  useEffect(() => {
    execute()
  }, [pagination])

  /* eslint-enable */

  return {
    execute,
    pending,
    rows,
    pagination: { ...pagination, total: count },
    onChange,
    error
  }
}

export { useInterval, useDatasource }
