import styles from './FAB.module.css';

export default function FAB() {
    return (
        <div className={styles.floatingContainer}>
            <div className={styles.floatingButton}>
                <i className='bi bi-info-circle'></i>
            </div>
            <div className={styles.elementContainer}>
                <div className={styles.floatElement}>
                    <i className='bi bi-envelope'></i>
                </div>
                <div className={styles.floatElement}>
                    <i className='bi bi-telephone'></i>
                </div>
                <div className={styles.floatElement}>
                    <i className='bi bi-chat-left-text'></i>
                </div>
            </div>
        </div>
    );
}
