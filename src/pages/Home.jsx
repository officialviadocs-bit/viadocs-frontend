// src/pages/Home.jsx
import React, { useEffect, useState, useRef, useCallback } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import image1 from "../assets/image1.webp";
import image2 from "../assets/images2.webp";
import image3 from "../assets/image3.webp";
import viadocsVideo from "../assets/viadocs.mp4";
import {
  MoreVertical,
  Star,
  Eye,
  Edit,
  Share2,
  Trash2,
  Plus,
  Bookmark,
  FileCog,
  Sparkles,
  Bot,
} from "lucide-react";
import { jsPDF } from "jspdf";


// Animated typing text (same as before)
const texts = [
  "Use Viadocs\nto create your\nproject docs faster and smarter",
  "Use Viadocs\nto create your\nprofessional documents easily",
  "Use Viadocs\nto create your\ncollaborative workspaces quickly",
  "Use Viadocs\nto create your\nstructured content efficiently",
];

const AnimatedText = () => {
  const [currentText, setCurrentText] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [speed, setSpeed] = useState(80);
  const longestText = texts.reduce((a, b) => (a.length > b.length ? a : b));

  useEffect(() => {
    const handleTyping = () => {
      const fullText = texts[currentText];
      if (isDeleting) {
        setDisplayedText((prev) => prev.slice(0, -1));
        setSpeed(40);
      } else {
        setDisplayedText((prev) => fullText.slice(0, prev.length + 1));
        setSpeed(80);
      }

      if (!isDeleting && displayedText === fullText) {
        setTimeout(() => setIsDeleting(true), 1500);
      } else if (isDeleting && displayedText === "") {
        setIsDeleting(false);
        setCurrentText((prev) => (prev + 1) % texts.length);
      }
    };

    const timer = setTimeout(handleTyping, speed);
    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, currentText, speed]);

  return (
     <div className="relative min-h-[120px]">
      <h2 className="invisible text-2xl font-extrabold whitespace-pre-line lg:text-3xl">
        {longestText}
      </h2>
      <h2 className="absolute top-0 left-0 text-2xl font-extrabold leading-snug text-gray-900 whitespace-pre-line lg:text-3xl">
  <span className="text-black">{displayedText}</span>
</h2>

    </div>
  );
};

