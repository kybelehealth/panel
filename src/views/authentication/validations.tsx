import Yup from '../../library/yup'

export const LoginRequest = Yup.object().shape({
  email: Yup.string()
    .email(`You've entered an invalid email address`)
    .required('You forgot to write your email'),
  phoneNumber: Yup.string()
    .phone()
    .required('You forgot to write your phone number')
})
