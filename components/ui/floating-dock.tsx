"use client";

import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import React, { useState } from "react";

export const FloatingDock = ({
  items,
  className,
}: {
  items: {
    title: string;
    icon: React.ReactNode;
    href: string;
  }[];
  className?: string;
}) => {
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState(false);

  return (
    <div className={cn("flex items-center justify-center", className)}>
      <motion.div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="flex flex-row items-center gap-2 px-4 py-3 bg-black-900/80 backdrop-blur-md border border-red-500/20 rounded-full shadow-lg shadow-red-500/10"
        style={{
          transition: "all 0.3s ease",
        }}
      >
        <AnimatePresence>
          {items.map((item, idx) => (
            <motion.div
              key={item.title}
              initial={{ width: 40, opacity: 0 }}
              animate={{
                width: 40,
                opacity: 1,
              }}
              exit={{ width: 0, opacity: 0 }}
              whileHover={{
                width: "auto",
                scale: 1.1,
              }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 25,
              }}
              className="flex items-center justify-center"
            >
              <Link
                href={item.href}
                className="flex items-center justify-center gap-2 text-sm text-white hover:text-red-500 transition-colors"
              >
                <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center">
                  {item.icon}
                </div>
                <motion.span
                  initial={{ opacity: 0, width: 0 }}
                  animate={{
                    opacity: hovered ? 1 : 0,
                    width: hovered ? "auto" : 0,
                  }}
                  transition={{ duration: 0.2 }}
                  className="whitespace-nowrap overflow-hidden"
                >
                  {item.title}
                </motion.span>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};