import { IoMdContact } from "react-icons/io";
import { BsFillTelephoneFill } from "react-icons/bs";
import css from './Contact.module.css'
import { useDispatch } from 'react-redux';
import { deleteContact } from '../../redux/contacts/operations';

export default function Contact({ contact}) {
    const dispatch = useDispatch();

    const handleDelete = () => {
    dispatch(deleteContact(contact.id));
  };
    return (
        <div className={css.container}>
            <div>
                <p className={css.dcr}>
                    <IoMdContact className={css.icon}/>
                    {contact.name}</p>
                <p className={css.dcr}>
                    <BsFillTelephoneFill className={css.icon}/>
                    {contact.number}</p>
            </div>
            <button className={css.btn} onClick={handleDelete} type="button">Delete!</button>
        </div>
    )
};