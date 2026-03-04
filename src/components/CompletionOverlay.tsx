"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface CompletionOverlayProps {
  currentStep: number;
  totalSteps: number;
  label?: string;
  onDone: () => void;
}

export default function CompletionOverlay({
  currentStep,
  totalSteps,
  label = "Chapter complete!",
  onDone,
}: CompletionOverlayProps) {
  const onDoneRef = useRef(onDone);
  onDoneRef.current = onDone;

  useEffect(() => {
    const timer = setTimeout(() => onDoneRef.current(), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={() => onDoneRef.current()}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm cursor-pointer"
    >
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ type: "spring", damping: 15, stiffness: 300 }}
        className="bg-[#FFF8F0] rounded-xl border-[3px] border-stone-900 shadow-[5px_5px_0_#1c1917] p-8 text-center max-w-xs mx-4"
      >
        {/* Animated checkmark */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.15, type: "spring", damping: 10, stiffness: 200 }}
          className="mx-auto mb-4 h-16 w-16 rounded-xl border-[3px] border-stone-900 bg-emerald-400 flex items-center justify-center shadow-[3px_3px_0_#1c1917]"
        >
          <motion.svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-white"
          >
            <motion.polyline
              points="20 6 9 17 4 12"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 0.3, duration: 0.4, ease: "easeOut" }}
            />
          </motion.svg>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-lg font-black text-stone-900"
        >
          {label}
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
          className="text-sm font-bold text-stone-400 mt-1"
        >
          {currentStep} of {totalSteps} done
        </motion.p>

        {/* Progress dots */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.65 }}
          className="flex justify-center gap-2 mt-4"
        >
          {Array.from({ length: totalSteps }).map((_, i) => (
            <motion.div
              key={i}
              initial={i === currentStep - 1 ? { scale: 0 } : {}}
              animate={i === currentStep - 1 ? { scale: 1 } : {}}
              transition={
                i === currentStep - 1
                  ? { delay: 0.8, type: "spring", damping: 10 }
                  : {}
              }
              className={`h-3 w-3 rounded-sm border-[2px] border-stone-900 ${
                i < currentStep ? "bg-[#E07A5F]" : "bg-white"
              }`}
            />
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
