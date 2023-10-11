import { useState } from 'react';
import styles from './styles.module.css';
import { StartMenu } from 'components/StartMenu';
import { Battle } from 'components/Battle';
import { EndMenu } from 'components/EndMenu';


export const App = () => {
  const [mode, setMode] = useState('start');
  const [loser, setLoser] = useState();

  return (
    <div className={styles.main}>
      {mode === 'start' && (
        <StartMenu onStartClick={() => setMode('battle')} />
      )}

      {mode === 'battle' && <Battle onGameEnd={loser => {
        setLoser(loser);
        setMode('gameOver');
      }} />}

      {mode === 'gameOver' && (
        <EndMenu 
          loser={loser} 
          onStartClick={() => {
            setLoser(undefined);
            setMode('battle');
          }} 
        />
      )}
    </div>
  );
};