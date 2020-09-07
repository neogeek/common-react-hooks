import { useEffect, useState } from 'react';

export const getSearchParam = key =>
    new URLSearchParams(window.location.search).get(key) || '';

export const setSearchParam = (key, value) => {
    const params = new URLSearchParams(window.location.search);
    params.set(key, value);

    return params;
};

export const useSearchParam = (name, historyMethod = 'replaceState') => {
    const [value, setValue] = useState(getSearchParam(name));

    useEffect(() => {
        if (getSearchParam(name) === value) {
            return;
        }

        window.history[historyMethod](
            {},
            window.document.title,
            `?${setSearchParam(name, value)}${window.location.hash}`
        );
    }, [name, historyMethod, value]);

    return [value, setValue];
};
