"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, Send, Github, Linkedin, Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Message sent successfully!");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        // If the main email fails, we just show the error now (since fallback is gone)
        toast.error(data.message || "Failed to send email. Please check your connection.");
        console.error("Email Error:", data.message);
      }
    } catch (error) {
      console.error("Network Error:", error);
      toast.error("Something went wrong. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 scroll-mt-20 relative">
      <div className="container mx-auto px-4">
        
        {/* Main Card Container */}
        <div className="w-full max-w-6xl mx-auto bg-card dark:bg-black-900 rounded-[30px] overflow-hidden shadow-2xl border border-red-500/20 flex flex-col md:flex-row min-h-[600px]">
          
          {/* --- LEFT PANEL: VISUALS --- */}
          <div className="relative w-full md:w-5/12 bg-black-950 p-10 flex flex-col justify-between overflow-hidden group">
            
            {/* 1. BACKGROUND STARS */}
            <div className="absolute inset-0 z-0">
               <div className="absolute top-10 left-10 w-1 h-1 bg-white rounded-full animate-pulse"></div>
               <div className="absolute top-1/3 left-1/2 w-0.5 h-0.5 bg-white rounded-full animate-pulse delay-75"></div>
               <div className="absolute bottom-1/4 left-1/4 w-1 h-1 bg-white rounded-full animate-pulse delay-150"></div>
               <div className="absolute top-20 right-20 w-1.5 h-1.5 bg-blue-100 rounded-full animate-pulse delay-300"></div>
               <div className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-tr from-red-900/10 via-transparent to-blue-900/10"></div>
            </div>

            {/* 2. TEXTURE LINES */}
            <div className="absolute inset-0 z-10 opacity-50 pointer-events-none mix-blend-screen">
              <Image 
                src="/images/space/lines-min.avif" 
                alt="Texture Lines" 
                fill
                className="object-cover"
              />
            </div>

            {/* 3. CONTENT */}
            <div className="relative z-30">
              <h3 className="text-3xl font-bold text-white mb-4">Get in Touch</h3>
              <p className="text-gray-300 mb-8 leading-relaxed">
                Ready to explore new opportunities? My inbox is always open.
              </p>

              <div className="space-y-6">
                <div className="flex items-center gap-4 text-gray-200 group-hover:text-white transition-colors">
                  <div className="h-10 w-10 rounded-full bg-red-500/20 flex items-center justify-center backdrop-blur-sm">
                    <Phone className="h-5 w-5 text-red-500" />
                  </div>
                  <span className="font-medium">+91 8955411699</span>
                </div>
                
                <div className="flex items-center gap-4 text-gray-200 group-hover:text-white transition-colors">
                  <div className="h-10 w-10 rounded-full bg-red-500/20 flex items-center justify-center backdrop-blur-sm">
                    <Mail className="h-5 w-5 text-red-500" />
                  </div>
                  <span className="font-medium">sumitranjan2207@gmail.com</span>
                </div>

                <div className="flex items-center gap-4 text-gray-200 group-hover:text-white transition-colors">
                  <div className="h-10 w-10 rounded-full bg-red-500/20 flex items-center justify-center backdrop-blur-sm">
                    <MapPin className="h-5 w-5 text-red-500" />
                  </div>
                  <span className="font-medium">Chandigarh University, India</span>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex gap-4 mt-10">
                <Link href="https://github.com/sumitx99" target="_blank">
                    <div className="h-10 w-10 rounded-full bg-white/10 hover:bg-red-500 hover:text-white flex items-center justify-center transition-all cursor-pointer backdrop-blur-sm">
                        <Github className="h-5 w-5" />
                    </div>
                </Link>
                <Link href="https://www.linkedin.com/in/sumit-kumar-ranjan-741bb825a/" target="_blank">
                    <div className="h-10 w-10 rounded-full bg-white/10 hover:bg-red-500 hover:text-white flex items-center justify-center transition-all cursor-pointer backdrop-blur-sm">
                        <Linkedin className="h-5 w-5" />
                    </div>
                </Link>
              </div>
            </div>

            {/* 4. PLANET IMAGE */}
            <motion.div 
              className="absolute -bottom-24 -right-24 w-96 h-96 z-20 pointer-events-none"
              animate={{ 
                rotate: [0, 360], 
              }}
              transition={{ 
                duration: 120, // Very slow rotation
                repeat: Infinity,
                ease: "linear"
              }}
            >
              <Image 
                src="/images/space/planet-ring.avif" 
                alt="Dark Planet" 
                fill
                className="object-contain"
              />
            </motion.div>
          </div>

          {/* --- RIGHT PANEL: FORM --- */}
          <div className="w-full md:w-7/12 p-8 md:p-12 bg-background dark:bg-card flex flex-col justify-center relative z-10">
            <h3 className="text-2xl font-bold mb-6 text-foreground">Send me a Message</h3>
            <form onSubmit={handleFormSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-muted-foreground">Your Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-3 rounded-xl bg-secondary/40 border border-border focus:border-red-500 focus:ring-2 focus:ring-red-500/20 outline-none transition-all text-foreground"
                            placeholder="John Doe"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-muted-foreground">Your Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-3 rounded-xl bg-secondary/40 border border-border focus:border-red-500 focus:ring-2 focus:ring-red-500/20 outline-none transition-all text-foreground"
                            placeholder="john@example.com"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">Subject</label>
                    <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 rounded-xl bg-secondary/40 border border-border focus:border-red-500 focus:ring-2 focus:ring-red-500/20 outline-none transition-all text-foreground"
                        placeholder="Project discussion"
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">Message</label>
                    <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        rows={5}
                        className="w-full px-4 py-3 rounded-xl bg-secondary/40 border border-border focus:border-red-500 focus:ring-2 focus:ring-red-500/20 outline-none transition-all resize-none text-foreground"
                        placeholder="How can I help you?"
                    ></textarea>
                </div>

                <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 text-white font-bold text-lg shadow-lg shadow-red-500/20 transition-all hover:scale-[1.01]"
                >
                    {isSubmitting ? (
                        <>
                            <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Sending...
                        </>
                    ) : (
                        <>Send Message <Send className="ml-2 h-5 w-5" /></>
                    )}
                </Button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}