import { PlayerSummary } from 'components/PlayerSummary';
import styles from './styles.module.css';
import { opponentStats, playerStats } from 'shared';
import { BattleMenu } from 'components/BattleMenu';
import { BattleAnnouncer } from 'components/BattleAnnouncer/BattleAnnouncer';
import { useBattleSequence } from 'components/hooks/useBattleSequence';
import { useEffect, useState } from 'react';
import { useAIOpponent } from 'components/hooks';
import { wait } from '@testing-library/user-event/dist/utils';

export const Battle = ({ onGameEnd }) => {
    const [sequence, setSequence] = useState({});

    const {
        turn,
        inSequence,
        playerHealth,
        opponentHealth,
        announcerMessage,
        playerAnimation,
        opponentAnimation
    } = useBattleSequence(sequence);

    // if it's the opponent's turn, activate their simple AI to make a choice on what to do on said turn
    const AIChoice = useAIOpponent(turn);
    useEffect(() => {
        if (AIChoice && turn === 1 && !inSequence) {
            setSequence({ turn, mode: AIChoice });
        }
    }, [turn, AIChoice, inSequence]);

    // check if either character's health has reached 0
    // and if so, activate the game end screen
    useEffect(() => {
        if (playerHealth === 0 || opponentHealth === 0) {
            (async () => {
                await wait(2000);
                onGameEnd(playerHealth === 0 ? playerStats : opponentStats);
            })();
        }
    }, [playerHealth, opponentHealth, onGameEnd]);

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
                        className={styles[playerAnimation]}
                    >
                    </img>
                </div>
                <div className={styles.opponentSprite}>
                    <img
                        alt={opponentStats.name}
                        src={opponentStats.img}
                        className={styles[opponentAnimation]}
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
                                onAttack={() => setSequence({ turn, mode: 'attack' })}
                                onMagic={() => setSequence({ turn, mode: 'magic' })}
                                onHeal={() => setSequence({ turn, mode: 'heal' })}
                                inSequence={inSequence}
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