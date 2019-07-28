import { useEffect, useState } from 'react';

const useFetchJSON = (url, headers = {}) => {
    const [data, setData] = useState();

    let hasCanceled = false;

    useEffect(() => {
        fetch(url, headers)
            .then(response => {
                if (hasCanceled) {
                    return Promise.reject();
                }
                return Promise.resolve(response);
            })
            .then(response => {
                if (response.status >= 200 && response.status < 300) {
                    return Promise.resolve(response);
                }

                const error = new Error(response.statusText || response.status);
                error.response = response;

                return Promise.reject(error);
            })
            .then(response => response.json())
            .then(data => {
                setData(data);
            })
            .catch(err => {
                console.error(err.toString());
            });

        return () => (hasCanceled = true);
    }, [url]);

    return data;
};

export default useFetchJSON;
