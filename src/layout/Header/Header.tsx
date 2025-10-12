import Search from "../../components/Search/Search";
import UserProfile from "../../components/UserProfile/UserProfile";
import Logo from "../../components/Logo/Logo";
import styles from './Header.module.css';

const Header = () => {
    return (
        <>
            <header className={styles['header']}>
                < UserProfile />
                <Search />
                <Logo />
            </header>
        </>
    )
}

export default Header;