import { IoMdContact } from "react-icons/io";
import { BsFillTelephoneFill } from "react-icons/bs";
import css from './Contact.module.css'
import { useDispatch } from 'react-redux';
import { deleteContact } from '../../redux/contactsOps';

export default function Contact({ name, number, id }) {
    const dispatch = useDispatch();

    const handleDelete = () => {
    dispatch(deleteContact(id));
  };
    return (
        <div className={css.container}>
            <div>
                <p>
                    <IoMdContact className={css.icon}/>
                    {name}</p>
                <p>
                    <BsFillTelephoneFill className={css.icon}/>
                    {number}</p>
            </div>
            <button className={css.btn} onClick={handleDelete}>Delete!</button>
        </div>
    )
};