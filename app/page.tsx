"use client"

import type React from "react"

import { useEffect, useState, useRef } from "react"
import {
  Github,
  Linkedin,
  Mail,
  Phone,
  ExternalLink,
  ChevronRight,
  Download,
  Code,
  Award,
  Briefcase,
  Cpu,
  Database,
  Globe,
  Cloud,
  Terminal,
  User,
  GraduationCap,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { motion, useScroll, useTransform, useInView } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { GlitchText } from "@/components/glitch-text"
import { Text3D } from "@/components/text-3d"
import { MatrixRain } from "@/components/matrix-rain"
// Removing the CustomCursor import
// import { CustomCursor } from "@/components/custom-cursor"
import { MobileNav } from "@/components/mobile-nav"
import { useScrollToSection } from "@/components/scroll-to-section"
import { ScrollToTopButton } from "@/components/scroll-to-top-button"
import { toast } from "sonner"
import TypewriterEffect from "@/components/ui/typewriter-effect"

import { ContactSection } from "@/components/contact-section"

// In your page.tsx imports section (around line 1-30), add:
import { ThemeToggle } from "@/components/theme-toggle"
import { SpaceParallaxSection } from "@/components/space-parallax-section"
import { TestimonialsSection } from "@/components/testimonials-section";


// Add this function near the top of your component
const ImageWithFallback = ({ src, alt, ...props }: any) => {
  return (
    <Image
      src={src || "/placeholder.svg?height=400&width=400"}
      alt={alt}
      {...props}
      onError={(e) => {
        const target = e.target as HTMLImageElement
        target.src = "/placeholder.svg?height=400&width=400"
      }}
    />
  )
}

// Add this import at the top with other imports

// Add this component right after the header and before the main hero section
function CompanyLogosDock() {
  const links = [
    {
      title: "EOXS",
      icon: (
        <div className="relative h-6 w-6 rounded-full overflow-hidden">
          <ImageWithFallback
            src="/images/companies/eoxs_steel_logo.jpeg"
            alt="EOXS Logo"
            fill
            className="object-cover"
          />
        </div>
      ),
      href: "#experience",
    },
    {
      title: "Pharmaco Evidence",
      icon: (
        <div className="relative h-6 w-6 rounded-full overflow-hidden">
          <ImageWithFallback
            src="/images/companies/pharmacoevidence_cover.jpeg"
            alt="Pharmaco Evidence Logo"
            fill
            className="object-cover"
          />
        </div>
      ),
      href: "#experience",
    },
  ];

  return (
    <div className="flex items-center justify-center w-full pt-4">
      <FloatingDock
        items={links}
        className="fixed top-20 z-40" // Position it below the header
      />
    </div>
  );
}

export default function Home() {
  const [isCrazyMode, setIsCrazyMode] = useState(false);
  const [showCookingText, setShowCookingText] = useState(false);
  const [scrollY, setScrollY] = useState(0)
  const [activeSection, setActiveSection] = useState("hero")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{ type: "success" | "error" | null; message: string }>({
    type: null,
    message: "",
  })
  const heroRef = useRef(null)
  const isHeroInView = useInView(heroRef, { once: false })
  const [showFallback, setShowFallback] = useState(false)

  // Use the scroll to section hook
  useScrollToSection()

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)

      // Determine active section based on scroll position
      const sections = ["hero", "about", "education", "experience", "skills", "projects", "achievements", "contact"]

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.9])

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
  }
  const heroTypeWords = [
    {
      text: "An enthusiastic computer science student passionate about AI, machine learning, and creating innovative solutions.",
    },
  ]


  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
      },
    },
  }

  const navItems = [
    { name: "Home", href: "#hero", icon: <Home className="h-4 w-4" /> },
    { name: "About", href: "#about", icon: <User className="h-4 w-4" /> },
    { name: "Education", href: "#education", icon: <GraduationCap className="h-4 w-4" /> },
    { name: "Experience", href: "#experience", icon: <Briefcase className="h-4 w-4" /> },
    { name: "Skills", href: "#skills", icon: <Code className="h-4 w-4" /> },
    { name: "Projects", href: "#projects", icon: <Briefcase className="h-4 w-4" /> },
    { name: "Achievements", href: "#achievements", icon: <Award className="h-4 w-4" /> },
    { name: "Contact", href: "#contact", icon: <Mail className="h-4 w-4" /> },
  ]

  // Function to handle contact button click
  const handleContactClick = () => {
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
  }

  // Function to handle resume download
  const handleResumeDownload = () => {
    // Create a link element
    const link = document.createElement("a")
    link.href = "/resume/sumit-kumar-ranjan-resume.pdf"
    link.download = "Sumit-Kumar-Ranjan-Resume.pdf"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    // Show toast notification
    toast.success("Resume download started!", {
      description: "Thank you for your interest in my profile.",
      duration: 3000,
    })
  }

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus({ type: null, message: "" })

    // Basic client-side validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.subject.trim() || !formData.message.trim()) {
      setSubmitStatus({ type: "error", message: "Please fill in all fields." })
      setIsSubmitting(false)
      return
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      setSubmitStatus({ type: "error", message: "Please enter a valid email address." })
      setIsSubmitting(false)
      return
    }

    try {
      // First try the main contact API
      let response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      // If the main API fails, try the fallback
      if (!response.ok) {
        console.log("Main contact API failed, trying fallback...")
        response = await fetch("/api/contact/route-fallback", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        })
      }

      const data = await response.json()

