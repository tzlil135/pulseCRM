import styles from './Search.module.css';
import { CiSearch } from "react-icons/ci";

const Search = () => {
    return (
        <>
            <div className={styles['input-container']}>
                <label htmlFor="search" className={styles['input-label']}>
                    <CiSearch />
                </label>
                <input type="text" placeholder='Enter Search' />
            </div>
        </>
    )
}

export default Search;