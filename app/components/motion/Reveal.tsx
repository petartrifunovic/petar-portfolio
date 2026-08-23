'use client';

import { useEffect, useRef, useState } from 'react';
import { cn } from '@/app/utils/cn';

type RevealOptions = {
  threshold?: number;
  bottomMargin?: string;
};

export const useReveal = ({
  threshold = 0,
  bottomMargin = '-12%',
}: RevealOptions = {}) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;

    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold, rootMargin: `0px 0px ${bottomMargin} 0px` },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [threshold, bottomMargin]);

  return { ref, visible };
};

type RevealProps = RevealOptions & {
  children: React.ReactNode;
  className?: string;
  delay?: number;
};

const Reveal = ({
  children,
  className = '',
  delay = 0,
  threshold,
  bottomMargin,
}: RevealProps) => {
  const { ref, visible } = useReveal({ threshold, bottomMargin });

  return (
    <div
      ref={ref}
      className={cn('reveal', className)}
      data-visible={visible ? 'true' : 'false'}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
};

export default Reveal;
