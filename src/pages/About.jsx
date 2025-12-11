import React from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Globe,
  Users,
  Target,
  Briefcase,
  ShieldCheck,
  LineChart,
  HeartHandshake,
  Sparkles,
  Award,
  BookOpen,
  Cpu,
  Cloud,
  Zap,
} from "lucide-react";
import { motion } from "framer-motion";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import wwiLogo from "../assets/wwi-logo.webp";

export default function About() {
  const navigate = useNavigate();

  const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const cardHover = "hover:shadow-2xl hover:scale-[1.03] transition-all duration-300";

  return (
    <div className="flex flex-col min-h-screen bg-white text-black">
      <Header />

      {/* MAIN CONTENT */}
      <main className="flex-1 px-6 pt-20 sm:pt-28 pb-0">
        <div className="max-w-6xl mx-auto">
          {/* Back Button */}
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="show"
            className="flex justify-start mb-8"
          >
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 px-4 py-2 text-white transition-all rounded-lg shadow-md bg-black hover:bg-gray-800 hover:scale-[1.03] active:scale-[0.97]"
            >
              <ArrowLeft size={18} />
              <span className="text-sm font-medium sm:text-base">Back</span>
            </button>
          </motion.div>

          {/* Header Section */}
          <motion.section
            variants={fadeIn}
            initial="hidden"
            animate="show"
            className="p-8 bg-white border border-gray-200 shadow-xl rounded-2xl text-center"
          >
            <motion.img
              src={wwiLogo}
              alt="Work Wizards Innovations Logo"
              className="w-32 h-32 mx-auto mb-5 rounded-2xl border border-gray-200 shadow-lg"
              whileHover={{ rotate: 3, scale: 1.05 }}
            />

            <h1 className="text-4xl font-extrabold text-black mb-3">
              About Work Wizards Innovations (WWI)
            </h1>
            <p className="max-w-3xl mx-auto text-lg leading-relaxed text-black">
              <strong className="text-black">Work Wizards Innovations</strong> is a next-gen
              technology startup pioneering the integration of artificial intelligence and
              cloud-based innovation into real-world productivity. We believe in creating tools
              that empower individuals, teams, and organizations to think smarter, create faster,
              and collaborate better.
            </p>
            <a
              href="https://wwi.org.in"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-5 px-6 py-3 bg-black text-white font-medium rounded-full shadow-md hover:shadow-lg hover:scale-[1.02] transition-all"
            >
               Visit Official Website
            </a>
          </motion.section>

          {/* Viadocs Info */}
          <motion.section
            variants={fadeIn}
            initial="hidden"
            animate="show"
            className="mt-10 p-8 text-center bg-white border border-gray-200 rounded-2xl shadow-md"
          >
            <Briefcase className="w-10 h-10 mx-auto text-black" />
            <h2 className="text-3xl font-semibold text-black mt-3">
              Viadocs — AI-Powered Document Intelligence
            </h2>
            <p className="max-w-3xl mx-auto mt-3 text-black leading-relaxed">
              Viadocs is WWI’s flagship AI platform designed to revolutionize how people manage,
              create, and automate documents. From intelligent PDF tools to smart text generation
              and real-time cloud syncing — Viadocs brings simplicity and power together.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8">
              {[
                {
                  icon: <Cpu className="text-black w-8 h-8 mb-2" />,
                  title: "AI Automation",
                  desc: "Reduce manual work using smart AI-based document creation & editing.",
                },
                {
                  icon: <Cloud className="text-black w-8 h-8 mb-2" />,
                  title: "Cloud Powered",
                  desc: "Seamlessly store, sync, and manage your work securely from anywhere.",
                },
                {
                  icon: <Zap className="text-black w-8 h-8 mb-2" />,
                  title: "Smart Productivity",
                  desc: "Enhance efficiency with workflow automation and analytics.",
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.05 }}
                  className={`p-5 bg-white rounded-xl border border-gray-200 shadow-sm ${cardHover}`}
                >
                  {item.icon}
                  <h3 className="text-lg font-semibold text-black">
                    {item.title}
                  </h3>
                  <p className="text-sm text-black mt-1">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Mission, Vision, etc. */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            {[
              {
                icon: <Target className="text-black w-10 h-10 mb-3" />,
                title: "Our Mission",
                text: "To empower people with AI-driven tools that simplify document creation, management, and automation — making every workflow intelligent and seamless.",
              },
              {
                icon: <Globe className="text-black w-10 h-10 mb-3" />,
                title: "Our Vision",
                text: "To be a global leader in AI-powered productivity solutions, redefining how students, businesses, and enterprises work with information.",
              },
              {
                icon: <Users className="text-black w-10 h-10 mb-3" />,
                title: "Our Team",
                text: "A passionate collective of developers, designers, AI engineers, and innovators united by a single vision — smarter, faster, and sustainable digital growth.",
              },
              {
                icon: <HeartHandshake className="text-black w-10 h-10 mb-3" />,
                title: "Our Culture",
                text: "We value curiosity, collaboration, and creativity — blending technology with empathy to build solutions that make a difference.",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                variants={fadeIn}
                initial="hidden"
                animate="show"
                whileHover={{ scale: 1.03 }}
                className="flex flex-col items-center p-6 text-center bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-lg transition-all"
              >
                    {item.icon}
                    <h3 className="text-xl font-semibold text-black">
                  {item.title}
                </h3>
                    <p className="mt-2 text-black leading-relaxed text-sm sm:text-base">
                  {item.text}
                </p>
              </motion.div>
            ))}
          </section>

          {/* Values Section */}
          <section className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <ShieldCheck className="text-black w-8 h-8 mb-2" />,
                title: "Trust",
                desc: "We prioritize user security, data protection, and reliability.",
              },
              {
                icon: <Sparkles className="text-black w-8 h-8 mb-2" />,
                title: "Innovation",
                desc: "Continuous exploration of emerging AI technologies to stay ahead.",
              },
              {
                icon: <Award className="text-black w-8 h-8 mb-2" />,
                title: "Excellence",
                desc: "Delivering high-quality, scalable, and user-friendly solutions.",
              },
              {
                icon: <BookOpen className="text-black w-8 h-8 mb-2" />,
                title: "Learning",
                desc: "Encouraging curiosity, skill growth, and shared knowledge.",
              },
            ].map((v, i) => (
              <div
                key={i}
                className={`text-center bg-white border border-gray-200 rounded-xl p-6 ${cardHover}`}
              >
                {v.icon}
                  <h3 className="text-lg font-semibold text-black">
                  {v.title}
                </h3>
                  <p className="text-black text-sm mt-1">{v.desc}</p>
              </div>
            ))}
          </section>

          {/* Transparency */}
          <motion.section
            variants={fadeIn}
            initial="hidden"
            animate="show"
            className="mt-16 p-8 border border-gray-200 rounded-2xl bg-white shadow-sm hover:shadow-md"
          >
            <ShieldCheck className="w-10 h-10 mx-auto mb-3 text-black" />
            <h2 className="text-2xl font-semibold text-center text-black">
              Transparency, Privacy & Google AdSense Policy
            </h2>
            <p className="max-w-3xl mx-auto mt-3 text-black text-center leading-relaxed">
              Viadocs operates with full transparency, ensuring complete control and privacy for
              every user. We use <strong>Google Analytics 4</strong> to understand traffic trends
              and <strong>Google AdSense</strong> for ethical, non-intrusive ad monetization.
            </p>
            <p className="mt-2 text-center text-black">
              Read our{" "}
              <span
                className="text-black hover:underline cursor-pointer font-medium"
                onClick={() => navigate("/privacy-policy")}
              >
                Privacy Policy
              </span>{" "}
              for full details.
            </p>
          </motion.section>

          {/* Innovation Commitment */}
          <motion.section
            variants={fadeIn}
            initial="hidden"
            animate="show"
            className="p-8 mt-12 text-center border border-[#1EC6D7]/30 rounded-xl bg-white hover:shadow-md hover:bg-gradient-to-br hover:from-[#EAF6FF] hover:to-[#E4E1FF] transition-all"
          >
            <LineChart className="w-10 h-10 mx-auto mb-3 text-black" />
            <h2 className="text-3xl font-semibold text-black">
              Our Commitment to Responsible AI
            </h2>
            <p className="max-w-3xl mx-auto mt-2 text-black leading-relaxed">
              At WWI, we explore AI with a human-first approach — ensuring fairness, transparency,
              and responsibility in every product we design. Viadocs continues to evolve as a
              secure, accessible, and future-ready document ecosystem.
            </p>
          </motion.section>

          {/* Footer Tagline */}
          <div className="mt-16 text-center pb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-black">
              “Empowering Productivity Through AI — The Future is Viadocs.”
            </h2>
            <p className="mt-2 text-black">
              Join us in transforming the way people create, collaborate, and innovate.
            </p>
          </div>
        </div>
      </main>


     
      <Footer />
    </div>
  );
}
