import { useEffect, useState } from 'react';

import qs from 'qs';

const useSearchParam = (name, historyMethod = 'replaceState') => {
    const [value, setValue] = useState(
        qs.parse(window.location.search, { ignoreQueryPrefix: true })[name] ||
            ''
    );

    useEffect(() => {
        const params = qs.parse(window.location.search, {
            ignoreQueryPrefix: true,
        });

        window.history[historyMethod](
            {},
            window.document.title,
            `?${qs.stringify(
                { ...params, [name]: value || null },
                { skipNulls: true }
            )}`
        );
    }, [value]);

    return [value, setValue];
};

export default useSearchParam;
