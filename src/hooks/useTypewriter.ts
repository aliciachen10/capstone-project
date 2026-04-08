import { useEffect, useState } from "react";

const DEFAULT_MS_PER_CHAR = 12;

/**
 * Reveals `text` one character at a time (left to right). Resets when `text` changes.
 */
export function useTypewriter(
  text: string,
  msPerChar: number = DEFAULT_MS_PER_CHAR,
) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    setCount(0);
    if (text.length === 0) return;

    let i = 0;
    const id = window.setInterval(() => {
      i += 1;
      setCount(i);
      if (i >= text.length) {
        window.clearInterval(id);
      }
    }, msPerChar);

    return () => window.clearInterval(id);
  }, [text, msPerChar]);

  const done = text.length === 0 || count >= text.length;
  return { displayed: text.slice(0, count), done };
}
