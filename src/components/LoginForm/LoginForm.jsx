import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useId } from 'react';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { login } from '../../redux/auth/operations';
import toast from 'react-hot-toast';
import css from './LoginForm.module.css';

const loginSchema = Yup.object().shape({
  email: Yup.string().email('Must be a valid email!').required('Required'),
  password: Yup.string()
    .min(8, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
});

const initialValues = {
  email: '',
  password: '',
};

const notifySuccess = () => toast.success('login success');
const notifyError = () => toast.error('login error');

export default function LoginForm() {
    const dispatch = useDispatch();
    
    const handleSubmit = (values, { resetForm }) => {
    dispatch(
      login({
        email: values.email,
        password: values.password,
      })
    )
      .unwrap()
      .then(() => {
        notifySuccess();
      })
      .catch(() => {
        notifyError();
      });
    resetForm();
  };

    const emailFieldId = useId();
    const pswrdFieldId = useId();
    

  return (
    <Formik
      onSubmit={handleSubmit}
      validationSchema={loginSchema}
      initialValues={initialValues}
    >
      <Form className={css.form}>
        <label className={css.label} htmlFor={emailFieldId}>
          <b>Email</b>
          <Field
            className={css.input}
            id={emailFieldId}
            name='email'
            type='email'
            placeholder="Enter your email"
          />
          <ErrorMessage name="email" component="span" className="error" />
        </label>

        <label className={css.label}  htmlFor={pswrdFieldId}>
          <b>Password</b>
          <Field
            className={css.input}
            id={pswrdFieldId}
            name='password'
            type='password'
            placeholder="Enter your password"
          />
          <ErrorMessage name="password" component="span" className="error" />
        </label>
        <button className={css.btn} type="submit">Login</button>
      </Form>
    </Formik>
    )
}