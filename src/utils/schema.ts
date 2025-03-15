import * as yup from 'yup';
import { GENDER } from '../constants/constants';
import { countriesData } from '../store/reducers/dataSlice';

const MAX_FILE_SIZE = 1024 * 1024;
const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/png'];

export const schema = yup.object().shape({
  name: yup
    .string()
    .required('Name is required')
    .matches(/^[A-Z]/, 'Name shuld start with uppercase letter'),

  age: yup
    .number()
    .required('Age is required')
    .positive('Age should be a positive number')
    .lessThan(130, 'Age should be less than 130')
    .integer('Age should be integer'),

  email: yup
    .string()
    .required('Email is required')
    .email('Invalid email format'),

  password: yup
    .string()
    .required('Password is required')
    .matches(
      /^(?=.*[a-z])/,
      'Password must contain at least one lowercase letter'
    )
    .matches(
      /^(?=.*[A-Z])/,
      'Password must contain at least one uppercase letter'
    )
    .matches(/^(?=.*\d)/, 'Password must contain at least one number')
    .matches(
      /^(?=.*[!@#$%^&*])/,
      'Password must contain at least one special character'
    ),

  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must be the same')
    .required('Confirm Password'),

  gender: yup
    .string()
    .oneOf([GENDER.female, GENDER.male])
    .required('Gender is required'),

  accept: yup.boolean().test({
    name: 'accepted',
    message: 'You should accept the term and conditions',
    test: (value) => value === true,
  }),

  picture: yup
    .mixed()
    .required('Picture is required')
    .test('fileSize', 'File too large', (value) => {
      const file = value as File;
      if (!file) return true;
      return file.size <= MAX_FILE_SIZE;
    })
    .test('fileFormat', 'Unsupported Format', (value) => {
      const file = value as File;
      if (!file) return true;
      return SUPPORTED_FORMATS.includes(file.type);
    }),

  country: yup
    .string()
    .oneOf(countriesData)
    .required('Coutry is required field'),
});
