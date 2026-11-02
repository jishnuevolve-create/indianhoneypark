import { useEffect, useRef, useState } from 'react';

/*
  Fades its content in when it scrolls into view.
  Usage: <Reveal delay={100}>...</Reveal>
*/
function Reveal({ as: Tag = 'div', delay = 0, className = '', children, ...props }) {
  const elementRef = useRef(null);
  // Very old browsers without IntersectionObserver simply show the content straight away.
  const [isVisible, setIsVisible] = useState(() => !('IntersectionObserver' in window));

  useEffect(() => {
    const element = elementRef.current;
    if (!element || isVisible) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // only animate once
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [isVisible]);

  return (
    <Tag
      ref={elementRef}
      className={`reveal ${isVisible ? 'is-visible' : ''} ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      {...props}
    >
      {children}
    </Tag>
  );
}

export default Reveal;
