import * as Yup from 'yup'
import 'yup-phone'

declare module 'yup' {
  export interface StringSchema {
    phone(countryCode?: string, strict?: boolean): StringSchema
  }
}

export default Yup
