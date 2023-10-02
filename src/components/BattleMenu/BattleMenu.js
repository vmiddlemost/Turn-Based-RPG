import styles from './styles.module.css';

export const BattleMenu = ({ onAttack, onMagic, onHeal, inSequence }) => {
    if (!inSequence) {
        return (
            <div className={styles.main}>
                <div onClick={onAttack} className={styles.option}>
                    Attack
                </div>
                <div onClick={onMagic} className={styles.option}>
                    Magic
                </div>
                <div onClick={onHeal} className={styles.option}>
                    Heal
                </div>
            </div>
        );
    } else {
        return (
            <div className={styles.main}>
                <div className={styles.usedOption}>
                    Attack
                </div>
                <div className={styles.usedOption}>
                    Magic
                </div>
                <div className={styles.usedOption}>
                    Heal
                </div>
            </div>
        );
    }
};