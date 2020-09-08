import { useEffect, useState } from 'react';

export const useLocalStorage = (key, defaultValue = null) => {
    const [localValue, setLocalValue] = useState(() => {
        const value =
            localStorage.getItem(key) ||
            (typeof defaultValue === 'function'
                ? defaultValue()
                : defaultValue);

        try {
            return JSON.parse(value);
        } catch (err) {
            return value;
        }
    });

    useEffect(() => {
        if (localValue === null || localValue === undefined) {
            localStorage.removeItem(key);
        } else {
            localStorage.setItem(key, JSON.stringify(localValue));
        }
    }, [key, localValue]);

    return [localValue, setLocalValue];
};
