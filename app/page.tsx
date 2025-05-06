"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Sun, Moon, Github, Linkedin, Mail, Phone, Download, MapPin, BookOpen, Award, Briefcase, User, Cpu, Rocket } from "lucide-react"
import ProjectCard from "@/components/project-card"
import SkillsSection from "@/components/skills-section"
import TimelineSection from "@/components/timeline-section"
// Enhanced Theme Toggle with Better Animation
const EnhancedThemeToggle = () => {
  const [theme, setTheme] = useState("dark")
  
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") || "dark"
    setTheme(storedTheme)
    document.documentElement.classList.toggle("dark", storedTheme === "dark")
  }, [])
  
  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark"
    setTheme(newTheme)
    localStorage.setItem("theme", newTheme)
    document.documentElement.classList.toggle("dark", newTheme === "dark")
  }
  
  return (
    <motion.div
      whileTap={{ scale: 0.97 }}
      className="relative h-10 w-20 rounded-full border border-primary/10 shadow-inner cursor-pointer bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-950 dark:to-blue-950 overflow-hidden"
      onClick={toggleTheme}
    >
      <div className="absolute inset-0 bg-dot-pattern opacity-30 dark:opacity-50"></div>
      <div className="relative w-full h-full flex items-center justify-between px-2">
        <Sun className={`h-5 w-5 ${theme === 'light' ? 'text-amber-500' : 'text-slate-400'} transition-all duration-500`} />
        <Moon className={`h-5 w-5 ${theme === 'dark' ? 'text-indigo-400' : 'text-slate-400'} transition-all duration-500`} />
        <motion.div 
          className="absolute h-8 w-8 rounded-full bg-gradient-to-br from-white to-blue-100 dark:from-slate-800 dark:to-indigo-950 shadow-md flex items-center justify-center"
          animate={{ 
            x: theme === 'dark' ? 'calc(100% - 32px - 4px)' : '4px',
            transition: { type: "spring", stiffness: 300, damping: 24 }
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={theme}
              initial={{ opacity: 0, rotate: -30 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 30 }}
              transition={{ duration: 0.2 }}
            >
              {theme === 'dark' ? (
                <Moon className="h-4 w-4 text-indigo-300" />
              ) : (
                <Sun className="h-4 w-4 text-amber-400" />
              )}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </motion.div>
  )
}
// Enhanced Dot Pattern Background
const DotPatternBackground = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-[-1]">
      <div className="absolute inset-0 bg-dot-pattern opacity-20 dark:opacity-30"></div>
    </div>
  )
}

