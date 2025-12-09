import React, { Suspense } from "react";
import { useNavigate } from "react-router-dom";

// ✅ Lazy-load Lucide icons (only load when footer mounts)
const Info = React.lazy(() => import("lucide-react").then((m) => ({ default: m.Info })));
const Home = React.lazy(() => import("lucide-react").then((m) => ({ default: m.Home })));
const FileText = React.lazy(() => import("lucide-react").then((m) => ({ default: m.FileText })));
const Wrench = React.lazy(() => import("lucide-react").then((m) => ({ default: m.Wrench })));
const ShieldCheck = React.lazy(() => import("lucide-react").then((m) => ({ default: m.ShieldCheck })));
const MessageCircleQuestion = React.lazy(() =>
  import("lucide-react").then((m) => ({ default: m.MessageCircleQuestion }))
);
const Mail = React.lazy(() => import("lucide-react").then((m) => ({ default: m.Mail })));
const Scale = React.lazy(() => import("lucide-react").then((m) => ({ default: m.Scale })));

function Footer({ sticky = false }) {
  const navigate = useNavigate();
  const stickyClasses = sticky ? "fixed bottom-0 left-0 w-full z-40 shadow-inner" : "";

  return (
    <footer
      className={`${stickyClasses} bg-gradient-to-br from-[#2F3438] via-[#373C3F] to-[#3F4448] text-gray-200 transition-colors duration-300`}
    >
      <div className="max-w-7xl px-6 py-10 mx-auto">
        {/* ===== Top Section ===== */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3 text-center sm:text-left">
          {/* Brand Info */}
          <div>
            <h2 className="text-xl font-bold tracking-wide text-white">
              Viadocs
            </h2>
            <p className="mt-3 text-sm text-gray-400 leading-relaxed">
              Built with passion by{" "}
              <a
                href="https://wwi.org.in"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-white hover:underline"
              >
                Work Wizards Innovations
              </a>
              . Empowering creators, professionals, and teams with smarter
              AI-powered document tools.
            </p>
          </div>

          {/* Main Pages */}
          <div>
            <h3 className="mb-3 text-sm font-semibold text-gray-100 uppercase tracking-wider">
              Main Pages
            </h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li
                onClick={() => navigate("/home")}
                className="flex items-center gap-2 cursor-pointer hover:text-white transition-all justify-center sm:justify-start"
              >
                <Suspense fallback={<span>•</span>}>
                  <Home size={14} />
                </Suspense>
                Home
              </li>
              <li
                onClick={() => navigate("/create-doc")}
                className="flex items-center gap-2 cursor-pointer hover:text-white transition-all justify-center sm:justify-start"
              >
                <Suspense fallback={<span>•</span>}>
                  <FileText size={14} />
                </Suspense>
                Create Doc
              </li>
              <li
                onClick={() => navigate("/tools")}
                className="flex items-center gap-2 cursor-pointer hover:text-white transition-all justify-center sm:justify-start"
              >
                <Suspense fallback={<span>•</span>}>
                  <Wrench size={14} />
                </Suspense>
                Tools
              </li>
            </ul>
          </div>

          {/* Support & Legal */}
          <div>
            <h3 className="mb-3 text-sm font-semibold text-gray-100 uppercase tracking-wider">
              Support & Legal
            </h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li
                onClick={() => navigate("/about")}
                className="flex items-center gap-2 cursor-pointer hover:text-white transition-all justify-center sm:justify-start"
              >
                <Suspense fallback={<span>•</span>}>
                  <Info size={14} />
                </Suspense>
                About
              </li>
              <li
                onClick={() => navigate("/privacy-policy")}
                className="flex items-center gap-2 cursor-pointer hover:text-white transition-all justify-center sm:justify-start"
              >
                <Suspense fallback={<span>•</span>}>
                  <ShieldCheck size={14} />
                </Suspense>
                Privacy Policy
              </li>
              <li
                onClick={() => navigate("/terms")}
                className="flex items-center gap-2 cursor-pointer hover:text-white transition-all justify-center sm:justify-start"
              >
                <Suspense fallback={<span>•</span>}>
                  <Scale size={14} />
                </Suspense>
                Terms & Conditions
              </li>
              <li
                onClick={() => navigate("/contact")}
                className="flex items-center gap-2 cursor-pointer hover:text-white transition-all justify-center sm:justify-start"
              >
                <Suspense fallback={<span>•</span>}>
                  <Mail size={14} />
                </Suspense>
                Contact Us
              </li>
              <li
                onClick={() => navigate("/help")}
                className="flex items-center gap-2 cursor-pointer hover:text-white transition-all justify-center sm:justify-start"
              >
                <Suspense fallback={<span>•</span>}>
                  <MessageCircleQuestion size={14} />
                </Suspense>
                Help Center
              </li>
            </ul>
          </div>
        </div>

        {/* ===== Divider ===== */}
        <div className="my-8 border-t border-gray-600/30"></div>

        {/* ===== Bottom Section ===== */}
        <div className="flex flex-col items-center justify-between gap-3 sm:flex-row text-center sm:text-left">
          <p className="text-sm text-gray-400">
            © 2025{" "}
            <span className="font-semibold text-white">Viadocs</span>. All rights reserved.
          </p>
          <p className="text-xs text-gray-500">
            Designed & Developed by{" "}
            <a
              href="https://wwi.org.in"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-white hover:underline"
            >
              Work Wizards Innovations
            </a>
            .
          </p>
        </div>
      </div>
    </footer>
  );
}

export default React.memo(Footer);
