import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { useForm } from 'react-hook-form';
import { schema } from '../utils/schema';
import './HookForm.css';
import { converter } from '../utils/converter';
import { useAppDispatch } from '../store/store';
import { setData } from '../store/reducers/dataSlice';
// import { GENDER } from '../constants/constants'

type FormDataType = {
  name?: string;
  age?: number;
  email?: string;
  password?: string;
  confirmPassword?: string;
  gender?: string;
  country?: string;
  picture?: File | unknown;
  accept?: boolean;
};
function HookForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    trigger,
    setValue,
  } = useForm({ resolver: yupResolver(schema), mode: 'onChange' });
  const dispatch = useAppDispatch()

  const onSubmitHandler = async (data: FormDataType) => {
    console.log(data);
    if (data.picture instanceof File) {
      const string64 = await converter(data.picture)
      dispatch(setData([...data, picture: string64]))
    } else {

    }
  };
  return (
    <form className="form-container" onSubmit={handleSubmit(onSubmitHandler)}>
      <h2 className="formTitle">React Hook Form</h2>
      <p className="formDescription">Let's create a form</p>

      <div className="formBlock">
        <label className="label" htmlFor="name">
          Name
        </label>
        <input className="input" {...register('name')} id="name" />
        {errors.name && <p className="errorField">{errors.name.message}</p>}
      </div>

      <div className="formBlock">
        <label className="label" htmlFor="age">
          Age
        </label>
        <input className="input" {...register('age')} id="age" type="number" />
        {errors.age && <p className="errorField">{errors.age.message}</p>}
      </div>

      <div className="formBlock">
        <label className="label" htmlFor="email">
          Email
        </label>
        <input className="input" {...register('email')} id="email" />
        {errors.email && <p className="errorField">{errors.email.message}</p>}
      </div>

      <div className="formBlock">
        <label className="label" htmlFor="password">
          Password
        </label>
        <input className="input" {...register('password')} id="password" type="password" />
        {errors.password && <p className="errorField">{errors.password.message}</p>}
      </div>

      <div className="formBlock">
        <label className="label" htmlFor="confirmPassword">
          Confirm password
        </label>
        <input
          className="input"
          {...register('confirmPassword')}
          id="confirmPassword"
          type="password"
        />
        {errors.confirmPassword && <p className="errorField">{errors.confirmPassword.message}</p>}
      </div>

      <div className="formBlock">
        <p className="label">Gender:</p>
        <div className="radioBlock">
          <input {...register('gender')} type="radio" id="male" name="gender" value="male" />
          <label className="labelRadio" htmlFor="male">
            Male
          </label>
        </div>
        <div className="radioBlock">
          <input {...register('gender')} type="radio" id="female" name="gender" value="female" />
          <label className="labelRadio" htmlFor="female">
            Female
          </label>
        </div>
        {errors.gender && <p className="errorField">{errors.gender.message}</p>}
      </div>

      <div className="acceptBlock">
        <label className="label" htmlFor="accept">
          Accept Terms and Conditions agreement
        </label>
        <input className="input" {...register('accept')} id="accept" type="checkbox" />
        {errors.accept && <p className="errorField">{errors.accept.message}</p>}
      </div>

      <div className="formBlock">
        <label className="label" htmlFor="picture">
          Picture
        </label>
        <input className="input" {...register('picture')} id="picture" type="file" />
        {errors.picture && <p className="errorField">{errors.picture.message}</p>}
      </div>

      <div className="formBlock">
        <label className="label" htmlFor="country">
          Country
        </label>
        <input className="input" {...register('country')} id="country" list="countries" />
        <datalist id="countries">
          <option value="USA" />
          <option value="Canada" />
          <option value="UK" />
        </datalist>
        {errors.country && <p className="errorField">{errors.country.message}</p>}
      </div>
      <button type="submit" disabled={!isValid}>
        Submit
      </button>
      <button type="reset" onClick={() => trigger()}>
        Reset
      </button>
    </form>
  );
}

export default HookForm;
