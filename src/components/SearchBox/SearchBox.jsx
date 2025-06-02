import css from './SearchBox.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { setNameFilter } from '../../redux/filtersSlice';
import { selectNameFilter } from '../../redux/filtersSlice';


export default function SearchBox() {
  const dispatch = useDispatch();
  const filter = useSelector(selectNameFilter);

    return (
        <div className={css.container}>
            <p>Find contacts by name</p>
            <input
                typeof="text"
                value={filter}
                onChange={e => dispatch(setNameFilter(e.target.value))}
                className={css.field}/>
        </div>
    )
};