export default function Home() {
  const [docs, setDocs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleteInput, setDeleteInput] = useState("");
  const [roleModalOpen, setRoleModalOpen] = useState(false);
  const [loadingRoleSave, setLoadingRoleSave] = useState(false);
  const timeoutRef = useRef(null);
  const docsContainerRef = useRef(null);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const isLoggedIn = !!token;

  // Fetch docs
  const fetchDocs = useCallback(async () => {
    if (!isLoggedIn) return;
    try {
      const res = await axios.get("http://localhost:5000/api/docs/my-docs", {
        headers: { Authorization: `Bearer ${token}` },
      });
      // Support both res.data and res.data.docs
      setDocs(res.data?.docs ?? res.data ?? []);
    } catch (err) {
      console.error("Error fetching docs:", err);
      if (err.response && err.response.status === 401) {
        localStorage.removeItem("token");
        navigate("/login");
        return;
      }
      toast.error("Failed to load documents");
    }
  }, [token, isLoggedIn, navigate]);

  useEffect(() => {
    fetchDocs();
  }, [fetchDocs]);
  // Close dropdown on outside tap or scroll (mobile fix)
    useEffect(() => {
      const handleOutsideTouch = (e) => {
        const target = e.target;
        // if the click/touch was inside the docs container, don't close the dropdown
        if (docsContainerRef.current && docsContainerRef.current.contains(target)) {
          return;
        }
        setDropdownOpen(null);
      };
  
      const handleScroll = () => setDropdownOpen(null);
  
      document.addEventListener("touchstart", handleOutsideTouch);
      document.addEventListener("mousedown", handleOutsideTouch);
      document.addEventListener("scroll", handleScroll, true);
  
      return () => {
        document.removeEventListener("touchstart", handleOutsideTouch);
        document.removeEventListener("mousedown", handleOutsideTouch);
        document.removeEventListener("scroll", handleScroll, true);
      };
    }, []);

  // ---------- Role modal (first-time user) ----------
  // We check profile; if there's no role saved, prompt the user to choose
  useEffect(() => {
    const checkRole = async () => {
      if (!isLoggedIn) return;
      try {
        const res = await axios.get("http://localhost:5000/api/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.data.role) {
          // open role modal
          setRoleModalOpen(true);
        } else {
          // Role exists — ensure we store a quick client-side flag if wanted
          localStorage.setItem("userRole", res.data.role);
        }
      } catch (err) {
        console.error("Error checking profile role:", err);
        // if unauthorized -> redirect to login
        if (err.response && err.response.status === 401) {
          localStorage.removeItem("token");
          navigate("/login");
        }
      }
    };

    checkRole();
  }, [isLoggedIn, token, navigate]);

  const saveRole = async (role) => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }
    setLoadingRoleSave(true);
    try {
      // POST to set role; adjust endpoint to match your backend if needed
      const res = await axios.post(
        "http://localhost:5000/api/profile/role",
        { role },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.status === 200 || res.status === 201) {
        toast.success("Thanks — saved your role!");
        setRoleModalOpen(false);
        localStorage.setItem("userRole", role);
      } else {
        toast.error("Failed to set role. Try again.");
      }
    } catch (err) {
      console.error("Error saving role:", err);
      if (err.response && err.response.status === 401) {
        localStorage.removeItem("token");
        navigate("/login");
        return;
      }
      toast.error("Server error while saving role");
    } finally {
      setLoadingRoleSave(false);
    }
  };

  // ---------- Favorite toggle ----------
  const setFavorite = async (id) => {
    try {
      const res = await axios.patch(
        `http://localhost:5000/api/docs/my-docs/${id}/favorite`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setDocs((prev) =>
        prev.map((doc) => (doc._id === id ? { ...doc, favorite: res.data.favorite } : doc))
      );
      toast.success("Updated favorite");
    } catch (err) {
      console.error("Error toggling favorite:", err);
      if (err.response && err.response.status === 401) {
        localStorage.removeItem("token");
        navigate("/login");
        return;
      }
      toast.error("Failed to update favorite");
    }
  };

  // ---------- Share as PDF ----------
  const shareDocAsPDF = async (doc) => {
    try {
      const res = await axios.get(`http://localhost:5000/api/docs/my-docs/${doc._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const fullDoc = res.data;
      const pdf = new jsPDF("p", "pt", "a4");
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(18);
      pdf.text(fullDoc.name, 40, 50);
      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(12);
      await pdf.html(fullDoc.content || "<p></p>", {
        x: 40,
        y: 80,
        width: 500,
        windowWidth: 800,
      });

      const pdfBlob = pdf.output("blob");
      const pdfFile = new File([pdfBlob], `${fullDoc.name}.pdf`, {
        type: "application/pdf",
      });

      if (navigator.share && navigator.canShare && navigator.canShare({ files: [pdfFile] })) {
        await navigator.share({
          title: fullDoc.name,
          text: "Sharing my Viadocs document",
          files: [pdfFile],
        });
      } else {
        pdf.save(`${fullDoc.name}.pdf`);
        alert("Sharing not supported — PDF downloaded instead");
      }
    } catch (err) {
      console.error("Error sharing doc:", err);
      if (err.response && err.response.status === 401) {
        localStorage.removeItem("token");
        navigate("/login");
        return;
      }
      toast.error("Failed to share document");
    }
  };

  // ---------- Dropdown handlers ----------
  const toggleDropdown = (id, e) => {
    // stopPropagation might already be handled at click site; keep safe here
    if (e) e.stopPropagation();
    clearTimeout(timeoutRef.current);
    setDropdownOpen((prev) => (prev === id ? null : id));
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setDropdownOpen(null), 300);
  };

  // ---------- Navigation helper (ensures login) ----------
  const handleNav = (path) => {
    if (isLoggedIn) navigate(path);
    else navigate("/login");
  };

  // ---------- Delete flow ----------
  const confirmDelete = async () => {
    if (!deleteTarget || deleteInput !== deleteTarget.name) return;
    try {
      await axios.delete(`http://localhost:5000/api/docs/my-docs/${deleteTarget._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setDeleteTarget(null);
      setDeleteInput("");
      fetchDocs();
      toast.success("Document deleted");
    } catch (err) {
      console.error("Error deleting doc:", err);
      if (err.response && err.response.status === 401) {
        localStorage.removeItem("token");
        navigate("/login");
        return;
      }
      toast.error("Failed to delete document");
    }
  };

  // ---------- Helper: formatted date ----------
  const formatDate = (dateVal) => {
    if (!dateVal) return "-";
    try {
      return new Date(dateVal).toLocaleDateString();
    } catch {
      return String(dateVal).split("T")[0];
    }
  };

  // ---------- AdSense injection (minimal, defensive) ----------
  useEffect(() => {
    const containerId = "container-c152ce441ed68e2ebb08bdbddefa4fac";
    let container = document.getElementById(containerId);
    if (!container) {
      container = document.createElement("div");
      container.id = containerId;
      // place the container near the end of body if not found in JSX
      document.body.appendChild(container);
    }
    const script = document.createElement("script");
    script.async = true;
    script.setAttribute("data-cfasync", "false");
    script.src = "//pl27986002.effectivegatecpm.com/c152ce441ed68e2ebb08bdbddefa4fac/invoke.js";
    container.parentNode.insertBefore(script, container.nextSibling);
    return () => {
      script.remove();
      // keep the container (if you prefer removing when unmounting uncomment next line)
      // container.remove();
    };
  }, []);

  return (
    // Outer wrapper is full width so background and footer span the entire viewport
    <div ref={docsContainerRef} className="flex flex-col min-h-screen bg-white w-full">
      {/* make this a flex column and allow it to grow so `main.flex-1` can push footer to bottom */}
      <div className="flex flex-col flex-1 w-full">
        <Header />
      <main className="flex-1 px-6 pb-0 pt-20 sm:pt-28"> {/* Added top padding for header height */}

        <div className="max-w-6xl mx-auto">
          {/* Welcome Section */}
          <div className="p-8 mb-10 text-center bg-white border border-gray-200 shadow-lg rounded-2xl">
            <h2 className="text-3xl font-extrabold text-gray-900">
              Welcome to <span className="text-black">Viadocs</span>
            </h2>
            <p className="mt-3 text-lg text-gray-600">
              Create professional documents, collaborate with your team, and
              manage projects efficiently.
            </p>

            {!isLoggedIn && (
              <div className="flex flex-col items-center justify-center gap-3 mt-8 sm:flex-row sm:gap-6">
                <button
                  onClick={() => navigate("/login")}
                  className="px-5 py-2 text-sm font-medium text-white transition-all rounded-full shadow-md bg-black hover:bg-gray-800 hover:shadow-lg sm:px-6 sm:py-2 sm:text-base"
                >
                  Get Started - Login
                </button>
                <button
                  onClick={() => navigate("/signup")}
                  className="px-5 py-2 text-sm font-medium text-black transition-all border border-gray-300 rounded-full bg-white shadow-sm hover:bg-black hover:text-white hover:shadow-md sm:px-6 sm:py-2 sm:text-base"
                >
                  Create Account
                </button>
              </div>
            )}
          </div>
         
          

          {/* ===== Compact Hero Section ===== */}
          <section className="relative p-8 sm:p-12 mb-10 text-center rounded-2xl shadow-lg bg-white border border-[#E0ECFF] overflow-hidden">
  {/* Floating accent gradient circles */}
  <div className="absolute -top-10 -left-10 w-40 h-40 bg-gray-100/40 rounded-full blur-3xl animate-pulse-slow"></div>
  <div className="absolute -bottom-10 -right-10 w-52 h-52 bg-gray-100/40 rounded-full blur-3xl animate-pulse-slow delay-200"></div>

  <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center justify-center">
    <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-3 leading-tight">
      Simplify Your <span className="text-black">Document Work</span>
    </h1>

    <p className="max-w-xl text-sm sm:text-base text-gray-600 mb-6 px-4">
      Convert, Edit, Merge, and Protect PDFs — all in one
      <span className="text-black font-semibold"> AI-powered workspace</span>.
    </p>

    {/* Action Buttons */}
    <div className="flex flex-wrap justify-center gap-3">
      <button
        onClick={() => navigate("/tools")}
        className="px-5 py-2 sm:px-6 sm:py-2.5 rounded-full text-white bg-black hover:bg-gray-800 hover:scale-105 hover:shadow-md transition-all text-sm sm:text-base font-medium"
      >
        Try Tools
      </button>

      <button
        onClick={() => navigate("/about")}
        className="px-5 py-2 sm:px-6 sm:py-2.5 rounded-full border border-gray-300 text-black bg-white hover:bg-black hover:text-white hover:scale-105 transition-all text-sm sm:text-base font-medium"
      >
        Learn More
      </button>
    </div>

    {/* Sub caption */}
    <div className="mt-6 text-xs sm:text-sm text-gray-500">
      Start creating smarter — no sign-up required.
    </div>
  </div>
</section>


          


          {/* Top Section */}
          <div className="grid grid-cols-1 gap-6 mb-12 lg:grid-cols-2">
            <div className="flex gap-4 p-6 bg-white border border-gray-200 shadow-md rounded-2xl">
                <div
                onClick={() => handleNav("/create-doc")}
                className="flex flex-col items-center justify-center flex-1 p-8 transition-all duration-300 border-2 border-dashed cursor-pointer rounded-xl border-gray-200 hover:border-white hover:bg-gray-900 hover:text-white group group-hover:bg-gray-900 group-hover:text-white group-hover:border-white active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-black"
              >
                <div className="flex items-center justify-center w-20 h-20 mb-4 transition-colors duration-200 rounded-full bg-gray-50 group-hover:bg-white hover:bg-white">
                  <Plus strokeWidth={3} className="w-10 h-10 text-black group-hover:text-black hover:text-black transition-colors duration-200" />
                </div>
                <p className="text-lg font-semibold text-gray-900 group-hover:text-white hover:text-white transition-colors duration-200">
                  Create a Doc
                </p>
              </div>

              <div className="flex flex-col w-1/2 gap-4">
                <div
                  onClick={() => handleNav("/favorites")}
                  className="flex flex-col items-center justify-center flex-1 p-4 transition-all duration-300 border cursor-pointer rounded-xl border-gray-200 hover:border-white hover:bg-gray-900 hover:text-white group group-hover:bg-gray-900 group-hover:text-white group-hover:border-white active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-black"
                >
                  <Bookmark strokeWidth={3} className="mb-2 w-7 h-7 text-black group-hover:text-white hover:text-white transition-colors duration-200" />
                  <p className="text-sm font-semibold text-gray-900 group-hover:text-white hover:text-white transition-colors duration-200">
                    Favorites
                  </p>
                </div>

                <div
                  onClick={() => handleNav("/tools")}
                  className="flex flex-col items-center justify-center flex-1 p-4 transition-all duration-300 border cursor-pointer rounded-xl border-gray-200 hover:border-white hover:bg-gray-900 hover:text-white group group-hover:bg-gray-900 group-hover:text-white group-hover:border-white active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-black"
                >
                  <FileCog strokeWidth={3} className="mb-2 w-7 h-7 text-black group-hover:text-white hover:text-white transition-colors duration-200" />
                  <p className="text-sm font-semibold text-gray-900 group-hover:text-white hover:text-white transition-colors duration-200">
                    Tools
                  </p>
                </div>
              </div>
            </div>

            {/* AI Section */}
              <div
                className="relative p-8 overflow-hidden border shadow-lg bg-white border-gray-200 rounded-2xl min-h-[240px] flex flex-col justify-between group cursor-pointer hover:shadow-2xl transition-all"
                onClick={() => handleNav("/DocAI")}
              >
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute w-32 h-32 rounded-full bg-gray-100/30 blur-2xl animate-float top-10 left-10"></div>
                <div className="absolute w-40 h-40 rounded-full bg-gray-100/30 blur-3xl animate-float-delayed bottom-10 right-10"></div>
                <div className="absolute w-24 h-24 rounded-full bg-gray-100/20 blur-xl animate-float-slow top-20 right-20"></div>
              </div>

                <div className="absolute z-20 flex flex-col items-center top-4 right-4">
                <Bot className="w-12 h-12 text-black drop-shadow-lg animate-bounce-slow" />
                <span className="mt-1 text-sm font-bold text-gray-800">Docxy</span>
              </div>

              <div className="relative z-10 max-w-md">
                <AnimatedText />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNav("/DocAI");
                  }}
                  className="inline-flex items-center gap-2 px-6 py-3 mt-6 font-medium text-white transition-all bg-black rounded-full shadow-md hover:bg-gray-800 active:bg-black"
                >
                    <Sparkles className="w-5 h-5 text-white animate-pulse" />
                  <span>Make me a Project Documentation ...</span>
                </button>
              </div>
            </div>
          </div>

          {/* Ad container required by the vendor script */}
      <div id="container-c152ce441ed68e2ebb08bdbddefa4fac" />
      {/* Delete confirmation modal - requires typing doc name */}

          {/* Document List */}
          {isLoggedIn && (
            <div className="mt-6 mb-0 border-t-2 border-gray-200"> {/* Added mb-0 */}
              {/* Search bar for documents */}
              <div className="mb-6">
            <div className="flex items-center justify-between gap-4 px-4 py-3 bg-white rounded-lg shadow-sm">
                  <div className="relative flex-1">
                    <svg
                      className="absolute w-4 h-4 text-gray-400 -translate-y-1/2 left-3 top-1/2"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                    <input
                      type="search"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search documents..."
                      className="w-full sm:max-w-md pl-10 pr-4 py-2 text-sm bg-white border border-gray-200 rounded-lg hover:border-black focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent shadow-sm transition-colors"
                    />
                  </div>
                    <div className="flex items-center gap-2 text-sm">
                    <span className="text-gray-500">No. of docs:</span>
                    <span className="font-medium text-black">{docs.length}</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm">
                {/* Desktop Header */}
                <div className="hidden sm:grid grid-cols-[60px,1fr,140px,80px] md:grid-cols-[80px,1fr,180px,100px] font-semibold bg-white text-gray-700 py-3 px-2 sm:px-4 rounded-t-lg">
                  <span className="text-xs text-center md:text-sm">S. No</span>
                  <span className="text-xs md:text-sm">Name</span>
                  <span className="pr-2 text-xs text-right md:text-sm">Date Created</span>
                  <span className="text-xs text-right md:text-sm">Actions</span>
                </div>

                {/* Mobile Header */}
                    <div className="grid grid-cols-[1fr,80px] sm:hidden font-semibold bg-white text-gray-700 py-3 px-3 rounded-t-lg">
                  <span className="text-sm">Document</span>
                  <span className="text-sm text-right">Actions</span>
                </div>

                {/* Document List Content */}

                {docs.filter(d => d.name && d.name.toLowerCase().includes(searchQuery.toLowerCase())).length === 0 ? (
                  <div className="px-3 py-4 text-sm text-gray-500 border-b">No documents found.</div>
                ) : (
                  docs
                    .filter((d) => d.name && d.name.toLowerCase().includes(searchQuery.toLowerCase()))
                    .map((doc, i) => (
                    <div key={doc._id}>
                      {/* Desktop Row */}
                      <div className="hidden sm:grid grid-cols-[60px,1fr,140px,80px] md:grid-cols-[80px,1fr,180px,100px] items-center py-3 px-2 sm:px-4 border-b text-sm transition-all group hover:bg-gray-100"
                        >
                          <span className="text-xs text-center md:text-sm text-black group-hover:text-gray-700">{i + 1}</span>

                          <span
                            className="flex items-center gap-1 pr-2 text-xs font-medium text-black truncate md:text-sm group-hover:text-gray-700"
                            title={doc.name}
                          >
                            <span
                              className="truncate cursor-pointer"
                              onClick={(e) => {
                                e.stopPropagation();
                                navigate(`/doc/${doc._id}`);
                              }}
                            >
                              {doc.name}
                            </span>
                            {doc.favorite && <Star size={14} className="flex-shrink-0 text-yellow-400 fill-yellow-400" />}
                          </span>

                          <span className="pr-2 text-xs text-right text-gray-600 md:text-sm text-black group-hover:text-gray-700">
                            {formatDate(doc.createdAt || doc.created_at)}
                          </span>

                        <span className="relative flex justify-end">
                          <button
                            className="p-1 rounded text-gray-700 hover:bg-gray-200 group-hover:text-white"
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleDropdown(doc._id, e);
                            }}
                            aria-haspopup="true"
                            aria-expanded={dropdownOpen === doc._id}
                            title="More actions"
                          >
                            <MoreVertical size={16} />
                          </button>

                          {dropdownOpen === doc._id && (
                              <div
                              className="doc-dropdown absolute right-0 z-50 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg w-44 animate-fadeIn"
                              onMouseLeave={handleMouseLeave}
                              onClick={(e) => e.stopPropagation()}
                              onTouchStart={(e) => e.stopPropagation()}
                            >
                            <button
                              type="button"
                              className="flex items-center w-full gap-2 px-3 py-2 text-sm hover:bg-gray-100 hover:text-black"
                              onClick={(e) => {
                                e.stopPropagation();
                                console.log('Home: View clicked', doc._id);
                                navigate(`/doc/${doc._id}`);
                                setDropdownOpen(null);
                              }}
                            >
                              <Eye size={14} /> View
                            </button>
                            <button
                              type="button"
                              className="flex items-center w-full gap-2 px-3 py-2 text-sm hover:bg-gray-100 hover:text-black"
                              onClick={(e) => {
                                e.stopPropagation();
                                console.log('Home: Edit clicked', doc._id);
                                navigate(`/doc/${doc._id}/edit`);
                                setDropdownOpen(null);
                              }}
                            >
                              <Edit size={14} /> Edit
                            </button>
                            <button
                              type="button"
                              className="flex items-center w-full gap-2 px-3 py-2 text-sm hover:bg-gray-100 hover:text-black"
                              onClick={(e) => {
                                e.stopPropagation();
                                console.log('Home: Favorite clicked', doc._id);
                                setFavorite(doc._id);
                                setDropdownOpen(null);
                              }}
                            >
                              <Star
                                size={14}
                                className={doc.favorite ? "text-yellow-400 fill-yellow-400" : "text-gray-500"}
                              />{" "}
                              Favorite
                            </button>
                            <button
                              type="button"
                              className="flex items-center w-full gap-2 px-3 py-2 text-sm hover:bg-gray-100 hover:text-black"
                              onClick={(e) => {
                                e.stopPropagation();
                                console.log('Home: Share clicked', doc._id);
                                shareDocAsPDF(doc);
                                setDropdownOpen(null);
                              }}
                            >
                              <Share2 size={14} /> Share
                            </button>
                            <button
                              type="button"
                              className="flex items-center w-full gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                              onClick={(e) => {
                                e.stopPropagation();
                                console.log('Home: Delete clicked', doc._id);
                                setDeleteTarget(doc);
                                setDeleteInput("");
                                setDropdownOpen(null);
                              }}
                            >
                              <Trash2 size={14} /> Delete
                            </button>
                          </div>
                        )}
                      </span>
                      </div>

                      {/* Mobile Row */}
                      <div className="grid grid-cols-[1fr,80px] sm:hidden items-start py-3 px-3 border-b transition-all gap-2 group hover:bg-gray-100">
                        <div className="flex flex-col gap-1">
                          <div className="flex items-center gap-1">
                            <span
                              className="font-medium text-black text-sm truncate max-w-[200px] cursor-pointer group-hover:text-gray-700"
                              title={doc.name}
                              onClick={(e) => {
                                e.stopPropagation();
                                navigate(`/doc/${doc._id}`);
                              }}
                            >
                              {doc.name}
                            </span>
                            {doc.favorite && <Star size={12} className="flex-shrink-0 text-yellow-400 fill-yellow-400" />}
                          </div>
                          <span className="text-xs text-gray-500 group-hover:text-gray-700">{formatDate(doc.createdAt || doc.created_at)}</span>
                        </div>

                        <span className="relative flex items-start justify-end">
                          <button
                            className="p-1 rounded text-gray-700 hover:bg-gray-200 group-hover:text-white"
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleDropdown(doc._id, e);
                            }}
                            aria-haspopup="true"
                            aria-expanded={dropdownOpen === doc._id}
                            title="More actions"
                          >
                            <MoreVertical size={16} />
                          </button>

                          {dropdownOpen === doc._id && (
                            <div
                              className="absolute right-0 z-50 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg w-44 animate-fadeIn"
                              onMouseLeave={handleMouseLeave}
                              onClick={(e) => e.stopPropagation()}
                              onTouchStart={(e) => e.stopPropagation()}
                            >
                              <button
                                type="button"
                                className="flex items-center w-full gap-2 px-3 py-2 text-sm hover:bg-gray-100 hover:text-black"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  console.log('Home mobile: View clicked', doc._id);
                                  navigate(`/doc/${doc._id}`);
                                  setDropdownOpen(null);
                                }}
                              >
                                <Eye size={14} /> View
                              </button>
                              <button
                                type="button"
                                className="flex items-center w-full gap-2 px-3 py-2 text-sm hover:bg-gray-100 hover:text-black"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  console.log('Home mobile: Edit clicked', doc._id);
                                  navigate(`/doc/${doc._id}/edit`);
                                  setDropdownOpen(null);
                                }}
                              >
                                <Edit size={14} /> Edit
                              </button>
                              <button
                                type="button"
                                className="flex items-center w-full gap-2 px-3 py-2 text-sm hover:bg-gray-100 hover:text-black"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  console.log('Home mobile: Favorite clicked', doc._id);
                                  setFavorite(doc._id);
                                  setDropdownOpen(null);
                                }}
                              >
                                <Star size={14} className={doc.favorite ? "text-yellow-400 fill-yellow-400" : "text-gray-500"} /> Favorite
                              </button>
                              <button
                                type="button"
                                className="flex items-center w-full gap-2 px-3 py-2 text-sm hover:bg-gray-100 hover:text-black"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  console.log('Home mobile: Share clicked', doc._id);
                                  shareDocAsPDF(doc);
                                  setDropdownOpen(null);
                                }}
                              >
                                <Share2 size={14} /> Share
                              </button>
                              <button
                                type="button"
                                className="flex items-center w-full gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  console.log('Home mobile: Delete clicked', doc._id);
                                  setDeleteTarget(doc);
                                  setDeleteInput("");
                                  setDropdownOpen(null);
                                }}
                              >
                                <Trash2 size={14} /> Delete
                              </button>
                            </div>
                          )}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
          </div>
        </main>
      </div>
      {/* Ad container required by the vendor script */}
      <div id="container-c152ce441ed68e2ebb08bdbddefa4fac" />
      {/* Delete confirmation modal - requires typing doc name */}

