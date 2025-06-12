import { useDispatch, useSelector } from 'react-redux';
import { selectError, selectIsLoading } from '../../redux/contacts/selectors';
import { useEffect } from 'react';
import { fetchContacts } from '../../redux/contacts/operations';
import ContactForm from "../../components/ContactForm/ContactForm";
import SearchBox from "../../components/SearchBox/SearchBox";
import ContactList from '../../components/ContactList/ContactList';


export default function ContactPage() {
    const dispatch = useDispatch();
    const isLoading = useSelector(selectIsLoading);
    const error = useSelector(selectError);

    useEffect(() => {
        dispatch(fetchContacts());
    }, [dispatch]);
    
    return (
        <>
            <ContactForm />
            <SearchBox />
           {!isLoading && !error && <ContactList />}
        </>
    )
}