"use client";

import React, { useRef, useEffect, useCallback } from "react";

type CardContainerProps = React.PropsWithChildren<{ className?: string }>;
type CardBodyProps = React.PropsWithChildren<{ className?: string }>;
type CardItemProps = React.PropsWithChildren<{
  translateZ?: number | string;
  as?: any;
  className?: string;
  style?: React.CSSProperties;
  href?: string;
  target?: string;
}>;

/**
 * 3D Card Components
 * - CardContainer: holds mouse tracking and sets transforms for inner CardBody
 * - CardBody: element that actually rotates/tilts on hover
 * - CardItem: layered children that will be translated on Z-axis (depth)
 *
 * Important: CardItem translateZ is in pixels (number) or string (e.g. "2rem").
 */

export function CardContainer({ children, className = "" }: CardContainerProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const bodyRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const pointer = useRef({ x: 0, y: 0 });
  const targetRot = useRef({ rx: 0, ry: 0 });
  const currentRot = useRef({ rx: 0, ry: 0 });

  // Respect prefers-reduced-motion
  const prefersReducedMotion =
    typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    if (!containerRef.current || !bodyRef.current || prefersReducedMotion) return;

    const el = containerRef.current;
    const box = () => el.getBoundingClientRect();

    const onMove = (e: MouseEvent) => {
      const rect = box();
      const px = (e.clientX - rect.left) / rect.width; // 0..1
      const py = (e.clientY - rect.top) / rect.height; // 0..1

      // center around 0
      const cx = px - 0.5;
      const cy = py - 0.5;

      // target rotation (degrees). tweak multiplier as needed
      targetRot.current.rx = (-cy * 12); // rotateX
      targetRot.current.ry = (cx * 16); // rotateY
    };

    const onEnter = () => {
      if (bodyRef.current) bodyRef.current.style.transition = "transform 220ms cubic-bezier(.2,.9,.2,1)";
    };
    const onLeave = () => {
      targetRot.current = { rx: 0, ry: 0 };
      if (bodyRef.current) bodyRef.current.style.transition = "transform 550ms cubic-bezier(.2,.9,.2,1)";
    };

    // RAF loop to smoothly interpolate
    const tick = () => {
      const t = 0.12; // smoothing factor (0..1)
      currentRot.current.rx += (targetRot.current.rx - currentRot.current.rx) * t;
      currentRot.current.ry += (targetRot.current.ry - currentRot.current.ry) * t;

      if (bodyRef.current) {
        bodyRef.current.style.transform = `perspective(900px) rotateX(${currentRot.current.rx}deg) rotateY(${currentRot.current.ry}deg) scale3d(1.01,1.01,1.01)`;
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    el.addEventListener("mousemove", onMove, { passive: true });
    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mouseleave", onLeave);

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseenter", onEnter);
      el.removeEventListener("mouseleave", onLeave);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [prefersReducedMotion]);

  return (
    <div
      ref={containerRef}
      className={`group relative will-change-transform ${className}`}
      // inline style ensures children preserve 3D space
      style={{ perspective: 900 }}
    >
      {/* We pass a ref for the body via React clone below */}
      {
        // We inject bodyRef to the first CardBody child.
        React.Children.map(children, (child) => {
          if (!React.isValidElement(child)) return child;
          if ((child.type as any).displayName === "CardBody") {
            return React.cloneElement(child, { __bodyRef: bodyRef });
          }
          return child;
        })
      }
    </div>
  );
}

export function CardBody({ children, className = "", __bodyRef }: CardBodyProps & { __bodyRef?: React.RefObject<HTMLDivElement> }) {
  // __bodyRef is injected by CardContainer
  const bodyRef = __bodyRef || useRef<HTMLDivElement | null>(null);

  // Prevent high-motion users from running transforms
  const prefersReducedMotion =
    typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  return (
    <div
      ref={bodyRef}
      className={`transform-gpu ${className}`}
      style={{
        transformStyle: "preserve-3d",
        transition: prefersReducedMotion ? "none" : "transform 300ms cubic-bezier(.2,.9,.2,1)",
        willChange: "transform",
      }}
    >
      {children}
    </div>
  );
}
(CardBody as any).displayName = "CardBody";

export function CardItem({ translateZ = 0, as = "div", className = "", style = {}, children, ...rest }: CardItemProps) {
  const Tag: any = as;
  // convert numeric translateZ to px
  const tz = typeof translateZ === "number" ? `${translateZ}px` : translateZ;
  // slight parallax translateY based on depth can be implemented via CSS var if needed
  const transform = `translateZ(${tz})`;

  // For accessibility, if user prefers reduced motion, remove 3D translation
  const prefersReducedMotion =
    typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finalStyle = Object.assign({}, style, prefersReducedMotion ? {} : { transform, transformStyle: "preserve-3d" });

  return (
    <Tag {...rest} className={className} style={finalStyle}>
      {children}
    </Tag>
  );
}
(CardItem as any).displayName = "CardItem";
