export const wait = ms => new Promise(
    resolve => {
        setTimeout(() => {
            resolve();
        }, ms);
    });

export const attack = ({ attacker , receiver}) => {
    const receivedDamage = attacker.attack * (0.975 + (Math.random() / 2));
    const finalDamage = receivedDamage - receiver.defense / 2;

    console.log(finalDamage);
    return Math.floor(finalDamage);
};

export const magic = ({ attacker, receiver }) => {
    const receivedDamage = attacker.magic * (0.975 + (Math.random() / 2));
    const finalDamage = receivedDamage - receiver.magicDefense / 2;
    console.log(finalDamage);

    return Math.floor(finalDamage);
};

export const heal = ({ receiver }) => {
    return receiver.magic + (receiver.level * 0.25);
}