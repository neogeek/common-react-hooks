import { useEffect, useState } from 'react';

export const useLocalStorage = (key, defaultValue = '') => {
    const [localValue, setLocalValue] = useState(
        localStorage.getItem(key) ||
            (typeof defaultValue === 'function' ? defaultValue() : defaultValue)
    );

    useEffect(() => {
        localStorage.setItem(key, localValue || '');
    }, [localValue]);

    return [localValue, setLocalValue];
};
