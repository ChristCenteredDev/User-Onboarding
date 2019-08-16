import React from 'react';
import { Form, Field, withFormik } from 'formik';
import * as Yup from 'yup';

const FormComponent = props => {
  const { values, touched, errors } = props;

  return (
    <Form>
      {touched.name && errors.name && <p className='error'>{errors.name}</p>}
      <Field type='text' name='name' placeholder='name' />
      {touched.email && errors.email && <p className='error'>{errors.email}</p>}
      <Field type='email' name='email' placeholder='email' />
      {touched.password && errors.password && (
        <p className='error'>{errors.password}</p>
      )}
      <Field type='password' name='password' placeholder='password' />
      {touched.tos && errors.tos && <p className='error'>{errors.tos}</p>}
      <label>
        <Field type='checkbox' name='tos' />
        Agree to TOS
      </label>
      <button type='submit'>Submit</button>
    </Form>
  );
};

const FormikForm = withFormik({
  mapPropsToValues: ({ name, email, password, tos }) => {
    return {
      name: name || '',
      email: email || '',
      password: password || '',
      tos: tos || false
    };
  },

  validationSchema: Yup.object().shape({
    name: Yup.string().required('Name required'),
    email: Yup.string()
      .email('Email needed')
      .required('Email required'),
    password: Yup.string()
      .min(4, 'Minimum four characters')
      .required('Password required'),
    tos: Yup.boolean()
      .oneOf([true], 'Needed')
      .required()
  })
})(FormComponent);

export default FormikForm;
