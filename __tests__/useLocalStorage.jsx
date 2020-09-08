import '@testing-library/jest-dom';

import React from 'react';

import { render, fireEvent, screen } from '@testing-library/react';

import { useLocalStorage } from '../hooks/useLocalStorage';

beforeEach(() => {
    localStorage.clear();
});

test('check if default value is stored in localstorage', () => {
    const ExampleFunction = () => {
        const [value] = useLocalStorage('test', 'example');

        return (
            <div>
                <span>{value}</span>
            </div>
        );
    };

    const { container } = render(<ExampleFunction />);

    expect(container.querySelector('span')).toHaveTextContent('example');

    expect(localStorage.getItem('test')).toEqual('"example"');
});

test('check if value is updated in localstorage', () => {
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

    expect(localStorage.getItem('test')).toEqual('"example"');

    fireEvent.click(screen.getByText('Update Value'));

    expect(container.querySelector('span')).toHaveTextContent(
        'updated example'
    );

    expect(localStorage.getItem('test')).toEqual('"updated example"');
});

test('check if empty value is stored in localstorage', () => {
    const ExampleFunction = () => {
        const [value] = useLocalStorage('test', '');

        return (
            <div>
                <span>{value}</span>
            </div>
        );
    };

    const { container } = render(<ExampleFunction />);

    expect(container.querySelector('span')).toHaveTextContent('');

    expect(localStorage.getItem('test')).toEqual('""');
});

test('check if null default value is stored in localstorage', () => {
    const ExampleFunction = () => {
        const [value] = useLocalStorage('test');

        return (
            <div>
                <span>{value}</span>
            </div>
        );
    };

    render(<ExampleFunction />);

    expect(localStorage.getItem('test')).toBeNull();
});

test('check if default value as a function is stored in localstorage', () => {
    const ExampleFunction = () => {
        const [value] = useLocalStorage('test', () => 'example');

        return (
            <div>
                <span>{value}</span>
            </div>
        );
    };

    const { container } = render(<ExampleFunction />);

    expect(container.querySelector('span')).toHaveTextContent('example');

    expect(localStorage.getItem('test')).toEqual('"example"');
});

test('check if JSON value is stored in localstorage', () => {
    const ExampleFunction = () => {
        const [value] = useLocalStorage('test', { key: 'value' });

        return (
            <div>
                <span>{JSON.stringify(value)}</span>
            </div>
        );
    };

    const { container } = render(<ExampleFunction />);

    expect(container.querySelector('span')).toHaveTextContent(
        '{"key":"value"}'
    );

    expect(localStorage.getItem('test')).toEqual('{"key":"value"}');
});
