import React, { useState, useEffect } from 'react';
import { Form, Field, withFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const FormComponent = props => {
  const [users, setUsers] = useState([]);
  const { values, touched, errors, status } = props;

  useEffect(() => {
    if (status) {
      setUsers([...users, status]);
    }
  }, [status]);

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
      {users.map(user => (
        <div key={user.id}>{JSON.stringify(user)}</div>
      ))}
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
  }),

  handleSubmit(values, { resetForm, setStatus }) {
    axios
      .post('https://reqres.in/api/users', values)
      .then(res => {
        setStatus(res);
        resetForm();
      })
      .catch(error => {
        console.log(error);
      });
  }
})(FormComponent);

export default FormikForm;
