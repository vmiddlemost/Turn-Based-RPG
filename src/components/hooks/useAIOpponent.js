import { useEffect, useState } from "react";

// useAIOpponent is a super simple AI code which just chooses to do a random move (attack, magic or heal) each turn
// will need to update this with a few if statements to try and make the AI at least somewhat decent

// turn === 0 -> user's turn
// turn === 1 -> opponent's turn
export const useAIOpponent = turn => {
    const [AIChoice, setAIChoice] = useState('');

    useEffect(() => {
        if (turn === 1) {
            const options = ['attack', 'magic', 'heal'];
            setAIChoice(options[Math.floor(Math.random() * options.length)]);
        }
    }, [turn]);
};