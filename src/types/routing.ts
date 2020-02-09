import { RouteComponentProps } from 'react-router-dom'
import authentication from '../store/authentication'
import routing from '../store/routing'

export interface ComponentProps extends RouteComponentProps {
  authentication: typeof authentication
  routing: typeof routing
}
