import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Send,
  MessageSquare,
  Star,
  User,
  ShieldCheck,
  Smile,
  HeartHandshake,
  ChartLine,
} from "lucide-react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import axios from "axios";
import { toast } from "react-toastify";

// Ad placeholder component: injects the ad script and container div on mount
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

export default function Feedback() {
  const navigate = useNavigate();
  const [user, setUser] = useState({ name: "", email: "" });
  const [feedback, setFeedback] = useState({ message: "", rating: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // ✅ Fetch logged-in user info
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    axios
      .get("http://localhost:5000/api/profile", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const fullName = `${res.data.firstName || ""} ${res.data.lastName || ""}`.trim();
        setUser({
          name: fullName || res.data.username || "User",
          email: res.data.email || "",
        });
      })
      .catch(() => console.log("No user logged in or token expired"));
  }, []);

  // ✅ Handle input changes
  const handleChange = (e) =>
    setFeedback({ ...feedback, [e.target.name]: e.target.value });

  // ✅ Submit feedback
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);

    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        "http://localhost:5000/api/feedback",
        {
          message: feedback.message,
          rating: feedback.rating,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (res.status === 200) {
        setSuccess(true);
        setFeedback({ message: "", rating: "" });
        toast.success("✅ Feedback submitted successfully!");
      }
    } catch (err) {
      console.error("Error submitting feedback:", err);
      toast.error("❌ Failed to submit feedback. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-800">
      <Header />

      <main className="flex-1 px-6 pb-0 pt-20 sm:pt-28">
        <div className="max-w-5xl mx-auto">
          {/* Back Button */}
          <div className="flex justify-start mb-8">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 px-4 py-2 text-white transition-all rounded-lg shadow-md bg-black hover:bg-gray-800 hover:scale-[1.03]"
            >
              <ArrowLeft size={18} />
              <span className="text-sm font-medium sm:text-base">Back</span>
            </button>
          </div>

          {/* Feedback Card */}
          <div className="p-8 border border-gray-200 shadow-xl bg-white rounded-2xl hover:shadow-2xl transition-all">
            <h1 className="text-3xl font-extrabold text-center text-black sm:text-4xl">
              Share Your <span className="text-black">Feedback</span>
            </h1>
            <p className="max-w-lg mx-auto mt-3 text-center text-gray-600">
              Your thoughts matter! Help us make{" "}
              <span className="text-black font-semibold">Viadocs</span> smarter,
              faster, and more user-friendly.
            </p>

            {/* Feedback Form */}
            <form
              onSubmit={handleSubmit}
              className="mt-10 space-y-6"
              autoComplete="off"
            >
              {/* User Info */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                    <User className="w-4 h-4 text-black" /> Your Name
                  </label>
                  <input
                    type="text"
                    value={user.name || "Guest User"}
                    disabled
                    className="w-full px-4 py-3 mt-2 text-gray-800 bg-gray-100 border border-gray-300 rounded-lg shadow-sm"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                    <User className="w-4 h-4 text-black" /> Email
                  </label>
                  <input
                    type="email"
                    value={user.email || "Not logged in"}
                    disabled
                    className="w-full px-4 py-3 mt-2 text-gray-800 bg-gray-100 border border-gray-300 rounded-lg shadow-sm\"
                  />
                </div>
              </div>

              {/* Rating */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <Star className="w-4 h-4 text-yellow-500" /> Rate Viadocs
                </label>
                <select
                  name="rating"
                  value={feedback.rating}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 mt-2 text-gray-800 bg-white border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-black"
                >
                  <option value="">Select a rating</option>
                  <option value="5">⭐⭐⭐⭐⭐ Excellent</option>
                  <option value="4">⭐⭐⭐⭐ Good</option>
                  <option value="3">⭐⭐⭐ Average</option>
                  <option value="2">⭐⭐ Poor</option>
                  <option value="1">⭐ Bad</option>
                </select>
              </div>

              {/* Message */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <MessageSquare className="w-4 h-4 text-black" /> Feedback Message
                </label>
                <textarea
                  name="message"
                  value={feedback.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  placeholder="Tell us what you think about Viadocs, or suggest a new feature..."
                  className="w-full px-4 py-3 mt-2 text-gray-800 bg-white border border-gray-300 rounded-lg shadow-sm resize-none focus:ring-2 focus:ring-black"
                ></textarea>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="flex items-center justify-center w-full py-3 font-semibold text-white transition-all rounded-full shadow-md bg-black hover:scale-[1.02] hover:shadow-lg disabled:opacity-60"
              >
                {loading ? (
                  "Submitting..."
                ) : (
                  <>
                    <Send className="w-5 h-5 mr-2" /> Submit Feedback
                  </>
                )}
              </button>

              {/* Success Message */}
              {success && (
                <p className="mt-4 text-center text-green-600 font-medium animate-fadeIn">
                  ✅ Thank you for your feedback! We truly value your time and
                  insights.
                </p>
              )}
            </form>
          </div>

          {/* Inline ad: between feedback card and "Why Feedback Matters" */}
          <div className="flex justify-center my-8">
            <AdPlaceholder className="w-full max-w-3xl" />
          </div>

          {/* Why Feedback Matters */}
          <div className="p-8 mt-12 border border-gray-200 rounded-2xl bg-white shadow-md">
            <Smile className="w-10 h-10 mx-auto text-black mb-4" />
            <h2 className="text-2xl font-semibold text-center text-black">
              Why Your Feedback Matters 
            </h2>
            <p className="max-w-3xl mx-auto mt-3 text-gray-600 text-center leading-relaxed">
              Every suggestion helps us improve{" "}
              <strong className="text-black">Viadocs</strong> and build
              features that truly matter to our users.  
              Your feedback directly shapes the way we design, develop, and
              deliver smarter document tools powered by Artificial Intelligence.
            </p>
          </div>

          {/* Community Impact */}
          <div className="p-8 mt-10 border border-gray-200 rounded-2xl bg-white shadow-sm">
            <div className="flex flex-col items-center space-y-3">
              <ChartLine className="w-10 h-10 text-black" />
              <h3 className="text-xl font-bold text-black">
                Your Voice Drives Innovation 
              </h3>
              <p className="max-w-2xl text-sm text-gray-600 text-center">
                From design enhancements to AI integration, each feedback entry
                helps us identify new opportunities to make{" "}
                <strong>Viadocs</strong> more intelligent, secure, and
                user-focused. Together, we’re building the future of
                document management.
              </p>
              <HeartHandshake className="w-6 h-6 text-black" />
              <p className="text-xs text-gray-500 italic text-center">
                “Your voice builds better tools — your trust fuels our innovation.”
              </p>
            </div>
          </div>

          {/* Transparency & Privacy */}
          <div className="p-6 mt-10 text-center border border-gray-200 rounded-xl bg-white">
            <ShieldCheck className="w-8 h-8 mx-auto mb-3 text-black" />
            <h3 className="text-lg font-semibold text-black mb-2">
              Feedback & Data Transparency 
            </h3>
            <p className="max-w-2xl mx-auto text-gray-600 text-sm">
              All feedback is securely processed and stored under{" "}
              <strong>Work Wizards Innovations</strong>.  
              We never share your information with third parties.  
              Learn more in our{" "}
              <span
                className="text-black hover:underline cursor-pointer font-medium"
                onClick={() => navigate("/privacy-policy")}
              >
                Privacy Policy
              </span>.
            </p>
          </div>

          {/* Closing Statement */}
          <div className="mt-16 text-center">
            <h2 className="text-2xl font-bold text-black">
              “Your Feedback Fuels Innovation — Together, We Build Smarter.”
            </h2>
            <p className="mt-2 text-gray-600 text-sm">
              Thank you for helping <strong>Viadocs</strong> grow responsibly
              with your trust, feedback, and collaboration.
            </p>
          </div>
        </div>
      </main>

      {/* Right-side hanging ad (desktop only) */}
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
