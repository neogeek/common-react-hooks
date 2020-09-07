import '@testing-library/jest-dom';

import React from 'react';

import { act } from 'react-dom/test-utils';

import { render, screen } from '@testing-library/react';

import { useFetchJSON } from '../hooks/useFetchJSON';

beforeAll(() => {
    global.fetch = () => {};
});

test('check data is updated via fetch', async () => {
    const ExampleFunction = () => {
        const [data, update] = useFetchJSON('http://localhost:8000/api', null, {
            default: 'value'
        });

        return (
            <div>
                <span>{JSON.stringify(data)}</span>
            </div>
        );
    };

    jest.spyOn(global, 'fetch').mockImplementation(() =>
        Promise.resolve({
            headers: { get: () => 'application/json' },
            json: () => Promise.resolve({ default: 'value' })
        })
    );

    await act(async () => {
        render(<ExampleFunction />);
    });

    expect(screen.getByText('{"default":"value"}')).toBeInTheDocument();
});
