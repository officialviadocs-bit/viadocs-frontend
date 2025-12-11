import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Upload,
  File,
  Loader2,
  CheckCircle,
  AlertCircle,
  Download,
  Presentation,
} from "lucide-react";
import Header from "../../components/Header/Header";

import axios from "axios";

export default function PowerpointToPdf() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [file, setFile] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [error, setError] = useState(null);
  const [downloadUrl, setDownloadUrl] = useState(null);

  // ✅ File Validation
  const handleFileSelect = (selectedFile) => {
    const validTypes = [
      "application/vnd.ms-powerpoint",
      "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    ];
    if (!validTypes.includes(selectedFile.type)) {
      setError("Please select a valid PPT or PPTX file");
      return;
    }
    if (selectedFile.size > 20 * 1024 * 1024) {
      setError("File size must be less than 20MB");
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

  // ✅ Process Conversion
  const processFile = async () => {
    if (!file) return;
    setIsProcessing(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await axios.post(
        "https://viadocs-backend-u977.onrender.com/api/tools/ppt-to-pdf", // backend route
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          responseType: "blob", // ⚡ Expect PDF binary
        }
      );

      // ✅ Create Blob URL for download
      const blob = new Blob([response.data], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      setDownloadUrl(url);
      setIsComplete(true);
    } catch (err) {
      console.error("Conversion Error:", err);
      setError("Conversion failed. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  // ✅ Download the converted file
  const downloadFile = () => {
    if (downloadUrl && file) {
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = file.name.replace(/\.(pptx|ppt)$/i, ".pdf");
      link.click();
    }
  };

  // ✅ Reset tool
  const resetTool = () => {
    setFile(null);
    setError(null);
    setIsProcessing(false);
    setIsComplete(false);
    setDownloadUrl(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="flex flex-col min-h-screen bg-white text-black">
      <Header />

      <main className="flex-1 px-6 pb-0 pt-20 sm:pt-28">
        <div className="max-w-4xl mx-auto">
          {/* 🔙 Back Button */}
          <div className="flex justify-start mb-8">
            <button
              onClick={() => navigate("/tools")}
              className="flex items-center gap-2 px-4 py-2 text-white rounded-lg shadow-md bg-black hover:bg-gray-800 hover:scale-[1.03]"
            >
              <ArrowLeft size={18} />
              <span className="text-sm font-medium sm:text-base">
                Back to Tools
              </span>
            </button>
          </div>

          {/* 🧾 Header */}
          <div className="mb-8 text-center">
            <div className="flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-4 rounded-full bg-white border border-gray-200">
              <Presentation className="w-10 h-10 sm:w-12 sm:h-12 text-black" />
            </div>
            <h1 className="mb-2 text-3xl font-bold text-black sm:text-4xl">
              PowerPoint to PDF Converter
            </h1>
            <p className="text-base text-gray-600 sm:text-lg">
              Convert your PowerPoint presentations into high-quality PDFs
            </p>
          </div>

          {/* 🧰 Tool Area */}
          <div className="p-6 bg-white shadow-lg sm:p-8 rounded-2xl">
            {!file ? (
              <div
                onDrop={handleDrop}
                onDragOver={(e) => e.preventDefault()}
                className="p-10 sm:p-12 text-center transition-all border-2 border-gray-300 border-dashed cursor-pointer rounded-xl hover:border-black hover:bg-black/5"
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="w-12 h-12 mx-auto mb-4 text-black" />
                <h3 className="mb-2 text-xl font-semibold text-black">
                  Drop your PPT or PPTX file here
                </h3>
                <p className="mb-4 text-sm text-gray-500 sm:text-base">
                  or click to browse files
                </p>
                <div className="text-xs text-gray-400 sm:text-sm">
                  <p>Supported formats: .ppt, .pptx</p>
                  <p>Maximum file size: 20MB</p>
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".ppt,.pptx"
                  onChange={handleFileInput}
                  className="hidden"
                />
              </div>
            ) : (
              <div className="space-y-6">
                {/* 📁 File Info */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 p-4 rounded-lg bg-gray-50">
                  <File className="w-8 h-8 text-black" />
                  <div className="flex-1">
                    <h3 className="font-semibold text-black break-all">
                      {file.name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                  <button
                    onClick={resetTool}
                    className="px-3 py-1 text-sm text-gray-600 transition-all rounded-md hover:bg-red-50 hover:text-red-600"
                  >
                    Remove
                  </button>
                </div>

                {/* ⚠️ Error */}
                {error && (
                  <div className="flex items-center gap-2 p-4 border border-red-200 rounded-lg bg-red-50">
                    <AlertCircle className="w-5 h-5 text-red-500" />
                    <span className="text-sm text-red-700 sm:text-base">
                      {error}
                    </span>
                  </div>
                )}

                {/* ✅ Success */}
                {isComplete && (
                  <div className="flex items-center gap-2 p-4 border border-green-200 rounded-lg bg-green-50">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-green-700">
                      Conversion completed successfully!
                    </span>
                  </div>
                )}

                {/* 🔘 Buttons */}
                <div className="flex flex-col items-center justify-center gap-4 mt-6 sm:flex-row">
                  {!isProcessing && !isComplete && (
                    <button
                      onClick={processFile}
                      className="flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 font-medium text-white rounded-lg shadow-md transition-all bg-black hover:bg-gray-800 hover:scale-[1.02]"
                    >
                      <File className="w-5 h-5" />
                      Convert to PDF
                    </button>
                  )}

                  {isProcessing && (
                    <button
                      disabled
                      className="flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 font-medium text-white bg-[#9FA8DA] rounded-lg cursor-not-allowed"
                    >
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Converting...
                    </button>
                  )}

                  {isComplete && (
                    <div className="flex flex-col items-center w-full gap-4 sm:flex-row sm:w-auto">
                      <button
                        onClick={downloadFile}
                        className="flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 font-medium text-white rounded-lg shadow-md transition-all bg-black hover:bg-gray-800 hover:scale-[1.02]"
                      >
                        <Download className="w-5 h-5" />
                        Download PDF
                      </button>
                      <button
                        onClick={resetTool}
                        className="flex items-center justify-center w-full gap-2 px-6 py-3 font-medium text-white transition-all rounded-lg shadow-md sm:w-auto bg-gray-500 hover:bg-gray-600"
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
          Convert PowerPoint Presentations to PDF
        </h2>
        <p>
          Turn PowerPoint slides (.ppt, .pptx) into downloadable PDF documents.
          Preserve text, design, animations, and visuals in a print-ready format.
          <br className="hidden sm:block" />
          Viadocs ensures precise conversion — perfect for presentations, lectures, and portfolios.
        </p>
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