// Advanced Cursor Effect Component
const CursorEffect = () => {
  const cursorRef = useRef(null)
  const cursorLightRef = useRef(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  
  useEffect(() => {
    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    
    window.addEventListener('mousemove', updateMousePosition)
    return () => {
      window.removeEventListener('mousemove', updateMousePosition)
    }
  }, [])
  
  useEffect(() => {
    const cursor = cursorRef.current
    const cursorLight = cursorLightRef.current
    
    if (!cursor || !cursorLight) return
    
    const moveCursor = () => {
      cursor.style.left = `${mousePosition.x}px`
      cursor.style.top = `${mousePosition.y}px`
      cursorLight.style.left = `${mousePosition.x}px`
      cursorLight.style.top = `${mousePosition.y}px`
    }
    
    const addRipple = (e) => {
      const ripple = document.createElement('div')
      ripple.className = 'cursor-ripple'
      ripple.style.left = `${e.clientX}px`
      ripple.style.top = `${e.clientY}px`
      document.body.appendChild(ripple)
      
      setTimeout(() => {
        document.body.removeChild(ripple)
      }, 1000)
    }
    
    moveCursor()
    window.addEventListener('mousemove', moveCursor)
    window.addEventListener('click', addRipple)
    
    const interactiveElements = document.querySelectorAll('.interactive')
    interactiveElements.forEach(element => {
      element.addEventListener('mouseenter', () => {
        cursor.classList.add('cursor-hover')
        cursorLight.classList.add('cursor-light-expand')
      })
      
      element.addEventListener('mouseleave', () => {
        cursor.classList.remove('cursor-hover')
        cursorLight.classList.remove('cursor-light-expand')
      })
    })
    
    return () => {
      window.removeEventListener('mousemove', moveCursor)
      window.removeEventListener('click', addRipple)
      
      interactiveElements.forEach(element => {
        element.removeEventListener('mouseenter', () => {})
        element.removeEventListener('mouseleave', () => {})
      })
    }
  }, [mousePosition])
  
  return (
    <>
      <div 
        ref={cursorLightRef} 
        className="hidden md:block fixed w-64 h-64 rounded-full bg-primary/5 pointer-events-none z-0 transform -translate-x-1/2 -translate-y-1/2 blur-2xl transition-all duration-300 ease-out opacity-50"
      />
      <div 
        ref={cursorRef} 
        className="hidden md:block fixed w-6 h-6 rounded-full bg-primary/20 border border-primary/30 pointer-events-none z-50 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-200 ease-out"
      />
      <style jsx global>{`
        body {
          cursor: none;
        }
        
        @media (max-width: 768px) {
          body {
            cursor: auto;
          }
        }
        
        .cursor-hover {
          transform: scale(1.4) translate(-36%, -36%);
          background-color: rgba(var(--primary-rgb), 0.3);
          border-color: rgba(var(--primary-rgb), 0.5);
        }
        
        .cursor-light-expand {
          transform: scale(1.2) translate(-42%, -42%);
          opacity: 0.7;
        }
        
        .cursor-ripple {
          position: fixed;
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background-color: rgba(var(--primary-rgb), 0.3);
          pointer-events: none;
          z-index: 40;
          transform: translate(-50%, -50%);
          animation: ripple 1s ease-out;
        }
        
        .bg-dot-pattern {
          background-size: 24px 24px;
          background-image: radial-gradient(circle, currentColor 1px, transparent 1px);
        }
        
        @keyframes ripple {
          0% {
            width: 0;
            height: 0;
            opacity: 0.8;
          }
          100% {
            width: 150px;
            height: 150px;
            opacity: 0;
          }
        }
        
        .active-nav-item {
          color: hsl(var(--primary));
          position: relative;
        }
        
        .active-nav-item::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 0;
          width: 100%;
          height: 2px;
          background-color: hsl(var(--primary));
          transform-origin: center;
          animation: navIndicator 0.3s ease-out forwards;
        }
        
        @keyframes navIndicator {
          from {
            transform: scaleX(0);
          }
          to {
            transform: scaleX(1);
          }
        }
        
        .card-hover {
          transition: all 0.3s ease;
        }
        
        .card-hover:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
        }
        
        .glow-effect {
          position: relative;
        }
        
        .glow-effect::after {
          content: '';
          position: absolute;
          inset: -5px;
          background: linear-gradient(45deg, rgba(var(--primary-rgb), 0.3), transparent, rgba(var(--primary-rgb), 0.3));
          border-radius: 50%;
          z-index: -1;
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        
        .glow-effect:hover::after {
          opacity: 1;
          animation: rotate 3s linear infinite;
        }
        
        @keyframes rotate {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        
        :root {
          --primary-rgb: 99, 102, 241;
        }
        
        .dark {
          --primary-rgb: 129, 140, 248;
        }
      `}</style>
    </>
  )
}

export default function Home() {
  const [activeSection, setActiveSection] = useState("home")
  const sections = ["home", "about", "skills", "projects", "education", "contact"]
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({})

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = sectionRefs.current[section]
        if (!element) continue

        const offsetTop = element.offsetTop
        const offsetHeight = element.offsetHeight

        if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
          setActiveSection(section)
          break
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [sections])

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  return (
    <main className="min-h-screen relative overflow-hidden bg-gradient-to-br from-sky-50 to-indigo-50 dark:from-slate-950 dark:to-indigo-950 transition-colors duration-500">
      <DotPatternBackground />
      <CursorEffect />

      {/* Header/Navigation */}
      <header className="sticky top-0 z-50 w-full border-b bg-white/80 dark:bg-slate-900/80 backdrop-blur-md supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-slate-900/60 transition-colors duration-300">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="font-bold text-xl interactive group">
            Garv<span className="text-primary group-hover:bg-clip-text group-hover:text-transparent group-hover:bg-gradient-to-r from-indigo-500 to-blue-500 transition-all duration-300">.dev</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            {sections.map((section) => (
              <Link
                key={section}
                href={`#${section}`}
                className={`text-sm font-medium hover:text-primary transition-colors interactive ${
                  activeSection === section ? "active-nav-item" : ""
                }`}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-4">
            <EnhancedThemeToggle />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section
        id="home"
        ref={(el) => (sectionRefs.current["home"] = el)}
        className="container py-24 md:py-32 space-y-8"
      >
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="flex flex-col md:flex-row items-center gap-8 md:gap-16"
        >
          <motion.div
            variants={fadeInUp}
            whileHover={{ scale: 1.05 }}
            className="relative w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-primary/20 interactive glow-effect"
          >
            <Image
              src="/gggg.jpg"
              alt="Garv Bhardwaj"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
          </motion.div>
          <div className="space-y-4 text-center md:text-left">
            <motion.div variants={fadeInUp}>
              <Badge variant="outline" className="px-3 py-1 interactive">
                <MapPin className="mr-1 h-3 w-3" /> New Delhi, India
              </Badge>
            </motion.div>
            <motion.h1 variants={fadeInUp} className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300">
              Garv Bhardwaj
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-xl text-muted-foreground">
              Aspiring AI/ML Engineer | Full Stack Web Developer | Problem Solver
            </motion.p>
            <motion.p variants={fadeInUp} className="text-lg italic">
              "Transforming ideas into intelligent code."
            </motion.p>
            <motion.div variants={fadeInUp} className="flex flex-wrap gap-3 justify-center md:justify-start">
              <Button asChild className="interactive bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600 transition-all duration-300">
                <Link href="/Garv_Bhardwaj_Resume.pdf" target="_blank" rel="noopener noreferrer">
                  <Download className="mr-2 h-4 w-4" /> Download Resume
                </Link>
              </Button>
              <Button asChild variant="outline" className="interactive border-primary/20 hover:border-primary/40 transition-all duration-300">
                <Link href="#projects">View Projects</Link>
              </Button>
            </motion.div>
            <motion.div variants={fadeInUp} className="flex gap-4 justify-center md:justify-start pt-2">
              <Link href="https://linkedin.com/in/garv-bhardwaj-b4b292202" target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" size="icon" aria-label="LinkedIn" className="interactive">
                  <Linkedin className="h-5 w-5" />
                </Button>
              </Link>
              <Link href="https://github.com/GARVBHARDWAJ" target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" size="icon" aria-label="GitHub" className="interactive">
                  <Github className="h-5 w-5" />
                </Button>
              </Link>
              <Link href="mailto:garv2004bhardwaj@gmail.com">
                <Button variant="ghost" size="icon" aria-label="Email" className="interactive">
                  <Mail className="h-5 w-5" />
                </Button>
              </Link>
              <Link href="tel:+917827419739">
                <Button variant="ghost" size="icon" aria-label="Phone" className="interactive">
                  <Phone className="h-5 w-5" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" ref={(el) => (sectionRefs.current["about"] = el)} className="bg-white/50 dark:bg-slate-900/50 py-16 relative backdrop-blur-sm">
        <div className="container space-y-6">
          <SectionHeader icon={<User className="h-6 w-6 text-primary" />} title="About Me" />

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            <motion.div variants={fadeInUp} className="md:col-span-2 space-y-4">
              <p className="text-lg">
                I'm a passionate Computer Science student specializing in Artificial Intelligence and Machine Learning
                at SRM Institute of Science and Technology. With a strong foundation in both AI technologies and web
                development, I strive to create innovative solutions that address real-world challenges.
              </p>
              <p className="text-lg">
                My journey in tech has been enriched by my internship at M.S. Enterprises, where I focused on efficient
                software development and process optimization. Additionally, as a Committee Head for SRM's AARUUSH tech
                fest, I've developed leadership skills while fostering a collaborative environment for technological
                innovation.
              </p>
              <p className="text-lg">
                I'm constantly exploring new technologies and methodologies, with a particular interest in how AI can
                transform traditional systems and create more intuitive user experiences.
              </p>
            </motion.div>
            <motion.div variants={fadeInUp}>
              <Card className="card-hover interactive bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Quick Info</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Name</p>
                    <p className="font-medium">Garv Bhardwaj</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-medium">garv2004bhardwaj@gmail.com</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Phone</p>
                    <p className="font-medium">+91-7827419739</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Location</p>
                    <p className="font-medium">New Delhi, India</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Education</p>
                    <p className="font-medium">B.Tech CSE with AIML</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" ref={(el) => (sectionRefs.current["skills"] = el)} className="py-16 relative">
        <div className="container space-y-8">
          <SectionHeader icon={<Cpu className="h-6 w-6 text-primary" />} title="Skills" />

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
          >
            <SkillsSection />
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" ref={(el) => (sectionRefs.current["projects"] = el)} className="bg-white/50 dark:bg-slate-900/50 py-16 relative backdrop-blur-sm">
        <div className="container space-y-8">
          <SectionHeader icon={<Rocket className="h-6 w-6 text-primary" />} title="Projects" />

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6"
          >
            <motion.div variants={fadeInUp} whileHover={{ y: -5 }}>
              <ProjectCard
                title="IoT-Based Weather Reporting System"
                description="A real-time weather monitoring system using IoT sensors to collect and analyze environmental data."
                tags={["IoT", "Python", "Data Analysis", "Hardware"]}
                image="/placeholder.svg?height=200&width=400"
              />
            </motion.div>
            <motion.div variants={fadeInUp} whileHover={{ y: -5 }}>
              <ProjectCard
                title="Real-Time Chatbot"
                description="An NLP-based interactive chatbot capable of natural conversations and providing helpful responses."
                tags={["NLP", "Python", "Machine Learning", "API"]}
                image="/placeholder.svg?height=200&width=400"
              />
            </motion.div>
            <motion.div variants={fadeInUp} whileHover={{ y: -5 }}>
              <ProjectCard
                title="Foreign Language Learning Platform"
                description="A comprehensive platform for learning foreign languages with progress tracking and interactive exercises."
                tags={["React", "Node.js", "MongoDB", "UX/UI"]}
                image="/placeholder.svg?height=200&width=400"
              />
            </motion.div>
            <motion.div variants={fadeInUp} whileHover={{ y: -5 }}>
              <ProjectCard
                title="Flight Booking System"
                description="A complete flight booking solution built with Python and MySQL, featuring user authentication and booking management."
                tags={["Python", "MySQL", "Database Design", "Backend"]}
                image="/placeholder.svg?height=200&width=400"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Education & Certifications */}
      <section id="education" ref={(el) => (sectionRefs.current["education"] = el)} className="py-16 relative">
        <div className="container space-y-12">
          <div>
            <SectionHeader icon={<BookOpen className="h-6 w-6 text-primary" />} title="Education" />

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUp}
              className="mt-8"
            >
              <TimelineSection />
            </motion.div>
          </div>

          <div>
            <SectionHeader icon={<Award className="h-6 w-6 text-primary" />} title="Certifications" />

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
              className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
            >
              {[
                { title: "C Programming", issuer: "Udemy" },
                { title: "Java", issuer: "NPTEL" },
                { title: "Data Structures & Algorithms", issuer: "SkillUp" },
                { title: "AI & Deep Learning Techniques", issuer: "Udemy" },
                { title: "Smart India Hackathon", issuer: "Participation Certificate" },
                { title: "Rocket Modelling", issuer: "Technical Workshop" },
              ].map((cert, index) => (
                <motion.div key={index} variants={fadeInUp} whileHover={{ scale: 1.03 }}>
                  <Card className="card-hover interactive bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">{cert.title}</CardTitle>
                      <CardDescription>{cert.issuer}</CardDescription>
                    </CardHeader>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <div>
            <SectionHeader icon={<Briefcase className="h-6 w-6 text-primary" />} title="Experience" />

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUp}
              className="mt-8"
            >
              <Card className="card-hover interactive bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>Software Developer Intern</CardTitle>
                      <CardDescription className="text-base mt-1">M.S. Enterprises</CardDescription>
                    </div>
                    <Badge>June-July 2024</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p>
                    Focused on efficient software development and process optimization. Worked on real-world projects,
                    gaining valuable industry experience and enhancing technical skills in a professional environment.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        ref={(el) => (sectionRefs.current["contact"] = el)}
        className="relative py-20 px-4 bg-gradient-to-b from-muted/50 to-white dark:from-muted/50 dark:to-black"
      >
        <div className="container">
          <SectionHeader icon={<Mail className="h-6 w-6 text-primary" />} title="Get In Touch" />

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="mt-12 max-w-4xl mx-auto"
          >
            <motion.div
              variants={fadeInUp}
              className="space-y-12 bg-white/70 dark:bg-muted/70 backdrop-blur-xl rounded-2xl shadow-xl p-10"
            >
              <p className="text-lg text-center text-muted-foreground">
                I'm always open to discussing new projects, opportunities, or partnerships. Feel free to reach out
                through any of the channels below.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <motion.div whileHover={{ scale: 1.05 }}>
                  <Card className="hover:scale-105 transition-transform duration-300 interactive">
                    <CardContent className="pt-6 flex flex-col items-center text-center">
                      <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                        <Mail className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="font-medium mb-1">Email</h3>
                      <a href="mailto:garv2004bhardwaj@gmail.com" className="text-primary hover:underline">
                        garv2004bhardwaj@gmail.com
                      </a>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div whileHover={{ scale: 1.05 }}>
                  <Card className="hover:scale-105 transition-transform duration-300 interactive">
                    <CardContent className="pt-6 flex flex-col items-center text-center">
                      <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                        <Phone className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="font-medium mb-1">Phone</h3>
                      <a href="tel:+917827419739" className="text-primary hover:underline">
                        +91-7827419739
                      </a>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div whileHover={{ scale: 1.05 }}>
                  <Card className="hover:scale-105 transition-transform duration-300 interactive">
                    <CardContent className="pt-6 flex flex-col items-center text-center">
                      <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                        <MapPin className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="font-medium mb-1">Location</h3>
                      <p>New Delhi, India</p>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>

              <div className="flex justify-center gap-6 pt-6">
                <motion.div whileHover={{ scale: 1.1 }}>
                  <Link href="https://linkedin.com/in/garv-bhardwaj-b4b292202" target="_blank" rel="noopener noreferrer">
                    <Button
                      variant="outline"
                      size="icon"
                      aria-label="LinkedIn"
                      className="h-12 w-12 rounded-full interactive"
                    >
                      <Linkedin className="h-5 w-5" />
                    </Button>
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.1 }}>
                  <Link href="https://github.com/GARVBHARDWAJ" target="_blank" rel="noopener noreferrer">
                    <Button
                      variant="outline"
                      size="icon"
                      aria-label="GitHub"
                      className="h-12 w-12 rounded-full interactive"
                    >
                      <Github className="h-5 w-5" />
                    </Button>
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.1 }}>
                  <Link href="mailto:garv2004bhardwaj@gmail.com">
                    <Button
                      variant="outline"
                      size="icon"
                      aria-label="Email"
                      className="h-12 w-12 rounded-full interactive"
                    >
                      <Mail className="h-5 w-5" />
                    </Button>
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.1 }}>
                  <Link href="tel:+917827419739">
                    <Button
                      variant="outline"
                      size="icon"
                      aria-label="Phone"
                      className="h-12 w-12 rounded-full interactive"
                    >
                      <Phone className="h-5 w-5" />
                    </Button>
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="container flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Garv Bhardwaj. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link href="https://linkedin.com/in/garv-bhardwaj-b4b292202" target="_blank" rel="noopener noreferrer">
              <Button variant="ghost" size="icon" aria-label="LinkedIn" className="interactive">
                <Linkedin className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="https://github.com/GARVBHARDWAJ" target="_blank" rel="noopener noreferrer">
              <Button variant="ghost" size="icon" aria-label="GitHub" className="interactive">
                <Github className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="mailto:garv2004bhardwaj@gmail.com">
              <Button variant="ghost" size="icon" aria-label="Email" className="interactive">
                <Mail className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </footer>
    </main>
  )
}

function SectionHeader({ icon, title }: { icon: React.ReactNode; title: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="flex items-center gap-2 text-primary"
    >
      {icon}
      <h2 className="text-3xl font-bold text-foreground">{title}</h2>
    </motion.div>
  )
}