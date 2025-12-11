import React from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Clock,
  Sparkles,
  Rocket,
  Wrench,
  Mail,
  Info,
} from "lucide-react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

export default function ComingSoon() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-white text-black">
      <Header />

      <main className="flex flex-col items-center justify-center flex-1 px-6 text-center py-10">
        {/* Card Container */}
        <div className="w-full max-w-3xl p-10 bg-white border border-gray-200 shadow-xl rounded-2xl backdrop-blur-sm">
          {/* Icon */}
          <div className="flex flex-col items-center space-y-6">
            <div className="p-6 rounded-full shadow-lg bg-black animate-pulse">
              <Clock size={48} className="text-white" />
            </div>

            {/* Title */}
            <h1 className="text-3xl font-extrabold text-black sm:text-4xl">
              A New Viadocs Feature is Coming Soon 
            </h1>

            {/* Subtitle */}
            <p className="max-w-md text-base leading-relaxed text-gray-600 sm:text-lg">
              We're working hard behind the scenes to bring you something truly
              <strong className="text-black"> innovative, intelligent</strong>,
              and <strong className="text-black">beautifully simple</strong>.  
              Your Viadocs experience is about to reach the next level!
            </p>

            {/* Animated Progress Bar */}
            <div className="w-56 h-2 mt-6 overflow-hidden bg-gray-200 rounded-full">
              <div className="w-1/3 h-full bg-black animate-[progress_2s_ease-in-out_infinite]" />
            </div>

            {/* About Section */}
            <div className="mt-10 text-gray-700 leading-relaxed space-y-3 max-w-xl">
              <h2 className="text-2xl font-semibold text-black flex items-center justify-center gap-2">
                <Info className="w-5 h-5 text-black" /> What's Coming?
              </h2>
              <p>
                The new feature integrates{" "}
                <strong className="text-black">AI-powered document
                intelligence</strong> into your workflow — helping you create,
                manage, and share smarter than ever before. Whether you’re a
                student, professional, or creator, this update will save time
                and boost your productivity.
              </p>
              <p>
                Expect enhancements to <strong>automation, file security</strong>,
                and <strong>AI document generation</strong> — designed for
                simplicity, speed, and trust.
              </p>
            </div>

            {/* Highlights Section */}
            <div className="grid grid-cols-1 gap-6 mt-10 sm:grid-cols-3">
              <div className="p-4 rounded-xl border border-gray-200 bg-white hover:shadow-md transition-all">
                <Sparkles className="mx-auto mb-2 text-black" size={28} />
                <h3 className="font-semibold text-black">
                  Smarter AI Tools
                </h3>
                <p className="text-xs text-gray-600">
                  Experience next-level AI for faster document creation and
                  editing.
                </p>
              </div>
              <div className="p-4 rounded-xl border border-gray-200 bg-white hover:shadow-md transition-all">
                <Rocket className="mx-auto mb-2 text-black" size={28} />
                <h3 className="font-semibold text-black">Lightning Fast</h3>
                <p className="text-xs text-gray-600">
                  Designed to make your document workflow smoother and faster.
                </p>
              </div>
              <div className="p-4 rounded-xl border border-gray-200 bg-white hover:shadow-md transition-all">
                <Wrench className="mx-auto mb-2 text-black" size={28} />
                <h3 className="font-semibold text-black">Enhanced Tools</h3>
                <p className="text-xs text-gray-600">
                  Better control, more features, and easier collaboration across
                  devices.
                </p>
              </div>
            </div>

            {/* CTA Section */}
            <div className="mt-10">
              <h3 className="text-lg font-semibold text-black mb-3">
                Want Early Access? 
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                Subscribe to our newsletter and be the first to know when this
                feature launches!
              </p>
              <button
                onClick={() => navigate("/contact")}
                className="flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold text-white rounded-full shadow-md bg-black hover:bg-gray-800 hover:scale-[1.03] hover:shadow-lg transition-all"
              >
                <Mail size={16} /> Join the Waitlist
              </button>
            </div>

            {/* Back Buttons */}
            <div className="flex flex-col gap-4 mt-10 sm:flex-row">
              <button
                onClick={() => navigate(-1)}
                className="flex items-center justify-center gap-2 px-5 py-2 text-sm font-medium text-black transition-all bg-white border border-gray-300 rounded-full hover:bg-gray-100"
              >
                <ArrowLeft size={16} />
                Go Back
              </button>

              <button
                onClick={() => navigate("/")}
                className="px-6 py-2 text-sm font-semibold text-white transition-transform rounded-full shadow-md bg-black hover:bg-gray-800 hover:scale-105"
              >
                Back to Home
              </button>
            </div>

            {/* Footer Note */}
            <div className="mt-10 text-sm text-gray-500">
              <p>
                Developed by{" "}
                <strong className="text-black">
                  Work Wizards Innovations
                </strong>{" "}
                — building smarter AI-powered tools for modern creators.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />

      {/* Animation Keyframes */}
      <style>{`
        @keyframes progress {
          0% { transform: translateX(-100%); }
          50% { transform: translateX(0%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
}
