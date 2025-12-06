"use client";
import React, { useEffect, useState } from "react";

type Word = { text: string; className?: string };

interface Props {
  words: Word[];
  loop?: boolean;
  speed?: number; // ms per char
}

export default function TypewriterEffect({ words, loop = false, speed = 40 }: Props) {
  const [index, setIndex] = useState(0);
  const [display, setDisplay] = useState("");
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    if (!words || words.length === 0) return;
    const current = words[index];
    if (!current) return;

    if (charIndex <= current.text.length) {
      const timeout = setTimeout(() => {
        setDisplay(current.text.slice(0, charIndex));
        setCharIndex((c) => c + 1);
      }, speed);
      return () => clearTimeout(timeout);
    } else {
      // finished current word
      if (loop) {
        const timeout = setTimeout(() => {
          setCharIndex(0);
          setIndex((i) => (i + 1) % words.length);
        }, 800);
        return () => clearTimeout(timeout);
      }
    }
  }, [charIndex, index, words, loop, speed]);

  return <span className="whitespace-pre-wrap">{display}</span>;
}
