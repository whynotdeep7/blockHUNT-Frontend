"use client"

import { useState, useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import {
  Code,
  Cpu,
  Layers,
  ChevronDown,
  Trophy,
  Users,
  Globe,
  Calendar,
  ArrowRight,
  Github,
  Twitter,
  Linkedin,
  Star,
} from "lucide-react"

const LandingPage = () => {
  const [user, setUser] = useState(null)
  const [activeTestimonial, setActiveTestimonial] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const heroRef = useRef(null)
  const statsRef = useRef(null)
  const timelineRef = useRef(null)

  // Parallax effect for hero section
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, 200])

  // Testimonials data
  const testimonials = [
    {
      name: "Alex Johnson",
      role: "Blockchain Developer",
      content:
        "blockHUNT provided me with the perfect platform to showcase my skills and connect with like-minded developers. The hackathons are well-organized and challenging!",
      avatar: "/placeholder.svg?height=80&width=80",
    },
    {
      name: "Sarah Chen",
      role: "Smart Contract Engineer",
      content:
        "I've participated in three hackathons on blockHUNT and each one has been an incredible learning experience. The community is supportive and the projects are innovative.",
      avatar: "/placeholder.svg?height=80&width=80",
    },
    {
      name: "Michael Rodriguez",
      role: "DApp Architect",
      content:
        "blockHUNT has become my go-to platform for blockchain hackathons. The quality of participants and projects is outstanding, and the prizes are substantial!",
      avatar: "/placeholder.svg?height=80&width=80",
    },
  ]

  // Upcoming hackathons data
  const upcomingHackathons = [
    {
      title: "DeFi Revolution",
      date: "June 15-18, 2025",
      participants: 250,
      prize: "$15,000",
      tags: ["DeFi", "Smart Contracts", "Web3"],
    },
    {
      title: "NFT Creator Summit",
      date: "July 8-12, 2025",
      participants: 180,
      prize: "$12,000",
      tags: ["NFT", "Digital Art", "Marketplace"],
    },
    {
      title: "Blockchain Gaming Expo",
      date: "August 22-26, 2025",
      participants: 320,
      prize: "$20,000",
      tags: ["Gaming", "Metaverse", "Play-to-Earn"],
    },
  ]

  // Timeline data
  const timelineItems = [
    {
      title: "Register",
      description: "Create your account and complete your developer profile",
      icon: <Users className="h-6 w-6" />,
    },
    {
      title: "Join a Hackathon",
      description: "Browse upcoming events and register for one that matches your interests",
      icon: <Calendar className="h-6 w-6" />,
    },
    {
      title: "Form a Team",
      description: "Connect with other developers or bring your own team",
      icon: <Globe className="h-6 w-6" />,
    },
    {
      title: "Build & Submit",
      description: "Develop your project and submit before the deadline",
      icon: <Code className="h-6 w-6" />,
    },
    {
      title: "Win Prizes",
      description: "Get recognized for your innovation and take home rewards",
      icon: <Trophy className="h-6 w-6" />,
    },
  ]

  // Stats data
  const stats = [
    { value: "50+", label: "Hackathons Completed" },
    { value: "5,000+", label: "Registered Developers" },
    { value: "$500K+", label: "Prize Money Awarded" },
    { value: "300+", label: "Projects Launched" },
  ]

  useEffect(() => {
    try {
      const userData = localStorage.getItem("user")
      if (userData) {
        setUser(JSON.parse(userData))
      }
    } catch (error) {
      console.error("Error parsing user data:", error)
    }

    // Auto-rotate testimonials
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    // Intersection observer for animations
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (statsRef.current) {
      observer.observe(statsRef.current)
    }

    return () => {
      clearInterval(interval)
      observer.disconnect()
    }
  }, [testimonials.length])

  // Scroll to next section
  const scrollToNextSection = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    })
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Hero Section with Parallax */}
      <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Animated background elements with parallax */}
        <motion.div
          className="absolute inset-0 z-0"
          style={{ y }} // Apply the parallax effect to the background elements
        >
          <div className="absolute top-20 left-20 w-64 h-64 rounded-full bg-[#5CDBDB]/10 blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 rounded-full bg-purple-500/10 blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-blue-500/5 blur-3xl"></div>

          {/* Animated grid pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.7)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.7)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_70%,transparent_100%)] opacity-20"></div>
        </motion.div>

        <div className="container mx-auto px-6 z-10">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-6 inline-block"
            >
              <span className="px-3 py-1 bg-gradient-to-r from-[#5CDBDB]/20 to-[#5CDBDB]/10 text-[#5CDBDB] rounded-full text-sm font-medium border border-[#5CDBDB]/20">
                The Future of Blockchain Hackathons
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-[#5CDBDB]"
            >
              Welcome to <span className="text-[#5CDBDB]">blockHUNT</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="text-xl md:text-2xl text-gray-300 mb-10 max-w-2xl mx-auto"
            >
              Join or organize hackathons on the blockchain and build the decentralized future together.
            </motion.p>

            {user ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.5 }}
              >
                <p className="mb-6 text-lg">
                  Welcome back, <span className="text-[#5CDBDB] font-semibold">{user.email}</span>! Ready to continue
                  building?
                </p>
                <Link
                  to="/hackathons"
                  className="group bg-gradient-to-r from-[#5CDBDB] to-[#4BCACA] hover:from-[#4BCACA] hover:to-[#3ABABA] text-black font-medium px-8 py-4 rounded-lg inline-flex items-center gap-2 shadow-lg shadow-[#5CDBDB]/20 transition-all duration-300"
                >
                  Explore Hackathons
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.5 }}
                className="space-x-4"
              >
                <Link
                  to="/signup"
                  className="group bg-gradient-to-r from-[#5CDBDB] to-[#4BCACA] hover:from-[#4BCACA] hover:to-[#3ABABA] text-black font-medium px-8 py-4 rounded-lg inline-flex items-center gap-2 shadow-lg shadow-[#5CDBDB]/20 transition-all duration-300"
                >
                  Get Started
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/login"
                  className="bg-gray-800/80 hover:bg-gray-700 text-white font-medium px-8 py-4 rounded-lg inline-block border border-gray-700 transition-colors duration-300"
                >
                  Login
                </Link>
              </motion.div>
            )}
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 1 }}
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2 cursor-pointer"
            onClick={scrollToNextSection}
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
              className="flex flex-col items-center"
            >
              <span className="text-sm text-gray-400 mb-2">Scroll to explore</span>
              <ChevronDown className="h-6 w-6 text-[#5CDBDB]" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section ref={statsRef} className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.7 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={isVisible ? { scale: 1 } : { scale: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 100,
                    delay: index * 0.1 + 0.2,
                  }}
                  className="text-4xl md:text-5xl font-bold text-[#5CDBDB] mb-2"
                >
                  {stat.value}
                </motion.div>
                <p className="text-gray-400">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section with Hover Effects */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="px-3 py-1 bg-gray-800 text-[#5CDBDB] rounded-full text-sm font-medium inline-block mb-4"
            >
              Platform Benefits
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl md:text-4xl font-bold mb-4"
            >
              Why <span className="text-[#5CDBDB]">blockHUNT</span>?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-gray-400 max-w-2xl mx-auto"
            >
              Join the premier platform for blockchain hackathons and connect with innovators building the decentralized
              future.
            </motion.p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              whileHover={{
                y: -10,
                boxShadow: "0 20px 25px -5px rgba(92, 219, 219, 0.1), 0 10px 10px -5px rgba(92, 219, 219, 0.04)",
              }}
              className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-xl p-8 hover:border-[#5CDBDB] transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-lg bg-[#5CDBDB]/10 flex items-center justify-center text-[#5CDBDB] mb-6">
                <Code size={28} />
              </div>
              <h3 className="text-xl font-bold mb-3">Build on Blockchain</h3>
              <p className="text-gray-400">
                Develop innovative solutions using blockchain technology and smart contracts. Access cutting-edge tools
                and resources.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              whileHover={{
                y: -10,
                boxShadow: "0 20px 25px -5px rgba(92, 219, 219, 0.1), 0 10px 10px -5px rgba(92, 219, 219, 0.04)",
              }}
              className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-xl p-8 hover:border-[#5CDBDB] transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-lg bg-[#5CDBDB]/10 flex items-center justify-center text-[#5CDBDB] mb-6">
                <Cpu size={28} />
              </div>
              <h3 className="text-xl font-bold mb-3">Connect with Developers</h3>
              <p className="text-gray-400">
                Join a global community of blockchain enthusiasts and developers. Collaborate on projects and share
                knowledge.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{
                y: -10,
                boxShadow: "0 20px 25px -5px rgba(92, 219, 219, 0.1), 0 10px 10px -5px rgba(92, 219, 219, 0.04)",
              }}
              className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-xl p-8 hover:border-[#5CDBDB] transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-lg bg-[#5CDBDB]/10 flex items-center justify-center text-[#5CDBDB] mb-6">
                <Layers size={28} />
              </div>
              <h3 className="text-xl font-bold mb-3">Win Prizes</h3>
              <p className="text-gray-400">
                Compete for substantial rewards and recognition in the blockchain space. Showcase your skills to
                potential employers.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works - Timeline Section */}
      <section ref={timelineRef} className="py-20 bg-black">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="px-3 py-1 bg-gray-900 text-[#5CDBDB] rounded-full text-sm font-medium inline-block mb-4"
            >
              Simple Process
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl md:text-4xl font-bold mb-4"
            >
              How It Works
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-gray-400 max-w-2xl mx-auto"
            >
              From registration to winning prizes, follow these simple steps to participate in blockHUNT hackathons.
            </motion.p>
          </div>

          <div className="max-w-4xl mx-auto">
            {timelineItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex mb-12 last:mb-0"
              >
                <div className="mr-4 flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-[#5CDBDB]/10 border border-[#5CDBDB]/30 flex items-center justify-center text-[#5CDBDB]">
                    {item.icon}
                  </div>
                  {index < timelineItems.length - 1 && (
                    <div className="w-0.5 h-full bg-gradient-to-b from-[#5CDBDB]/30 to-transparent mt-2"></div>
                  )}
                </div>
                <div className="pt-1">
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-gray-400">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Hackathons Section */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="px-3 py-1 bg-gray-800 text-[#5CDBDB] rounded-full text-sm font-medium inline-block mb-4"
            >
              Upcoming Events
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl md:text-4xl font-bold mb-4"
            >
              Featured Hackathons
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-gray-400 max-w-2xl mx-auto"
            >
              Check out these exciting blockchain hackathons and register to participate.
            </motion.p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {upcomingHackathons.map((hackathon, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{
                  y: -10,
                  boxShadow: "0 20px 25px -5px rgba(92, 219, 219, 0.1), 0 10px 10px -5px rgba(92, 219, 219, 0.04)",
                  borderColor: "#5CDBDB",
                }}
                className="bg-black border border-gray-800 rounded-xl overflow-hidden transition-all duration-300"
              >
                <div className="h-40 bg-gradient-to-r from-[#5CDBDB]/20 to-purple-500/20 flex items-center justify-center">
                  <Calendar className="h-16 w-16 text-[#5CDBDB]" />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-sm text-gray-400">{hackathon.date}</span>
                    <span className="text-sm font-medium text-[#5CDBDB]">{hackathon.prize}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-3">{hackathon.title}</h3>
                  <p className="text-gray-400 mb-4">
                    <Users className="inline-block h-4 w-4 mr-1" /> {hackathon.participants} participants expected
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {hackathon.tags.map((tag, tagIndex) => (
                      <span key={tagIndex} className="px-2 py-1 bg-gray-800 text-xs rounded-md text-gray-300">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <Link
                    to="/hackathons"
                    className="w-full bg-gray-800 hover:bg-gray-700 text-white font-medium py-2 rounded text-center inline-block transition-colors"
                  >
                    Learn More
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-center mt-12"
          >
            <Link
              to="/hackathons"
              className="inline-flex items-center gap-2 text-[#5CDBDB] hover:text-[#4BCACA] font-medium transition-colors"
            >
              View All Hackathons
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="px-3 py-1 bg-gray-900 text-[#5CDBDB] rounded-full text-sm font-medium inline-block mb-4"
            >
              Success Stories
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl md:text-4xl font-bold mb-4"
            >
              What Developers Say
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-gray-400 max-w-2xl mx-auto"
            >
              Hear from developers who have participated in blockHUNT hackathons.
            </motion.p>
          </div>

          <div className="max-w-4xl mx-auto relative">
            <div className="absolute top-10 left-0 w-20 h-20 rounded-full bg-[#5CDBDB]/10 blur-xl"></div>
            <div className="absolute bottom-10 right-0 w-20 h-20 rounded-full bg-purple-500/10 blur-xl"></div>

            <div className="relative bg-gray-900 border border-gray-800 rounded-xl p-8 md:p-10">
              <div className="flex justify-center mb-6">
                <div className="flex space-x-1">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveTestimonial(index)}
                      className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                        activeTestimonial === index ? "bg-[#5CDBDB]" : "bg-gray-700"
                      }`}
                      aria-label={`Go to testimonial ${index + 1}`}
                    />
                  ))}
                </div>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTestimonial}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="text-center"
                >
                  <div className="flex justify-center mb-6">
                    <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-[#5CDBDB]/30">
                      <img
                        src={testimonials[activeTestimonial].avatar || "/placeholder.svg"}
                        alt={testimonials[activeTestimonial].name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="mb-4">
                    <Star className="inline-block h-5 w-5 text-[#5CDBDB] fill-[#5CDBDB]" />
                    <Star className="inline-block h-5 w-5 text-[#5CDBDB] fill-[#5CDBDB]" />
                    <Star className="inline-block h-5 w-5 text-[#5CDBDB] fill-[#5CDBDB]" />
                    <Star className="inline-block h-5 w-5 text-[#5CDBDB] fill-[#5CDBDB]" />
                    <Star className="inline-block h-5 w-5 text-[#5CDBDB] fill-[#5CDBDB]" />
                  </div>
                  <p className="text-lg text-gray-300 italic mb-6">"{testimonials[activeTestimonial].content}"</p>
                  <h4 className="font-bold text-lg">{testimonials[activeTestimonial].name}</h4>
                  <p className="text-gray-400">{testimonials[activeTestimonial].role}</p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* Partners & Sponsors Section */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="px-3 py-1 bg-gray-800 text-[#5CDBDB] rounded-full text-sm font-medium inline-block mb-4"
            >
              Trusted By
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl md:text-4xl font-bold mb-4"
            >
              Our Partners & Sponsors
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-gray-400 max-w-2xl mx-auto"
            >
              blockHUNT is backed by leading companies and organizations in the blockchain industry.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
          >
            {[1, 2, 3, 4, 5, 6, 7, 8].map((_, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                whileHover={{ y: -5 }}
                className="bg-gray-800 rounded-lg h-24 flex items-center justify-center p-6"
              >
                <div className="w-full h-full bg-gray-700/50 rounded flex items-center justify-center text-[#5CDBDB]">
                  <span className="font-medium">Partner {index + 1}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-10 max-w-4xl mx-auto relative overflow-hidden"
          >
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-[#5CDBDB]/5 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-purple-500/5 blur-3xl"></div>

            <div className="relative z-10">
              <div className="text-center mb-8">
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="text-2xl md:text-3xl font-bold mb-4"
                >
                  Stay Updated with blockHUNT
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="text-gray-300 max-w-xl mx-auto"
                >
                  Subscribe to our newsletter to receive updates on upcoming hackathons, blockchain news, and community
                  events.
                </motion.p>
              </div>

              <motion.form
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto"
                onSubmit={(e) => e.preventDefault()}
              >
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-grow px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-[#5CDBDB]/50"
                  required
                />
                <button
                  type="submit"
                  className="bg-[#5CDBDB] hover:bg-[#4BCACA] text-black font-medium px-6 py-3 rounded-lg transition-colors"
                >
                  Subscribe
                </button>
              </motion.form>

              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="text-gray-400 text-sm text-center mt-4"
              >
                We respect your privacy. Unsubscribe at any time.
              </motion.p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="px-3 py-1 bg-gray-800 text-[#5CDBDB] rounded-full text-sm font-medium inline-block mb-4"
            >
              Questions & Answers
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl md:text-4xl font-bold mb-4"
            >
              Frequently Asked Questions
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-gray-400 max-w-2xl mx-auto"
            >
              Find answers to common questions about blockHUNT and blockchain hackathons.
            </motion.p>
          </div>

          <div className="max-w-3xl mx-auto">
            {[
              {
                question: "What is blockHUNT?",
                answer:
                  "blockHUNT is a platform that connects blockchain developers with hackathons and challenges. We provide a space for innovation, collaboration, and competition in the blockchain ecosystem.",
              },
              {
                question: "How do I participate in a hackathon?",
                answer:
                  "To participate in a hackathon, create an account on blockHUNT, browse the available hackathons, and register for the one that interests you. You can join as an individual or form a team with other participants.",
              },
              {
                question: "Do I need blockchain experience to join?",
                answer:
                  "While some blockchain knowledge is helpful, many hackathons welcome beginners. You can join as a designer, project manager, or in other roles that complement the technical aspects of blockchain development.",
              },
              {
                question: "How are hackathon winners selected?",
                answer:
                  "Hackathon winners are selected by a panel of judges based on criteria such as innovation, technical implementation, user experience, and potential impact. The specific judging criteria are provided for each hackathon.",
              },
              {
                question: "Can I organize my own hackathon on blockHUNT?",
                answer:
                  "Yes! Organizations and individuals can host their own hackathons on blockHUNT. Contact us through the platform to discuss your requirements and get started.",
              },
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="mb-6 last:mb-0"
              >
                <div className="bg-black border border-gray-800 rounded-lg p-6 hover:border-[#5CDBDB] transition-all duration-300">
                  <h3 className="text-xl font-bold mb-3">{faq.question}</h3>
                  <p className="text-gray-400">{faq.answer}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="text-center mt-10"
          >
            <Link
              to="/faq"
              className="inline-flex items-center gap-2 text-[#5CDBDB] hover:text-[#4BCACA] font-medium transition-colors"
            >
              View All FAQs
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Blog Preview Section */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="px-3 py-1 bg-gray-900 text-[#5CDBDB] rounded-full text-sm font-medium inline-block mb-4"
            >
              Latest Updates
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl md:text-4xl font-bold mb-4"
            >
              From Our Blog
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-gray-400 max-w-2xl mx-auto"
            >
              Stay informed with the latest news, tutorials, and insights from the blockchain world.
            </motion.p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "The Future of DeFi: Trends to Watch in 2025",
                excerpt:
                  "Explore the emerging trends in decentralized finance and how they're reshaping the financial landscape.",
                date: "March 15, 2025",
                category: "DeFi",
                image: "/placeholder.svg?height=200&width=400",
              },
              {
                title: "Building Your First Smart Contract: A Beginner's Guide",
                excerpt:
                  "Learn how to create, test, and deploy your first smart contract with this step-by-step tutorial.",
                date: "March 10, 2025",
                category: "Development",
                image: "/placeholder.svg?height=200&width=400",
              },
              {
                title: "How to Form the Perfect Hackathon Team",
                excerpt:
                  "Tips and strategies for assembling a balanced team that can tackle any blockchain hackathon challenge.",
                date: "March 5, 2025",
                category: "Hackathons",
                image: "/placeholder.svg?height=200&width=400",
              },
            ].map((post, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden hover:border-[#5CDBDB] transition-all duration-300"
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={post.image || "/placeholder.svg"}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-xs font-medium text-[#5CDBDB] bg-[#5CDBDB]/10 px-2 py-1 rounded">
                      {post.category}
                    </span>
                    <span className="text-xs text-gray-400">{post.date}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-3 hover:text-[#5CDBDB] transition-colors">
                    <Link to="/blog">{post.title}</Link>
                  </h3>
                  <p className="text-gray-400 mb-4 line-clamp-2">{post.excerpt}</p>
                  <Link
                    to="/blog"
                    className="inline-flex items-center gap-1 text-[#5CDBDB] hover:text-[#4BCACA] font-medium transition-colors text-sm"
                  >
                    Read More
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-center mt-10"
          >
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-[#5CDBDB] hover:text-[#4BCACA] font-medium transition-colors"
            >
              View All Articles
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CTA Section with Animated Background */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black"></div>

        {/* Animated particles */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-1/4 w-64 h-64 rounded-full bg-[#5CDBDB]/5 blur-3xl animate-pulse"></div>
          <div
            className="absolute bottom-20 right-1/4 w-64 h-64 rounded-full bg-purple-500/5 blur-3xl animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-2xl p-10 max-w-4xl mx-auto text-center shadow-xl shadow-black/50"
          >
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl md:text-4xl font-bold mb-4"
            >
              Ready to start your blockchain journey?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-gray-300 mb-8 max-w-2xl mx-auto"
            >
              Join blockHUNT today and connect with a community of innovators building the future of decentralized
              technology. Participate in hackathons, win prizes, and showcase your skills.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link
                to="/signup"
                className="group bg-gradient-to-r from-[#5CDBDB] to-[#4BCACA] hover:from-[#4BCACA] hover:to-[#3ABABA] text-black font-medium px-8 py-4 rounded-lg inline-flex items-center justify-center gap-2 shadow-lg shadow-[#5CDBDB]/10 transition-all duration-300"
              >
                Get Started
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/hackathons"
                className="bg-gray-800 hover:bg-gray-700 text-white font-medium px-8 py-4 rounded-lg inline-flex items-center justify-center gap-2 border border-gray-700 transition-colors duration-300"
              >
                Browse Hackathons
                <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer with Animation */}
      <footer className="border-t border-gray-800 py-12 bg-black">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            <div className="md:col-span-2">
              <Link to="/" className="text-2xl font-bold text-[#5CDBDB] mb-4 inline-block">
                blockHUNT
              </Link>
              <p className="text-gray-400 mb-6 max-w-md">
                The premier platform for blockchain hackathons. Connect, build, and innovate with developers from around
                the world.
              </p>
              <div className="flex space-x-4">
                <a
                  href="https://twitter.com/blockHUNT"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-[#5CDBDB]/20 hover:text-[#5CDBDB] transition-colors"
                >
                  <Twitter className="h-5 w-5" />
                </a>
                <a
                  href="https://github.com/blockHUNT"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-[#5CDBDB]/20 hover:text-[#5CDBDB] transition-colors"
                >
                  <Github className="h-5 w-5" />
                </a>
                <a
                  href="https://linkedin.com/company/blockHUNT"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-[#5CDBDB]/20 hover:text-[#5CDBDB] transition-colors"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-3">
                <li>
                  <Link to="/hackathons" className="text-gray-400 hover:text-[#5CDBDB] transition-colors">
                    Hackathons
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="text-gray-400 hover:text-[#5CDBDB] transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="/faq" className="text-gray-400 hover:text-[#5CDBDB] transition-colors">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-gray-400 hover:text-[#5CDBDB] transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Legal</h3>
              <ul className="space-y-3">
                <li>
                  <Link to="/terms" className="text-gray-400 hover:text-[#5CDBDB] transition-colors">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link to="/privacy" className="text-gray-400 hover:text-[#5CDBDB] transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="/cookies" className="text-gray-400 hover:text-[#5CDBDB] transition-colors">
                    Cookie Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm mb-4 md:mb-0">
              ©️ {new Date().getFullYear()} blockHUNT. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link to="/terms" className="text-gray-500 hover:text-[#5CDBDB] transition-colors text-sm">
                Terms
              </Link>
              <Link to="/privacy" className="text-gray-500 hover:text-[#5CDBDB] transition-colors text-sm">
                Privacy
              </Link>
              <Link to="/contact" className="text-gray-500 hover:text-[#5CDBDB] transition-colors text-sm">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage