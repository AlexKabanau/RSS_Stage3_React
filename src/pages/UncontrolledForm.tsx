import React, { useRef, useState } from 'react';
import { setData, SubmitUnFormDataType } from '../store/reducers/dataSlice';
import { useAppDispatch, useAppSelector } from '../store/store';
import { schema } from '../utils/schema';
import { ValidationError } from 'yup';
import { converter } from '../utils/converter';
import { useNavigate } from 'react-router-dom';
import { getStrength } from '../utils/getStrength';
import PasswordStrengthBar from '../components/PasswordStrengthBar';

type FieldsName =
  | 'name'
  | 'age'
  | 'email'
  | 'password'
  | 'confirmPassword'
  | 'gender'
  | 'accept'
  | 'country'
  | 'picture';

function UncontrolledForm() {
  const [errors, setErrors] = useState<SubmitUnFormDataType>({});
  const [passStrength, setPassStrength] = useState<number>(0);
  const countries = useAppSelector((state) => state.countries);
  const nameRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const maleRef = useRef<HTMLInputElement>(null);
  const femaleRef = useRef<HTMLInputElement>(null);
  const countryRef = useRef<HTMLInputElement>(null);
  const pictureRef = useRef<HTMLInputElement>(null);
  const acceptRef = useRef<HTMLInputElement>(null);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  async function validateSubmit(data: SubmitUnFormDataType) {
    console.log('data:', data);
    try {
      await schema.validateSync(data, { abortEarly: false });
      return true;
    } catch (error) {
      if (error instanceof ValidationError && error.inner) {
        const validError: Record<string, string> = {};
        error.inner.forEach((err) => {
          if (err.path) {
            validError[err.path] = err.message;
          }
        });
        setErrors(validError);
        console.log(validError);
        if (Object.keys(validError).length === 0) {
          return false;
        }
      }
    }
  }
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data: SubmitUnFormDataType = {
      name: nameRef.current?.value,
      age: Number(ageRef.current?.value),
      email: emailRef.current?.value,
      password: passwordRef.current?.value,
      confirmPassword: confirmPasswordRef.current?.value,
      gender: maleRef.current?.checked ? 'male' : 'female',
      country: countryRef.current?.value,
      picture: pictureRef.current?.files ? pictureRef.current.files[0] : undefined,
      accept: acceptRef.current?.checked,
    };
    const isValid = await validateSubmit(data);

    if (isValid && data.picture) {
      console.log(data);
      const string64 = await converter(data.picture);
      const newData = { ...data, picture: string64 };
      const newDataArr = [newData];
      dispatch(setData(newDataArr));
      navigate('/');
    }

    /*if (data.picture instanceof File) {
          const string64 = await converter(data.picture);
          const newData: SubmitFormDataType = { ...data, picture: string64 };
          const newDataArr: SubmitFormDataType[] = [newData];
          dispatch(setData(newDataArr));
          navigate('/');
        } else {
          console.log('Invalid picture');
        } */
    // age: ageRef.current?.value,
  }
  const handeOnInputChange = (fieldName: FieldsName) => {
    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      delete newErrors[fieldName];
      return newErrors;
    });
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handeOnInputChange('password');
    const strength = getStrength(e.target.value);
    setPassStrength(strength);
  };
  const pictureHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && pictureRef.current) {
      // const picture = e.target.files[0];
      pictureRef.current.files = e.target.files;
    }
  };
  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <h2 className="formTitle">Uncontrolled Form</h2>
      <p className="formDescription">Let's create a form</p>

      <div className="formBlock">
        <label className="label" htmlFor="name">
          Name
        </label>
        <input
          className="input"
          id="name"
          ref={nameRef}
          onChange={() => handeOnInputChange('name')}
        />
        {errors.name && <p className="errorField">{errors.name}</p>}
      </div>

      <div className="formBlock">
        <label className="label" htmlFor="age">
          Age
        </label>
        <input
          className="input"
          id="age"
          ref={ageRef}
          onChange={() => handeOnInputChange('age')}
          type="number"
        />
        {errors.age && <p className="errorField">{errors.age}</p>}
      </div>

      <div className="formBlock">
        <label className="label" htmlFor="email">
          Email
        </label>
        <input
          className="input"
          id="email"
          ref={emailRef}
          onChange={() => handeOnInputChange('email')}
        />
        {errors.email && <p className="errorField">{errors.email}</p>}
      </div>

      <div className="formBlock">
        <label className="label" htmlFor="password">
          Password
        </label>
        <div className="passwordBlock">
          <input
            className="input"
            id="password"
            ref={passwordRef}
            type="password"
            onChange={(e) => handlePasswordChange(e)}
          />
          <PasswordStrengthBar strength={passStrength} />
        </div>
        {errors.password && <p className="errorField">{errors.password}</p>}
      </div>

      <div className="formBlock">
        <label className="label" htmlFor="confirmPassword">
          Confirm password
        </label>
        <input
          className="input"
          id="confirmPassword"
          ref={confirmPasswordRef}
          type="password"
          onChange={() => handeOnInputChange('confirmPassword')}
        />
        {errors.confirmPassword && <p className="errorField">{errors.confirmPassword}</p>}
      </div>

      <div className="formBlock">
        <p className="label">Gender:</p>
        <div className="radioBlock">
          <input
            type="radio"
            id="male"
            name="gender"
            value="male"
            ref={maleRef}
            onChange={() => handeOnInputChange('gender')}
          />
          <label className="labelRadio" htmlFor="male">
            Male
          </label>
        </div>
        <div className="radioBlock">
          <input
            type="radio"
            id="female"
            name="gender"
            value="female"
            ref={femaleRef}
            onChange={() => handeOnInputChange('gender')}
          />
          <label className="labelRadio" htmlFor="female">
            Female
          </label>
        </div>

        {errors.gender && <p className="errorField">{errors.gender}</p>}
      </div>

      <div className="acceptBlock">
        <label className="label" htmlFor="accept">
          Accept Terms and Conditions agreement
        </label>
        <input
          className="input"
          id="accept"
          ref={acceptRef}
          type="checkbox"
          onChange={() => handeOnInputChange('accept')}
        />
        {errors.accept && <p className="errorField">{errors.accept}</p>}
      </div>

      <div className="formBlock">
        <label className="label" htmlFor="picture">
          Picture
        </label>
        <input
          className="input"
          id="picture"
          type="file"
          ref={pictureRef}
          onChange={(e) => {
            handeOnInputChange('picture');
            pictureHandler(e);
          }}
        />
        {/* {preview && <img src={preview} alt="Preview" className="preview" />} */}
        {errors.picture && (
          <p className="errorField">
            {/* {errors.picture} */}
            Error
          </p>
        )}
      </div>

      <div className="formBlock">
        <label className="label" htmlFor="country">
          Country
        </label>
        <input
          className="input"
          id="country"
          list="countries"
          name="country"
          ref={countryRef}
          onChange={() => handeOnInputChange('country')}
        />
        <datalist id="countries">
          {countries.map((el, key) => (
            <option value={el} key={key} />
          ))}
        </datalist>
        {errors.country && <p className="errorField">{errors.country}</p>}
      </div>
      <button type="submit">Submit</button>
      {/* <button type="reset" onClick={() => trigger()}>
        Reset
      </button> */}
    </form>
  );
}

export default UncontrolledForm;
