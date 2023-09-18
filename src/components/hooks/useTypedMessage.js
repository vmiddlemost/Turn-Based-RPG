import { wait } from "@testing-library/user-event/dist/utils";
import { useEffect, useState } from "react";

export const useTypedMessage = (message) => {
    const [typedMessage, setTypedMessage] = useState('');

    // useEffect() is a function for making the announcer text output like a typewriter, one character at a time with a 25ms interval between each character
    useEffect(() => {
        setTypedMessage('');

        if (message.length) {
            (async () => {
                let visibleMessage = '';
                for (let i = 0; i < message.length; i++) {
                    await wait(25);
                    visibleMessage = visibleMessage + message[i];
                    setTypedMessage(visibleMessage);
                }
            })();
        }
    }, [message]);

    return typedMessage;
}