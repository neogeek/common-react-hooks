import React, { useEffect, useState } from 'react';

export default function useDisabledFocus<T>(
  ref: React.RefObject<T>,
  disabled: boolean
) {
  const [showWarningForExistingAttribute, setShowWarningForExistingAttribute] =
    useState(true);

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

    if (disabled && showWarningForExistingAttribute) {
      if (ref.current.hasAttribute('disabled')) {
        console.warn(
          'useDisabledFocus will not work if the disabled attribute is manually set. Instead pass the state to the useDisabledFocus method.'
        );
      }

      setShowWarningForExistingAttribute(false);
    }

    if (disabled && ref.current === document.activeElement) {
      ref.current.blur();

      setFocused(true);
    }

    if (disabled) {
      ref.current.setAttribute('disabled', 'disabled');
    } else {
      ref.current.removeAttribute('disabled');
    }

    if (!disabled && focused && document.activeElement === document.body) {
      ref.current.focus();

      setFocused(false);
    }
  }, [disabled, focused, ref]);
}
