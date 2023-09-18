import { PlayerSummary } from 'components/PlayerSummary';
import styles from './styles.module.css';
import { useState } from 'react';
import { opponentStats, playerStats } from 'shared';
import { BattleMenu } from 'components/BattleMenu';
import { BattleAnnouncer } from 'components/BattleAnnouncer/BattleAnnouncer';

export const Battle = () => {

    const [playerHealth, setPlayerHealth] = useState(playerStats.maxHealth);
    const [opponentHealth, setOpponentHealth] = useState(opponentStats.maxHealth);
    const [announcerMessage, setAnnouncerMessage] = useState('');

    return (
        <>
            <div className={styles.opponent}>
                <div className={styles.summary}>
                    <PlayerSummary
                        name={opponentStats.name}
                        level={opponentStats.level}
                        health={opponentHealth}
                        maxHealth={opponentStats.maxHealth}
                    />
                </div>
            </div>

            <div className={styles.characters}>
                <div className={styles.gameHeader}>
                    {playerStats.name} vs {opponentStats.name}
                </div>
            </div>

            <div className={styles.gameImages}>
                <div className={styles.playerSprite}>
                    <img
                        alt={playerStats.name}
                        src={playerStats.img}
                    >
                    </img>
                </div>
                <div className={styles.opponentSprite}>
                    <img
                        alt={opponentStats.name}
                        src={opponentStats.img}
                    >
                    </img>
                </div>
            </div>

            <div className={styles.user}>
                <div>
                    <div className={styles.summary}>
                        <PlayerSummary
                            main
                            name={playerStats.name}
                            level={playerStats.level}
                            health={playerHealth}
                            maxHealth={playerStats.maxHealth}
                        />
                    </div>
                    <div className={styles.hud}>

                        <div className={styles.hudChild}>
                            <BattleMenu
                                onAttack={() => console.log('Attack!')}
                                onMagic={() => console.log('Magic!')}
                                onHeal={() => console.log('Heal!')}
                            />
                        </div>
                    </div>
                </div>
                <div className={styles.hudChild}>
                    <BattleAnnouncer
                        message={
                            announcerMessage || `What will ${playerStats.name} do?`
                        }
                    />
                </div>
            </div>
        </>
    );
};