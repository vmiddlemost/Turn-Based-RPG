import { playerStats, opponentStats } from "shared"


export const LevelUp = () => {
    playerStats.level += 0.5;
    playerStats.attack *= 1.11;
    playerStats.defense *= 1.11;
    playerStats.maxHealth *= 1.11;
    playerStats.magic *= 1.11;
    playerStats.magicDefense *= 1.11;
    opponentStats.level += 1;
    opponentStats.attack *= 1.22;
    opponentStats.defense *= 1.22;
    opponentStats.maxHealth *= 1.22;
    opponentStats.magic *= 1.11;
    opponentStats.magicDefense *= 1.11;
}

export const ResetLevels = () => {
    playerStats.level = 5;
    playerStats.attack = 12;
    playerStats.defense = 12;
    playerStats.maxHealth = 60;
    playerStats.magic = 8;
    playerStats.magicDefense = 8;
    opponentStats.level = 1;
    opponentStats.attack = 5;
    opponentStats.defense = 3;
    opponentStats.maxHealth = 20;
    opponentStats.magic = 3;
    opponentStats.magicDefense = 3;
}