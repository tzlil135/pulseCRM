import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import Sidebar from "./Sidebar/Sidebar";
import DynamicMenu from "./DynamicMenu/DynamicMenu";
import styles from './Layout.module.css';
import MainContent from "./MainContent/MainContent";


const Layout = () => {
    return (
        <>
            <div className={styles['layout']}>
                <Header />
                <div className={styles['layout-grid']}>
                    <div className={styles['sidebar']}>
                        <Sidebar />
                    </div>
                    <div className={styles['dynamic-menu']}>
                        <DynamicMenu />
                    </div>
                    <div className={styles['main-content']}>
                        <main >
                            <MainContent />
                        </main>
                    </div>
                </div>
                <Footer />
            </div>
        </>
    )
}

export default Layout;