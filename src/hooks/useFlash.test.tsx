import '@testing-library/jest-dom';

import React, { useState } from 'react';

import { render, fireEvent, screen, act } from '@testing-library/react';

import useFlash from './useFlash';

describe('useFlash', () => {
  test('flash message for one second', async () => {
    const ExampleFunction = () => {
      const [updated, setUpdated] = useState(false);

      const isVisible = useFlash(updated);

      return (
        <>
          <button onClick={() => setUpdated(true)}>Update</button>
          {isVisible && <p>Hello, world!</p>}
        </>
      );
    };

    const { container } = render(<ExampleFunction />);

    fireEvent.click(screen.getByText('Update'));

    expect(container.querySelector('p')).toHaveTextContent('Hello, world!');

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 1100));
    });

    expect(container.querySelector('p')).toBeNull();
  });
});
