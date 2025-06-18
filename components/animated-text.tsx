"use client";

import { HTMLAttributes } from "react";
import { AnimatePresence, motion } from "motion/react";

import { cn } from "@/lib/utils";

interface AnimatedTextProps extends HTMLAttributes<HTMLParagraphElement> {
  states: Record<string, string | React.JSX.Element>;
  currentState: string;
}

export const AnimatedText = ({
  states,
  currentState,
  className = "",
  ...props
}: AnimatedTextProps) => {
  return (
    <p {...props} className={cn("overflow-hidden", className)}>
      <AnimatePresence initial={false} mode="popLayout">
        <motion.span
          key={currentState}
          initial={{ opacity: 0, y: -25 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 25 }}
          transition={{ type: "spring", duration: 0.3, bounce: 0 }}
        >
          {states[currentState]}
        </motion.span>
      </AnimatePresence>
    </p>
  );
};
