import { useState, useEffect } from 'react';

export default function useFlash(
  trigger: boolean,
  timeoutInMilliseconds = 1000
) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout | null = null;

    if (trigger) {
      setVisible(true);

      timeout = setTimeout(() => setVisible(false), timeoutInMilliseconds);
    }

    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [trigger, timeoutInMilliseconds]);

  return visible;
}
