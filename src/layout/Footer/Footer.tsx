import styles from './Footer.module.css';

const Footer = () => {
    return (
        <>
            <footer className={styles['footer']}>
                <div className={styles['footer-content']}>
                    <p>© 2025 Tzlil Cohen | Event Manager Project. All rights reserved.</p>
                    <p>pulseCRM</p>
                </div>
            </footer>
        </>
    );
}

export default Footer;