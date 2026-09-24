"use client";

import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion";
import type { ReactNode } from "react";
import { clsx } from "clsx";

const easeOut = [0.22, 1, 0.36, 1] as const;

export const staggerContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.04,
    },
  },
};

export const fadeUpItem = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.42, ease: easeOut },
  },
};

type StaggerProps = {
  children: ReactNode;
  className?: string;
  as?: "div" | "section" | "ul" | "ol";
};

export function Stagger({ children, className, as = "div" }: StaggerProps) {
  const reduce = useReducedMotion();
  const Comp = motion[as];

  if (reduce) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <Comp
      className={className}
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
    >
      {children}
    </Comp>
  );
}

type FadeItemProps = HTMLMotionProps<"div"> & {
  children: ReactNode;
  className?: string;
};

export function FadeItem({ children, className, ...rest }: FadeItemProps) {
  const reduce = useReducedMotion();
  if (reduce) {
    return <div className={className}>{children}</div>;
  }
  return (
    <motion.div className={className} variants={fadeUpItem} {...rest}>
      {children}
    </motion.div>
  );
}

export function BentoShell({
  children,
  className,
  interactive = true,
  id,
}: {
  children: ReactNode;
  className?: string;
  interactive?: boolean;
  id?: string;
}) {
  return (
    <div
      id={id}
      className={clsx(interactive && "bento-card", "overflow-hidden p-5", className)}
    >
      {children}
    </div>
  );
}
