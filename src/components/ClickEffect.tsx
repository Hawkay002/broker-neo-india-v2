import { useEffect, useRef } from 'react';

interface ClickRing {
  id: number;
  x: number;
  y: number;
  age: number;
  color: string;
}

export const ClickEffect = () => {
  const clickEffectsRef = useRef<ClickRing[]>([]);
  const clickIdRef = useRef(0);
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    const getLuminance = (color: string) => {
      const rgb = color.match(/\d+/g);
      if (!rgb || rgb.length < 3) return 0.5;
      const r = parseInt(rgb[0]) / 255;
      const g = parseInt(rgb[1]) / 255;
      const b = parseInt(rgb[2]) / 255;
      return 0.2126 * r + 0.7152 * g + 0.0722 * b;
    };

    const getAdaptiveColor = (x: number, y: number) => {
      const element = document.elementFromPoint(x, y);
      if (!element) return '#C6633F'; // Default terracotta

      let currentElement: Element | null = element;
      let bgColor = 'rgb(255, 255, 255)';

      while (currentElement) {
        const style = window.getComputedStyle(currentElement);
        const bg = style.backgroundColor;
        if (bg !== 'rgba(0, 0, 0, 0)' && bg !== 'transparent' && bg !== 'initial') {
          bgColor = bg;
          break;
        }
        currentElement = currentElement.parentElement;
      }

      const luminance = getLuminance(bgColor);
      
      // If background is dark, use terracotta
      // If background is light, use dark brown
      if (luminance < 0.5) {
        return '#C6633F'; // Terracotta (website theme)
      } else {
        return '#2D2318'; // Dark brown (website theme)
      }
    };

    const handleClick = (e: MouseEvent) => {
      const adaptiveColor = getAdaptiveColor(e.clientX, e.clientY);
      
      const clickEffect: ClickRing = {
        id: clickIdRef.current++,
        x: e.clientX,
        y: e.clientY,
        age: 0,
        color: adaptiveColor,
      };

      clickEffectsRef.current.push(clickEffect);
      renderClickEffects();
    };

    const animate = () => {
      clickEffectsRef.current = clickEffectsRef.current
        .map((c) => ({ ...c, age: c.age + 1 }))
        .filter((c) => c.age < 40);

      renderClickEffects();
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    const renderClickEffects = () => {
      document.querySelectorAll('.click-effect').forEach((el) => {
        if (!clickEffectsRef.current.find((c) => c.id === parseInt(el.getAttribute('data-click-id') || '-1'))) {
          el.remove();
        }
      });

      clickEffectsRef.current.forEach((effect) => {
        let container = document.querySelector(`[data-click-id="${effect.id}"]`);

        if (!container) {
          container = document.createElement('div');
          container.setAttribute('data-click-id', effect.id.toString());
          container.className = 'click-effect';
          document.body.appendChild(container);
        }

        const progress = effect.age / 40;
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const opacity = Math.max(0, 1 - easeOut);
        const scale = 1 + easeOut * 1.5;
        const color = effect.color;

        const ring1 = container.querySelector('.ring-1') || (() => {
          const r = document.createElement('div');
          r.className = 'ring-1';
          container?.appendChild(r);
          return r;
        })();

        ring1.setAttribute(
          'style',
          `
          position: fixed;
          left: ${effect.x}px;
          top: ${effect.y}px;
          width: 24px;
          height: 24px;
          border: 1.5px solid ${color};
          opacity: ${opacity * 0.9};
          transform: translate(-50%, -50%) scale(${scale});
          pointer-events: none;
          z-index: 9999;
          box-shadow: 0 0 12px ${color} / ${opacity * 0.3};
        `
        );

        const ring2 = container.querySelector('.ring-2') || (() => {
          const r = document.createElement('div');
          r.className = 'ring-2';
          container?.appendChild(r);
          return r;
        })();

        ring2.setAttribute(
          'style',
          `
          position: fixed;
          left: ${effect.x}px;
          top: ${effect.y}px;
          width: 14px;
          height: 14px;
          border: 1px solid ${color};
          opacity: ${opacity * 0.6};
          transform: translate(-50%, -50%) scale(${scale * 0.6});
          pointer-events: none;
          z-index: 9999;
        `
        );

        const hLine = container.querySelector('.h-line') || (() => {
          const h = document.createElement('div');
          h.className = 'h-line';
          container?.appendChild(h);
          return h;
        })();

        hLine.setAttribute(
          'style',
          `
          position: fixed;
          left: ${effect.x}px;
          top: ${effect.y}px;
          width: 16px;
          height: 0.75px;
          background: linear-gradient(90deg, transparent, ${color}, transparent);
          opacity: ${opacity * 0.5};
          transform: translate(-50%, -50%) scaleX(${scale});
          pointer-events: none;
          z-index: 9999;
        `
        );

        const vLine = container.querySelector('.v-line') || (() => {
          const v = document.createElement('div');
          v.className = 'v-line';
          container?.appendChild(v);
          return v;
        })();

        vLine.setAttribute(
          'style',
          `
          position: fixed;
          left: ${effect.x}px;
          top: ${effect.y}px;
          width: 0.75px;
          height: 16px;
          background: linear-gradient(180deg, transparent, ${color}, transparent);
          opacity: ${opacity * 0.5};
          transform: translate(-50%, -50%) scaleY(${scale});
          pointer-events: none;
          z-index: 9999;
        `
        );
      });
    };

    document.addEventListener('click', handleClick);
    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener('click', handleClick);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      document.querySelectorAll('.click-effect').forEach((el) => el.remove());
    };
  }, []);

  return null;
};
