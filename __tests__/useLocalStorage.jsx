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

    expect(container.querySelector('div')).toHaveTextContent('example');

    fireEvent.click(screen.getByText('Update Value'));

    expect(container.querySelector('div')).toHaveTextContent('updated example');
});
