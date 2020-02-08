export interface LoginFields {
  email: string
  phoneNumber: string
}

export interface LoginVerifyFields {
  phoneNumber: string
  email: string
  authyId: string
  LanguageId: number
}

export interface LoginVerifyInputFields {
  code: string
}
