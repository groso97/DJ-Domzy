"use client";

import { useEffect, useState, useRef } from "react";

interface UseCounterOptions {
  duration?: number;
  startDelay?: number;
  decimals?: number;
  suffix?: string;
  prefix?: string;
}

export function useCounter(
  end: number,
  start: number = 0,
  options: UseCounterOptions = {}
): number {
  const {
    duration = 2000,
    startDelay = 0,
    decimals = 0,
    suffix = "",
    prefix = "",
  } = options;

  const [count, setCount] = useState(start);
  const [isAnimating, setIsAnimating] = useState(false);
  const frameRef = useRef<number>();
  const startTimeRef = useRef<number>();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsAnimating(true);
      startTimeRef.current = Date.now();

      const animate = () => {
        const now = Date.now();
        const elapsed = now - (startTimeRef.current || now);
        const progress = Math.min(elapsed / duration, 1);

        // Easing function (ease-out)
        const easeOut = 1 - Math.pow(1 - progress, 3);

        const currentCount = start + (end - start) * easeOut;
        setCount(currentCount);

        if (progress < 1) {
          frameRef.current = requestAnimationFrame(animate);
        } else {
          setCount(end);
          setIsAnimating(false);
        }
      };

      frameRef.current = requestAnimationFrame(animate);
    }, startDelay);

    return () => {
      clearTimeout(timeoutId);
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [end, start, duration, startDelay]);

  return Number(count.toFixed(decimals));
}
