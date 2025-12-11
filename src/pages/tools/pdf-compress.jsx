import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Upload,
  Download,
  File,
  Loader2,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import Header from "../../components/Header/Header";

import axios from "axios";

export default function PdfCompress() {
  const [file, setFile] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [error, setError] = useState(null);
  const [downloadUrl, setDownloadUrl] = useState(null);
  const [resultInfo, setResultInfo] = useState(null);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const getToken = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Session expired. Please login again.");
      navigate("/login");
      return null;
    }
    return token;
  };

  const handleFileSelect = (selectedFile) => {
    if (selectedFile.type !== "application/pdf") {
      setError("Please select a valid PDF file");
      return;
    }
    if (selectedFile.size > 20 * 1024 * 1024) {
      setError("File size must be less than 20MB");
      return;
    }
    setFile(selectedFile);
    setError(null);
    setIsComplete(false);
    setResultInfo(null);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) handleFileSelect(droppedFile);
  };

  const handleFileInput = (e) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) handleFileSelect(selectedFile);
  };

  const processFile = async (mode) => {
    if (!file) return;
    const token = getToken();
    if (!token) return;

    setIsProcessing(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("mode", mode);

      const response = await axios.post(
        "http://localhost:5000/api/tools/pdf-compress",
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
          responseType: "blob",
        }
      );

      const originalSize = response.headers["x-original-size-mb"];
      const compressedSize = response.headers["x-compressed-size-mb"];
      setResultInfo({ originalSize, compressedSize });

      const url = URL.createObjectURL(new Blob([response.data]));
      setDownloadUrl(url);
      setIsComplete(true);
    } catch (err) {
      console.error("Compression error:", err);
      if (err.response && err.response.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        alert("Session expired. Please login again.");
        navigate("/login");
        return;
      }
      setError("Failed to compress PDF. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const downloadFile = () => {
    if (downloadUrl && file) {
      const a = document.createElement("a");
      a.href = downloadUrl;
      const name = file.name.replace(/\.pdf$/i, "-compressed.pdf");
      a.download = name;
      a.click();
    }
  };

  const resetTool = () => {
    setFile(null);
    setIsProcessing(false);
    setIsComplete(false);
    setError(null);
    setResultInfo(null);
    if (downloadUrl) URL.revokeObjectURL(downloadUrl);
    setDownloadUrl(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  useEffect(() => {
    const containerId = "container-c152ce441ed68e2ebb08bdbddefa4fac";
    let container = document.getElementById(containerId);
    if (!container) {
      container = document.createElement("div");
      container.id = containerId;
      document.body.appendChild(container);
    }
    if (!document.querySelector(`script[data-cfasync][src*="effectivegatecpm.com"]`)) {
      const script = document.createElement("script");
      script.async = true;
      script.setAttribute("data-cfasync", "false");
      script.src =
        "//pl27986002.effectivegatecpm.com/c152ce441ed68e2ebb08bdbddefa4fac/invoke.js";
      container.parentNode.insertBefore(script, container.nextSibling);
      return () => script.remove();
    }
    return undefined;
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-white text-black">
      <Header />

      <main className="flex-1 px-6 pb-0 pt-20 sm:pt-28">
        <div className="max-w-4xl mx-auto">
          {/* 🔙 Back button */}
          <div className="flex justify-start mb-8">
            <button
              onClick={() => navigate("/tools")}
              className="flex items-center gap-2 px-4 py-2 text-white transition-all rounded-lg shadow-md bg-black hover:bg-gray-800 hover:scale-[1.03] active:scale-[0.97]"
            >
              <ArrowLeft size={18} />
              <span className="text-sm font-medium sm:text-base">
                Back to Tools
              </span>
            </button>
          </div>

          {/* 🧾 Header */}
          <div className="mb-10 text-center">
            <div className="flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-4 rounded-full bg-white border border-gray-200">
              <File className="w-10 h-10 sm:w-12 sm:h-12 text-black" />
            </div>
            <h1 className="mb-3 text-3xl font-bold text-black sm:text-4xl">
              PDF Compressor
            </h1>
            <p className="text-base text-gray-700 sm:text-lg">
              Compress your PDF with different quality levels
            </p>
          </div>

          {/* 📤 File Upload / Status */}
          <div className="p-6 bg-white shadow-xl sm:p-10 rounded-2xl">
            {!file ? (
              <div
                onDrop={handleDrop}
                onDragOver={(e) => e.preventDefault()}
                onClick={() => fileInputRef.current?.click()}
                className="p-10 text-center transition-all border-2 border-gray-300 border-dashed cursor-pointer rounded-xl hover:border-black hover:bg-black/5"
              >
                <Upload className="w-12 h-12 mx-auto mb-4 text-black" />
                <h3 className="mb-2 text-xl font-semibold text-black">
                  Drop your PDF file here
                </h3>
                <p className="mb-4 text-gray-500">or click to browse files</p>
                <div className="text-sm text-gray-400">
                  <p>Supported format: PDF</p>
                  <p>Maximum size: 20MB</p>
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf"
                  onChange={handleFileInput}
                  className="hidden"
                />
              </div>
            ) : (
              <>
                {/* File Info */}
                <div className="flex flex-col items-center justify-between gap-4 p-4 rounded-lg sm:flex-row bg-[#F5F7FB]">
                  <div className="flex items-center gap-4">
                    <File className="w-8 h-8 text-black" />
                    <div>
                      <h3 className="font-semibold text-black break-all">
                        {file.name}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={resetTool}
                    className="px-3 py-1 text-sm font-medium text-gray-600 transition-all rounded-md hover:text-gray-800 hover:bg-gray-100"
                  >
                    Remove
                  </button>
                </div>

                {/* Error message */}
                {error && (
                  <div className="flex items-center gap-2 p-4 border border-red-200 rounded-lg bg-red-50">
                    <AlertCircle className="w-5 h-5 text-red-500" />
                    <span className="text-red-700">{error}</span>
                  </div>
                )}

                {/* Success message */}
                {isComplete && (
                  <div className="flex flex-col items-center gap-2 p-4 border border-green-200 rounded-lg sm:flex-row bg-green-50">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="text-green-700">
                        Compression completed successfully!
                      </span>
                    </div>
                    {resultInfo && (
                      <span className="text-sm font-medium text-green-700">
                        Reduced from {resultInfo.originalSize} MB →{" "}
                        {resultInfo.compressedSize} MB
                      </span>
                    )}
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-col items-center gap-4 mt-6 sm:flex-row sm:justify-center sm:flex-wrap">
                  {!isProcessing && !isComplete && (
                    <>
                      <button
                        onClick={() => processFile("extreme")}
                        className="w-full sm:w-auto px-6 py-3 font-medium text-white rounded-lg shadow-md bg-black hover:bg-gray-800 hover:scale-[1.02]"
                      >
                        Extreme Compression
                      </button>
                      <button
                        onClick={() => processFile("recommended")}
                        className="w-full sm:w-auto px-6 py-3 font-medium text-white rounded-lg shadow-md bg-black hover:bg-gray-800 hover:scale-[1.02]"
                      >
                        Recommended Compression
                      </button>
                      <button
                        onClick={() => processFile("low")}
                        className="w-full sm:w-auto px-6 py-3 font-medium text-white rounded-lg shadow-md bg-black hover:bg-gray-800 hover:scale-[1.02]"
                      >
                        Less Compression
                      </button>
                    </>
                  )}

                  {isProcessing && (
                    <button
                      disabled
                      className="flex items-center gap-2 px-6 py-3 font-medium text-white rounded-lg bg-gray-400 cursor-not-allowed"
                    >
                      <Loader2 className="w-5 h-5 animate-spin" /> Compressing...
                    </button>
                  )}

                  {isComplete && (
                    <div className="flex flex-col items-center gap-4 sm:flex-row">
                      <button
                        onClick={downloadFile}
                        className="flex items-center gap-2 px-6 py-3 font-medium text-white rounded-lg shadow-md bg-black hover:bg-gray-800 hover:scale-[1.02]"
                      >
                        <Download className="w-5 h-5" /> Download Compressed PDF
                      </button>
                      <button
                        onClick={resetTool}
                        className="flex items-center gap-2 px-6 py-3 font-medium text-white rounded-lg shadow-md bg-gray-500 hover:bg-gray-600"
                      >
                        Compress Another
                      </button>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </main>
      <div className="mt-10 text-center text-gray-700 text-sm sm:text-base leading-relaxed">
  <h2 className="text-xl font-semibold text-black mb-2">
    Compress PDF – Reduce File Size Easily
  </h2>
  <p>
    Shrink PDF size while maintaining visual quality. Choose between light, balanced, or extreme compression levels 
    depending on your needs. 
    <br className="hidden sm:block" />
    Perfect for uploading, emailing, and sharing documents faster.
  </p>
</div>
      <div className="w-full py-4 bg-white">
        <div id="container-c152ce441ed68e2ebb08bdbddefa4fac" className="w-full" />
      </div>
      <footer className="w-full mt-auto py-3 bg-black border-t border-gray-800">
  <div className="max-w-5xl mx-auto text-center text-xs sm:text-sm text-white font-medium tracking-wide">
    © 2025 <span className="text-[#1EC6D7] font-semibold">Viadocs</span>. All rights reserved.
  </div>
</footer>

    </div>
  );
}
