// src/pages/Tools.jsx
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import image1 from "../assets/image1.webp";
import image2 from "../assets/images2.webp";
import image3 from "../assets/image3.webp";

import {
  ArrowLeft,
  FileText,
  FileSpreadsheet,
  File,
  Image,
  Lock,
  Unlock,
  Scissors,
  Merge,
  Download,
  Shrink,
  Presentation,
} from "lucide-react";

export default function Tools() {
  const navigate = useNavigate();

  // Add AdSense script and container (defensive)
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

  const tools = [
    { slug: "pdf-to-word", name: "PDF to Word", desc: "Convert PDF into editable Word docs", icon: FileText },
    { slug: "word-to-pdf", name: "Word to PDF", desc: "Export Word files into PDF", icon: File },
    { slug: "pdf-merge", name: "PDF Merge", desc: "Combine multiple PDFs into one", icon: Merge },
    { slug: "pdf-split", name: "PDF Split", desc: "Extract specific pages from PDF", icon: Scissors },
    { slug: "pdf-compress", name: "PDF Compress", desc: "Reduce file size of PDFs", icon: Shrink },
    { slug: "image-to-pdf", name: "Image to PDF", desc: "Convert images into a PDF file", icon: Image },
    { slug: "pdf-to-image", name: "PDF to Image", desc: "Save PDF pages as images", icon: Download },
    { slug: "password-protect", name: "Password Protect", desc: "Add password to a PDF", icon: Lock },
    { slug: "unlock-pdf", name: "Unlock PDF", desc: "Remove PDF restrictions", icon: Unlock },
    { slug: "excel-to-pdf", name: "Excel to PDF", desc: "Convert spreadsheets into PDF", icon: FileSpreadsheet },
    { slug: "powerpoint-to-pdf", name: "PowerPoint to PDF", desc: "Save slides into PDF format", icon: Presentation },
    
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-[#EAF6FF] via-[#F3F8FF] to-[#E4E1FF]">
      <Header />
      
      <main className="flex-1 px-0 sm:px-6 pb-16 pt-20 sm:pt-28 bg-gradient-to-br from-[#EAF6FF] via-[#F3F8FF] to-[#E4E1FF]">
        <div className="mx-auto max-w-7xl px-3 sm:px-0">
         {/* Back Button */}
                             <div className="flex justify-start mb-8">
                               <button
                                 onClick={() => navigate("/home")}
                                 className="flex items-center gap-2 px-4 py-2 text-white transition-all rounded-lg shadow-md bg-gradient-to-r from-[#4FC3F7] to-[#3F51B5] hover:opacity-90 hover:scale-[1.03]"
                               >
                                 <ArrowLeft size={18} />
                                 <span className="text-sm font-medium sm:text-base">
                                   Back 
                                 </span>
                               </button>
                             </div>

          {/* Title */}
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">
              All Your PDF Tools —{" "}
              <span className="text-[#4066E0]">Smart, Fast & Free!</span>
            </h2>
            <p className="max-w-3xl mx-auto mt-3 text-lg text-gray-600">
              Merge, split, compress, edit, convert, and secure your PDFs effortlessly.
              Everything you need to manage documents — beautifully designed and easy to use.
            </p>
          </div>

          {/* Tools Grid */}
          <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 sm:gap-6 mb-12">
            {tools.map((tool, i) => (
              <button
                key={i}
                onClick={() => navigate(`/tools/${tool.slug}`)}
                className="relative flex flex-col items-center justify-center p-3 sm:p-6 text-center bg-white border border-[#1EC6D7]/30 rounded-xl shadow-sm hover:shadow-xl hover:border-[#4066E0]/40 hover:bg-[#EAF6FF] hover:scale-[1.02] transition-all group min-h-[135px] sm:min-h-[160px] w-full"
              >
                <div className="flex items-center justify-center w-10 h-10 mb-2 rounded-lg bg-[#EAF6FF] group-hover:bg-white/80">
                  <tool.icon className="w-5 h-5 sm:w-6 sm:h-6 text-[#4066E0] group-hover:text-[#1EC6D7] transition-colors" />
                </div>
                <h3 className="mb-1 text-xs font-medium text-gray-800 sm:text-sm line-clamp-1 px-0.5">
                  {tool.name}
                </h3>
                <p className="text-[10px] sm:text-xs text-gray-500 line-clamp-2 px-1">
                  {tool.desc}
                </p>
              </button>
            ))}
          </div>
        </div>
      </main>


      <div id="container-c152ce441ed68e2ebb08bdbddefa4fac" />
     
{/* ===== Viadocs Features Section ===== */}
<section className="py-16 bg-gradient-to-b from-[#F9FAFB] via-[#F3F4F6] to-white text-center">
  <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-800 mb-6">
    Work Smarter with <span className="text-[#4066E0]">Viadocs</span>
  </h2>

  <p className="max-w-3xl mx-auto text-gray-600 text-base sm:text-lg mb-10 px-4">
    Whether you’re a student preparing reports or an employee managing PDFs, 
    Viadocs brings everything together in one seamless, powerful workspace.
  </p>

  {/* ===== Feature Cards ===== */}
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto px-6">
    {/* Card 1 */}
    <div className="p-6 bg-white rounded-2xl shadow-md hover:shadow-xl transition-all border border-gray-100 hover:-translate-y-1">
      <div className="flex items-center justify-center mb-4">
        <div className="p-3 rounded-xl bg-[#EAF6FF] shadow-inner">
          <img
            src={image1}
            alt="Create Documents"
            className="w-20 h-20 object-contain"
            loading="lazy"
          />
        </div>
      </div>
      <h3 className="text-lg font-semibold text-gray-800 mb-2">
        Create Documents Instantly
      </h3>
      <p className="text-gray-600 text-sm leading-relaxed">
        Generate professional projects, assignments, and resumes in seconds 
        using Viadocs’ AI document builder — built for students and employees.
      </p>
    </div>

    {/* Card 2 */}
    <div className="p-6 bg-white rounded-2xl shadow-md hover:shadow-xl transition-all border border-gray-100 hover:-translate-y-1">
      <div className="flex items-center justify-center mb-4">
        <div className="p-3 rounded-xl bg-[#EAF6FF] shadow-inner">
          <img
            src={image2}
            alt="PDF Tools"
            className="w-20 h-20 object-contain"
            loading="lazy"
          />
        </div>
      </div>
      <h3 className="text-lg font-semibold text-gray-800 mb-2">
        All-in-One PDF Tools
      </h3>
      <p className="text-gray-600 text-sm leading-relaxed">
        Merge, split, compress, or convert PDFs instantly. 
        Manage your files securely — anytime, anywhere.
      </p>
    </div>

    {/* Card 3 */}
    <div className="p-6 bg-white rounded-2xl shadow-md hover:shadow-xl transition-all border border-gray-100 hover:-translate-y-1">
      <div className="flex items-center justify-center mb-4">
        <div className="p-3 rounded-xl bg-[#EAF6FF] shadow-inner">
          <img
            src={image3}
            alt="AI Assistant"
            className="w-20 h-20 object-contain"
            loading="lazy"
          />
        </div>
      </div>
      <h3 className="text-lg font-semibold text-gray-800 mb-2">
        AI-Powered Assistance
      </h3>
      <p className="text-gray-600 text-sm leading-relaxed">
        Let our AI help summarize, rewrite, or extract key data 
        from documents — boosting your productivity and creativity.
      </p>
    </div>
  </div>
</section>

     {/* ===== Premium Section ===== */}
<section className="py-16 bg-gradient-to-r from-[#4066E0]/10 via-[#1EC6D7]/10 to-[#6A3FD7]/10 text-center rounded-t-3xl mt-10">
  <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-800 mb-4">
    Unlock More with <span className="text-[#4066E0]">Viadocs Premium</span>
  </h2>

  <p className="max-w-3xl mx-auto text-gray-600 text-base sm:text-lg mb-8 px-4">
    Upgrade to Viadocs Premium for faster performance, unlimited AI usage, 
    and advanced document tools — designed to empower your work and studies.
  </p>

  {/* Premium Button (Disabled) */}
  <div className="relative inline-block group">
    <button
      disabled
      className="px-6 py-3 font-semibold rounded-full bg-gradient-to-r from-[#4066E0] to-[#1EC6D7] text-white shadow-md opacity-90 cursor-not-allowed group-hover:opacity-100 transition-all"
    >
      Go Premium 🚀
    </button>

    {/* Tooltip */}
    <div className="absolute left-1/2 -translate-x-1/2 mt-2 px-3 py-1 text-sm text-white bg-gray-800 rounded-md opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap">
      Coming Soon ✨
    </div>
  </div>
</section>

      {/* ===== Trusted Section ===== */}
      <section className="py-16 text-center bg-white">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-800 mb-4">
          Built for Engineering Students & Employees
        </h2>
        <p className="max-w-2xl mx-auto text-gray-600 mb-10 px-4">
          I’m a fresher who built <span className="text-[#4066E0] font-semibold">Viadocs</span> 
          for engineering students and professionals — making document creation, editing, 
          and PDF tools smarter and easier to use.
        </p>
      </section>

    {/* ===== Why Use Viadocs Tools Section ===== */}
<section className="py-16 bg-gradient-to-b from-white via-[#F9FAFB] to-[#EEF2FF] text-center border-t border-gray-100">
  <div className="max-w-5xl mx-auto px-6">
    <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-800 mb-6">
      Why Use <span className="text-[#4066E0]">Viadocs PDF Tools</span>?
    </h2>
    <p className="text-gray-600 text-base sm:text-lg leading-relaxed mb-8">
      Viadocs offers a seamless experience for document handling — whether you’re converting, merging,
      or compressing files. Our AI-powered tools are designed to help students, professionals,
      and educators save time, maintain quality, and ensure document safety.
    </p>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
      <div className="p-6 bg-white rounded-2xl shadow-md hover:shadow-lg border border-gray-100 transition-all">
        <h4 className="text-lg font-semibold text-[#4066E0] mb-2">⚡ Instant Conversions</h4>
        <p className="text-gray-600 text-sm">
          Convert Word, Excel, PowerPoint, and images into PDFs instantly — without losing formatting.
        </p>
      </div>

      <div className="p-6 bg-white rounded-2xl shadow-md hover:shadow-lg border border-gray-100 transition-all">
        <h4 className="text-lg font-semibold text-[#4066E0] mb-2">🔒 Safe and Secure</h4>
        <p className="text-gray-600 text-sm">
          Your files remain private and encrypted. We never store or share your documents.
        </p>
      </div>

      <div className="p-6 bg-white rounded-2xl shadow-md hover:shadow-lg border border-gray-100 transition-all">
        <h4 className="text-lg font-semibold text-[#4066E0] mb-2">💡 AI-Powered Features</h4>
        <p className="text-gray-600 text-sm">
          Let our AI assistant summarize reports, extract data, or auto-format content with precision.
        </p>
      </div>

      <div className="p-6 bg-white rounded-2xl shadow-md hover:shadow-lg border border-gray-100 transition-all">
        <h4 className="text-lg font-semibold text-[#4066E0] mb-2">🌍 Works on All Devices</h4>
        <p className="text-gray-600 text-sm">
          Access Viadocs tools anywhere — desktop, tablet, or mobile. 100% browser-based.
        </p>
      </div>

      <div className="p-6 bg-white rounded-2xl shadow-md hover:shadow-lg border border-gray-100 transition-all">
        <h4 className="text-lg font-semibold text-[#4066E0] mb-2">🚀 Built for Students & Teams</h4>
        <p className="text-gray-600 text-sm">
          Specially crafted for academic and corporate use — simplify project reports and documentation.
        </p>
      </div>

      <div className="p-6 bg-white rounded-2xl shadow-md hover:shadow-lg border border-gray-100 transition-all">
        <h4 className="text-lg font-semibold text-[#4066E0] mb-2">🧠 Free Forever Plan</h4>
        <p className="text-gray-600 text-sm">
          Start with all essential tools for free — no sign-up required for most PDF functions.
        </p>
      </div>
    </div>
  </div>
</section>





      <Footer />

    </div>
  );
}
