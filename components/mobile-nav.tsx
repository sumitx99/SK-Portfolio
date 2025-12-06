"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

interface MobileNavProps {
  navItems: {
    name: string
    href: string
    icon: React.ReactNode
  }[]
  activeSection: string
}

export function MobileNav({ navItems, activeSection }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
    // Prevent scrolling when menu is open
    if (!isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }
  }

  const closeMenu = () => {
    setIsOpen(false)
    document.body.style.overflow = "auto"
  }

  return (
    <>
      {/* Hamburger Button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleMenu}
        className="md:hidden relative z-50"
        aria-label="Toggle menu"
      >
        <div className="w-6 flex flex-col gap-1.5 items-center justify-center">
          <motion.span
            className="w-full h-0.5 bg-red-500 block"
            animate={isOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
          />
          <motion.span className="w-full h-0.5 bg-red-500 block" animate={isOpen ? { opacity: 0 } : { opacity: 1 }} />
          <motion.span
            className="w-full h-0.5 bg-red-500 block"
            animate={isOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
          />
        </div>
      </Button>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-black-950/95 z-40 flex flex-col md:hidden"
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            <div className="flex justify-end p-4">
              <Button variant="ghost" size="icon" onClick={closeMenu} className="text-red-500" aria-label="Close menu">
                <X className="h-6 w-6" />
              </Button>
            </div>

            <div className="flex flex-col items-center justify-center flex-1 gap-6 p-8">
              {navItems.map((item) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: navItems.indexOf(item) * 0.1 }}
                  className="w-full"
                >
                  <Link
                    href={item.href}
                    onClick={closeMenu}
                    className={`text-xl font-medium transition-colors flex items-center gap-3 p-3 rounded-lg ${
                      activeSection === item.name.toLowerCase()
                        ? "bg-red-500/20 text-red-500"
                        : "text-white hover:bg-red-500/10 hover:text-red-500"
                    }`}
                  >
                    {item.icon}
                    {item.name}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navItems.length * 0.1 }}
                className="mt-6 w-full"
              >
                <Button
                  className="w-full rounded-md py-6 text-base font-medium bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900"
                  onClick={() => {
                    closeMenu()
                    const contactSection = document.getElementById("contact")
                    if (contactSection) {
                      const headerOffset = 80
                      const elementPosition = contactSection.getBoundingClientRect().top
                      const offsetPosition = elementPosition + window.pageYOffset - headerOffset

                      window.scrollTo({
                        top: offsetPosition,
                        behavior: "smooth",
                      })
                    }
                  }}
                >
                  Contact Me
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
