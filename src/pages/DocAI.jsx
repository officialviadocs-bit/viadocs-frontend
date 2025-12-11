import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Cpu, ArrowLeft, Mail } from "lucide-react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import axios from "axios";



export default function DocAI() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) return alert("Please enter a valid email");
    setLoading(true);
    setSuccess(false);

    try {
      const res = await axios.post("http://viadocs.in//api/docai/early-access", { email });
      if (res.status === 200) {
        setSuccess(true);
        setEmail("");
      } else {
        console.warn('Early-access endpoint responded:', res.status, res.data);
      }
    } catch (err) {
      console.error("Error:", err);
      alert("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <section className="bg-gray-100 py-3 text-center text-sm font-medium text-gray-700">
        Docxy AI Beta launching soon — Join the waitlist for early access!
      </section>

      <main className="flex-1 px-3 sm:px-6 py-10 animate-fadeIn bg-white">
        <div className="flex flex-col max-w-6xl mx-auto md:flex-row md:items-start md:justify-start">
          <div className="w-full md:w-[80%] lg:w-[70%]">

            {/* Back button */}
            <div className="mb-8">
              <button
                onClick={() => navigate("/home")}
                className="flex items-center gap-2 px-4 py-2 text-white transition-all rounded-lg shadow-md bg-black hover:bg-gray-800 hover:scale-[1.03]"
              >
                <ArrowLeft size={18} />
                <span className="text-sm font-medium sm:text-base">
                  Back 
                </span>
              </button>
            </div>

            {/* Main Card */}
            <div className="p-6 sm:p-10 border border-gray-200 shadow-xl bg-white rounded-2xl">
              <div className="flex flex-col items-center mb-8">
                <div className="flex items-center justify-center mb-4 bg-black rounded-full w-14 h-14 shadow-md">
                  <Cpu className="w-8 h-8 text-white" />
                </div>
                <h1 className="text-3xl font-extrabold text-black">
                  Docxy — Coming Soon
                </h1>
                <p className="max-w-md mt-2 text-center text-gray-600">
                  Smart document creation powered by AI — we’re perfecting your next-gen writing assistant.
                </p>
              </div>

              <div className="grid gap-10 md:grid-cols-2">
                {/* Left Section */}
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-gray-800">What to expect</h3>
                  <ul className="text-gray-600 list-disc list-inside">
                    <li>AI-powered document drafting and rewriting</li>
                    <li>Auto-formatting, summarization, and highlights</li>
                    <li>Image-aware editing and contextual suggestions</li>
                    <li>Smart references and export-ready outputs</li>
                  </ul>
                </div>

                {/* Right Section */}
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-gray-800">Want early access?</h3>
                  <p className="text-sm text-gray-600">
                    Leave your email and we’ll notify you when DocAI launches.
                  </p>
                  <form
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-3 mt-2"
                    autoComplete="off"
                  >
                    <div className="relative">
                      <Mail className="absolute text-black left-3 top-3" size={18} />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@company.com"
                        required
                        className="w-full px-10 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black text-gray-700"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="px-4 py-2 font-semibold text-white rounded-full shadow-md transition-all bg-black hover:bg-gray-800 disabled:opacity-60"
                    >
                      {loading ? "Submitting..." : "Request Access"}
                    </button>

                    {success && (
                      <p className="text-sm text-center text-green-600">
                        ✅ Request submitted! We’ll notify you once DocAI is live.
                      </p>
                    )}
                  </form>
                </div>
              </div>

              <div className="mt-10 text-sm text-center text-gray-500">
                Estimated launch:{" "}
                <span className="font-semibold text-black">Q4 2025</span>
              </div>
            </div>
          </div>
        </div>
      </main>


      {/* ===== About Docxy AI Section ===== */}
      <section className="py-16 bg-white text-center border-t border-gray-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-800 mb-6">
            Meet <span className="text-black">Docxy AI</span> — The Future of Smart Documentation
          </h2>
          <p className="text-gray-600 text-base sm:text-lg leading-relaxed mb-8">
            Docxy is an upcoming AI-powered assistant by Viadocs designed to help students, professionals, and researchers 
            create structured, professional, and contextually accurate documentation in minutes. 
            Powered by machine learning and natural language processing, Docxy will revolutionize how you create reports, 
            proposals, and academic projects.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8 text-left">
            <div className="p-4 sm:p-6 bg-white rounded-xl sm:rounded-2xl shadow-md hover:shadow-lg border border-gray-100 transition-all">
              <h4 className="text-base sm:text-lg font-semibold text-black mb-2"> AI Understanding</h4>
              <p className="text-gray-600 text-xs sm:text-sm">
                Docxy understands your input context and generates grammatically correct, well-formatted documentation instantly.
              </p>
            </div>

            <div className="p-4 sm:p-6 bg-white rounded-xl sm:rounded-2xl shadow-md hover:shadow-lg border border-gray-100 transition-all">
              <h4 className="text-base sm:text-lg font-semibold text-black mb-2">Custom Writing Styles</h4>
              <p className="text-gray-600 text-xs sm:text-sm">
                Choose from academic, formal, or professional tone presets to match your document type.
              </p>
            </div>

            <div className="p-4 sm:p-6 bg-white rounded-xl sm:rounded-2xl shadow-md hover:shadow-lg border border-gray-100 transition-all">
              <h4 className="text-base sm:text-lg font-semibold text-black mb-2"> Smart Structure</h4>
              <p className="text-gray-600 text-xs sm:text-sm">
                Automatically organizes your content into headings, subpoints, and summaries — ready to export as PDF or Word.
              </p>
            </div>

            <div className="p-4 sm:p-6 bg-white rounded-xl sm:rounded-2xl shadow-md hover:shadow-lg border border-gray-100 transition-all">
              <h4 className="text-base sm:text-lg font-semibold text-black mb-2"> Secure Data Processing</h4>
              <p className="text-gray-600 text-xs sm:text-sm">
                All AI processing happens securely through Viadocs’ servers with strict data encryption.
              </p>
            </div>

            <div className="p-4 sm:p-6 bg-white rounded-xl sm:rounded-2xl shadow-md hover:shadow-lg border border-gray-100 transition-all">
              <h4 className="text-base sm:text-lg font-semibold text-black mb-2"> Perfect for Students</h4>
              <p className="text-gray-600 text-xs sm:text-sm">
                Create project documentation, internship reports, or technical writeups without worrying about structure or formatting.
              </p>
            </div>

            <div className="p-4 sm:p-6 bg-white rounded-xl sm:rounded-2xl shadow-md hover:shadow-lg border border-gray-100 transition-all">
              <h4 className="text-base sm:text-lg font-semibold text-black mb-2"> Early Access Rewards</h4>
              <p className="text-gray-600 text-xs sm:text-sm">
                Early users get exclusive credits, priority support, and the chance to shape the AI’s next-gen features.
              </p>
            </div>
          </div>

          <p className="mt-8 sm:mt-10 text-gray-500 text-xs sm:text-sm italic">
            "Docxy — where AI meets creativity to redefine documentation."
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