if (response.ok) {
  setSubmitStatus({
    type: "success",
    message: data.fallback
      ? "✅ Message received! I'll get back to you within 24 hours."
      : "✅ Message sent successfully! Check your email for confirmation.",
  })
  setFormData({ name: "", email: "", subject: "", message: "" })
  toast.success("Message received!", {
    description: data.fallback
      ? "Thank you! Your message has been saved. I typically respond within 24 hours."
      : "You should receive a confirmation email shortly. I'll get back to you soon!",
    duration: 5000,
  })

        // Always show the fallback contact methods in preview environments
        if (data.fallback) {
          setShowFallback(true)
        }
      } else {
        setSubmitStatus({
          type: "error",
          message: data.error || "Failed to send message. Please try again.",
        })
        toast.error("Failed to send message", {
          description: data.error || "Please try again or contact me directly via email.",
          duration: 5000,
        })
        setShowFallback(true)
      }
    } catch (error) {
      console.error("Contact form error:", error)
      setSubmitStatus({ type: "error", message: "Network error. Please check your connection and try again." })
      toast.error("Network error", {
        description: "Please check your connection and try again, or contact me directly.",
        duration: 5000,
      })
      setShowFallback(true)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  return (
<div className="min-h-screen bg-background text-foreground transition-colors duration-300">

      {/* Background Elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-900/10 dark:from-red-900/10 via-background to-background"></div>
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 dark:bg-red-500/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        ></motion.div>
        <motion.div
          className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-blue-700/5 dark:bg-red-700/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.4, 0.3],
          }}
          transition={{
            duration: 10,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            delay: 1,
          }}
        ></motion.div>
        <motion.div
          className="absolute top-2/3 left-1/3 w-72 h-72 bg-blue-600/5 dark:bg-red-600/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 12,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            delay: 2,
          }}
        ></motion.div>
      </div>
      {/* Matrix Rain Effect */}
      <MatrixRain />


      {/* Removed the CustomCursor component */}

      {/* Scroll to Top Button */}
      <ScrollToTopButton />

      {/* Progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 via-red-600 to-red-700 z-50"
        style={{ scaleX: scrollYProgress, transformOrigin: "0%" }}
      />

      {/* Header */}
      <header
        className={`sticky top-0 z-40 w-full backdrop-blur-md transition-all duration-300 ${
  scrollY > 50 
    ? "bg-background/80 shadow-md shadow-red-500/10 dark:shadow-red-900/20 supports-[backdrop-filter]:bg-background/60" 
    : "bg-transparent"
}`}
      >
        <div className="container flex h-16 items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-red-500 via-red-600 to-red-700"
          >
            <Link href="#hero" className="cursor-pointer">
              Sumit Kumar Ranjan
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-6">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-sm font-medium transition-colors hover:text-red-500 relative ${activeSection === item.name.toLowerCase() ? "text-red-500" : "text-muted-foreground"
                  }`}
              >
                {item.name}
                {activeSection === item.name.toLowerCase() && (
                  <motion.div
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-red-500 to-red-700"
                    layoutId="activeSection"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* Mobile Navigation */}
          <div className="md:hidden">
            <MobileNav navItems={navItems} activeSection={activeSection} />
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-center gap-2"
          >
            {/* <ThemeToggle /> */}

            <Button
              variant="default"
              size="sm"
              className="rounded-full hidden md:flex bg-red-600 hover:bg-red-700"
              onClick={handleContactClick}
            >
              <Mail className="mr-2 h-4 w-4" />
              Contact Me
            </Button>
          </motion.div>
        </div>
      </header>

      <main className="container py-8">
        {/* Hero Section */}
        <section
          id="hero"
          className="py-20 md:py-32 flex flex-col md:flex-row items-center gap-12 relative"
          ref={heroRef}
        >
          <motion.div
            className="flex-1 space-y-6"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-block"
            >
              <Badge
                variant="outline"
                className="px-4 py-1 text-sm bg-gradient-to-r from-red-500/20 to-red-700/20 border-red-500/30 text-red-500 mb-4"
              >
                Computer Science Student
              </Badge>
            </motion.div>

            <div className="mb-8">
              <GlitchText text="SUMIT KUMAR RANJAN" className="text-4xl sm:text-5xl md:text-6xl font-bold mb-2" />
              <div className="text-xl text-red-500 font-medium min-h-[32px] flex items-center">
                <TypewriterEffect
                  words={[
                    { text: "AI & Machine Learning Engineer" },
                    { text: "Full Stack Developer" },
                    { text: "Creative Problem Solver" }
                  ]}
                  loop={true}
                  typingSpeed={70}
                  deletingSpeed={40}
                  pauseBetweenWords={2000}
                />
              </div>
            </div>

            <motion.div
              className="text-xl text-muted-foreground max-w-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.5 }}
            >
              <p className="leading-relaxed">
                An enthusiastic computer science student passionate about AI, machine learning, and creating innovative solutions.
              </p>
            </motion.div>
            <motion.div className="flex gap-4 pt-2" variants={container} initial="hidden" animate="show">
              <motion.div variants={item}>
                <Link href="https://github.com/sumitx99" target="_blank" rel="noopener noreferrer">
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full hover:bg-red-500/10 hover:text-red-500 transition-all border-red-500/20"
                    aria-label="GitHub Profile"
                  >
                    <Github className="h-5 w-5" />
                  </Button>
                </Link>
              </motion.div>
              <motion.div variants={item}>
                <Link
                  href="https://www.linkedin.com/in/sumit-kumar-ranjan-741bb825a/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full hover:bg-red-500/10 hover:text-red-500 transition-all border-red-500/20"
                    aria-label="LinkedIn Profile"
                  >
                    <Linkedin className="h-5 w-5" />
                  </Button>
                </Link>
              </motion.div>
              <motion.div variants={item}>
                <Link href="mailto:sumitranjan2207@gmail.com">
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full hover:bg-red-500/10 hover:text-red-500 transition-all border-red-500/20"
                    aria-label="Email Me"
                  >
                    <Mail className="h-5 w-5" />
                  </Button>
                </Link>
              </motion.div>
              <motion.div variants={item}>
                <Link href="tel:+918955411699">
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full hover:bg-red-500/10 hover:text-red-500 transition-all border-red-500/20"
                    aria-label="Call Me"
                  >
                    <Phone className="h-5 w-5" />
                  </Button>
                </Link>
              </motion.div>
            </motion.div>

            <motion.div
              className="pt-6 flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <Button
                className="rounded-full group bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900"
                onClick={handleResumeDownload}
              >
                <Download className="mr-2 h-4 w-4 group-hover:animate-bounce" />
                Download Resume
              </Button>
              <Button
                variant="outline"
                className="rounded-full group border-red-500/20"
                onClick={() => {
                  const projectsSection = document.getElementById("projects")
                  if (projectsSection) {
                    const headerOffset = 80
                    const elementPosition = projectsSection.getBoundingClientRect().top
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset

                    window.scrollTo({
                      top: offsetPosition,
                      behavior: "smooth",
                    })
                  }
                }}
              >
                View Projects
                <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>
          </motion.div>

          <motion.div className="flex-1 flex justify-center" style={{ opacity, scale }}>
            <div className="relative">
              <motion.div
                className="absolute -inset-4 rounded-full bg-gradient-to-r from-red-500/20 via-red-600/20 to-red-700/20 blur-lg"
                animate={{
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 4,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                }}
              ></motion.div>
              <motion.div
                className="relative w-72 h-72 rounded-full overflow-hidden border-4 border-red-500/30 shadow-xl shadow-red-500/20"
                initial={{ rotate: -5 }}
                animate={{ rotate: 5 }}
                transition={{
                  duration: 6,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                }}
                whileHover={{ scale: 1.05 }}
              >
                <ImageWithFallback
                  src="/images/sumit-profile.png"
                  alt="Sumit Kumar Ranjan"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-red-500/10 via-transparent to-red-700/10"></div>
              </motion.div>
              <motion.div
                className="absolute -bottom-4 -right-4 bg-black-950 dark:bg-black-950/90 rounded-full p-3 shadow-lg shadow-red-500/20 border border-red-500/20"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                  delay: 1,
                }}
              >
                <div className="bg-gradient-to-r from-red-500 to-red-700 text-white rounded-full p-2">
                  <code className="text-xs font-bold">{"<SDE/>"}</code>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Floating badges */}
          <motion.div
            className="absolute top-1/4 right-10 hidden lg:block"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 1.2 }}
          >
          </motion.div>
          <motion.div
            className="absolute bottom-1/4 left-10 hidden lg:block"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 1.4 }}
          >
          </motion.div>
          <motion.div
            className="absolute top-2/3 right-1/4 hidden lg:block"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.6 }}
          >
            {/* <Badge className="bg-red-500/10 hover:bg-red-500/20 text-red-500 border-none">Java</Badge> */}
          </motion.div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20 scroll-mt-20">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeIn}
            className="mb-12 text-center"
          >
            <Badge
              variant="outline"
              className="px-4 py-1 text-sm bg-gradient-to-r from-red-500/20 to-red-700/20 border-red-500/30 text-red-500 mb-4"
            >
              About Me
            </Badge>
            <Text3D text="Who I Am" className="text-4xl font-bold p-2" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={{
                hidden: { opacity: 0, x: -50 },
                visible: {
                  opacity: 1,
                  x: 0,
                  transition: {
                    duration: 0.5,
                    ease: "easeOut",
                  },
                },
              }}
            >
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-red-500/20 to-transparent rounded-lg blur"></div>
                <div className="relative bg-card dark:bg-black-900 rounded-lg p-6 shadow-lg shadow-red-500/5 border border-red-500/10">
                  <p className="text-lg leading-relaxed">
                  I’m a B.E. Computer Science student who spends an unhealthy amount of time fighting bugs and convincing Python to behave like a responsible adult. I’ve survived multiple hackathons using a scientific mixture of caffeine, curiosity, last-minute panic, and pure luck.
                  </p>
                  <p className="text-lg leading-relaxed mt-4">
                  I speak Python, Java, C++, and C—basically enough languages to argue with computers in several dialects until one of us gives up (usually me). I enjoy taking messy, chaotic data and transforming it into insights that are only slightly less messy. Most of my projects work impressively well in development and then immediately question their life choices on demo day.
                 </p>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={{
                hidden: { opacity: 0, x: 50 },
                visible: {
                  opacity: 1,
                  x: 0,
                  transition: {
                    duration: 0.5,
                    ease: "easeOut",
                  },
                },
              }}
            >
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-transparent to-red-700/20 rounded-lg blur"></div>
                <div className="relative bg-black-900 rounded-lg p-6 shadow-lg shadow-red-500/5 border border-red-500/10">
                  <p className="text-lg leading-relaxed">
I work with React.js, Kafka, AWS services, and microservices built with FastAPI and Flask—basically a full tech stack held together by caffeine and optimism. I manage MySQL and PostgreSQL, convincing them to cooperate one query at a time.                  </p>
                  <p className="text-lg leading-relaxed mt-4">
                    Outside the tech world, I would love to play cricket and basketball, which taught me teamwork, leadership, and how to stay calm under pressure—skills I now apply when something breaks right before deployment.

                  </p>
                  <motion.div
                    className="mt-6 flex gap-2 flex-wrap"
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                  >
                    {[
                      { name: "Python", color: "red" },
                      { name: "Java", color: "red" },
                      { name: "C++", color: "red" },
                      { name: "C", color: "red" },
                      { name: "React.js", color: "red" },
                      { name: "Next.js", color: "red" },
                      { name: "MySQL", color: "red" },
                      { name: "Postgres", color: "red" },
                      { name: "Machine Learning", color: "red" },
                      // { name: "TensorFlow", color: "red" },
                      // { name: "PyTorch", color: "red" },
                      { name: "NLP", color: "red" },
                    ].map((skill, index) => (
                      <motion.div key={skill.name} variants={fadeIn} custom={index}>
                        <Badge
                          variant="outline"
                          className={`text-sm py-1 px-3 bg-${skill.color}-500/5 hover:bg-${skill.color}-500/10 text-${skill.color}-500 transition-colors border-red-500/20`}
                        >
                          {skill.name}
                        </Badge>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Education Section */}
        <section id="education" className="py-20 scroll-mt-20">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeIn}
            className="mb-12 text-center"
          >
            <Badge
              variant="outline"
              className="px-4 py-1 text-sm bg-gradient-to-r from-red-500/20 to-red-700/20 border-red-500/30 text-red-500 mb-4"
            >
              Education
            </Badge>
            <Text3D text="Academic Background" className="text-4xl font-bold p-2" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={{
                hidden: { opacity: 0, y: 50 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.5,
                    ease: "easeOut",
                  },
                },
              }}
            >
              <Card className="overflow-hidden border-none shadow-lg hover:shadow-xl transition-all duration-300 bg-card dark:bg-gradient-to-br dark:from-black-900 dark:to-black-900/90 h-full group shadow-red-500/5 border border-red-500/10">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 to-red-700"></div>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-2xl group-hover:text-red-500 transition-colors">
                        B.E. Computer Science Engineering
                      </CardTitle>
                      <CardDescription className="text-base mt-1">Chandigarh University (2022-2026)</CardDescription>
                    </div>
                    <motion.div
                      className="bg-gradient-to-r from-red-500/10 to-red-700/10 text-red-500 font-bold rounded-full h-16 w-16 flex items-center justify-center text-lg"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      8.04
                    </motion.div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="bg-gradient-to-r from-red-500/5 to-red-700/5 rounded-lg p-4 mt-4">
                    <p className="text-muted-foreground">
                      Pursuing my Bachelor's degree in Computer Science Engineering, focusing on building a strong
                      foundation in programming, algorithms, and software development.
                    </p>
                  </div>
                  <div className="mt-6 flex justify-between items-center">
                    <Badge variant="outline" className="bg-red-500/5 text-red-500 border-red-500/20">
                      Computer Science
                    </Badge>
                    <span className="text-sm text-muted-foreground">Mohali, Punjab</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={{
                hidden: { opacity: 0, y: 50 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.5,
                    ease: "easeOut",
                  },
                },
              }}
            >
              <Card className="overflow-hidden border-none shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-black-900 to-black-900/90 h-full group shadow-red-500/5 border border-red-500/10">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 to-red-700"></div>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-2xl group-hover:text-red-500 transition-colors">
                        Intermediate (12th Grade)
                      </CardTitle>
                      <CardDescription className="text-base mt-1">
                        Kendriya Vidyalaya Chandrapura (2020-2022)
                      </CardDescription>
                    </div>
                    <motion.div
                      className="bg-gradient-to-r from-red-500/10 to-red-700/10 text-red-500 font-bold rounded-full h-16 w-16 flex items-center justify-center text-lg"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      91%
                    </motion.div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="bg-gradient-to-r from-red-500/5 to-red-700/5 rounded-lg p-4 mt-4">
                    <p className="text-muted-foreground">
                      Completed my intermediate education with a focus on science and mathematics, achieving excellent
                      academic results while also participating in extracurricular activities.
                    </p>
                  </div>
                  <div className="mt-6 flex justify-between items-center">
                    <Badge variant="outline" className="bg-red-500/5 text-red-500 border-red-500/20">
                      Science Stream
                    </Badge>
                    <span className="text-sm text-muted-foreground">Chandrapura, Jharkhand</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="py-20 scroll-mt-20">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeIn}
            className="mb-12 text-center"
          >
            <Badge
              variant="outline"
              className="px-4 py-1 text-sm bg-gradient-to-r from-red-500/20 to-red-700/20 border-red-500/30 text-red-500 mb-4"
            >
              Experience
            </Badge>
            <Text3D text="Professional Journey" className="text-4xl font-bold p-2" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={{
                hidden: { opacity: 0, y: 50 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.5,
                    ease: "easeOut",
                  },
                },
              }}
              className="md:col-span-2"
            >
              <Card className="overflow-hidden border-none shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-black-900 to-black-900/90 h-full group shadow-red-500/5 border border-red-500/10">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 to-red-700"></div>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-2xl group-hover:text-red-500 transition-colors">
                        AI Developer Intern
                      </CardTitle>
                      <CardDescription className="text-base mt-1">EOXS | May 2025 – August 2025</CardDescription>
                    </div>
                    <motion.div
                      className="bg-gradient-to-r from-red-500/10 to-red-700/10 rounded-full h-16 w-16 flex items-center justify-center overflow-hidden"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <ImageWithFallback
                        src="/images/companies/eoxs_steel_logo.jpeg"
                        alt="EOXS Logo"
                        width={48}
                        height={48}
                        className="rounded-full object-cover"
                      />
                    </motion.div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="bg-gradient-to-r from-red-500/5 to-red-700/5 rounded-lg p-4 mt-4">
                    <ul className="space-y-3">
                      <motion.li
                        className="flex items-start gap-2"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3 }}
                        viewport={{ once: true }}
                      >
                        <div className="h-5 w-5 rounded-full bg-red-500/10 text-red-500 flex items-center justify-center mt-0.5 flex-shrink-0">
                          <ChevronRight className="h-3 w-3" />
                        </div>
                        <p className="text-muted-foreground">
                          Contributing to the development of AI modules within EOXS's ERP system, focusing on automation
                          and predictive analytics
                        </p>
                      </motion.li>
                      <motion.li
                        className="flex items-start gap-2"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                        viewport={{ once: true }}
                      >
                        <div className="h-5 w-5 rounded-full bg-red-500/10 text-red-500 flex items-center justify-center mt-0.5 flex-shrink-0">
                          <ChevronRight className="h-3 w-3" />
                        </div>
                        <p className="text-muted-foreground">
                          Assisting in the design of machine learning models for demand forecasting and operational
                          efficiency in the steel industry
                        </p>
                      </motion.li>
                    </ul>
                  </div>
                  <div className="mt-6 flex flex-wrap gap-2">
                    <Badge variant="outline" className="bg-red-500/5 text-red-500 border-red-500/20">
                      Machine Learning
                    </Badge>
                    <Badge variant="outline" className="bg-red-500/5 text-red-500 border-red-500/20">
                      Generative AI
                    </Badge>
                    <Badge variant="outline" className="bg-red-500/5 text-red-500 border-red-500/20">
                      ERP Systems
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
            {/* --- NEW: Pharmacoevidence (SDE) Card --- */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="md:col-span-2"
            >
              <Card className="overflow-hidden border-none shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-black-900 to-black-900/90 h-full group shadow-red-500/5 border border-red-500/10">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 to-red-700"></div>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-2xl group-hover:text-red-500 transition-colors">
                        Software Developer Engineer
                      </CardTitle>
                      <CardDescription className="text-base mt-1">
                        Pharmaco Evidence | August 2025 – Present
                      </CardDescription>
                    </div>
                    <motion.div
  className="bg-gradient-to-r from-red-500/10 to-red-700/10 rounded-full h-16 w-16 flex items-center justify-center overflow-hidden p-1"
  whileHover={{ scale: 1.1, rotate: 5 }}
  transition={{ type: "spring", stiffness: 400, damping: 10 }}
>
  <div className="relative h-12 w-12 rounded-full overflow-hidden">
    <ImageWithFallback
      src="/images/companies/pharmaco.png"
      alt="Pharmaco Evidence Logo"
      fill
      className="object-cover"
    />
  </div>
</motion.div>
                  </div>
                </CardHeader>

                <CardContent>
                  <div className="bg-gradient-to-r from-red-500/5 to-red-700/5 rounded-lg p-4 mt-4">
                    <ul className="space-y-3">
                      <motion.li
                        className="flex items-start gap-2"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3 }}
                        viewport={{ once: true }}
                      >
                        <div className="h-5 w-5 rounded-full bg-red-500/10 text-red-500 flex items-center justify-center mt-0.5 flex-shrink-0">
                          <ChevronRight className="h-3 w-3" />
                        </div>
                        <p className="text-muted-foreground">
                          Joined Pharmacoevidence as an SDE — working on backend services,
                          API integrations, and Apache Kafka.
                        </p>
                      </motion.li>

                      <motion.li
                        className="flex items-start gap-2"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                        viewport={{ once: true }}
                      >
                        <div className="h-5 w-5 rounded-full bg-red-500/10 text-red-500 flex items-center justify-center mt-0.5 flex-shrink-0">
                          <ChevronRight className="h-3 w-3" />
                        </div>
                        <p className="text-muted-foreground">
                          Contributing to scalable, well-tested systems and collaborating with
                          product + ML teams on integrations.
                        </p>
                      </motion.li>
                    </ul>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-2">
                    <Badge
                      variant="outline"
                      className="bg-red-500/5 text-red-500 border-red-500/20"
                    >
                      Backend
                    </Badge>
                    <Badge
                      variant="outline"
                      className="bg-red-500/5 text-red-500 border-red-500/20"
                    >
                      APIs
                    </Badge>
                    <Badge
                      variant="outline"
                      className="bg-red-500/5 text-red-500 border-red-500/20"
                    >
                      Apache Kafka
                    </Badge>
                    <Badge variant="outline" className="bg-red-500/5 text-red-500 border-red-500/20">
                      React.js
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-20 scroll-mt-20">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeIn}
            className="mb-12 text-center"
          >
            <Badge
              variant="outline"
              className="px-4 py-1 text-sm bg-gradient-to-r from-red-500/20 to-red-700/20 border-red-500/30 text-red-500 mb-4"
            >
              Skills
            </Badge>
            <Text3D text="My Expertise" className="text-4xl font-bold p-2" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={{
                hidden: { opacity: 0, x: -50 },
                visible: {
                  opacity: 1,
                  x: 0,
                  transition: {
                    duration: 0.5,
                    ease: "easeOut",
                  },
                },
              }}
            >
              <h3 className="text-2xl font-semibold mb-6 flex items-center">
                <div className="h-8 w-1 bg-gradient-to-b from-red-500 to-red-700 mr-3 rounded-full"></div>
                Technical Skills
              </h3>
              <motion.div
                className="space-y-6"
                variants={container}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
              >
                {[
                  { name: "ML / AI", value: 90, color: "red", icon: <Cpu className="h-5 w-5" /> },
                  { name: "Python/Java/C++/C", value: 95, color: "red", icon: <Terminal className="h-5 w-5" /> },
                  { name: "Databases", value: 85, color: "red", icon: <Database className="h-5 w-5" /> },
                  { name: "Web Development", value: 80, color: "red", icon: <Globe className="h-5 w-5" /> },
                  { name: "Cloud Services", value: 75, color: "red", icon: <Cloud className="h-5 w-5" /> },
                ].map((skill, index) => (
                  <motion.div key={skill.name} variants={item} custom={index}>
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-full bg-red-500/10 flex items-center justify-center">
                          {skill.icon}
                        </div>
                        <span className="font-medium">{skill.name}</span>
                      </div>
                      <span className={`text-red-500 font-bold`}>{skill.value}%</span>
                    </div>
                    <div className="relative h-2 w-full bg-muted rounded-full overflow-hidden">
                      <motion.div
                        className={`absolute top-0 left-0 h-full bg-gradient-to-r from-red-500 to-red-700 rounded-full`}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.value}%` }}
                        transition={{ duration: 1, delay: 0.2 + index * 0.1 }}
                        viewport={{ once: true }}
                      />
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={{
                hidden: { opacity: 0, x: 50 },
                visible: {
                  opacity: 1,
                  x: 0,
                  transition: {
                    duration: 0.5,
                    ease: "easeOut",
                  },
                },
              }}
            >
              <h3 className="text-2xl font-semibold mb-6 flex items-center">
                <div className="h-8 w-1 bg-gradient-to-b from-red-500 to-red-700 mr-3 rounded-full"></div>
                Core Competencies
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { name: "Natural Language Processing", color: "red" },
                  { name: "Computer Vision", color: "red" },
                  { name: "Distributed Systems", color: "red" },
                  { name: "Data Mining", color: "red" },
                  { name: "Algorithm Optimization", color: "red" },
                  { name: "Problem-solving", color: "red" },
                ].map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 * index }}
                    viewport={{ once: true }}
                    className="group"
                    whileHover={{ scale: 1.05 }}
                  >
                    <div
                      className={`bg-black-900 hover:bg-red-500/5 rounded-lg p-5 flex items-center gap-4 shadow-md hover:shadow-lg transition-all duration-300 h-full border border-red-500/10 shadow-red-500/5`}
                    >
                      <motion.div
                        className={`h-3 w-3 rounded-full bg-red-500 group-hover:scale-125 transition-transform`}
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                      ></motion.div>
                      <span className={`font-medium group-hover:text-red-500 transition-colors`}>{skill.name}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-20 scroll-mt-20">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeIn}
            className="mb-12 text-center"
          >
            <Badge
              variant="outline"
              className="px-4 py-1 text-sm bg-gradient-to-r from-red-500/20 to-red-700/20 border-red-500/30 text-red-500 mb-4"
            >
              Projects
            </Badge>
            <Text3D text="My Work" className="text-4xl font-bold p-2" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {[
              {
                title: "IntelliTraffic: AI-Powered Traffic Management System",
                description: [
                  "Engineered a real-time traffic monitoring system using computer vision and deep learning algorithms that reduced average wait times by 40%",
                  "Implemented YOLO-based vehicle detection models with 95% prediction accuracy across diverse traffic patterns and weather conditions",
                  "Designed a scalable distributed architecture capable of handling simultaneous traffic analysis from multiple urban intersections",
                  "Utilized optimization algorithms to dynamically adjust signal timing based on current traffic density and historical patterns",
                ],
                tags: ["Computer Vision", "YOLO", "Deep Learning", "Distributed Systems"],
                color: "red",
                github: "https://github.com/sumitx99/Intelli_Traffic",
              },
              {
                title: "ATS Resume Checker: LLM-Enhanced Resume Analysis",
                description: [
                  "Developed a full-stack application using Streamlit frontend and Python backend to evaluate resumes against Applicant Tracking Systems",
                  "Integrated Google's Gemini 1.5 Flash LLM to analyze resume content, identifying keyword matches and optimization opportunities",
                  "Improved parsing accuracy by 85% compared to traditional keyword-matching systems through advanced NLP techniques",
                  "Created a recommendation engine that suggests targeted improvements based on specific job descriptions and industry requirements",
                ],
                tags: ["LLM", "NLP", "Streamlit", "Python", "Gemini 1.5"],
                color: "red",
                github: "https://github.com/sumitx99/ATS-resume-checker",
              },
              {
                title: "Loan Approval Learning and Technology Awareness Platform",
                description: [
                  "Built an interactive educational platform with React.js frontend and Node.js backend to simulate loan application processes",
                  "Designed user-friendly interfaces that increased engagement by 30% and improved completion rates of learning modules",
                  "Developed comprehensive educational content on emerging technologies including AI, Blockchain, IoT, and Cloud Computing",
                  "Implemented analytics tracking to measure user progress and optimize content delivery, achieving a 95% completion rate",
                ],
                tags: ["React.js", "Node.js", "MongoDB", "Interactive Learning"],
                color: "red",
                github: "https://github.com/sumitx99/Loan-Approval-Platform",
              },
              {
                title: "Organ Connect: Medical Record Management System",
                description: [
                  "Architected a HIPAA-compliant system for processing 50,000+ sensitive medical records with robust security protocols",
                  "Enhanced document management functionality to improve upload speeds and storage efficiency by 40%",
                  "Implemented an intelligent recommendation algorithm for organ donor matching based on multiple medical criteria",
                  "Redesigned user interfaces to improve accessibility for healthcare professionals, resulting in 30% faster workflow completion",
                ],
                tags: ["Security", "Document Management", "Recommendation Systems", "UI/UX"],
                color: "red",
                github: "https://github.com/sumitx99/ORGAN_CONNECT",
              },
            ].map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
                whileHover={{ y: -10 }}
              >
                <Card className="h-full flex flex-col overflow-hidden border-none shadow-lg group-hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-black-900 to-black-900/90 shadow-red-500/5 border border-red-500/10">
                  <div
                    className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500/50 to-red-700 group-hover:from-red-500 group-hover:to-red-700/70 transition-colors`}
                  ></div>
                  <CardHeader>
                    <CardTitle className={`text-2xl group-hover:text-red-500 transition-colors`}>
                      {project.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <ul className="space-y-3">
                      {project.description.map((item, i) => (
                        <motion.li
                          key={i}
                          className="flex items-start gap-2"
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: 0.1 * i }}
                          viewport={{ once: true }}
                        >
                          <div
                            className={`h-5 w-5 rounded-full bg-red-500/10 text-red-500 flex items-center justify-center mt-0.5 flex-shrink-0`}
                          >
                            <ChevronRight className="h-3 w-3" />
                          </div>
                          <p className="text-muted-foreground">{item}</p>
                        </motion.li>
                      ))}
                    </ul>
                    <div className="mt-6 flex flex-wrap gap-2">
                      {project.tags.map((tag, i) => (
                        <motion.div
                          key={tag}
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3, delay: 0.05 * i }}
                          viewport={{ once: true }}
                        >
                          <Badge variant="outline" className={`bg-red-500/5 text-red-500 text-xs border-red-500/20`}>
                            {tag}
                          </Badge>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                  <div className="p-6 pt-0 mt-auto">
                    <Link href={project.github} target="_blank" rel="noopener noreferrer" className="w-full">
                      <Button
                        variant="outline"
                        className={`w-full group-hover:bg-red-500 group-hover:text-white transition-all border-red-500/20`}
                      >
                        View on GitHub
                        <ExternalLink className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Achievements Section */}
        <section id="achievements" className="py-20 scroll-mt-20">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeIn}
            className="mb-12 text-center"
          >
            <Badge
              variant="outline"
              className="px-4 py-1 text-sm bg-gradient-to-r from-red-500/20 to-red-700/20 border-red-500/30 text-red-500 mb-4"
            >
              Achievements
            </Badge>
            <Text3D text="My Accomplishments" className="text-4xl font-bold p-2" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* BIZINNOVATHON Achievement */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="h-full"
            >
              <Card className="overflow-hidden border-none shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-black-900 to-black-900/90 shadow-red-500/5 border border-red-500/10 h-full flex flex-col">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 to-red-700"></div>
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-4">
                    <motion.div
                      className="h-16 w-16 rounded-full bg-red-500/10 flex items-center justify-center flex-shrink-0"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <span className="text-red-500 font-bold text-2xl">1st</span>
                    </motion.div>
                    <div>
                      <CardTitle className="text-2xl">Runner-Up, BIZINNOVATHON'24</CardTitle>
                      <CardDescription className="text-base">2024</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col">
                  <div className="bg-black-900 rounded-lg p-4 mb-4 border border-red-500/20">
                    <p className="text-white font-medium">
                      Led a team of four to secure the 1st Runner-up position in BIZINNOVATHON'24, a prestigious
                      national-level hackathon organized by Bajaj Allianz, competing against 200+ teams from across
                      India.
                    </p>
                  </div>

                  <div className="mt-auto aspect-[4/3] w-full relative overflow-hidden rounded-lg">
                    <motion.div
                      className="w-full h-full"
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5 }}
                      whileHover={{
                        scale: 1.03,
                        boxShadow: "0 10px 25px -5px rgba(239, 68, 68, 0.4)",
                      }}
                    >
                      <ImageWithFallback
                        src="/images/bizinnovathon-award.png"
                        alt="BIZINNOVATHON Award"
                        fill
                        className="object-cover"
                      />
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-tr from-red-500/10 via-transparent to-red-700/10"
                        animate={{
                          background: [
                            "linear-gradient(to top right, rgba(239, 68, 68, 0.1), transparent, rgba(185, 28, 28, 0.1))",
                            "linear-gradient(to top right, rgba(185, 28, 28, 0.1), transparent, rgba(239, 68, 68, 0.1))",
                            "linear-gradient(to top right, rgba(239, 68, 68, 0.1), transparent, rgba(185, 28, 28, 0.1))",
                          ],
                        }}
                        transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY }}
                      />
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 bg-black/40 transition-opacity duration-300">
                        <div className="bg-red-600 text-white px-4 py-2 rounded-full text-sm font-medium">
                          View Details
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* HASH-IT-OUT Achievement */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="h-full"
            >
              <Card className="overflow-hidden border-none shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-black-900 to-black-900/90 shadow-red-500/5 border border-red-500/10 h-full flex flex-col">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 to-red-700"></div>
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-4">
                    <motion.div
                      className="h-16 w-16 rounded-full bg-red-500/10 flex items-center justify-center flex-shrink-0"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <span className="text-red-500 font-bold text-2xl">8th</span>
                    </motion.div>
                    <div>
                      <CardTitle className="text-2xl">HASH-IT-OUT Coding Competition</CardTitle>
                      <CardDescription className="text-base">2024</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col">
                  <div className="bg-black-900 rounded-lg p-4 mb-4 border border-red-500/20">
                    <p className="text-white font-medium">
                      Achieved 8th rank among 700+ competitive programmers in the HASH-IT-OUT Coding Competition hosted
                      by Coding Ninjas, demonstrating exceptional problem-solving skills and algorithmic thinking.
                    </p>
                  </div>

                  <div className="mt-auto aspect-[4/3] w-full relative overflow-hidden rounded-lg">
                    <motion.div
                      className="w-full h-full"
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5 }}
                      whileHover={{
                        scale: 1.03,
                        boxShadow: "0 10px 25px -5px rgba(239, 68, 68, 0.4)",
                      }}
                    >
                      <ImageWithFallback
                        src="/images/hash-it-out-award.png"
                        alt="HASH-IT-OUT Award"
                        fill
                        className="object-cover"
                      />
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-tr from-red-500/10 via-transparent to-red-700/10"
                        animate={{
                          background: [
                            "linear-gradient(to top right, rgba(239, 68, 68, 0.1), transparent, rgba(185, 28, 28, 0.1))",
                            "linear-gradient(to top right, rgba(185, 28, 28, 0.1), transparent, rgba(239, 68, 68, 0.1))",
                            "linear-gradient(to top right, rgba(239, 68, 68, 0.1), transparent, rgba(185, 28, 28, 0.1))",
                          ],
                        }}
                        transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY }}
                      />
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 bg-black/40 transition-opacity duration-300">
                        <div className="bg-red-600 text-white px-4 py-2 rounded-full text-sm font-medium">
                          View Details
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Other achievements remain the same */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
            >
              <Card className="overflow-hidden border-none shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-black-900 to-black-900/90 shadow-red-500/5 border border-red-500/10">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 to-red-700"></div>
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-4">
                    <motion.div
                      className="h-16 w-16 rounded-full bg-red-500/10 flex items-center justify-center flex-shrink-0"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <span className="text-red-500 font-bold text-2xl">Top 10</span>
                    </motion.div>
                    <div>
                      <CardTitle className="text-2xl">SOLVE-A-THON National Coding Competition</CardTitle>
                      <CardDescription className="text-base">2023</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="bg-red-500/5 rounded-lg p-4">
                    <p className="text-muted-foreground">
                      Selected as a Top 10 Finalist in SOLVE-A-THON National Coding Competition.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
            >
              <Card className="overflow-hidden border-none shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-black-900 to-black-900/90 shadow-red-500/5 border border-red-500/10">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 to-red-700"></div>
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-4">
                    <motion.div
                      className="h-16 w-16 rounded-full bg-red-500/10 flex items-center justify-center flex-shrink-0"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <span className="text-red-500 font-bold text-2xl">Member</span>
                    </motion.div>
                    <div>
                      <CardTitle className="text-2xl"> Computer Society of India CUSB Chandigarh University</CardTitle>
                      <CardDescription className="text-base">2022-Present</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="bg-red-500/5 rounded-lg p-4 ">
                    <p className="text-muted-foreground">
                      Active member of the University Computer Science Club, organizing technical workshops for junior
                      students.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>
        
        {/* NEW: Space Parallax "Deep Impact" Section */}
      <SpaceParallaxSection />

        <TestimonialsSection />
        
        {/* Contact Section
        <section id="contact" className="py-20 scroll-mt-20">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeIn}
            className="mb-12 text-center"
          >
            <Badge
              variant="outline"
              className="px-4 py-1 text-sm bg-gradient-to-r from-red-500/20 to-red-700/20 border-red-500/30 text-red-500 mb-4"
            >
              Contact
            </Badge>
            <Text3D text="Get In Touch" className="text-4xl font-bold p-2" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={{
                hidden: { opacity: 0, x: -50 },
                visible: {
                  opacity: 1,
                  x: 0,
                  transition: {
                    duration: 0.5,
                    ease: "easeOut",
                  },
                },
              }}
            >
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-red-500/20 to-transparent rounded-lg blur"></div>
                <div className="relative bg-black-900 rounded-lg p-8 shadow-lg shadow-red-500/5 border border-red-500/10">
                  <h3 className="text-2xl font-semibold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-red-700">
                    Contact Information
                  </h3>
                  <div className="space-y-6">
                    <motion.div
                      className="flex items-center gap-4"
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <div className="h-12 w-12 rounded-full bg-red-500/10 flex items-center justify-center">
                        <Phone className="h-5 w-5 text-red-500" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Phone</p>
                        <p className="font-medium">+91 8955411699</p>
                      </div>
                    </motion.div>
                    <motion.div
                      className="flex items-center gap-4"
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <div className="h-12 w-12 rounded-full bg-red-500/10 flex items-center justify-center">
                        <Mail className="h-5 w-5 text-red-500" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Email</p>
                        <p className="font-medium">sumitranjan2207@gmail.com</p>
                      </div>
                    </motion.div>
                    <motion.div
                      className="flex items-center gap-4"
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <div className="h-12 w-12 rounded-full bg-red-500/10 flex items-center justify-center">
                        <Github className="h-5 w-5 text-red-500" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">GitHub</p>
                        <Link
                          href="https://github.com/sumitx99"
                          className="font-medium hover:text-red-500 transition-colors"
                          target="_blank"
                        >
                          github.com/sumitx99
                        </Link>
                      </div>
                    </motion.div>
                    <motion.div
                      className="flex items-center gap-4"
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <div className="h-12 w-12 rounded-full bg-red-500/10 flex items-center justify-center">
                        <Linkedin className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">LinkedIn</p>
                        <Link
                          href="https://www.linkedin.com/in/sumit-kumar-ranjan-741bb825a/"
                          className="font-medium hover:text-red-500 transition-colors"
                          target="_blank"
                        >
                          linkedin.com/in/sumit-kumar-ranjan-741bb825a
                        </Link>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={{
                hidden: { opacity: 0, y: 50 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.5,
                    ease: "easeOut",
                  },
                },
              }}
            >
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-transparent to-red-700/20 rounded-lg blur"></div>
                <div className="relative bg-black-900 rounded-lg p-8 shadow-lg shadow-red-500/5 border border-red-500/10">
                  <h3 className="text-2xl font-semibold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-red-700">
                    Send a Message
                  </h3>
                  <form onSubmit={handleFormSubmit} className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-muted-foreground mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="mt-1 block w-full px-4 py-3 rounded-md border border-red-500/20 bg-background text-foreground dark:bg-black-900 dark:text-white shadow-sm focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors sm:text-sm"
                        placeholder="Enter your full name"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-muted-foreground mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="mt-1 block w-full px-4 py-3 rounded-md border border-red-500/20 bg-background text-foreground dark:bg-black-900 dark:text-white shadow-sm focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors sm:text-sm"
                        placeholder="your.email@example.com"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-muted-foreground mb-2">
                        Subject *
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        className="mt-1 block w-full px-4 py-3 rounded-md border border-red-500/20 bg-background text-foreground dark:bg-black-900 dark:text-white shadow-sm focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors sm:text-sm"
                        placeholder="What's this about?"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-muted-foreground mb-2">
                        Message *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        rows={5}
                        className="mt-1 block w-full px-4 py-3 rounded-md border border-red-500/20 bg-background text-foreground dark:bg-black-900 dark:text-white shadow-sm focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors sm:text-sm resize-vertical"
                        placeholder="Tell me about your project, question, or how I can help you..."
                        required
                      ></textarea>
                    </div>
                    <Button
                      type="submit"
                      className="w-full rounded-full bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 py-3 text-base font-medium transition-all duration-200"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Sending Message...
                        </>
                      ) : (
                        <>
                          <Mail className="mr-2 h-4 w-4" />
                          Send Message
                        </>
                      )}
                    </Button>
                    {submitStatus.type && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`mt-4 p-4 rounded-md border ${submitStatus.type === "success"
                          ? "bg-green-500/10 text-green-400 border-green-500/20"
                          : "bg-red-500/10 text-red-400 border-red-500/20"
                          }`}
                      >
                        <div className="flex items-center">
                          {submitStatus.type === "success" ? (
                            <div className="h-5 w-5 rounded-full bg-green-500 flex items-center justify-center mr-3">
                              <svg className="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path
                                  fillRule="evenodd"
                                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </div>
                          ) : (
                            <div className="h-5 w-5 rounded-full bg-red-500 flex items-center justify-center mr-3">
                              <svg className="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path
                                  fillRule="evenodd"
                                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </div>
                          )}
                          <span className="font-medium">{submitStatus.message}</span>
                        </div>
                      </motion.div>
                    )}
                  </form>
                </div>
              </div>
            </motion.div>
          </div>
        </section> */}
        <ContactSection />
      </main>

      {/* Footer */}
      <footer className="py-6 text-center text-muted-foreground">
        <p className="text-sm">&copy; {new Date().getFullYear()} Sumit Kumar Ranjan. All rights reserved.</p>
      </footer>
    </div>
  )
}
