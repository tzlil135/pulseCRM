import customer from '../../assets/images/customer.png';
import styles from './logo.module.css';

const Logo = () => {
    return (
        <>
            <div className={styles['logo-container']}>
                <h3 style={{ textAlign: 'center', color: 'white' }}>Pulse CRM</h3>
                <img
                    src={customer}
                    alt="Pulse CRM Logo"
                    style={{
                        width: '40px',
                        height: '40px',
                    }}
                />
            </div>
        </>
    )
}

export default Logo;