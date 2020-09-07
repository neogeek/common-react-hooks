import '@testing-library/jest-dom';

import React from 'react';

import { render, fireEvent, screen } from '@testing-library/react';

import { useLocalStorage } from '../hooks/useLocalStorage';

beforeEach(() => {
    localStorage.clear();
});

test('check if value is stored in localstorage', () => {
    const ExampleFunction = () => {
        const [value, setValue] = useLocalStorage('test', 'example');

        return (
            <div>
                <span>{value}</span>
                <button
                    onClick={() => {
                        setValue('updated example');
                    }}
                >
                    Update Value
                </button>
            </div>
        );
    };

    const { container } = render(<ExampleFunction />);

    expect(container.querySelector('span')).toHaveTextContent('example');

    fireEvent.click(screen.getByText('Update Value'));

    expect(container.querySelector('span')).toHaveTextContent(
        'updated example'
    );
});

test('check if JSON value is stored in localstorage', () => {
    const ExampleFunction = () => {
        const [value, setValue] = useLocalStorage('test', {});

        return (
            <div>
                <span>{JSON.stringify(value)}</span>
                <button
                    onClick={() => {
                        setValue({ key: 'value' });
                    }}
                >
                    Update Value
                </button>
            </div>
        );
    };

    const { container } = render(<ExampleFunction />);

    expect(localStorage.getItem('test')).toEqual('{}');

    expect(container.querySelector('span')).toHaveTextContent('{}');

    fireEvent.click(screen.getByText('Update Value'));

    expect(localStorage.getItem('test')).toEqual('{"key":"value"}');

    expect(container.querySelector('span')).toHaveTextContent(
        '{"key":"value"}'
    );
});
