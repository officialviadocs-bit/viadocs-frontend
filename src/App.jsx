import React, { useEffect, Suspense, useState } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReactGA from "react-ga4"; // ✅ Google Analytics 4

// 🧠 Lazy Imports (Code Splitting)
const Home = React.lazy(() => import("./pages/Home"));
const Login = React.lazy(() => import("./pages/Login"));
const Signup = React.lazy(() => import("./pages/Signup"));
const CreateDoc = React.lazy(() => import("./pages/CreateDoc"));
const Profile = React.lazy(() => import("./pages/Profile"));
const Favorites = React.lazy(() => import("./pages/Favorites"));
const Tools = React.lazy(() => import("./pages/Tools"));
const DocAI = React.lazy(() => import("./pages/DocAI"));
const About = React.lazy(() => import("./pages/About"));
const Contact = React.lazy(() => import("./pages/Contact"));
const Feedback = React.lazy(() => import("./pages/Feedback"));
const HelpCenter = React.lazy(() => import("./pages/HelpCenter"));
const PrivacyPolicy = React.lazy(() => import("./pages/PrivacyPolicy"));
const ComingSoon = React.lazy(() => import("./pages/ComingSoon"));
const ForgotPassword = React.lazy(() => import("./pages/ForgotPassword"));
const Terms = React.lazy(() => import("./pages/Terms"));
const AdminDashboard = React.lazy(() => import("./pages/admin/AdminDashboard"));

// 🛠 Tool Pages (lazy)
const PdfToWord = React.lazy(() => import("./pages/tools/pdf-to-word"));
const WordToPdf = React.lazy(() => import("./pages/tools/word-to-pdf"));
const PdfMerge = React.lazy(() => import("./pages/tools/pdf-merge"));
const PdfSplit = React.lazy(() => import("./pages/tools/pdf-split"));
const PdfCompress = React.lazy(() => import("./pages/tools/pdf-compress"));
const ImageToPdf = React.lazy(() => import("./pages/tools/image-to-pdf"));
const PdfToImage = React.lazy(() => import("./pages/tools/pdf-to-image"));
const PasswordProtect = React.lazy(() => import("./pages/tools/password-protect"));
const UnlockPdf = React.lazy(() => import("./pages/tools/unlock-pdf"));
const ExcelToPdf = React.lazy(() => import("./pages/tools/excel-to-pdf"));
const PowerpointToPdf = React.lazy(() => import("./pages/tools/powerpoint-to-pdf"));

// 🌐 Loader Component (lazy)
const PageLoader = React.lazy(() => import("./components/PageLoader/PageLoader"));

// ✅ Initialize Google Analytics
ReactGA.initialize("G-DM9KZJCSF6");

// 🧩 Track user activity to backend
const trackUserActivity = async () => {
  const token = localStorage.getItem("token");
  if (!token) return;

  try {
    await fetch("http://viadocs.in//api/activity/track-usage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ duration: 5 }),
    });
  } catch (err) {
    console.warn("Activity tracking failed:", err);
  }
};

// ⚙️ Inner Component: handles GA + route changes + loader
function InnerApp() {
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  // 🔄 Show loader during route changes
  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => setLoading(false), 150);
    return () => clearTimeout(t);
  }, [location.pathname]);

  // 📊 Google Analytics page tracking
  useEffect(() => {
    ReactGA.send({
      hitType: "pageview",
      page: location.pathname + location.search,
    });
  }, [location]);

  // 🕒 Track user every 5 mins
  useEffect(() => {
    const interval = setInterval(trackUserActivity, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  // 🧠 Log initial activity after login
  useEffect(() => {
    if (localStorage.getItem("token")) trackUserActivity();
  }, []);

  return (
    <>
      <Suspense fallback={<div className="text-center py-16 text-gray-500">Loading...</div>}>
        {loading && (
          <Suspense fallback={null}>
            <PageLoader visible={true} />
          </Suspense>
        )}
        <Routes>
          {/* 🌐 General Pages */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={<Home />} />
          <Route path="/create-doc" element={<CreateDoc />} />
          <Route path="/doc/:id" element={<CreateDoc />} />
          <Route path="/doc/:id/edit" element={<CreateDoc />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/tools" element={<Tools />} />
          <Route path="/DocAI" element={<DocAI />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/help" element={<HelpCenter />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/coming-soon" element={<ComingSoon />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/terms" element={<Terms />} />

          {/* 🛡 Admin */}
          <Route path="/admin/*" element={<AdminDashboard />} />

          {/* 🧰 Tool Routes */}
          <Route path="/tools/pdf-to-word" element={<PdfToWord />} />
          <Route path="/tools/word-to-pdf" element={<WordToPdf />} />
          <Route path="/tools/pdf-merge" element={<PdfMerge />} />
          <Route path="/tools/pdf-split" element={<PdfSplit />} />
          <Route path="/tools/pdf-compress" element={<PdfCompress />} />
          <Route path="/tools/image-to-pdf" element={<ImageToPdf />} />
          <Route path="/tools/pdf-to-image" element={<PdfToImage />} />
          <Route path="/tools/password-protect" element={<PasswordProtect />} />
          <Route path="/tools/unlock-pdf" element={<UnlockPdf />} />
          <Route path="/tools/excel-to-pdf" element={<ExcelToPdf />} />
          <Route path="/tools/powerpoint-to-pdf" element={<PowerpointToPdf />} />
        </Routes>
      </Suspense>
    </>
  );
}

// 🚀 App Wrapper
function App() {
  return (
    <Router>
      <ToastContainer position="top-center" autoClose={2500} hideProgressBar={false} pauseOnHover theme="colored" />
      <Suspense fallback={<div className="text-center py-16 text-gray-500">Loading App...</div>}>
        <InnerApp />
      </Suspense>
    </Router>
  );
}

export default App;
