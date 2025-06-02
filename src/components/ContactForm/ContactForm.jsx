import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import css from './ContactForm.module.css';
import { useId } from 'react';
import { useDispatch } from 'react-redux';
import { addContact } from '../../redux/contactsOps';

export default function ContactForm() {
    const nameFieldId = useId();
    const numberFieldId = useId();
    const initialValues = { name: "", number: "" };
    const dispatch = useDispatch();
    
    const handleSubmit = (values, actions) => {
        dispatch(
            addContact({
                name: values.name,
                number: values.number,
            })
        );
        actions.resetForm();
    };

    const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, 'Name must be at least 3 characters long')
      .max(50, 'Name must be 50 characters or less')
      .required('Required'),
    number: Yup.string()
      .min(3, 'Number must be at least 3 characters long')
      .max(50, 'Number must be 50 characters or less')
      .required('Required'),
    });

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            <Form className={css.container}>
                <div className={css.form}>
                    <label htmlFor={nameFieldId}>Name</label>
                    <Field id={nameFieldId} name="name" required/>
                    <ErrorMessage
                        name="name"
                        component="span"
                        className={css.errorMessage} />
                </div>
                <div className={css.form}>
                    <label htmlFor={numberFieldId}>Number</label>
                    <Field id={numberFieldId} name="number" required />
                    <ErrorMessage
                        name="number"
                        component="span"
                        className={css.errorMessage} />
                </div>
                <button className={css.button} type="submit">
                        Add Contact!
                </button>
            </Form>
        </Formik>
    );
};