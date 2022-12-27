import React, { useEffect, useState } from 'react';

export default function useDisabledFocus<T>(
  ref: React.RefObject<T>,
  disabled: boolean
) {
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    if (
      !(
        ref.current instanceof HTMLInputElement ||
        ref.current instanceof HTMLTextAreaElement ||
        ref.current instanceof HTMLSelectElement ||
        ref.current instanceof HTMLButtonElement
      )
    )
      return;

    if (disabled && ref.current === document.activeElement) {
      setFocused(true);
    }

    if (disabled) {
      ref.current.setAttribute('disabled', 'disabled');
    } else if (!disabled) {
      ref.current.removeAttribute('disabled');
    }

    if (!disabled && focused) {
      ref.current.focus();

      setFocused(false);
    }
  }, [disabled, focused, ref]);
}
