"use client";

import React, { useEffect, useRef, useState } from 'react';
import 'animate.css';

interface ScrollAnimateProps {
  children: React.ReactNode;
  animation?: string;
  delay?: string;
  className?: string;
}

export default function ScrollAnimate({ 
  children, 
  animation = "animate__fadeInUp", 
  delay = "",
  className = ""
}: ScrollAnimateProps) {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

    const currentRef = domRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }
    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);

  return (
    <div
      ref={domRef}
      className={`${isVisible ? `animate__animated ${animation} ${delay}` : 'opacity-0'} ${className}`}
      style={{ visibility: isVisible ? 'visible' : 'hidden' }}
    >
      {children}
    </div>
  );
}
