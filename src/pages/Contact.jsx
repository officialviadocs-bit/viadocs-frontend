// src/pages/Contact.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Mail,
  User,
  MessageSquare,
  Send,
  ShieldCheck,
  HeartHandshake,
  Briefcase,
} from "lucide-react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import axios from "axios";

export default function Contact() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);

    try {
      const res = await axios.post(
        "http://localhost:5000/api/contact",
        formData
      );
      if (res.status === 200) {
        setSuccess(true);
        setFormData({ name: "", email: "", message: "" });
      }
    } catch (err) {
      console.error("Error sending message:", err);
      alert("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />

      <main className="flex-1 px-6 pb-0 pt-20 sm:pt-28">
        <div className="max-w-6xl mx-auto">
          {/* Back Button */}
          <div className="flex justify-start mb-8">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 px-4 py-2 text-white transition-all rounded-lg shadow-md bg-black hover:bg-gray-800 hover:scale-[1.03] active:scale-[0.97]"
            >
              <ArrowLeft size={18} />
              <span className="text-sm font-medium sm:text-base">Back</span>
            </button>
          </div>

          {/* Title */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-extrabold text-black">
              Contact Us 
            </h1>
            <p className="mt-3 text-gray-600 max-w-2xl mx-auto text-base">
              Have a question, suggestion, or partnership idea? We’d love to
              hear from you. Our team responds within 24–48 hours.
            </p>
          </div>

          {/* Main Grid */}
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
            {/* LEFT: About & Brand Impression Section */}
            <div className="p-8 border border-gray-200 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all">
              <h2 className="text-2xl font-bold text-black mb-6 text-center">
                About Viadocs 
              </h2>

              <p className="text-gray-700 leading-relaxed mb-6 text-justify">
                <strong className="text-black">Viadocs</strong> is an
                <strong> AI-powered document creation and management platform</strong>{" "}
                built by{" "}
                <strong className="text-black">
                  Work Wizards Innovations
                </strong>.  
                Our goal is to transform document handling into a seamless,
                automated, and intelligent experience for professionals,
                students, and creators worldwide.
              </p>

              <p className="text-gray-700 leading-relaxed mb-6 text-justify">
                Viadocs merges smart automation, secure cloud tools, and a
                modern user interface to simplify your work. Whether converting,
                compressing, merging, or signing documents — we make it faster,
                safer, and smarter.
              </p>

              <p className="text-gray-700 leading-relaxed mb-6 text-justify">
                As a proud Indian startup under{" "}
                <span className="font-semibold text-black">
                  Work Wizards Innovations
                </span>, we believe in creating ethical, secure, and accessible
                technology that empowers people. Our focus remains on innovation
                that simplifies life and promotes digital trust.
              </p>

              {/* CTA Section */}
              <div className="mt-6 text-center">
                <h3 className="text-lg font-semibold text-black mb-3">
                   Join the Viadocs Revolution
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  Discover how we’re shaping the future of document automation
                  through AI and simplicity.
                </p>
                <button
                  onClick={() => navigate("/about")}
                  className="px-6 py-3 text-sm font-semibold text-white rounded-full shadow-md bg-black hover:scale-[1.03] hover:shadow-lg transition-all"
                >
                  Learn More About Us
                </button>
              </div>
            </div>

            {/* RIGHT: Contact Form */}
            <div className="p-8 border border-gray-200 shadow-xl bg-white rounded-2xl">
              <h2 className="text-2xl font-bold text-center text-black">
                Send Us a Message 
              </h2>
              <p className="text-gray-600 text-center text-sm mt-2 mb-6">
                We usually reply within 24–48 hours. Please provide valid
                contact details.
              </p>

              <form
                onSubmit={handleSubmit}
                className="space-y-6"
                autoComplete="off"
              >
                {/* Name */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                    <User className="w-4 h-4 text-black" /> Your Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Enter your full name"
                    className="w-full px-4 py-3 mt-2 text-gray-800 bg-white border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-black focus:border-transparent"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                    <Mail className="w-4 h-4 text-black" /> Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="Enter your email address"
                    className="w-full px-4 py-3 mt-2 text-gray-800 bg-white border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-black focus:border-transparent"
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                    <MessageSquare className="w-4 h-4 text-black" /> Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    placeholder="Write your message here..."
                    rows={5}
                    className="w-full px-4 py-3 mt-2 text-gray-800 bg-white border border-gray-300 rounded-lg shadow-sm resize-none focus:ring-2 focus:ring-black focus:border-transparent"
                  ></textarea>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="flex items-center justify-center w-full py-3 font-semibold text-white transition-all rounded-full shadow-md bg-black hover:scale-[1.02] hover:shadow-lg disabled:opacity-60"
                >
                  {loading ? (
                    "Sending..."
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2" /> Send Message
                    </>
                  )}
                </button>

                {/* Success Message */}
                {success && (
                  <div className="p-3 mt-4 text-green-700 bg-green-100 border border-green-300 rounded-lg text-center animate-fadeIn">
                    ✅ Message sent successfully! Our team will reach out soon.
                  </div>
                )}
              </form>

              {/* Quick Help Section */}
              <div className="mt-10 space-y-6">
                <h3 className="text-xl font-bold text-black text-center">
                  Other Ways We Can Help 
                </h3>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <div className="p-4 text-center border rounded-lg hover:shadow-md transition-all bg-gray-50">
                    <ShieldCheck
                      className="mx-auto mb-2 text-black"
                      size={24}
                    />
                    <h4 className="font-semibold text-gray-800">Support</h4>
                    <p className="text-xs text-gray-600">
                      Need help with your account or tools? Contact support now.
                    </p>
                  </div>
                  <div className="p-4 text-center border rounded-lg hover:shadow-md transition-all bg-gray-50">
                    <HeartHandshake
                      className="mx-auto mb-2 text-black"
                      size={24}
                    />
                    <h4 className="font-semibold text-gray-800">Partnerships</h4>
                    <p className="text-xs text-gray-600">
                      Interested in collaborating or business integration?
                    </p>
                  </div>
                  <div className="p-4 text-center border rounded-lg hover:shadow-md transition-all bg-gray-50">
                    <Briefcase
                      className="mx-auto mb-2 text-black"
                      size={24}
                    />
                    <h4 className="font-semibold text-gray-800">Careers</h4>
                    <p className="text-xs text-gray-600">
                      Join our growing team at Work Wizards Innovations.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tagline */}
          <div className="mt-16 text-center">
            <h2 className="text-2xl font-bold text-black">
              "Connecting Ideas, People, and Innovation — Work Wizards Innovations."
            </h2>
            <p className="mt-2 text-gray-600">
              Your message matters to us — every idea helps shape the future of Viadocs.
            </p>
          </div>
        </div>
      </main>

      

     
      

      <Footer />
    </div>
  );
}
