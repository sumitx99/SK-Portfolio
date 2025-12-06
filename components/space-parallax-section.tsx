"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { Text3D } from "@/components/text-3d";

export function SpaceParallaxSection() {
  const ref = useRef(null);
  
  // Track scroll progress
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // --- PARALLAX ANIMATIONS ---
  
  // Text: Stays relatively pinned but fades out slowly
  const textY = useTransform(scrollYProgress, [0.2, 0.8], ["0%", "-50%"]);
  const textOpacity = useTransform(scrollYProgress, [0.2, 0.5], [1, 0]);

  // Astronaut: Starts lower, floats up past the text
  const astroY = useTransform(scrollYProgress, [0, 1], ["10%", "-20%"]);
  const astroRotate = useTransform(scrollYProgress, [0, 1], [-2, 5]);

  // Left Cloud (formerly Back Cloud): Moves slowly down
  const cloudLeftY = useTransform(scrollYProgress, [0, 1], ["-10%", "20%"]);

  // Right Cloud (Front Cloud): Moves faster upwards
  const cloudRightY = useTransform(scrollYProgress, [0, 1], ["20%", "-40%"]);

  return (
    <section 
      ref={ref} 
      className="relative h-[160vh] overflow-hidden bg-black-950 flex flex-col items-center"
    >
      {/* 1. BACKGROUND & RED GLOW */}
      <div className="absolute inset-0 z-0 bg-black-950">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-red-600/20 blur-[100px] rounded-full"></div>
        <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-white rounded-full animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-white rounded-full animate-pulse delay-75"></div>
      </div>

      {/* 2. TYPOGRAPHY */}
      <motion.div 
        style={{ y: textY, opacity: textOpacity }}
        className="relative z-10 mt-2 md:mt-10 text-center flex flex-col items-center justify-center"
      >
        <div className="relative">
            <h1 className="text-6xl md:text-9xl font-black tracking-tighter text-white leading-[0.85] mix-blend-overlay opacity-90">
              DEEP<br/>IMPACT
            </h1>
            <div className="absolute -top-8 left-0 right-0 text-center">
                <p className="text-red-500 text-sm tracking-[0.5em] font-medium uppercase">
                    Explore The Unknown
                </p>
            </div>
        </div>
      </motion.div>

      {/* 3. PARALLAX LAYERS */}
      
      {/* CLOUD 1 - MOVED TO LEFT SIDE (Fixed) */}
      <motion.div 
        style={{ y: cloudLeftY }}
        className="absolute top-[20%] left-[-10%] md:left-[-5%] z-20 w-[600px] md:w-[800px] opacity-60 pointer-events-none mix-blend-screen"
      >
        <Image 
          src="/images/space/cloud-1.avif"
          alt="Nebula Cloud Left"
          width={800}
          height={600}
          className="object-contain"
        />
      </motion.div>

      {/* ASTRONAUT (Center) */}
      <motion.div 
        style={{ y: astroY, rotate: astroRotate }}
        className="absolute top-[25%] md:top-[20%] left-1/2 -translate-x-1/2 z-30 w-[90%] md:w-[600px] lg:w-[700px] pointer-events-none"
      >
       <motion.div
          animate={{ 
            y: [0, -20, 0], // Floats up 20px and back down
            rotate: [0, 2, -2, 0] // Subtle rotation wobble
          }}
          transition={{ 
            duration: 6, // Slow duration (6 seconds) for heavy/space feel
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        >
          <Image 
            src="/images/space/astronaut.avif"
            alt="Silver Astronaut"
            width={800}
            height={1000}
            priority
            className="object-contain drop-shadow-[0_0_30px_rgba(255,255,255,0.1)]"
          />
        </motion.div>
      </motion.div>

      {/* CLOUD 2 - RIGHT SIDE (Foreground) */}
      {/* <motion.div 
        style={{ y: cloudRightY }}
        className="absolute bottom-[-10%] right-[-10%] z-40 w-[900px] opacity-70 pointer-events-none mix-blend-screen"
      >
        <Image 
          src="/images/space/cloud-2.avif"
          alt="Foreground Cloud Right"
          width={900}
          height={700}
          className="object-contain"
        />
      </motion.div> */}

      {/* MIST OVERLAY */}
      {/* <div className="absolute inset-0 z-50 pointer-events-none opacity-20 mix-blend-overlay">
        <Image 
          src="/images/space/mist.avif"
          alt="Atmosphere"
          fill
          className="object-cover"
        />
      </div> */}

    </section>
  );
}