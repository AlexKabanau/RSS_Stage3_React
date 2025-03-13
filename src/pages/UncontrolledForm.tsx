import React, { useRef, useState } from 'react';
import { SubmitUnFormDataType } from '../store/reducers/dataSlice';
import { useAppSelector } from '../store/store';

function UncontrolledForm() {
  const [errors, setErrors] = useState<SubmitUnFormDataType>({});
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
  const handleSubmit = () => {};
  const handeOnInputChange = () => {};
  const pictureHandler = (e: React.ChangeEvent<HTMLInputElement>) => {};
  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <h2 className="formTitle">Uncontrolled Form</h2>
      <p className="formDescription">Let's create a form</p>

      <div className="formBlock">
        <label className="label" htmlFor="name">
          Name
        </label>
        <input className="input" id="name" ref={nameRef} onChange={() => handeOnInputChange()} />
        {errors.name && <p className="errorField">{errors.name}</p>}
      </div>

      <div className="formBlock">
        <label className="label" htmlFor="age">
          Age
        </label>
        <input className="input" id="age" ref={ageRef} onChange={() => handeOnInputChange()} />
        {errors.age && <p className="errorField">{errors.age}</p>}
      </div>

      <div className="formBlock">
        <label className="label" htmlFor="email">
          Email
        </label>
        <input className="input" id="email" ref={emailRef} onChange={() => handeOnInputChange()} />
        {errors.email && <p className="errorField">{errors.email}</p>}
      </div>

      <div className="formBlock">
        <label className="label" htmlFor="password">
          Password
        </label>
        <input
          className="input"
          id="password"
          ref={passwordRef}
          onChange={() => handeOnInputChange()}
        />
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
          onChange={() => handeOnInputChange()}
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
            onChange={() => handeOnInputChange()}
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
            onChange={() => handeOnInputChange()}
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
          onChange={() => handeOnInputChange()}
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
            handeOnInputChange();
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
          onChange={() => handeOnInputChange()}
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
