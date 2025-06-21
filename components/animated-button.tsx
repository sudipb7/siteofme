"use client";

import { AnimatePresence, motion } from "motion/react";

import { cn } from "@/lib/utils";
import { Button, ButtonProps } from "@/components/ui/button";

interface AnimatedButtonProps extends ButtonProps {
  states: Record<string, string | React.JSX.Element>;
  currentState: string;
}

export const AnimatedButton = ({
  states,
  currentState,
  disabled,
  className = "",
  ...props
}: AnimatedButtonProps) => {
  return (
    <Button {...props} disabled={disabled} className={cn("", className)}>
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
    </Button>
  );
};
