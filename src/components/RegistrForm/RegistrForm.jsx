import { Field, Form, Formik, ErrorMessage } from 'formik';
import { useId } from 'react';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { register } from '../../redux/auth/operations';
import toast from 'react-hot-toast';
import css from './RegistrForm.module.css';

const registerSchema = Yup.object().shape({
        name: Yup.string()
            .min(2, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Required'),
        email: Yup.string().email('Must be a valid email!').required('Required'),
        password: Yup.string()
            .min(8, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Required'),
});
    
const notifySuccess = () => toast.success('registration success');
const notifyError = () => toast.error('registration error');
    
    const initialValues = {
        name: '',
        email: '',
        password: '',
    };

export default function RegistrForm() {
    const dispatch = useDispatch();

    const handleSumbit = (values, { resetForm }) => {
        dispatch(
            register({
                name: values.name,
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
    
    const nameFieldId = useId();
    const emailFieldId = useId();
    const pswrdFieldId = useId();
    
    return (
        <Formik
            onSubmit={handleSumbit}
            validationSchema={registerSchema}
            initialValues={initialValues}
        >
            <Form className={css.form} >
                <label className={css.label} htmlFor={nameFieldId}>
                    <b>Name</b>

                    <Field
                        className={css.input}
                        id={nameFieldId}
                        name="name"
                        type="text"
                        placeholder="Enter your name"
                    />
                </label>

                <label className={css.label} htmlFor={emailFieldId}>
                    <b>Email</b>

                    <Field
                        className={css.input}
                        id={emailFieldId}
                        name="email"
                        type="email"
                        placeholder="Enter your email"
                    />
                </label>

                <label className={css.label} htmlFor={pswrdFieldId}>
                    <b>Password</b>

                    <Field
                        className={css.input}
                        id={pswrdFieldId}
                        name="password"
                        type="password"
                        placeholder="Enter your password"
                    />{' '}
                    <ErrorMessage name="password" component="span" className="error" />
                </label>
                <button className={css.btn} type="submit">Register</button>
            </Form>
        </Formik>
    )
}