{/* ===== Folder Creation Video Section (Perfect Rectangle) ===== */}
<section className="w-full px-4 py-12 bg-white text-center border-t border-[#E0ECFF]">
  <h2 className="text-2xl sm:text-3xl font-extrabold text-black mb-6">
     How Viadocs Works
  </h2>

  <div className="flex justify-center">
    {/* ✅ Perfect rectangle video wrapper */}
    <div className="w-full max-w-5xl bg-black rounded-lg overflow-hidden shadow-2xl">
      <video
        src={viadocsVideo} // ⚠️ make sure you imported: import viadocsVideo from "../assets/viadocs.mp4";
        autoPlay
        muted
        loop
        playsInline
        controls
        onClick={(e) => (e.target.muted = !e.target.muted)}
        className="w-full h-auto aspect-video object-fill rounded-none"
      />
    </div>
  </div>

  <p className="mt-3 text-sm text-gray-600">
    (Click the 🔈 icon to unmute and listen with sound)
  </p>
</section>

      
{/* ===== Viadocs Features Section ===== */}
<section className="mt-0 py-16 bg-white text-center"> {/* Added mt-0 */}
  <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-800 mb-6">
    Work Smarter with <span className="text-black">Viadocs</span>
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
        <div className="p-3 rounded-xl bg-gray-50 shadow-inner">
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
        <div className="p-3 rounded-xl bg-gray-50 shadow-inner">
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
        <div className="p-3 rounded-xl bg-gray-50 shadow-inner">
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
<section className="py-16 bg-white text-center">
  <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-800 mb-4">
    Unlock More with <span className="text-black">Viadocs Premium</span>
  </h2>

  <p className="max-w-3xl mx-auto text-gray-600 text-base sm:text-lg mb-8 px-4">
    Upgrade to Viadocs Premium for faster performance, unlimited AI usage, 
    and advanced document tools — designed to empower your work and studies.
  </p>

  {/* Premium Button (Disabled) */}
    <div className="relative inline-block group">
    <button
      disabled
      className="px-6 py-3 font-semibold rounded-full bg-black text-white shadow-md opacity-90 cursor-not-allowed group-hover:opacity-100 transition-all"
    >
      Go Premium
    </button>

    {/* Tooltip */}
    <div className="absolute left-1/2 -translate-x-1/2 mt-2 px-3 py-1 text-sm text-white bg-gray-800 rounded-md opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap">
      Coming Soon
    </div>
  </div>
