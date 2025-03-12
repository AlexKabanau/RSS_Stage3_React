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
  return <form></form>;
}

export default HookForm;
