import '@testing-library/jest-dom';

import React from 'react';

import { act } from 'react-dom/test-utils';

import { render, screen } from '@testing-library/react';

import { useFetchJSON } from '../hooks/useFetchJSON';

const originalFetch = global.fetch;

beforeAll(() => {
    global.fetch = () => {};
});

afterAll(() => {
    global.fetch = originalFetch;
});

test('check data is retrieved via fetch', async () => {
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

describe('error handling', () => {
    const originalConsoleError = console.error;

    const errorOuput = [];

    beforeEach(() => {
        console.error = message => errorOuput.push(message);
    });

    afterEach(() => {
        errorOuput.splice(0, errorOuput.length);
        console.error = originalConsoleError;
    });

    test('check if request is rejected with invalid content type', async () => {
        const ExampleFunction = () => {
            const [data, update] = useFetchJSON(
                'http://localhost:8000/api',
                null,
                {
                    default: 'value'
                }
            );

            return (
                <div>
                    <span>{JSON.stringify(data)}</span>
                </div>
            );
        };

        jest.spyOn(global, 'fetch').mockImplementation(() =>
            Promise.resolve({
                headers: { get: () => 'text/plain' },
                json: () => Promise.resolve('ok')
            })
        );

        await act(async () => {
            render(<ExampleFunction />);
        });

        expect(errorOuput[errorOuput.length - 1]).toContain(
            'Invalid content type.'
        );
    });

    test('check if request is rejected with invalid http status code', async () => {
        const ExampleFunction = () => {
            const [data, update] = useFetchJSON(
                'http://localhost:8000/api',
                null,
                {
                    default: 'value'
                }
            );

            return (
                <div>
                    <span>{JSON.stringify(data)}</span>
                </div>
            );
        };

        jest.spyOn(global, 'fetch').mockImplementation(() =>
            Promise.resolve({
                headers: { get: () => 'application/json' },
                status: 404,
                statusText: 'File not found',
                json: () => Promise.resolve('ok')
            })
        );

        await act(async () => {
            render(<ExampleFunction />);
        });

        expect(errorOuput[errorOuput.length - 1]).toContain(
            '404 File not found'
        );
    });
});
