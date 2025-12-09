import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ShieldCheck, } from "lucide-react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

export default function PrivacyPolicy() {
  const navigate = useNavigate();

  // AdSense injection (defensive)
  useEffect(() => {
    const containerId = "container-c152ce441ed68e2ebb08bdbddefa4fac";
    let container = document.getElementById(containerId);
    if (!container) {
      container = document.createElement("div");
      container.id = containerId;
      document.body.appendChild(container);
    }
    const script = document.createElement("script");
    script.async = true;
    script.setAttribute("data-cfasync", "false");
    script.src = "//pl27986002.effectivegatecpm.com/c152ce441ed68e2ebb08bdbddefa4fac/invoke.js";
    container.parentNode.insertBefore(script, container.nextSibling);
    return () => {
      script.remove();
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-[#EAF6FF] via-[#F3F8FF] to-[#E4E1FF] text-gray-800">
      <Header />

      <main className="flex-1 px-6 pb-0 pt-20 sm:pt-28">
        <div className="max-w-5xl mx-auto">
          {/* Back Button */}
          <div className="flex justify-start mb-8">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 px-4 py-2 text-white transition-all rounded-lg shadow-md bg-gradient-to-r from-[#4066E0] to-[#1EC6D7] hover:opacity-90 hover:scale-[1.03] active:scale-[0.97]"
            >
              <ArrowLeft size={18} />
              <span className="text-sm font-medium sm:text-base">Back</span>
            </button>
          </div>

          {/* Title */}
          <div className="mb-10 text-center">
            <ShieldCheck className="w-12 h-12 mx-auto mb-3 text-[#4066E0]" />
            <h1 className="text-3xl font-extrabold text-[#4066E0] sm:text-4xl">
              Privacy <span className="text-[#1EC6D7]">Policy</span> 🔒
            </h1>
            <p className="mt-3 text-gray-600">
              Last Updated:{" "}
              <span className="font-semibold text-[#4066E0]">October 2025</span>
            </p>
          </div>

          {/* Policy Content */}
          <div className="p-8 bg-white border border-[#1EC6D7]/30 shadow-lg rounded-2xl backdrop-blur-sm">
            <section className="space-y-10 leading-relaxed text-gray-700 text-sm sm:text-base">
              
              {/* 1. Introduction */}
              <div>
                <h2 className="mb-2 text-2xl font-semibold text-[#4066E0]">
                  1. Introduction
                </h2>
                <p>
                  Welcome to <strong>Viadocs</strong>, a digital document
                  creation and management platform developed by{" "}
                  <strong>Work Wizards Innovations (WWI)</strong>.  
                  We deeply respect your privacy and are committed to ensuring that
                  your personal data remains secure.  
                  This Privacy Policy explains how we collect, use, and protect your
                  information when you access our website or use our tools.
                </p>
              </div>

              {/* 2. Information We Collect */}
              <div>
                <h2 className="mb-2 text-2xl font-semibold text-[#4066E0]">
                  2. Information We Collect
                </h2>
                <ul className="space-y-2 list-disc list-inside">
                  <li>
                    <strong className="text-[#1EC6D7]">Personal Data:</strong>{" "}
                    Includes your name, email address, date of birth, and any
                    information you voluntarily provide during registration or
                    while using Viadocs.
                  </li>
                  <li>
                    <strong className="text-[#1EC6D7]">Usage Data:</strong>{" "}
                    We collect anonymous analytics such as device type, browser,
                    pages visited, time spent, IP address, and referral source
                    to improve user experience.
                  </li>
                  <li>
                    <strong className="text-[#1EC6D7]">Documents & Files:</strong>{" "}
                    Files created, uploaded, or edited within Viadocs are securely
                    stored. We do not access, share, or sell your content.
                  </li>
                </ul>
              </div>

              {/* 3. How We Use Information */}
              <div>
                <h2 className="mb-2 text-2xl font-semibold text-[#4066E0]">
                  3. How We Use Your Information
                </h2>
                <ul className="space-y-2 list-disc list-inside">
                  <li>To provide and improve Viadocs’ tools and services.</li>
                  <li>To personalize your experience and suggest relevant features.</li>
                  <li>To analyze site performance and user behavior via analytics tools.</li>
                  <li>To communicate with you regarding your account or updates.</li>
                  <li>To maintain security and prevent fraudulent activity.</li>
                </ul>
              </div>

              {/* 4. Data Sharing */}
              <div>
                <h2 className="mb-2 text-2xl font-semibold text-[#4066E0]">
                  4. Data Sharing and Disclosure
                </h2>
                <p>
                  Viadocs does <strong>not sell or rent</strong> your personal data.  
                  Limited information may be shared with trusted service providers like{" "}
                  <strong>Google Analytics, Firebase,</strong> or{" "}
                  <strong>Cloud Storage providers</strong> to operate our platform
                  — always under strict data protection terms.
                </p>
              </div>

              {/* 5. Cookies */}
              <div>
                <h2 className="mb-2 text-2xl font-semibold text-[#4066E0]">
                  5. Cookies and Tracking Technologies 🍪
                </h2>
                <p>
                  We use cookies to improve website functionality and personalize
                  user experience. Cookies help us remember your preferences, login
                  status, and performance metrics.  
                  You can disable cookies in your browser settings, but some
                  features may not function properly.
                </p>
              </div>

              {/* 6. Google AdSense & Analytics */}
              <div>
                <h2 className="mb-2 text-2xl font-semibold text-[#4066E0]">
                  6. Google AdSense and Analytics Integration 📊
                </h2>
                <p>
                  We use <strong>Google AdSense</strong> to display relevant,
                  non-intrusive advertisements and{" "}
                  <strong>Google Analytics 4</strong> to understand visitor activity.
                  Google may use cookies or similar technologies to deliver ads
                  based on your interests and previous interactions.  
                  Learn how Google uses your data at{" "}
                  <a
                    href="https://policies.google.com/technologies/ads"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#1EC6D7] hover:underline"
                  >
                    policies.google.com/technologies/ads
                  </a>.
                </p>
                <p className="mt-2">
                  By using Viadocs, you consent to Google’s data usage in accordance
                  with their privacy terms and ours.
                </p>
              </div>

              {/* 7. Data Protection & Security */}
              <div>
                <h2 className="mb-2 text-2xl font-semibold text-[#4066E0]">
                  7. Data Protection and Security 🔐
                </h2>
                <p>
                  We apply encryption (SSL), access control, and secure databases to
                  protect your data. However, no online service is completely risk-free.
                  We encourage users to use strong passwords and avoid sharing
                  credentials with others.
                </p>
              </div>

              {/* 8. Your Rights */}
              <div>
                <h2 className="mb-2 text-2xl font-semibold text-[#4066E0]">
                  8. Your Rights and Choices 🧾
                </h2>
                <p>
                  You have the right to access, modify, or delete your personal
                  information. You can request data removal or export by emailing{" "}
                  <a
                    href="mailto:official@wwi.org.in"
                    className="text-[#1EC6D7] hover:underline"
                  >
                    official@wwi.org.in
                  </a>.  
                  You may also opt out of marketing emails and cookie tracking at any time.
                </p>
              </div>

              {/* 9. Compliance and Age Policy */}
              <div>
                <h2 className="mb-2 text-2xl font-semibold text-[#4066E0]">
                  9. Compliance and Age Restrictions ⚖️
                </h2>
                <p>
                  Viadocs complies with applicable laws including{" "}
                  <strong>GDPR</strong>, <strong>CCPA</strong>, and{" "}
                  <strong>Google Publisher Policies</strong>.  
                  Our platform is intended for users aged 13 and above.  
                  If we discover a user under 13 has provided personal data, we will
                  promptly delete it.
                </p>
              </div>

              {/* 10. Updates to Policy */}
              <div>
                <h2 className="mb-2 text-2xl font-semibold text-[#4066E0]">
                  10. Updates to This Policy 🔁
                </h2>
                <p>
                  This Privacy Policy may be updated periodically. We encourage you
                  to review it regularly for any changes.  
                  Continued use of Viadocs after updates constitutes acceptance of
                  the revised terms.
                </p>
              </div>

              {/* 11. Contact */}
              <div>
                <h2 className="mb-2 text-2xl font-semibold text-[#4066E0]">
                  11. Contact Us 📩
                </h2>
                <p>
                  If you have any questions, concerns, or feedback regarding our
                  Privacy Policy, please reach out to us at:
                </p>
                <p className="mt-3">
                  <strong>Email:</strong>{" "}
                  <a
                    href="mailto:official@wwi.org.in"
                    className="text-[#1EC6D7] hover:underline"
                  >
                    official@wwi.org.in
                  </a>
                  <br />
                  <strong>Website:</strong>{" "}
                  <a
                    href="https://wwi.org.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#1EC6D7] hover:underline"
                  >
                    www.wwi.org.in
                  </a>
                  <br />
                  <strong>Organization:</strong> Work Wizards Innovations
                </p>
              </div>
            </section>
          </div>
        </div>
      </main>

       <div id="container-c152ce441ed68e2ebb08bdbddefa4fac" />

      <Footer />
     
    </div>
  );
}
