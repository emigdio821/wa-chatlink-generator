import * as yup from 'yup'

const countryCodeRegex = /^(\d{1,3}|\d{1,4})$/
const phoneRegex = /^\d{1,10}$/

export const formSchema = yup
  .object()
  .shape({
    countryCode: yup
      .string()
      .required('Required field')
      .matches(countryCodeRegex, { message: 'Invalid code' }),
    phone: yup
      .string()
      .required('Required field')
      .matches(phoneRegex, { message: 'Invalid phone' }),
    message: yup.string().required('Required field'),
  })
  .required()
