"use client"

import React from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { Code, Users, Trophy, Target, ArrowRight, Github, Twitter, Linkedin } from 'lucide-react'

const AboutPage = () => {
    
      <h1>About BlockHunt</h1>
  // Team members data
  const teamMembers = [
    {
      name: "Alex Johnson",
      role: "Founder & CEO",
      bio: "Blockchain enthusiast with 10+ years of experience in software development and entrepreneurship.",
      image: "/placeholder.svg?height=300&width=300"
    },
    {
      name: "Sarah Chen",
      role: "CTO",
      bio: "Former lead developer at Ethereum Foundation with expertise in smart contract security and scalability.",
      image: "/placeholder.svg?height=300&width=300"
    },
    {
      name: "Michael Rodriguez",
      role: "Head of Operations",
      bio: "Experienced operations leader with a background in organizing tech events and hackathons globally.",
      image: "/placeholder.svg?height=300&width=300"
    },
    {
      name: "Emily Nakamoto",
      role: "Community Manager",
      bio: "Community building expert who has grown several blockchain communities from the ground up.",
      image: "/placeholder.svg?height=300&width=300"
    }
  ]

  // Values data
  const values = [
    {
      title: "Innovation",
      description: "We believe in pushing the boundaries of what's possible with blockchain technology.",
      icon: <Code className="h-6 w-6" />
    },
    {
      title: "Community",
      description: "We foster an inclusive environment where developers of all backgrounds can thrive.",
      icon: <Users className="h-6 w-6" />
    },
    {
      title: "Excellence",
      description: "We strive for excellence in everything we do, from platform development to hackathon organization.",
      icon: <Trophy className="h-6 w-6" />
    },
    {
      title: "Impact",
      description: "We're committed to making a positive impact on the blockchain ecosystem and beyond.",
      icon: <Target className="h-6 w-6" />
    }
  ]

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Header would go here */}
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="absolute top-20 left-20 w-64 h-64 rounded-full bg-[#5CDBDB]/10 blur-3xl"></div>
            <div className="absolute bottom-20 right-20 w-80 h-80 rounded-full bg-purple-500/10 blur-3xl"></div>
            
            {/* Animated grid pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.7)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.7)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_70%,transparent_100%)] opacity-20"></div>
          </div>

          <div className="container mx-auto px-6 relative z-10">
            <div className="text-center mb-16">
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="px-3 py-1 bg-gradient-to-r from-[#5CDBDB]/20 to-[#5CDBDB]/10 text-[#5CDBDB] rounded-full text-sm font-medium border border-[#5CDBDB]/20 inline-block mb-4"
              >
                Our Story
              </motion.span>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-4xl md:text-5xl font-bold mb-6"
              >
                About <span className="text-[#5CDBDB]">blockHUNT</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-xl text-gray-400 max-w-2xl mx-auto"
              >
                Building the future of blockchain hackathons and developer communities.
              </motion.p>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-20 bg-gray-900">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
                <p className="text-gray-400 mb-6 text-lg">
                  At blockHUNT, our mission is to accelerate blockchain innovation by connecting talented developers with exciting hackathon opportunities.
                </p>
                <p className="text-gray-400 mb-6">
                  We believe that hackathons are the perfect environment for rapid innovation, collaboration, and learning. By providing a platform that makes it easy to discover, participate in, and organize blockchain hackathons, we're helping to build the future of decentralized technology.
                </p>
                <p className="text-gray-400">
                  Our goal is to foster a global community of blockchain developers who can share knowledge, build groundbreaking projects, and push the boundaries of what's possible with blockchain technology.
                </p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="relative"
              >
                <div className="absolute top-10 left-10 w-64 h-64 rounded-full bg-[#5CDBDB]/5 blur-3xl"></div>
                <div className="absolute bottom-10 right-10 w-64 h-64 rounded-full bg-purple-500/5 blur-3xl"></div>
                
                <div className="relative bg-black border border-gray-800 rounded-xl overflow-hidden">
                  <img
                    src="/placeholder.svg?height=400&width=600"
                    alt="blockHUNT Mission"
                    className="w-full h-auto"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-20 bg-black">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="text-3xl font-bold mb-6"
                >
                  Our Story
                </motion.h2>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="w-20 h-1 bg-[#5CDBDB] mx-auto mb-6"
                ></motion.div>
              </div>
              
              <div className="space-y-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <h3 className="text-xl font-bold mb-3 text-[#5CDBDB]">The Beginning</h3>
                  <p className="text-gray-400">
                    blockHUNT was founded in 2022 by a group of blockchain developers who were frustrated with the fragmented nature of the hackathon ecosystem. After participating in numerous hackathons themselves, they saw an opportunity to create a dedicated platform that would make it easier for developers to discover and participate in blockchain hackathons.
                  </p>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <h3 className="text-xl font-bold mb-3 text-[#5CDBDB]">Growth & Evolution</h3>
                  <p className="text-gray-400">
                    What started as a simple hackathon listing site quickly evolved into a comprehensive platform for the blockchain community. We added features for team formation, project submission, judging, and more. As our user base grew, we expanded our team and raised funding to accelerate our development.
                  </p>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <h3 className="text-xl font-bold mb-3 text-[#5CDBDB]">Where We Are Today</h3>
                  <p className="text-gray-400">
                    Today, blockHUNT is the leading platform for blockchain hackathons, with thousands of developers and dozens of hackathon organizers using our platform each month. We've helped facilitate over $500,000 in prize money and have seen numerous successful projects emerge from hackathons hosted on our platform.
                  </p>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <h3 className="text-xl font-bold mb-3 text-[#5CDBDB]">Looking Forward</h3>
                  <p className="text-gray-400">
                    We're just getting started. Our vision is to create the most vibrant and innovative blockchain developer community in the world. We're constantly improving our platform, adding new features, and exploring ways to better serve our users. We're excited about the future of blockchain technology and the role that hackathons will play in its development.
                  </p>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
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
                What We Stand For
              </motion.span>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-3xl font-bold mb-4"
              >
                Our Values
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-gray-400 max-w-2xl mx-auto"
              >
                These core principles guide everything we do at blockHUNT.
              </motion.p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -10, boxShadow: "0 20px 25px -5px rgba(92, 219, 219, 0.1), 0 10px 10px -5px rgba(92, 219, 219, 0.04)" }}
                  className="bg-black border border-gray-800 rounded-xl p-8 hover:border-[#5CDBDB] transition-all duration-300"
                >
                  <div className="w-14 h-14 rounded-lg bg-[#5CDBDB]/10 flex items-center justify-center text-[#5CDBDB] mb-6">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                  <p className="text-gray-400">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
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
                Meet The Team
              </motion.span>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-3xl font-bold mb-4"
              >
                The People Behind blockHUNT
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-gray-400 max-w-2xl mx-auto"
              >
                Our diverse team of blockchain enthusiasts, developers, and community builders.
              </motion.p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
              {teamMembers.map((member, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden group"
                >
                  <div className="h-64 overflow-hidden">
                    <img
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                    <p className="text-[#5CDBDB] mb-3">{member.role}</p>
                    <p className="text-gray-400 text-sm">{member.bio}</p>
                    <div className="mt-4 flex space-x-3">
                      <a
                        href="#"
                        className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-[#5CDBDB]/20 hover:text-[#5CDBDB] transition-colors"
                      >
                        <Twitter className="h-4 w-4" />
                      </a>
                      <a
                        href="#"
                        className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-[#5CDBDB]/20 hover:text-[#5CDBDB] transition-colors"
                      >
                        <Linkedin className="h-4 w-4" />
                      </a>
                      <a
                        href="#"
                        className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-[#5CDBDB]/20 hover:text-[#5CDBDB] transition-colors"
                      >
                        <Github className="h-4 w-4" />
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <div className="text-center mt-12">
              <p className="text-gray-400 mb-6">
                We're always looking for talented individuals to join our team.
              </p>
              <Link
                to="/careers"
                className="inline-flex items-center gap-2 text-[#5CDBDB] hover:text-[#4BCACA] font-medium transition-colors"
              >
                View Open Positions
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 bg-gray-900">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
              {[
                { value: "50+", label: "Hackathons Completed" },
                { value: "5,000+", label: "Registered Developers" },
                { value: "$500K+", label: "Prize Money Awarded" },
                { value: "300+", label: "Projects Launched" }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
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
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-black">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-2xl p-10 max-w-4xl mx-auto text-center relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-[#5CDBDB]/5 blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-purple-500/5 blur-3xl"></div>
              
              <div className="relative z-10">
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="text-3xl font-bold mb-4"
                >
                  Join the blockHUNT Community
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="text-gray-300 mb-8 max-w-2xl mx-auto"
                >
                  Whether you're a seasoned blockchain developer or just getting started, there's a place for you in our community. Join us and be part of the future of blockchain innovation.
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
                    Join Now
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link
                    to="/hackathons"
                    className="bg-gray-800 hover:bg-gray-700 text-white font-medium px-8 py-4 rounded-lg inline-flex items-center justify-center gap-2 border border-gray-700 transition-colors duration-300"
                  >
                    Explore Hackathons
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Footer would go here */}
    </div>
    
  )
}

export default AboutPage