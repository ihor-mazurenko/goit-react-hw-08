import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import css from './ContactForm.module.css';
import { nanoid } from 'nanoid';
import { useDispatch } from 'react-redux';
import { addContact } from '../../redux/contacts/operations';

export default function ContactForm() {
    const dispatch = useDispatch();
    const initialValues = { id: '', name: '', number: '' };

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
    const handleSubmit = (values, actions) => {
        values.id = nanoid();
        dispatch(addContact(values));
        actions.resetForm();
    };



    return (
        <div>
        <h1 className={css.title}>Phonebook</h1>
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
             
            <Form className={css.container}>
                <label className={css.label}>
                    <b>Name</b>
                    <Field
                        className={css.input}
                        type="text"
                        name="name"
                        placeholder="Contact name"
                    />
                        <ErrorMessage 
                            className={css.error}
                            name="name"
                            component="div" />
                </label>
                <label className={css.label}>
                    <b>Number</b>
                    <Field
                        className={css.input}
                        type="text"
                        name="number"
                        placeholder="123-45-67" />
                        <ErrorMessage
                            className={css.error}
                            name="number"
                            component="div" />
                </label>
                <button className={css.button} type="submit">
                        Add Contact!
                </button>
            </Form>
            </Formik>
        </div>
    );
};