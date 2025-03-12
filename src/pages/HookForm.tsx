import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { useForm } from 'react-hook-form';
import { schema } from '../utils/schema';

function HookForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    trigger,
    setValue,
  } = useForm({ resolver: yupResolver(schema), mode: 'onChange' });

  const onSubmitHandler = () => {};
  return (
    <form className="form" onSubmit={handleSubmit(onSubmitHandler)}>
      <div className="formBlock">
        <label className="label" htmlFor="name">
          Name
        </label>
        <input className="input" {...register('name')} id="name" />
        {errors.name && <p className="errorField">{errors.name.message}</p>}
      </div>
      <div className="formBlock">
        <label className="label" htmlFor="name">
          Age
        </label>
        <input className="input" {...register('name')} id="name" />
        {errors.name && <p className="errorField">{errors.name.message}</p>}
      </div>
      <div className="formBlock">
        <label className="label" htmlFor="name">
          Email
        </label>
        <input className="input" {...register('name')} id="name" />
        {errors.name && <p className="errorField">{errors.name.message}</p>}
      </div>
      <div className="formBlock">
        <label className="label" htmlFor="name">
          Password
        </label>
        <input className="input" {...register('name')} id="name" />
        {errors.name && <p className="errorField">{errors.name.message}</p>}
      </div>
      <div className="formBlock">
        <label className="label" htmlFor="name">
          Confirm password
        </label>
        <input className="input" {...register('name')} id="name" />
        {errors.name && <p className="errorField">{errors.name.message}</p>}
      </div>
      <div className="formBlock">
        <label className="label" htmlFor="name">
          Gender
        </label>
        <input className="input" {...register('name')} id="name" />
        {errors.name && <p className="errorField">{errors.name.message}</p>}
      </div>
      <div className="formBlock">
        <label className="label" htmlFor="name">
          Accept Terms and Conditions agreement
        </label>
        <input className="input" {...register('name')} id="name" />
        {errors.name && <p className="errorField">{errors.name.message}</p>}
      </div>
      <div className="formBlock">
        <label className="label" htmlFor="name">
          Picture
        </label>
        <input className="input" {...register('name')} id="name" />
        {errors.name && <p className="errorField">{errors.name.message}</p>}
      </div>
      <div className="formBlock">
        <label className="label" htmlFor="name">
          Country
        </label>
        <input className="input" {...register('name')} id="name" />
        {errors.name && <p className="errorField">{errors.name.message}</p>}
      </div>
      <div className="formBlock">
        <label className="label" htmlFor="name">
          Name
        </label>
        <input className="input" {...register('name')} id="name" />
        {errors.name && <p className="errorField">{errors.name.message}</p>}
      </div>
    </form>
  );
}

export default HookForm;
