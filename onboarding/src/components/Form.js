import React from 'react';
import { Form, Field, withFormik } from 'formik';

const FormComponent = props => {
  return (
    <Form>
      <Field type='text' name='name' placeholder='name' />
      <Field type='email' name='email' placeholder='email' />
      <Field type='password' name='password' placeholder='password' />
      <label>
        <Field type='checkbox' name='tos' />
        Agree to TOS
      </label>
      <button type='submit'>Submit</button>
    </Form>
  );
};

const FormikForm = withFormik({
  mapPropsToValues: ({ name, email, password }) => {
    return {
      name: name || '',
      email: email || '',
      password: password || ''
    };
  }
})(FormComponent);

export default FormikForm;
