"use client";

import React, { useEffect, useRef, useState } from "react";

export type TypeWord = {
  text: string;
  className?: string;
};

type Props = {
  words: TypeWord[]; // list of pieces to type in sequence
  typingSpeed?: number; // ms per character
  deletingSpeed?: number; // ms per character when deleting
  pauseBetweenWords?: number; // ms pause after finishing a word
  loop?: boolean; // whether to loop the sequence
  cursor?: string; // cursor character
  className?: string;
};

export default function TypewriterEffect({
  words,
  typingSpeed = 40,
  deletingSpeed = 25,
  pauseBetweenWords = 1200,
  loop = true,
  cursor = "|",
  className = "",
}: Props) {
  const [display, setDisplay] = useState<string>("")
  const [wordIndex, setWordIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const mounted = useRef(false)

  // Respect prefers-reduced-motion
  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches

  useEffect(() => {
    mounted.current = true
    return () => {
      mounted.current = false
    }
  }, [])

  useEffect(() => {
    if (!mounted.current) return

    // If reduced motion requested, show full combined text and exit
    if (prefersReducedMotion) {
      const combined = words.map((w) => w.text).join(" ")
      setDisplay(combined)
      return
    }

    const totalWords = words.length
    const currentWordIndex = wordIndex % Math.max(1, totalWords)
    const currentWord = words[currentWordIndex]?.text ?? ""

    // If loop is false and we've completed the last word, keep it typed and stop animating
    const isFinalWordNonLooping = !loop && wordIndex >= totalWords - 1

    let timeoutId: number | undefined

    if (!isDeleting) {
      // typing mode
      if (charIndex <= currentWord.length) {
        // show up to charIndex
        setDisplay(currentWord.slice(0, charIndex))
        timeoutId = window.setTimeout(() => setCharIndex((ci) => ci + 1), typingSpeed)
      } else {
        // finished typing the current word
        // if it's the last non-looping word, keep it and do not start deleting
        if (isFinalWordNonLooping) {
          // ensure full text is shown and stop any further animations
          setDisplay(currentWord)
          // do not schedule further timeouts; just return (component stabilizes)
          return
        }
        timeoutId = window.setTimeout(() => setIsDeleting(true), pauseBetweenWords)
      }
    } else {
      // deleting mode
      if (charIndex >= 0) {
        setDisplay(currentWord.slice(0, charIndex))
        timeoutId = window.setTimeout(() => setCharIndex((ci) => ci - 1), deletingSpeed)
      } else {
        // finished deleting the current word; move to next
        setIsDeleting(false)
        setWordIndex((prev) => prev + 1)
        timeoutId = window.setTimeout(() => setCharIndex(0), 100)
      }
    }

    return () => {
      if (typeof timeoutId !== "undefined") window.clearTimeout(timeoutId)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [charIndex, isDeleting, wordIndex, words, typingSpeed, deletingSpeed, pauseBetweenWords, loop, prefersReducedMotion])

  // figure out active word meta for optional styling
  const activeWordIndex = wordIndex % words.length
  const activeWordObj = words[activeWordIndex] || { text: "" }

  const shouldApplyWordClass =
    !isDeleting && display && activeWordObj && activeWordObj.className && activeWordObj.text.startsWith(display)

  return (
    // Use inline-block so it occupies horizontal space; you may also wrap in a block-level container with min-w if needed
    <span className={`inline-block ${className}`}>
      {shouldApplyWordClass ? (
        <>
          <span className={activeWordObj.className}>{display}</span>
          <span aria-hidden className="ml-0">{/* placeholder */}</span>
        </>
      ) : (
        <span>{display}</span>
      )}

      {/* Cursor - visual only */}
      <span aria-hidden className="ml-1 opacity-80 animate-blink">
        {cursor}
      </span>

      <style jsx>{`
        .animate-blink {
          animation: blink 1s step-start infinite;
        }
        @keyframes blink {
          50% {
            opacity: 0;
          }
        }
      `}</style>
    </span>
  );
}
