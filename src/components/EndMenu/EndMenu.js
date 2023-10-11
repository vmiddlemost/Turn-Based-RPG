import { playerStats } from 'shared';
import styles from './styles.module.css';
import { LevelUp, ResetLevels } from 'components/hooks';

export const EndMenu = ({ loser, onStartClick }) => {
    if (loser.name === playerStats.name) {
        ResetLevels();
        return <div className={styles.main}>
            <h1>{loser.name} made it to level {loser.level} before falling!</h1>
            <button className={styles.startButton} onClick={onStartClick}>Play Again</button>
        </div>;
    } else {
        LevelUp();
        console.log("Money");
        return <div className={styles.main}>
        <h1>{loser.name} has been defeated! Next enemy?</h1>
        <button className={styles.startButton} onClick={onStartClick}>Bring it on!</button>
    </div>;
    }

};