import { useEffect, useState } from 'react';

const HTTP_CODE_SUCCESS = 200;
const HTTP_CODE_REDIRECTION = 300;

export const useFetchJSON = (url, headers = {}, defaultValue = {}) => {
    const [data, setData] = useState(defaultValue);

    const [forceReload, setForceReload] = useState();

    useEffect(() => {
        let hasCanceled = false;
        fetch(url, headers)
            .then(response => {
                if (hasCanceled) {
                    return Promise.reject(new Error('Request canceled'));
                }

                return Promise.resolve(response);
            })
            .then(response => {
                if (
                    response.status >= HTTP_CODE_SUCCESS &&
                    response.status < HTTP_CODE_REDIRECTION
                ) {
                    return Promise.resolve(response);
                }

                const error = new Error(response.statusText || response.status);
                error.response = response;

                return Promise.reject(error);
            })
            .then(response => response.json())
            .then(setData)
            .catch(err => {
                setData(defaultValue);

                throw err;
            });

        return () => {
            hasCanceled = true;
        };
    }, [url, forceReload]);

    return [data, () => setForceReload(Date.now())];
};
