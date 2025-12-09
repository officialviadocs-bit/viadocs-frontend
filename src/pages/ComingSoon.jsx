import React, { useRef, useEffect } from "react";
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

// Ad placeholder component
function AdPlaceholder({ className = "" }) {
  const wrapperRef = useRef(null);
  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;
    const script = document.createElement("script");
    script.async = true;
    script.setAttribute("data-cfasync", "false");
    script.src = "//pl27986002.effectivegatecpm.com/c152ce441ed68e2ebb08bdbddefa4fac/invoke.js";
    wrapper.appendChild(script);
    const container = document.createElement("div");
    container.id = "container-c152ce441ed68e2ebb08bdbddefa4fac";
    wrapper.appendChild(container);
    return () => { if (wrapper) wrapper.innerHTML = ""; };
  }, []);
  return <div ref={wrapperRef} className={className} aria-hidden="true" />;
}

export default function ComingSoon() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-[#EAF6FF] via-[#F3F8FF] to-[#E4E1FF] text-gray-800">
      <Header />

      <main className="flex flex-col items-center justify-center flex-1 px-6 text-center py-10">
        {/* Card Container */}
        <div className="w-full max-w-3xl p-10 bg-white border border-[#1EC6D7]/30 shadow-xl rounded-2xl backdrop-blur-sm">
          {/* Icon */}
          <div className="flex flex-col items-center space-y-6">
            <div className="p-6 rounded-full shadow-lg bg-gradient-to-br from-[#4066E0] via-[#1EC6D7] to-[#6A3FD7] animate-pulse">
              <Clock size={48} className="text-white" />
            </div>

            {/* Title */}
            <h1 className="text-3xl font-extrabold text-[#4066E0] sm:text-4xl">
              A New Viadocs Feature is Coming Soon 🚀
            </h1>

            {/* Subtitle */}
            <p className="max-w-md text-base leading-relaxed text-gray-600 sm:text-lg">
              We're working hard behind the scenes to bring you something truly
              <strong className="text-[#4066E0]"> innovative, intelligent</strong>,
              and <strong className="text-[#1EC6D7]">beautifully simple</strong>.  
              Your Viadocs experience is about to reach the next level!
            </p>

            {/* Animated Progress Bar */}
            <div className="w-56 h-2 mt-6 overflow-hidden bg-gray-200 rounded-full">
              <div className="w-1/3 h-full bg-gradient-to-r from-[#4066E0] via-[#1EC6D7] to-[#6A3FD7] animate-[progress_2s_ease-in-out_infinite]" />
            </div>

            {/* About Section */}
            <div className="mt-10 text-gray-700 leading-relaxed space-y-3 max-w-xl">
              <h2 className="text-2xl font-semibold text-[#4066E0] flex items-center justify-center gap-2">
                <Info className="w-5 h-5 text-[#1EC6D7]" /> What’s Coming?
              </h2>
              <p>
                The new feature integrates{" "}
                <strong className="text-[#1EC6D7]">AI-powered document
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
              <div className="p-4 rounded-xl border border-[#1EC6D7]/30 bg-[#EAF6FF]/70 hover:shadow-md transition-all">
                <Sparkles className="mx-auto mb-2 text-[#4066E0]" size={28} />
                <h3 className="font-semibold text-gray-800">
                  Smarter AI Tools
                </h3>
                <p className="text-xs text-gray-600">
                  Experience next-level AI for faster document creation and
                  editing.
                </p>
              </div>
              <div className="p-4 rounded-xl border border-[#1EC6D7]/30 bg-[#EAF6FF]/70 hover:shadow-md transition-all">
                <Rocket className="mx-auto mb-2 text-[#1EC6D7]" size={28} />
                <h3 className="font-semibold text-gray-800">Lightning Fast</h3>
                <p className="text-xs text-gray-600">
                  Designed to make your document workflow smoother and faster.
                </p>
              </div>
              <div className="p-4 rounded-xl border border-[#1EC6D7]/30 bg-[#EAF6FF]/70 hover:shadow-md transition-all">
                <Wrench className="mx-auto mb-2 text-[#6A3FD7]" size={28} />
                <h3 className="font-semibold text-gray-800">Enhanced Tools</h3>
                <p className="text-xs text-gray-600">
                  Better control, more features, and easier collaboration across
                  devices.
                </p>
              </div>
            </div>

            {/* CTA Section */}
            <div className="mt-10">
              <h3 className="text-lg font-semibold text-[#4066E0] mb-3">
                Want Early Access? 🔔
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                Subscribe to our newsletter and be the first to know when this
                feature launches!
              </p>
              <button
                onClick={() => navigate("/contact")}
                className="flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold text-white rounded-full shadow-md bg-gradient-to-r from-[#4066E0] to-[#1EC6D7] hover:scale-[1.03] hover:shadow-lg transition-all"
              >
                <Mail size={16} /> Join the Waitlist
              </button>
            </div>

            {/* Back Buttons */}
            <div className="flex flex-col gap-4 mt-10 sm:flex-row">
              <button
                onClick={() => navigate(-1)}
                className="flex items-center justify-center gap-2 px-5 py-2 text-sm font-medium text-gray-700 transition-all bg-gray-100 border border-gray-300 rounded-full hover:bg-gray-200"
              >
                <ArrowLeft size={16} />
                Go Back
              </button>

              <button
                onClick={() => navigate("/")}
                className="px-6 py-2 text-sm font-semibold text-white transition-transform rounded-full shadow-md bg-gradient-to-r from-[#4066E0] via-[#1EC6D7] to-[#6A3FD7] hover:scale-105"
              >
                Back to Home
              </button>
            </div>

            {/* Footer Note */}
            <div className="mt-10 text-sm text-gray-500">
              <p>
                Developed by{" "}
                <strong className="text-[#4066E0]">
                  Work Wizards Innovations
                </strong>{" "}
                — building smarter AI-powered tools for modern creators.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Ad above footer */}
      <div className="w-full bg-transparent flex justify-center py-6">
        <AdPlaceholder className="w-full max-w-7xl" />
      </div>

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
