import React, { useEffect, useRef } from 'react';

interface CyberRainProps {
    isActive: boolean;
}

interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    char: string;
    color: string;
    size: number;
    life: number;
}

const CyberRainTransition: React.FC<CyberRainProps> = ({ isActive }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const requestRef = useRef<number | null>(null);
    const startTimeRef = useRef<number | null>(null);
    const particlesRef = useRef<Particle[]>([]);
    const explodedRef = useRef(false);

    useEffect(() => {
        if (!isActive) return;

        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Reset state
        explodedRef.current = false;
        particlesRef.current = [];

        // Set canvas dimensions
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        // Rain Configuration
        const fontSize = 16;
        const columns = Math.floor(canvas.width / fontSize);
        const drops: number[] = new Array(columns).fill(1).map(() => Math.random() * -100);

        const chars = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const hexChars = '0123456789ABCDEF';
        const colors = ['#00FFFF', '#00BFFF', '#E0FFFF', '#007AA3']; // Cyan tones

        // Particle Explosion Helper
        const createExplosion = () => {
            const particleCount = 400;
            for (let i = 0; i < particleCount; i++) {
                const angle = Math.random() * Math.PI * 2;
                const speed = Math.random() * 15 + 2; // Fast burst
                particlesRef.current.push({
                    x: canvas.width / 2,
                    y: canvas.height / 2,
                    vx: Math.cos(angle) * speed,
                    vy: Math.sin(angle) * speed,
                    char: hexChars.charAt(Math.floor(Math.random() * hexChars.length)),
                    color: i % 2 === 0 ? '#00FFFF' : '#FFFFFF', // Mix of Cyan and White
                    size: Math.random() * 20 + 10,
                    life: 1.0 // 100% life
                });
            }
        };

        // Animation Loop
        const animate = (timestamp: number) => {
            if (!startTimeRef.current) startTimeRef.current = timestamp;
            const elapsed = (timestamp - startTimeRef.current) / 1000; // seconds

            // 1. CLEAR / FADE
            // Start transparent to show falling UI, then fade to black
            const opacity = Math.min(0.9, elapsed * 0.8);
            ctx.fillStyle = `rgba(0, 0, 0, ${0.1 + (elapsed * 0.1)})`;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // TRIGGER EXPLOSION at 0.8s
            if (elapsed > 0.8 && !explodedRef.current) {
                createExplosion();
                explodedRef.current = true;
            }

            // 2. RENDER RAIN (Background layer)
            ctx.font = `${fontSize}px monospace`;
            for (let i = 0; i < drops.length; i++) {
                const text = chars.charAt(Math.floor(Math.random() * chars.length));
                ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)];
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);

                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i] += 1 + (elapsed * 0.5);
            }

            // 3. RENDER EXPLOSION (Foreground layer)
            if (explodedRef.current) {
                particlesRef.current.forEach((p, index) => {
                    if (p.life <= 0) return;

                    ctx.font = `bold ${p.size}px monospace`;
                    ctx.fillStyle = p.color;
                    ctx.globalAlpha = p.life;
                    ctx.fillText(p.char, p.x, p.y);
                    ctx.globalAlpha = 1.0;

                    // Physics
                    p.x += p.vx;
                    p.y += p.vy;
                    p.life -= 0.01; // Fade out
                });
            }

            // PHASE 3: FLASH (at 2.5s)
            if (elapsed > 2.5) {
                ctx.fillStyle = `rgba(255, 255, 255, ${Math.min(1, (elapsed - 2.5) * 5)})`;
                ctx.fillRect(0, 0, canvas.width, canvas.height);
            }

            // PHASE 4: REDIRECT
            if (elapsed > 3.0) {
                window.location.href = 'https://www.linkedin.com/in/nomudev/';
                return;
            }

            requestRef.current = requestAnimationFrame(animate);
        };

        requestRef.current = requestAnimationFrame(animate);

        return () => {
            if (requestRef.current) cancelAnimationFrame(requestRef.current);
            window.removeEventListener('resize', resizeCanvas);
        };
    }, [isActive]);

    if (!isActive) return null;

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: 9999,
                background: 'transparent',
                pointerEvents: 'auto',
                transition: 'opacity 0.2s ease-in'
            }}
        />
    );
};

export default CyberRainTransition;
