"use client";

import React from "react";
import { motion } from "framer-motion";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import { Badge } from "@/components/ui/badge";
import { Text3D } from "@/components/text-3d";

export function TestimonialsSection() {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section id="testimonials" className="py-12 scroll-mt-20 relative z-10 bg-transparent p-2">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeIn}
        transition={{ duration: 0.6 }}
        className="mb-8 text-center"
      >
        <Badge
          variant="outline"
          className="px-4 py-1 text-sm bg-gradient-to-r from-red-500/20 to-red-700/20 border-red-500/30 text-red-500 mb-4"
        >
          Recognition
        </Badge>
        <Text3D text="What Others Say" className="text-3xl font-bold" />
      </motion.div>
      
      {/* Fixed container with proper positioning */}
      <div className="h-[200px] relative z-0 bg-transparent">
        <InfiniteMovingCards
          items={testimonials}
          direction="right"
          speed="slow"
        />
      </div>
    </section>
  );
}

const testimonials = [
  {
    quote: "Sumit demonstrated exceptional problem-solving skills and technical expertise during the BIZINNOVATHON'24. His AI-powered solution showcased deep understanding of machine learning concepts.",
    name: "Bajaj Allianz Judges",
    title: "BIZINNOVATHON'24 Hackathon",
  },
  {
    quote: "Outstanding performance in competitive programming. Ranked 8th among 700+ participants, demonstrating strong algorithmic thinking.",
    name: "Coding Ninjas",
    title: "HASH-IT-OUT Coding Competition",
  },
  {
    quote: "A dedicated and innovative team member who consistently delivers high-quality work. His contributions significantly improved system performance.",
    name: "EOXS Team",
    title: "AI Development Internship",
  },
  {
    quote: "Exceptional full-stack development capabilities combined with strong AI/ML knowledge. Demonstrates both technical excellence and practical approach.",
    name: "University Faculty",
    title: "Chandigarh University",
  },
];