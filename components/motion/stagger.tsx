"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";

import { cn } from "@/lib/utils";

const containerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

export type StaggerProps = {
  children: React.ReactNode;
  className?: string;
};

/**
 * Stagger — pembungkus grid kartu; anak-anaknya muncul berurutan 0.08s (§3.4).
 * Bungkus tiap anak dengan `<StaggerItem>`.
 *
 * `prefers-reduced-motion: reduce` → render biasa tanpa animasi (final state).
 */
export function Stagger({ children, className }: StaggerProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={cn(className)}>{children}</div>;
  }

  return (
    <motion.div
      data-reveal
      className={cn(className)}
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-10%" }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className }: StaggerProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={cn(className)}>{children}</div>;
  }

  return (
    <motion.div data-reveal className={cn(className)} variants={itemVariants}>
      {children}
    </motion.div>
  );
}

/**
 * HoverLift — kartu terangkat 4px saat hover (§3.4). Dimatikan saat reduced-motion.
 */
export function HoverLift({ children, className }: StaggerProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={cn(className)}>{children}</div>;
  }

  return (
    <motion.div
      className={cn(className)}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
