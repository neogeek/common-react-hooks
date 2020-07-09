import { useEffect, useState } from 'react';

import qs from 'qs';

export const getSearchParams = () =>
    qs.parse(window.location.search, {
        ignoreQueryPrefix: true
    });

export const useSearchParam = (name, historyMethod = 'replaceState') => {
    const [value, setValue] = useState(getSearchParams()[name] || '');

    useEffect(() => {
        const params = getSearchParams();

        if (params[name] === value) {
            return;
        }

        window.history[historyMethod](
            {},
            window.document.title,
            `?${qs.stringify(
                { ...params, [name]: value || null },
                { skipNulls: true }
            )}${window.location.hash}`
        );
    }, [value]);

    useEffect(() => {
        setValue(getSearchParams()[name] || '');
    }, [window.location.search]);

    return [value, setValue];
};
