import * as yup from 'yup';
export const initialValues = {
  billingAddress: {
    firstName: '',
    lastName: '',
    country: '',
    street1: '',
    street2: '',
    city: '',
    county: '',
    postCode: '',
  },
  shippingAddress: {
    isSameAddress: true,
    firstName: '',
    lastName: '',
    country: '',
    street1: '',
    street2: '',
    city: '',
    county: '',
    postCode: '',
  },
  email: '',
  phoneNumber: '',
};

export const chekoutSchema = [
  yup.object().shape({
    billingAddress: yup.object().shape({
      firstName: yup
        .string()
        .matches(/^[A-Za-z ]*$/, 'Please enter valid Name')
        .min(2, 'Too Short!')
        .max(15, 'Too Long!')
        .required('Required'),
      lastName: yup
        .string()
        .matches(/^[A-Za-z ]*$/, 'Please enter valid Last Name')
        .min(2, 'Too Short!')
        .max(15, 'Too Long!')
        .required('Required'),
      country: yup
        .string()
        .matches(/^[A-Za-z ]*$/, 'Please enter valid Country')
        .min(2, 'Too Short!')
        .max(15, 'Too Long!')
        .required('required'),
      street1: yup.string().required('required'),
      street2: yup.string(),
      city: yup
        .string()
        .matches(/^[A-Za-z ]*$/, 'Please enter valid City')
        .min(2, 'Too Short!')
        .max(15, 'Too Long!')
        .required('required'),
      county: yup
        .string()
        .matches(/^[A-Za-z ]*$/, 'Please enter valid County')
        .min(2, 'Too Short!')
        .max(15, 'Too Long!')
        .required('required'),
      postCode: yup.string().required('required'),
    }),
    shippingAddress: yup.object().shape({
      isSameAddress: yup.boolean(),
      firstName: yup.string().when('isSameAddress', {
        is: false,
        then: yup.string().required('required'),
      }),
      lastName: yup.string().when('isSameAddress', {
        is: false,
        then: yup.string().required('required'),
      }),
      country: yup.string().when('isSameAddress', {
        is: false,
        then: yup.string().required('required'),
      }),
      street1: yup.string().when('isSameAddress', {
        is: false,
        then: yup.string().required('required'),
      }),
      street2: yup.string(),
      city: yup.string().when('isSameAddress', {
        is: false,
        then: yup.string().required('required'),
      }),
      county: yup.string().when('isSameAddress', {
        is: false,
        then: yup.string().required('required'),
      }),
      postCode: yup.string().when('isSameAddress', {
        is: false,
        then: yup.string().required('required'),
      }),
    }),
  }),
  yup.object().shape({
    email: yup.string().email('Invalid email address').required('required'),
    phoneNumber: yup
      .number()
      .typeError("That doesn't look like a phone number")
      .positive("A phone number can't start with a minus")
      .integer("A phone number can't include a decimal point")
      .min(8)
      .required('A phone number is required'),
  }),
];
