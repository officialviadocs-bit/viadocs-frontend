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
  Image as ImageIcon,
} from "lucide-react";
import Header from "../../components/Header/Header";

import axios from "axios";

export default function PdfToImage() {
  const [file, setFile] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [error, setError] = useState(null);
  const [downloadUrl, setDownloadUrl] = useState(null);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const API_BASE_URL = "http://localhost:5000/api/tools/pdf-to-image/";

  

  const handleFileSelect = (selectedFile) => {
    if (selectedFile.type !== "application/pdf") {
      setError("Please select a valid PDF file");
      return;
    }
    if (selectedFile.size > 15 * 1024 * 1024) {
      setError("File size must be less than 15MB");
      return;
    }
    setFile(selectedFile);
    setError(null);
    setIsComplete(false);
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

  // ✅ Process PDF -> Image Conversion
  const processFile = async () => {
    if (!file) return;
    setIsProcessing(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await axios.post(API_BASE_URL, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        responseType: "blob", // ✅ Expecting binary zip file
      });

      // ✅ Create blob URL for download
      const blob = new Blob([response.data], { type: "application/zip" });
      const url = URL.createObjectURL(blob);
      setDownloadUrl(url);
      setIsComplete(true);
    } catch (err) {
      console.error("❌ Conversion error:", err);
      setError("Failed to convert PDF. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  // ✅ Download directly to local storage (not open)
  const downloadFile = () => {
    if (downloadUrl && file) {
      const a = document.createElement("a");
      a.href = downloadUrl;
      a.download = file.name.replace(/\.pdf$/i, "_images.zip");
      a.style.display = "none";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(downloadUrl);
    }
  };

  const resetTool = () => {
    setFile(null);
    setIsProcessing(false);
    setIsComplete(false);
    setError(null);
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
          {/* Back Button */}
          <div className="flex justify-start mb-8">
            <button
              onClick={() => navigate("/tools")}
              className="flex items-center gap-2 px-4 py-2 text-white transition-all rounded-lg shadow-md bg-black hover:bg-gray-800 hover:scale-[1.03]"
            >
              <ArrowLeft size={18} />
              <span className="text-sm font-medium sm:text-base">
                Back to Tools
              </span>
            </button>
          </div>

          {/* Header */}
          <div className="mb-10 text-center">
            <div className="flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-4 rounded-full bg-white border border-gray-200">
              <ImageIcon className="w-10 h-10 sm:w-12 sm:h-12 text-black" />
            </div>
            <h1 className="mb-3 text-3xl font-bold text-black sm:text-4xl">
              PDF to Image Converter
            </h1>
            <p className="text-base text-gray-700 sm:text-lg">
              Convert every page of your PDF into high-quality images
            </p>
          </div>

          {/* Tool Area */}
          <div className="p-6 bg-white shadow-xl sm:p-10 rounded-2xl">
            {!file ? (
              <div
                onDrop={handleDrop}
                onDragOver={(e) => e.preventDefault()}
                onClick={() => fileInputRef.current?.click()}
                className="p-12 text-center transition-all border-2 border-gray-300 border-dashed cursor-pointer rounded-xl hover:border-black hover:bg-black/5"
              >
                <Upload className="w-12 h-12 mx-auto mb-4 text-black" />
                <h3 className="mb-2 text-xl font-semibold text-black">
                  Drop your PDF file here
                </h3>
                <p className="mb-4 text-gray-500">or click to browse files</p>
                <div className="text-sm text-gray-400">
                  <p>Supported format: PDF</p>
                  <p>Maximum file size: 15MB</p>
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
              <div className="space-y-6">
                {/* File Info */}
                <div className="flex items-center gap-4 p-4 rounded-lg bg-gray-50">
                  <File className="w-8 h-8 text-black" />
                  <div className="flex-1">
                    <h3 className="font-semibold text-black">{file.name}</h3>
                    <p className="text-sm text-gray-500">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                  <button
                    onClick={resetTool}
                    className="px-3 py-1 text-sm text-gray-600 transition-all rounded-md hover:text-red-600 hover:bg-gray-100"
                  >
                    Remove
                  </button>
                </div>

                {/* Error / Success */}
                {error && (
                  <div className="flex items-center gap-2 p-4 border border-red-200 rounded-lg bg-red-50">
                    <AlertCircle className="w-5 h-5 text-red-500" />
                    <span className="text-red-700">{error}</span>
                  </div>
                )}

                {isComplete && (
                  <div className="flex items-center gap-2 p-4 border border-green-200 rounded-lg bg-green-50">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-green-700">
                      Conversion completed successfully!
                    </span>
                  </div>
                )}

                {/* Buttons */}
                <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                  {!isProcessing && !isComplete && (
                    <button
                      onClick={processFile}
                      className="flex items-center gap-2 px-6 py-3 font-medium text-white transition-all rounded-lg shadow-md bg-black hover:bg-gray-800 hover:scale-[1.02]"
                    >
                      <ImageIcon className="w-5 h-5" />
                      Convert to Images
                    </button>
                  )}

                  {isProcessing && (
                    <button
                      disabled
                      className="flex items-center gap-2 px-6 py-3 font-medium text-white rounded-lg bg-[#9FA8DA] cursor-not-allowed"
                    >
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Converting...
                    </button>
                  )}

                  {isComplete && (
                    <div className="flex flex-col gap-4 sm:flex-row">
                      <button
                        onClick={downloadFile}
                        className="flex items-center gap-2 px-6 py-3 font-medium text-white transition-all rounded-lg shadow-md bg-black hover:bg-gray-800 hover:scale-[1.02]"
                      >
                        <Download className="w-5 h-5" />
                        Download Images
                      </button>
                      <button
                        onClick={resetTool}
                        className="flex items-center gap-2 px-6 py-3 font-medium text-white transition-all rounded-lg shadow-md bg-gray-500 hover:bg-gray-600"
                      >
                        Convert Another
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <div className="mt-10 text-center text-gray-700 text-sm sm:text-base leading-relaxed">
        <h2 className="text-xl font-semibold text-black mb-2">
          Convert PDF Pages into High-Quality Images
        </h2>
        <p>
          Turn your PDF pages into downloadable JPG or PNG images with just one click.
          Ideal for creating previews, thumbnails, or image-based archives.
          <br className="hidden sm:block" />
          Viadocs guarantees quick and private file conversion.
        </p>
      </div>

      {/* Small, non-intrusive container for ads/scripts */}
      <div className="w-full py-2 bg-white">
        <div
          id="container-c152ce441ed68e2ebb08bdbddefa4fac"
          aria-hidden="true"
          className="w-px h-px overflow-hidden pointer-events-none select-none"
          style={{ width: "1px", height: "1px" }}
        />
      </div>

      <footer className="w-full mt-auto py-3 bg-black border-t border-gray-800">
        <div className="max-w-5xl mx-auto text-center text-xs sm:text-sm text-white font-medium tracking-wide">
          © 2025{" "}
          <span className="text-[#1EC6D7] font-semibold">Viadocs</span>. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
