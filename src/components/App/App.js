import { useState } from 'react';
import styles from './styles.module.css';
import { StartMenu } from 'components/StartMenu';
import { Battle } from 'components/Battle';
import { EndMenu } from 'components/EndMenu';


export const App = () => {
  const [mode, setMode] = useState('start');
  const [winner, setWinner] = useState();

  return (
    <div className={styles.main}>
      {mode === 'start' && (
        <StartMenu onStartClick={() => setMode('battle')} />
      )}

      {mode === 'battle' && <Battle onGameEnd={winner => {
        setWinner(winner);
        setMode('gameOver');
      }} />}

      {mode === 'gameOver' && (
        <EndMenu 
          winner={winner} 
          onStartClick={() => {
            setWinner(undefined);
            setMode('battle');
          }} 
        />
      )}
    </div>
  );
};