import css from './SearchBox.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { selectFilter } from '../../redux/filters/selectors';
import { changeFilter } from '../../redux/filters/slice';


export default function SearchBox() {
    const dispatch = useDispatch();
    const value = useSelector(selectFilter);
    
    const handleChange = e => {
        dispatch(changeFilter(e.target.value));
    };

    return (
        <div className={css.container}>
            <h2>Find contacts</h2>
            <input
                type="text"
                value={value}
                onChange={handleChange}
                className={css.field}
                placeholder="Search contacts"
            />
        </div>
    )
};