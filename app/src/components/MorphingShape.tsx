import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { useReducedMotion } from '@/hooks/useReducedMotion';

type ShapeType = 'spiral' | 'starburst' | 'blob' | 'star' | 'swirl' | 'smiley' | 'waves' | 'squares';

interface MorphingShapeProps {
  type: ShapeType;
  color?: string;
  size?: number;
  className?: string;
  style?: React.CSSProperties;
}

export default function MorphingShape({
  type,
  color = '#C8563B',
  size = 80,
  className = '',
  style = {},
}: MorphingShapeProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const { reducedMotion } = useReducedMotion();

  useEffect(() => {
    if (reducedMotion || !svgRef.current) return;

    const el = svgRef.current;
    const tl = gsap.timeline({ repeat: -1, yoyo: true });

    switch (type) {
      case 'spiral':
        tl.to(el, { rotation: 360, duration: 20, ease: 'none', repeat: -1 });
        break;
      case 'starburst':
        tl.to(el, { scale: 1.08, duration: 2, ease: 'sine.inOut' })
          .to(el, { scale: 0.95, duration: 2, ease: 'sine.inOut' });
        gsap.to(el, { rotation: 360, duration: 30, ease: 'none', repeat: -1 });
        break;
      case 'blob':
        tl.to(el, { x: 15, duration: 5, ease: 'sine.inOut' })
          .to(el, { x: -10, duration: 5, ease: 'sine.inOut' });
        break;
      case 'star':
        tl.to(el, { rotation: 15, duration: 4, ease: 'sine.inOut' })
          .to(el, { rotation: -10, duration: 4, ease: 'sine.inOut' });
        break;
      case 'swirl':
        tl.to(el, { scaleX: 1.1, scaleY: 0.9, duration: 3, ease: 'sine.inOut' })
          .to(el, { scaleX: 0.95, scaleY: 1.05, duration: 3, ease: 'sine.inOut' });
        break;
      case 'smiley':
        tl.to(el, { rotation: 5, duration: 3, ease: 'sine.inOut' })
          .to(el, { rotation: -5, duration: 3, ease: 'sine.inOut' });
        break;
      case 'waves':
        tl.to(el, { x: 10, duration: 4, ease: 'sine.inOut' })
          .to(el, { x: -10, duration: 4, ease: 'sine.inOut' });
        break;
      case 'squares':
        tl.to(el, { scale: 1.05, rotation: 3, duration: 5, ease: 'sine.inOut' })
          .to(el, { scale: 0.98, rotation: -2, duration: 5, ease: 'sine.inOut' });
        break;
    }

    return () => {
      tl.kill();
      gsap.killTweensOf(el);
    };
  }, [type, reducedMotion]);

  const renderPath = () => {
    const s = size;
    switch (type) {
      case 'spiral':
        return (
          <path
            ref={pathRef}
            d={`M${s * 0.5},${s * 0.15} C${s * 0.75},${s * 0.15} ${s * 0.9},${s * 0.35} ${s * 0.85},${s * 0.55} C${s * 0.8},${s * 0.8} ${s * 0.55},${s * 0.9} ${s * 0.35},${s * 0.8} C${s * 0.15},${s * 0.7} ${s * 0.1},${s * 0.45} ${s * 0.25},${s * 0.3} C${s * 0.4},${s * 0.15} ${s * 0.6},${s * 0.1} ${s * 0.7},${s * 0.25}`}
            fill="none"
            stroke={color}
            strokeWidth={s * 0.04}
            strokeLinecap="round"
          />
        );
      case 'starburst':
        const rays = 8;
        let d = '';
        for (let i = 0; i < rays * 2; i++) {
          const angle = (i * Math.PI) / rays;
          const r = i % 2 === 0 ? s * 0.45 : s * 0.2;
          const x = s * 0.5 + r * Math.cos(angle - Math.PI / 2);
          const y = s * 0.5 + r * Math.sin(angle - Math.PI / 2);
          d += (i === 0 ? 'M' : 'L') + `${x},${y} `;
        }
        d += 'Z';
        return <path ref={pathRef} d={d} fill={color} opacity={0.85} />;
      case 'blob':
        return (
          <path
            ref={pathRef}
            d={`M${s * 0.3},${s * 0.2} Q${s * 0.5},${s * 0.05} ${s * 0.7},${s * 0.2} Q${s * 0.95},${s * 0.4} ${s * 0.8},${s * 0.65} Q${s * 0.65},${s * 0.9} ${s * 0.4},${s * 0.85} Q${s * 0.1},${s * 0.75} ${s * 0.15},${s * 0.5} Q${s * 0.1},${s * 0.35} ${s * 0.3},${s * 0.2}`}
            fill={color}
            opacity={0.7}
          />
        );
      case 'star':
        return (
          <path
            ref={pathRef}
            d={`M${s * 0.5},${s * 0.08} L${s * 0.58},${s * 0.38} L${s * 0.9},${s * 0.38} L${s * 0.64},${s * 0.56} L${s * 0.73},${s * 0.88} L${s * 0.5},${s * 0.7} L${s * 0.27},${s * 0.88} L${s * 0.36},${s * 0.56} L${s * 0.1},${s * 0.38} L${s * 0.42},${s * 0.38} Z`}
            fill={color}
            opacity={0.8}
          />
        );
      case 'swirl':
        return (
          <path
            ref={pathRef}
            d={`M${s * 0.15},${s * 0.5} Q${s * 0.3},${s * 0.25} ${s * 0.55},${s * 0.35} Q${s * 0.8},${s * 0.45} ${s * 0.7},${s * 0.65} Q${s * 0.6},${s * 0.85} ${s * 0.35},${s * 0.75} Q${s * 0.15},${s * 0.65} ${s * 0.25},${s * 0.5}`}
            fill="none"
            stroke={color}
            strokeWidth={s * 0.06}
            strokeLinecap="round"
          />
        );
      case 'smiley':
        return (
          <g>
            <circle cx={s * 0.5} cy={s * 0.5} r={s * 0.4} fill={color} opacity={0.85} />
            <circle cx={s * 0.38} cy={s * 0.42} r={s * 0.05} fill="white" />
            <circle cx={s * 0.62} cy={s * 0.42} r={s * 0.05} fill="white" />
            <path d={`M${s * 0.32},${s * 0.58} Q${s * 0.5},${s * 0.72} ${s * 0.68},${s * 0.58}`} fill="none" stroke="white" strokeWidth={s * 0.04} strokeLinecap="round" />
          </g>
        );
      case 'waves':
        return (
          <g>
            {[0, 1, 2].map((i) => (
              <path
                key={i}
                d={`M${s * 0.1},${s * (0.3 + i * 0.2)} Q${s * 0.3},${s * (0.2 + i * 0.2)} ${s * 0.5},${s * (0.3 + i * 0.2)} Q${s * 0.7},${s * (0.4 + i * 0.2)} ${s * 0.9},${s * (0.3 + i * 0.2)}`}
                fill="none"
                stroke={color}
                strokeWidth={s * 0.035}
                strokeLinecap="round"
              />
            ))}
          </g>
        );
      case 'squares':
        return (
          <g>
            {[0, 1, 2, 3].map((i) => {
              const cx = s * 0.5 + (i % 2 === 0 ? -1 : 1) * s * 0.15;
              const cy = s * 0.5 + (i < 2 ? -1 : 1) * s * 0.15;
              const r = s * (0.12 - i * 0.015);
              return (
                <rect
                  key={i}
                  x={cx - r}
                  y={cy - r}
                  width={r * 2}
                  height={r * 2}
                  fill="none"
                  stroke={color}
                  strokeWidth={s * 0.025}
                  rx={s * 0.02}
                />
              );
            })}
          </g>
        );
    }
  };

  return (
    <svg
      ref={svgRef}
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className={`pointer-events-none ${className}`}
      style={{ willChange: 'transform', ...style }}
    >
      {renderPath()}
    </svg>
  );
}
