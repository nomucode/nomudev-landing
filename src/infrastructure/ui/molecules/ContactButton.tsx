import React, { useState } from 'react';
import CyberRainTransition from './CyberRainTransition';

const buttonClasses = "inline-flex items-center justify-center rounded-md font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none h-12 py-3 px-8 text-lg border-2 border-border bg-transparent hover:bg-secondary hover:text-accent-green hover:border-accent-green cursor-pointer";

const ContactButton = () => {
    const [isTransitioning, setIsTransitioning] = useState(false);

    const triggerGravity = () => {
        // Select all significant visual elements
        // We exclude the canvas itself (z-index 9999) to keep the rain visible
        const elements = document.querySelectorAll<HTMLElement>(
            'h1, h2, h3, p, span, img, svg, button, a, .card, section > div'
        );

        elements.forEach((el) => {
            // Skip the Contact button itself? No, let it fall too!
            // But maybe skip the transition overlay if it's in the DOM (it's portaled or fixed usually)
            if (el.tagName === 'CANVAS') return;

            // Random physics parameters
            const rotation = Math.random() * 90 - 45; // -45 to 45 deg
            const delay = Math.random() * 0.2; // slight stagger
            const duration = 0.8 + Math.random() * 0.5; // 0.8s to 1.3s

            // Apply styles directly
            el.style.transition = `transform ${duration}s cubic-bezier(0.55, 0.055, 0.675, 0.19)`; // easeInCubic-ish
            el.style.transform = `translateY(${window.innerHeight + 500}px) rotate(${rotation}deg)`;
            el.style.pointerEvents = 'none'; // Prevent interaction while falling
        });
    };

    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault();
        setIsTransitioning(true);

        // Trigger the fall immediately or with slight sync?
        // Let's do it immediately for maximum impact
        requestAnimationFrame(() => {
            triggerGravity();
        });
    };

    return (
        <>
            <button
                onClick={handleClick}
                className={buttonClasses}
                // Ensure this button is relative so it can be transformed
                style={{ position: 'relative', zIndex: 10 }}
            >
                Contact Me
            </button>
            <CyberRainTransition isActive={isTransitioning} />
        </>
    );
};

export default ContactButton;
