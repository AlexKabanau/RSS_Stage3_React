import { yupResolver } from '@hookform/resolvers/yup';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { schema } from '../utils/schema';
import './HookForm.css';
import { converter } from '../utils/converter';
import { useAppDispatch, useAppSelector } from '../store/store';
import {
  setData,
  setShadow,
  SubmitFormDataType,
} from '../store/reducers/dataSlice';
import { useNavigate } from 'react-router-dom';
import PasswordStrengthBar from '../components/PasswordStrengthBar';
import { getStrength } from '../utils/getStrength';

export type FormDataType = {
  name?: string;
  age?: number;
  email?: string;
  password?: string;
  confirmPassword?: string;
  gender?: string;
  country?: string;
  picture?: unknown | File;
  accept?: boolean;
};
function HookForm() {
  const navigate = useNavigate();
  const countries = useAppSelector((store) => store.countries);
  const [preview, setPreview] = useState('');
  const [passStrength, setPassStrength] = useState<number>(0);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    trigger,
    setValue,
  } = useForm({ resolver: yupResolver(schema), mode: 'onChange' });
  const dispatch = useAppDispatch();

  const onSubmitHandler = async (data: FormDataType) => {
    if (data.picture instanceof File) {
      const string64 = await converter(data.picture);
      const newData: SubmitFormDataType = { ...data, picture: string64 };
      const newDataArr: SubmitFormDataType[] = [newData];
      dispatch(setData(newDataArr));
      dispatch(setShadow('0px 0px 20px 10px rgba(0, 255, 0, 0.5)'));
      navigate('/');
    } else {
      console.log('Invalid picture');
    }
  };
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const pass = e.target.value;
    const strength = getStrength(e.target.value);
    setPassStrength(strength);
    setValue('password', pass);
    trigger('password');
    trigger('confirmPassword');
  };

  const pictureHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0] instanceof File) {
      const picture = event.target.files[0];
      setPreview(URL.createObjectURL(picture));
      setValue('picture', picture);
      trigger('picture');
    } else {
      console.log('no files');
    }
  };
  return (
    <>
      <form className="form-container" onSubmit={handleSubmit(onSubmitHandler)}>
        <h2 className="formTitle">React Hook Form</h2>
        <p className="formDescription">{"Let's create a form"}</p>

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
          <input
            className="input"
            {...register('age')}
            id="age"
            type="number"
          />
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
          <div className="passwordBlock">
            <input
              className="input"
              {...register('password')}
              id="password"
              type="password"
              onChange={handlePasswordChange}
            />
            <PasswordStrengthBar strength={passStrength} />
          </div>

          {errors.password && (
            <p className="errorField">{errors.password.message}</p>
          )}
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
          {errors.confirmPassword && (
            <p className="errorField">{errors.confirmPassword.message}</p>
          )}
        </div>

        <div className="formBlock">
          <p className="label">Gender:</p>
          <div className="radioBlock">
            <input
              {...register('gender')}
              type="radio"
              id="male"
              name="gender"
              value="male"
            />
            <label className="labelRadio" htmlFor="male">
              Male
            </label>
          </div>
          <div className="radioBlock">
            <input
              {...register('gender')}
              type="radio"
              id="female"
              name="gender"
              value="female"
            />
            <label className="labelRadio" htmlFor="female">
              Female
            </label>
          </div>
          {errors.gender && (
            <p className="errorField">{errors.gender.message}</p>
          )}
        </div>

        <div className="acceptBlock">
          <label className="label" htmlFor="accept">
            Accept Terms and Conditions agreement
          </label>
          <input
            className="input"
            {...register('accept')}
            id="accept"
            type="checkbox"
          />
          {errors.accept && (
            <p className="errorField">{errors.accept.message}</p>
          )}
        </div>

        <div className="formBlock">
          <label className="label" htmlFor="picture">
            Picture
          </label>
          <input
            className="input"
            id="picture"
            type="file"
            onChange={(e) => {
              pictureHandler(e);
            }}
          />
          {preview && <img src={preview} alt="Preview" className="preview" />}
          {errors.picture && (
            <p className="errorField">{errors.picture.message}</p>
          )}
        </div>

        <div className="formBlock">
          <label className="label" htmlFor="country">
            Country
          </label>
          <input
            className="input"
            {...register('country')}
            id="country"
            list="countries"
          />
          <datalist id="countries">
            {countries.map((el, key) => (
              <option value={el} key={key} />
            ))}
          </datalist>
          {errors.country && (
            <p className="errorField">{errors.country.message}</p>
          )}
        </div>
        <button type="submit" disabled={!isValid}>
          Submit
        </button>
        <button type="reset" onClick={() => trigger()}>
          Reset
        </button>
      </form>
      <button onClick={() => navigate('/')}>Home</button>
    </>
  );
}

export default HookForm;
