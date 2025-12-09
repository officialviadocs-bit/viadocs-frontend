import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Search,
  ChevronDown,
  ChevronUp,
  MessageCircle,
  HelpCircle,
  ShieldCheck,
  BookOpen,
  Lightbulb,
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

export default function HelpCenter() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [openIndex, setOpenIndex] = useState(null);

  // FAQ content
  const faqs = [
    {
      q: "How can I create a new document in Viadocs?",
      a: "Click 'Create Doc' on the homepage or Tools page. Choose your preferred format and begin editing instantly using Viadocs' AI-powered smart editor.",
    },
    {
      q: "Can I edit or modify PDF files?",
      a: "Yes! Viadocs allows you to annotate, merge, compress, and edit PDFs online directly through our browser-based PDF tools — fast, secure, and watermark-free.",
    },
    {
      q: "How do I reset my password?",
      a: "From the Login page, click 'Forgot Password', enter your email, and follow the secure link sent to reset your password instantly.",
    },
    {
      q: "Is Viadocs free to use?",
      a: "Absolutely! Viadocs offers free access to major document tools. Premium AI features are available for users who want advanced automation and cloud integrations.",
    },
    {
      q: "How can I contact the Viadocs support team?",
      a: "Visit our Contact page or email us directly at official@wwi.org.in. Our support team typically responds within 24–48 hours.",
    },
  ];

  const filteredFaqs = faqs.filter((f) =>
    f.q.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-[#EAF6FF] via-[#F3F8FF] to-[#E4E1FF] text-gray-800">
      <Header />

      <main className="flex-1 px-6 pb-0 pt-20 sm:pt-28">
        <div className="max-w-6xl mx-auto">
          {/* Back Button */}
          <div className="flex justify-start mb-8">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 px-4 py-2 text-white transition-all rounded-lg shadow-md bg-gradient-to-r from-[#4066E0] to-[#1EC6D7] hover:opacity-90 hover:scale-[1.03]"
            >
              <ArrowLeft size={18} />
              <span className="text-sm font-medium sm:text-base">Back</span>
            </button>
          </div>

          {/* Header Section */}
          <div className="mb-10 text-center">
            <HelpCircle className="w-12 h-12 mx-auto mb-4 text-[#4066E0]" />
            <h1 className="text-3xl font-extrabold text-[#4066E0] sm:text-4xl">
              Help <span className="text-[#1EC6D7]">Center</span>
            </h1>
            <p className="max-w-2xl mx-auto mt-3 text-gray-600">
              Need assistance? Explore FAQs, tutorials, and guidance to help
              you make the most of <strong>Viadocs</strong>.
            </p>
          </div>

          {/* Search Bar */}
          <div className="flex justify-center mb-12">
            <div className="relative w-full max-w-lg">
              <Search
                className="absolute text-[#4066E0] left-3 top-3"
                size={20}
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search help topics — e.g. 'PDF', 'Login', 'AI Tools'"
                className="w-full py-3 pl-10 pr-4 bg-white border border-[#1EC6D7]/40 rounded-lg shadow-sm focus:ring-2 focus:ring-[#4066E0] focus:border-transparent"
              />
            </div>
          </div>

          {/* FAQ Section */}
          <div className="space-y-4">
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((faq, i) => (
                <div
                  key={i}
                  className="transition-all border border-[#1EC6D7]/30 shadow-md bg-white/80 backdrop-blur-md rounded-xl hover:shadow-lg"
                >
                  <button
                    onClick={() => setOpenIndex(openIndex === i ? null : i)}
                    className="flex justify-between w-full px-5 py-4 text-left"
                  >
                    <h3 className="text-lg font-semibold text-gray-800">
                      {faq.q}
                    </h3>
                    {openIndex === i ? (
                      <ChevronUp className="text-[#4066E0]" />
                    ) : (
                      <ChevronDown className="text-[#4066E0]" />
                    )}
                  </button>
                  {openIndex === i && (
                    <div className="px-5 pb-4 text-gray-700 border-t border-[#1EC6D7]/30">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500">
                No results found for your search.
              </p>
            )}
          </div>

          {/* Inline ad after FAQ list */}
          <div className="flex justify-center my-8">
            <AdPlaceholder className="w-full max-w-3xl" />
          </div>

          {/* Knowledge Section */}
          <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-3">
            <div className="p-6 border border-[#1EC6D7]/30 bg-[#EAF6FF]/70 rounded-xl shadow-sm hover:shadow-md transition-all text-center">
              <BookOpen className="w-8 h-8 mx-auto mb-3 text-[#4066E0]" />
              <h3 className="font-semibold text-[#4066E0] mb-2">
                Getting Started
              </h3>
              <p className="text-sm text-gray-600">
                Learn how to create, edit, and manage documents in Viadocs with
                our quick start tutorials.
              </p>
            </div>
            <div className="p-6 border border-[#1EC6D7]/30 bg-[#EAF6FF]/70 rounded-xl shadow-sm hover:shadow-md transition-all text-center">
              <Lightbulb className="w-8 h-8 mx-auto mb-3 text-[#1EC6D7]" />
              <h3 className="font-semibold text-[#4066E0] mb-2">
                Tips & Tricks
              </h3>
              <p className="text-sm text-gray-600">
                Discover productivity shortcuts, advanced AI tools, and best
                practices for seamless document work.
              </p>
            </div>
            <div className="p-6 border border-[#1EC6D7]/30 bg-[#EAF6FF]/70 rounded-xl shadow-sm hover:shadow-md transition-all text-center">
              <ShieldCheck className="w-8 h-8 mx-auto mb-3 text-[#6A3FD7]" />
              <h3 className="font-semibold text-[#4066E0] mb-2">
                Account & Security
              </h3>
              <p className="text-sm text-gray-600">
                Learn how we protect your account and data using secure
                encryption, authentication, and privacy standards.
              </p>
            </div>
          </div>

          {/* Contact Support */}
          <div className="p-10 mt-16 text-center border border-[#1EC6D7]/30 shadow-xl bg-white/80 rounded-2xl backdrop-blur-md hover:shadow-2xl transition-all">
            <h2 className="text-2xl font-bold text-[#4066E0] mb-2">
              Still Need Help? 💬
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Can’t find what you’re looking for? Our support team is available
              24/7 to guide you through any issue or question.
            </p>
            <button
              onClick={() => navigate("/contact")}
              className="inline-flex items-center gap-2 px-6 py-3 mt-5 font-medium text-white transition-transform rounded-full bg-gradient-to-r from-[#4066E0] to-[#1EC6D7] hover:scale-[1.05] hover:shadow-lg"
            >
              <MessageCircle size={18} />
              Contact Support
            </button>
          </div>

          {/* Transparency & SEO Section */}
          <div className="p-8 mt-12 text-center border border-[#1EC6D7]/20 rounded-xl bg-gradient-to-br from-[#EAF6FF]/60 to-[#EAE4FF]/60">
            <ShieldCheck className="w-10 h-10 mx-auto mb-3 text-[#4066E0]" />
            <h3 className="text-xl font-semibold text-[#4066E0] mb-3">
              Transparency, Security & AdSense Compliance
            </h3>
            <p className="max-w-3xl mx-auto text-gray-600 text-sm leading-relaxed">
              Viadocs prioritizes your privacy, safety, and user satisfaction.
              Our platform follows Google AdSense, GDPR, and CCPA guidelines to
              ensure complete transparency in how data is used.
              For details about cookies, analytics, and advertising partners,
              please visit our{" "}
              <span
                className="text-[#4066E0] hover:underline cursor-pointer"
                onClick={() => navigate("/privacy-policy")}
              >
                Privacy Policy
              </span>
              .
            </p>
          </div>

          {/* Closing Line */}
          <div className="mt-14 text-center">
            <h2 className="text-2xl font-bold text-[#4066E0]">
              “Empowering Productivity Through Knowledge — The Viadocs Way.”
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Your curiosity drives our innovation. Explore. Learn. Create. 🚀
            </p>
          </div>
        </div>
      </main>

      {/* Right-side hanging ad */}
      <div className="pointer-events-none">
        <AdPlaceholder className="hidden lg:block fixed right-4 top-1/3 z-50 w-48 pointer-events-auto" />
      </div>

      {/* Ad above footer */}
      <div className="w-full bg-transparent flex justify-center py-6">
        <AdPlaceholder className="w-full max-w-7xl" />
      </div>

      <Footer />
    </div>
  );
}
