import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

function PasswordResetForm() {
  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
    }),
    onSubmit: (values) => {
      // You can handle the form submission here, e.g., send a password reset request.
      console.log('Form submitted with values:', values);
    },
  });

  return (
    <div>
      <h2>Password Reset</h2>
      <form onSubmit={formik.handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
        </div>
        {formik.touched.email && formik.errors.email ? (
          <div className="error">{formik.errors.email}</div>
        ) : null}

        <button type="submit">Reset Password</button>
      </form>
    </div>
  );
}

export default PasswordResetForm;