</section>

      
        <section className="py-16 text-center bg-white">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-800 mb-4">
            Built for Engineering Students & Employees
          </h2>
          <p className="max-w-2xl mx-auto text-gray-600 mb-10 px-4">
            I'm a fresher who built <span className="text-black font-semibold">Viadocs</span> 
            for engineering students and professionals — making document creation, editing, 
            and PDF tools smarter and easier to use.
          </p>
        </section>

        {/* ===== Why Viadocs is Used by Engineering Students and Employees ===== */}
          <section className="py-16 bg-white text-left border-t border-gray-100">
            <div className="max-w-6xl mx-auto px-6">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-black mb-8">
              Why <span className="text-black">Viadocs</span> is Used by Engineering Students and Employees
                </h2>

              <p className="text-gray-600/80 text-base sm:text-lg leading-relaxed mb-6">
            Viadocs was designed with one clear goal — to make documentation simple, smart, and accessible for everyone.
            Whether you are an engineering student preparing lab reports and project documentation, or an employee
            handling PDFs, proposals, and presentations, Viadocs acts as your intelligent workspace powered by modern
            AI. It bridges the gap between learning and professional productivity by providing fast, reliable, and
            customizable tools in one place.
              </p>

              <h3 className="text-2xl font-semibold text-black mt-10 mb-4">For Engineering Students</h3>
              <p className="text-gray-600/80 text-base sm:text-lg leading-relaxed mb-6">
            Engineering students handle massive documentation work — from project abstracts to final year reports,
            mini-project documentation, and research paper submissions. Viadocs simplifies this entire process.
            Students can create, edit, merge, and convert PDFs without worrying about formatting or complex software.
            Using the built-in AI assistant, they can generate project summaries, technical write-ups, and even
            auto-formatted reports in a few clicks. The goal is to save time so students can focus on innovation,
            coding, and creativity instead of repetitive documentation.
              </p>

              <ul className="max-w-4xl list-disc list-inside text-gray-600/80 space-y-2">
            <li>Create IEEE-style or academic project documentation with ease.</li>
            <li>Auto-generate content for abstracts, introductions, and conclusions using AI.</li>
            <li>Use Viadocs' PDF tools to combine circuit diagrams, reports, and code snippets into one file.</li>
            <li>Save time during submissions with instant PDF converters and compressors.</li>
            <li>Access all documents anywhere — everything is cloud-based and secure.</li>
              </ul>

              <h3 className="text-2xl font-semibold text-black mt-10 mb-4">For Employees and Professionals</h3>
              <p className="text-gray-600/80 text-base sm:text-lg leading-relaxed mb-6">
            In a corporate or startup environment, time is money. Employees often juggle between document edits,
            proposal formatting, client reports, and PDF conversions. Viadocs brings professional document management
            to the browser — no installation needed. Users can create technical documentation, HR reports, financial
            summaries, and business proposals faster with automation and consistency. The AI features reduce manual
            editing and repetitive phrasing, while cloud sync ensures files are never lost.
              </p>

              <ul className="max-w-4xl list-disc list-inside text-gray-600/80 space-y-2">
            <li>Generate professional reports and company documents in minutes.</li>
            <li>Use secure PDF tools to protect, unlock, or e-sign files.</li>
            <li>Collaborate with teammates easily by sharing editable docs.</li>
            <li>Eliminate dependency on expensive licensed software.</li>
            <li>Boost productivity with AI-based proofreading and summarization tools.</li>
              </ul>

              <h3 className="text-2xl font-black text-black mt-10 mb-4">Bridging Learning and Industry</h3>
              <p className="text-gray-600/80 text-base sm:text-lg leading-relaxed mb-6">
            Viadocs is not just another PDF tool — it is an ecosystem built by students for the next generation of
            creators and professionals. Engineering students today are tomorrow's engineers, developers, and
            entrepreneurs. By using Viadocs early in their academic journey, they learn professional documentation
            standards, technical formatting, and digital presentation skills that directly translate into workplace
            efficiency.
              </p>

              <h3 className="text-2xl font-semibold text-black mt-10 mb-4">Security and Data Privacy</h3>
              <p className="text-gray-600/80 text-base sm:text-lg leading-relaxed mb-6">
            Viadocs understands the importance of security in academic and corporate environments. Every document
            uploaded is encrypted and processed securely. We don't store personal files for AI learning or external
            training — your data is yours. Employees can manage confidential contracts or technical data without
            worrying about leaks. Students can upload academic documents safely without fear of plagiarism exposure.
              </p>

              <h3 className="text-2xl font-semibold text-black mt-10 mb-4">AI That Understands You</h3>
              <p className="text-gray-600/80 text-base sm:text-lg leading-relaxed mb-6">
            Viadocs' integrated AI assistant, Docxy, acts like your personal documentation partner. You can ask Docxy
            to generate code documentation, format project titles, summarize lengthy notes, or explain technical
            concepts. Unlike generic tools, it's fine-tuned for engineering and office documentation, ensuring
            precision and relevance.
              </p>

              <h3 className="text-2xl font-black text-black mt-10 mb-4">Empowering Indian Engineering Education</h3>
              <p className="text-gray-600/80 text-base sm:text-lg leading-relaxed mb-6">
            Viadocs was proudly built by young Indian engineers to support the next generation of innovators. Many
            Indian students face challenges preparing academic documentation — from project reports to internship
            certificates. Viadocs provides ready-to-use templates, automated formatting, and grammar-checked content
            so that even first-year students can prepare polished submissions without external help.
              </p>

              <h3 className="text-2xl font-black text-black mt-10 mb-4">Built for the Future</h3>
              <p className="text-gray-600/80 text-base sm:text-lg leading-relaxed mb-6">
            Viadocs is continuously evolving. Future updates include real-time team collaboration, cloud document
            storage, AI plagiarism checks, and voice-based report generation. The aim is to make Viadocs not just a
            tool but a digital companion for modern education and professional life.
              </p>

              <h3 className="text-2xl font-black text-black mt-10 mb-4">In Summary</h3>
              <p className="text-gray-600/80 text-base sm:text-lg leading-relaxed mb-10">
            Viadocs unites simplicity, power, and intelligence. For students, it transforms the boring parts of
            documentation into creativity. For employees, it replaces multiple tools with one secure platform.
            Whether you are writing your final year project or drafting your next proposal, Viadocs saves your time
            and improves your output — intelligently.
              </p>

              <p className="text-gray-500/80 text-sm italic">
            "Smart documentation leads to smart innovation." – The Viadocs Vision
              </p>
            </div>
          </section>
        <section className="py-16 bg-white text-center border-t border-gray-100">
          <div className="max-w-5xl mx-auto px-6">
            <h2 className="text-3xl font-extrabold text-black mb-6">
            Frequently Asked <span className="text-black font-black">Questions</span>
              </h2>

            <div className="space-y-6 text-left text-gray-600 text-base sm:text-lg">
          <div>
            <h3 className="font-semibold text-black">1. Is Viadocs free to use?</h3>
            <p>
              Yes, Viadocs offers a completely free plan that allows users to create and manage 
              their documents without any charges. Premium plans are optional for advanced AI tools 
              and faster processing.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-black">2. Who can use Viadocs?</h3>
            <p>
              Viadocs is built mainly for engineering students, professionals, teachers, and 
              employees who need efficient tools for project documentation, PDF editing, and AI assistance.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-black">3. Is my data safe on Viadocs?</h3>
            <p>
              Absolutely. Viadocs ensures all uploads are encrypted and stored securely. 
              We never share your data for AI training or external analysis.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-black">4. Does Viadocs work on mobile?</h3>
            <p>
              Yes, Viadocs is fully responsive and works smoothly on mobile, tablet, and desktop devices.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-black">5. How is Viadocs different from other PDF tools?</h3>
            <p>
              Unlike ordinary PDF tools, Viadocs is AI-powered and built by engineers for engineers. 
              It helps you create complete documentation — not just convert files.
            </p>
          </div>
            </div>
          </div>
        </section>

          <Footer />
          {/* Ad container required by the vendor script */}
      <div id="container-c152ce441ed68e2ebb08bdbddefa4fac" />
      {/* Delete confirmation modal - requires typing doc name */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
            <h2 className="mb-2 text-lg font-semibold">Confirm deletion</h2>
            <p className="mb-3 text-sm text-gray-600">
              To permanently delete <strong>{deleteTarget.name}</strong>, type the document name below and click <strong>Delete</strong>.
            </p>
            <input
              type="text"
              value={deleteInput}
              onChange={(e) => setDeleteInput(e.target.value)}
              placeholder={deleteTarget.name}
              className="w-full px-3 py-2 mb-4 border rounded border-gray-200"
            />
            <div className="flex justify-end gap-3">
              <button
                className="px-4 py-2 bg-gray-100 rounded hover:bg-gray-200"
                onClick={() => {
                  setDeleteTarget(null);
                  setDeleteInput("");
                }}
              >
                Cancel
              </button>
              <button
                className={`px-4 py-2 text-white rounded ${deleteInput === deleteTarget.name ? "bg-red-600 hover:bg-red-700" : "bg-red-300 cursor-not-allowed"}`}
                onClick={() => confirmDelete()}
                disabled={deleteInput !== deleteTarget.name}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Role selection modal (first-time users) */}
      {roleModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="w-full max-w-lg p-6 bg-white rounded-lg shadow-lg">
            <h2 className="mb-2 text-xl font-semibold">Welcome to Viadocs!</h2>
            <p className="mb-4 text-sm text-gray-600">
              To give you a tailored experience, are you a <strong>Student</strong> or an <strong>Employee</strong>?
            </p>
            <div className="flex gap-3 mb-4">
              <button
                onClick={() => saveRole("student")}
                className="flex-1 px-4 py-2 font-semibold text-white rounded bg-black hover:bg-gray-800"
                disabled={loadingRoleSave}
              >
                I'm a Student
              </button>
              <button
                onClick={() => saveRole("employee")}
                className="flex-1 px-4 py-2 font-semibold text-black rounded border border-gray-300 bg-white hover:bg-black hover:text-white"
                disabled={loadingRoleSave}
              >
                I'm an Employee
              </button>
            </div>
            <div className="text-xs text-gray-500">
              You can update this later in your profile settings.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}