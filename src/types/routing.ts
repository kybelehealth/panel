import { RouteComponentProps } from 'react-router-dom'
import Store from '../store'

export interface ComponentProps extends RouteComponentProps {
  store: typeof Store
}
