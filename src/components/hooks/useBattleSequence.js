import { useEffect, useState } from "react";
import { attack, heal, magic, opponentStats, playerStats } from "shared";
import { wait } from '@testing-library/user-event/dist/utils';

export const useBattleSequence = (sequence) => {
    const [turn, setTurn] = useState(0);
    const [inSequence, setInSequence] = useState(false);
    const [playerHealth, setPlayerHealth] = useState(playerStats.maxHealth);
    const [opponentHealth, setOpponentHealth] = useState(opponentStats.maxHealth);
    const [announcerMessage, setAnnouncerMessage] = useState('');
    const [playerAnimation, setPlayerAnimation] = useState('static');
    const [opponentAnimation, setOpponentAnimation] = useState('static');

    useEffect(() => {
        const { mode, turn } = sequence;

        if (mode) {
            
            const attacker = turn === 0 ? playerStats : opponentStats;
            const receiver = turn === 0 ? opponentStats : playerStats;
            switch (mode) {
                // if character uses the attack option
                case 'attack': {
                    const damage = attack({ attacker, receiver });
                    (async () => {
                        setInSequence(true);
                        setAnnouncerMessage(`${attacker.name} has chosen to attack!`);
                        // wait 1000ms
                        await wait(1000);
                        // if turn === 0, player attack animation occurs otherwise opponent attack animation occurs for 100ms
                        turn === 0 
                        ? setPlayerAnimation('attack') 
                        : setOpponentAnimation('attack');
                        await wait(100);
                        // then the animation is set to static for 500ms
                        turn === 0 
                        ? setPlayerAnimation('static') 
                        : setOpponentAnimation('static');
                        await wait(500);
                        // and then the damage animation takes place on the other character for 750ms
                        turn === 0 
                        ? setOpponentAnimation('damage') 
                        : setPlayerAnimation('damage');
                        await wait(750);
                        // finally the animation stops or becomes 'static'
                        turn === 0 
                        ? setOpponentAnimation('static') 
                        : setPlayerAnimation('static');
                        setAnnouncerMessage(`${receiver.name} felt that!`);
                        // if the damage is greater than the receiver's current health, set the health to 0, otherwise take damage off of receiver's health
                        // then wait 2000ms
                        turn === 0 
                        ? setOpponentHealth(h => (h - damage > 0 ? h - damage : 0))
                        : setPlayerHealth(h => (h - damage > 0 ? h - damage : 0));
                        await wait(2000)
                        // now it becomes the other character's turn
                        setAnnouncerMessage(`Now it's ${receiver.name}'s turn!`);
                        await wait(1500);
                        setTurn(turn === 0 ? 1 : 0)
                        setInSequence(false);
                    })();
                    break;
                }
                // if user chooses magic as an option
                case 'magic': {
                    const magicDamage = magic({ attacker, receiver });
                    (async () => {
                        setInSequence(true);
                        setAnnouncerMessage(`${attacker.name} has cast a magic attack!`);
                        // wait 1000ms
                        await wait(1000);
                        // if turn === 0, player magic animation occurs otherwise opponent magic animation occurs for 100ms
                        turn === 0 
                        ? setPlayerAnimation('magic') 
                        : setOpponentAnimation('magic');
                        await wait(100);
                        // then the animation is set to static for 500ms
                        turn === 0 
                        ? setPlayerAnimation('static') 
                        : setOpponentAnimation('static');
                        await wait(500);
                        // and then the damage animation takes place on the other character for 750ms
                        turn === 0 
                        ? setOpponentAnimation('magic') 
                        : setPlayerAnimation('magic');
                        await wait(750);
                        // finally the animation stops or becomes 'static'
                        turn === 0 
                        ? setOpponentAnimation('static') 
                        : setPlayerAnimation('static');
                        setAnnouncerMessage(`${receiver.name}'s gonna feel that in the morning!`);
                        // if the damage is greater than the receiver's current health, set the health to 0, otherwise take damage off of receiver's health
                        // then wait 2000ms
                        turn === 0 
                        ? setOpponentHealth(h => (h - magicDamage > 0 ? h - magicDamage : 0))
                        : setPlayerHealth(h => (h - magicDamage > 0 ? h - magicDamage : 0));
                        await wait(2000)
                        // now it becomes the other character's turn
                        setAnnouncerMessage(`Now it's ${receiver.name}'s turn!`);
                        await wait(1500);
                        setTurn(turn === 0 ? 1 : 0)
                        setInSequence(false);
                    })();
                    break;
                }
                // if the user chooses to heal as an option
                case 'heal': {
                    const healing = heal({ attacker, receiver });
                    (async () => {
                        setInSequence(true);
                        if (turn === 0)
                        {
                            console.log("player healing");
                        } else {
                            console.log("opponent healing");
                        }
                        setAnnouncerMessage(`${attacker.name} is healing!`);
                        // wait 1000ms
                        await wait(1000);
                        // if turn === 0, player heal animation occurs otherwise opponent heal animation occurs for 100ms
                        turn === 0 
                        ? setPlayerAnimation('heal') 
                        : setOpponentAnimation('heal');
                        await wait(100);
                        // then the animation is set to static for 500ms
                        turn === 0 
                        ? setPlayerAnimation('static') 
                        : setOpponentAnimation('static');
                        await wait(500);
                        setAnnouncerMessage(`${attacker.name} regained their health!`);
                        turn === 0 
                        // if the healing + current health is greater than the receiver's max health, set the health to max, otherwise add the healing to the receiver's current health
                        // then wait 2500ms
                        ? setPlayerHealth(h => (h + healing < attacker.maxHealth ? h + healing : attacker.maxHealth))
                        : setOpponentHealth(h => (h - healing < attacker.maxHealth ? h + healing : attacker.maxHealth));
                        await wait(2500)
                        // now it becomes the other character's turn
                        setAnnouncerMessage(`Now it's ${receiver.name}'s turn!`);
                        await wait(1500);
                        setTurn(turn === 0 ? 1 : 0)
                        setInSequence(false);
                    })();
                    break;
                }
                default:
                    break;
            }
        }
    }, [sequence]);

    return {
        turn,
        inSequence,
        playerHealth,
        opponentHealth,
        announcerMessage,
        playerAnimation,
        opponentAnimation
    }
};