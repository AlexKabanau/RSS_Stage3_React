import * as yup from "yup";
import { GENDER } from '../constants/constants';

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
  gender: yup.string().oneOf([GENDER.female, GENDER.male]).required('Gender is required'),
  country: yup.string().required('Coutry is required field'),
  email: yup.string().email('Invalid email format').required('Email is required'),
  accept: yup.boolean().test({
    name: 'accepted',
    message: 'You should accept the term and conditions',
    test: (value) => value === true
  }),
  password: yup.string(),
  confirmPassword: yup.string()

});

/* name (validate for first uppercased letter)
age (should be number, no negative values)
email (validate for email)
2 passwords (should match, display the password strength: 1 number, 1 uppercased letter, 1 lowercased letter, 1 special character)
gender (you can use radio buttons or select control)
accept Terms and Conditions agreement (T&C, can be a checkbox)
input control to upload picture (validate size and extension, allow png jpeg, save in redux store as base64)
autocomplete control to select country (all countries should be stored in the Redux store) Form should contain labels, which should be connected with inputs (look at htmlFor) */
