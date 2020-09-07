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
                    response.status < HTTP_CODE_SUCCESS ||
                    response.status > HTTP_CODE_REDIRECTION
                ) {
                    return Promise.reject(
                        `${response.status} ${response.statusText}`
                    );
                }

                if (
                    response.headers
                        .get('content-type')
                        .indexOf('application/json') === -1
                ) {
                    return Promise.reject('Invalid content type.');
                }

                return Promise.resolve(response);
            })
            .then(response => response.json())
            .then(setData)
            .catch(err => {
                console.error(`Error: ${err}`);
            });

        return () => {
            hasCanceled = true;
        };
    }, [url, headers, forceReload]);

    return [data, () => setForceReload(Date.now())];
};
