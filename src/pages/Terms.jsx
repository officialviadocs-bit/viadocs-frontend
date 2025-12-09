import React, { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft,  Scale } from "lucide-react";
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

export default function Terms() {
  const navigate = useNavigate();

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

          {/* Title Section */}
          <div className="mb-10 text-center">
            <div className="flex justify-center mb-4">
              <Scale className="w-12 h-12 text-[#4066E0]" />
            </div>
            <h1 className="text-3xl font-extrabold text-[#4066E0] sm:text-4xl">
              Terms <span className="text-[#1EC6D7]">& Conditions</span> 
            </h1>
            <p className="mt-3 text-gray-600">
              Last Updated:{" "}
              <span className="font-semibold text-[#4066E0]">
                October 2025
              </span>
            </p>
          </div>

          {/* Terms Content */}
          <div className="p-8 bg-white border border-[#1EC6D7]/30 shadow-lg rounded-2xl backdrop-blur-sm">
            <section className="space-y-10 leading-relaxed text-gray-700 text-sm sm:text-base">
              
              {/* 1. Introduction */}
              <div>
                <h2 className="mb-2 text-2xl font-semibold text-[#4066E0]">
                  1. Introduction
                </h2>
                <p>
                  Welcome to <strong>Viadocs</strong>, a product owned and operated by{" "}
                  <strong>Work Wizards Innovations (WWI)</strong>.  
                  These Terms and Conditions ("Terms") govern your use of our website, tools,
                  and services. By accessing or using Viadocs, you agree to these Terms.
                </p>
              </div>

              {/* 2. Acceptance of Terms */}
              <div>
                <h2 className="mb-2 text-2xl font-semibold text-[#4066E0]">
                  2. Acceptance of Terms 
                </h2>
                <p>
                  By creating an account, using our tools, or browsing our platform, you confirm
                  that you have read and agreed to these Terms and our{" "}
                  <span
                    onClick={() => navigate("/privacy-policy")}
                    className="text-[#1EC6D7] font-medium hover:underline cursor-pointer"
                  >
                    Privacy Policy
                  </span>.  
                  If you disagree, please do not access or use Viadocs.
                </p>
              </div>

              {/* 3. Eligibility */}
              <div>
                <h2 className="mb-2 text-2xl font-semibold text-[#4066E0]">
                  3. Eligibility
                </h2>
                <p>
                  You must be at least <strong>13 years old</strong> to use Viadocs.  
                  By using our services, you confirm that you meet this age requirement and
                  that all information you provide is accurate and up to date.
                </p>
              </div>

              {/* 4. User Accounts */}
              <div>
                <h2 className="mb-2 text-2xl font-semibold text-[#4066E0]">
                  4. User Accounts 
                </h2>
                <p>
                  To access advanced features, you may create an account. You are responsible for
                  maintaining the confidentiality of your login credentials.  
                  We are not responsible for unauthorized access caused by weak passwords or
                  user negligence.
                </p>
              </div>

              {/* 5. Use of Services */}
              <div>
                <h2 className="mb-2 text-2xl font-semibold text-[#4066E0]">
                  5. Acceptable Use of Services 
                </h2>
                <p>
                  You agree to use Viadocs only for lawful purposes and in accordance with these Terms.
                  You must not:
                </p>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>Upload or share malicious, illegal, or harmful files.</li>
                  <li>Disrupt or interfere with the website’s performance or servers.</li>
                  <li>Violate intellectual property or privacy rights of others.</li>
                  <li>Use Viadocs for fraudulent or deceptive activities.</li>
                </ul>
              </div>

              {/* 6. Intellectual Property Rights */}
              <div>
                <h2 className="mb-2 text-2xl font-semibold text-[#4066E0]">
                  6. Intellectual Property Rights 
                </h2>
                <p>
                  All content, branding, logos, and tools available on Viadocs are the exclusive
                  property of <strong>Work Wizards Innovations</strong>. You are granted a
                  limited, non-transferable license to use our tools solely for personal or
                  business document creation — not for resale or replication.
                </p>
              </div>

              {/* 7. Third-Party Links */}
              <div>
                <h2 className="mb-2 text-2xl font-semibold text-[#4066E0]">
                  7. Third-Party Links & Integrations 
                </h2>
                <p>
                  Viadocs may contain third-party services such as{" "}
                  <strong>Google Analytics, Firebase, or Cloudinary</strong>.  
                  We are not responsible for the privacy practices, terms, or content of these
                  external sites. Please review their policies before use.
                </p>
              </div>

              {/* 8. Advertisements & AdSense */}
              <div>
                <h2 className="mb-2 text-2xl font-semibold text-[#4066E0]">
                  8. Advertisements & Google AdSense 
                </h2>
                <p>
                  Viadocs uses <strong>Google AdSense</strong> to display non-intrusive, relevant ads.
                  We ensure ads comply with Google’s Publisher Policies and do not affect user
                  experience.  
                  By using Viadocs, you consent to the use of cookies for personalized ads
                  in accordance with{" "}
                  <a
                    href="https://policies.google.com/technologies/ads"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#1EC6D7] hover:underline"
                  >
                    Google’s Advertising Policy
                  </a>.
                </p>
              </div>

              {/* 9. Disclaimer of Warranties */}
              <div>
                <h2 className="mb-2 text-2xl font-semibold text-[#4066E0]">
                  9. Disclaimer of Warranties 
                </h2>
                <p>
                  Viadocs and its services are provided “as is” and “as available” without
                  any express or implied warranties.  
                  We make no guarantees regarding uptime, performance, or accuracy of any
                  content generated through our tools.
                </p>
              </div>

              {/* 10. Limitation of Liability */}
              <div>
                <h2 className="mb-2 text-2xl font-semibold text-[#4066E0]">
                  10. Limitation of Liability 
                </h2>
                <p>
                  In no event shall <strong>Work Wizards Innovations</strong> or its developers be
                  liable for indirect, incidental, special, or consequential damages arising
                  out of the use or inability to use Viadocs.  
                  Your sole remedy for dissatisfaction is to discontinue using the platform.
                </p>
              </div>

              {/* 11. Data & Privacy */}
              <div>
                <h2 className="mb-2 text-2xl font-semibold text-[#4066E0]">
                  11. Data & Privacy Protection 
                </h2>
                <p>
                  Your privacy is protected in accordance with our{" "}
                  <span
                    onClick={() => navigate("/privacy-policy")}
                    className="text-[#1EC6D7] hover:underline cursor-pointer font-medium"
                  >
                    Privacy Policy
                  </span>.  
                  We follow strict measures to ensure data confidentiality, including SSL
                  encryption, secure servers, and limited data access.
                </p>
              </div>

              {/* 12. Termination of Access */}
              <div>
                <h2 className="mb-2 text-2xl font-semibold text-[#4066E0]">
                  12. Account Termination & Suspension 
                </h2>
                <p>
                  We reserve the right to suspend or terminate your account if we detect
                  violations of these Terms or illegal activity.  
                  You may request permanent account deletion by emailing{" "}
                  <a
                    href="mailto:official@wwi.org.in"
                    className="text-[#1EC6D7] hover:underline"
                  >
                    official@wwi.org.in
                  </a>.
                </p>
              </div>

              {/* 13. Governing Law */}
              <div>
                <h2 className="mb-2 text-2xl font-semibold text-[#4066E0]">
                  13. Governing Law & Jurisdiction 
                </h2>
                <p>
                  These Terms are governed by the applicable laws of India.  
                  Any disputes arising shall be subject to the exclusive jurisdiction of
                  courts located in Andhra Pradesh, India.
                </p>
              </div>

              {/* 14. Updates to Terms */}
              <div>
                <h2 className="mb-2 text-2xl font-semibold text-[#4066E0]">
                  14. Updates & Modifications 
                </h2>
                <p>
                  We may update these Terms periodically.  
                  The latest version will always be posted on this page. Continued use of
                  Viadocs after updates means you accept the new Terms.
                </p>
              </div>

              {/* 15. Contact Us */}
              <div>
                <h2 className="mb-2 text-2xl font-semibold text-[#4066E0]">
                  15. Contact Us 
                </h2>
                <p>
                  For inquiries, clarifications, or feedback regarding these Terms,
                  contact us at:
                </p>
                <p className="mt-2">
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

          {/* Tagline */}
          <div className="mt-12 text-center">
            <h2 className="text-2xl font-bold text-[#4066E0]">
              “Empowering Secure & Smart Workflows — Powered by Work Wizards Innovations.”
            </h2>
            <p className="mt-2 text-gray-600">
              Trusted, Transparent, and Technology-driven for a better digital world.
            </p>
          </div>
        </div>
      </main>

      {/* Ad above footer */}
      <div className="w-full bg-transparent flex justify-center py-6">
        <AdPlaceholder className="w-full max-w-7xl" />
      </div>
      <Footer />
    </div>
  );
}
