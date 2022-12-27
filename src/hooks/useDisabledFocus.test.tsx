import '@testing-library/jest-dom';

import { useRef, useState } from 'react';

import { render, fireEvent, screen, act } from '@testing-library/react';

import useDisabledFocus from './useDisabledFocus';

describe('useDisabledFocus', () => {
  test('maintain focus after a button is set to disabled and then reenabled', async () => {
    const ExampleFunction = () => {
      const [disabled, setDisabled] = useState(false);

      const ref = useRef<HTMLButtonElement>(null);

      useDisabledFocus(ref, disabled);

      return (
        <button
          ref={ref}
          onClick={() => {
            setDisabled(true);

            setTimeout(() => setDisabled(false), 1000);
          }}
        >
          Save
        </button>
      );
    };

    render(<ExampleFunction />);

    const buttonElement = screen.getByText('Save');

    buttonElement.focus();

    expect(buttonElement).toBe(document.activeElement);
    expect(buttonElement).toHaveFocus();

    fireEvent.click(buttonElement);

    expect(buttonElement).toHaveAttribute('disabled');

    expect(buttonElement).not.toBe(document.activeElement);
    expect(buttonElement).not.toHaveFocus();

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 1100));
    });

    expect(buttonElement).not.toHaveAttribute('disabled');

    expect(buttonElement).toBe(document.activeElement);
    expect(buttonElement).toHaveFocus();
  });
});
