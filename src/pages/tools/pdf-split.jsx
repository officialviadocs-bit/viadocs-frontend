import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  ArrowLeft,
  Upload,
  Download,
  File,
  Loader2,
  AlertCircle,
} from "lucide-react";
import Header from "../../components/Header/Header";

import axios from "axios";
import { PDFDocument } from "pdf-lib";

export default function PdfSplit() {
  const [file, setFile] = useState(null);
  const [fromPage, setFromPage] = useState(1);
  const [toPage, setToPage] = useState(1);
  const [numPages, setNumPages] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // 📄 Handle file selection
  const handleFileSelect = async (selectedFile) => {
    if (selectedFile.type !== "application/pdf") {
      setError("Only PDF files are allowed");
      return;
    }
    setFile(selectedFile);
    setError(null);

    try {
      const buffer = await selectedFile.arrayBuffer();
      const pdfDoc = await PDFDocument.load(buffer);
      const total = pdfDoc.getPageCount();
      setNumPages(total);
      setFromPage(1);
      setToPage(total);
    } catch (err) {
      console.error(err);
      setError("Failed to read PDF file");
    }
  };

  const handleFileInput = (e) => {
    if (e.target.files?.[0]) handleFileSelect(e.target.files[0]);
  };

  // 🧠 Process PDF
  const processFile = async () => {
    if (!file) return;
    setIsProcessing(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("ranges", `${fromPage}-${toPage}`);

      const response = await axios.post(
        "https://viadocs-backend-u977.onrender.com/api/tools/pdf-split",
        formData,
        { responseType: "blob" }
      );

      const url = URL.createObjectURL(new Blob([response.data]));
      setDownloadUrl(url);
    } catch (err) {
      console.error(err);
      setError("Failed to split PDF. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  // 💾 Download
  const downloadFile = () => {
    if (downloadUrl) {
      const a = document.createElement("a");
      a.href = downloadUrl;
      a.download = "split.pdf";
      a.click();
    }
  };

  const resetTool = () => {
    setFile(null);
    setNumPages(null);
    setFromPage(1);
    setToPage(1);
    setIsProcessing(false);
    setDownloadUrl(null);
    setError(null);
  };

  return (
    <div className="flex flex-col min-h-screen bg-white text-black">
      <Header />
      <main className="flex-1 px-6 pb-0 pt-20 sm:pt-28">
        <div className="max-w-6xl mx-auto">
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

          {/* 🧾 Header */}
          <div className="mb-8 text-center">
            <div className="flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-4 rounded-full bg-white border border-gray-200">
              <File className="w-10 h-10 sm:w-12 sm:h-12 text-black" />
            </div>
            <h1 className="mb-2 text-3xl font-bold text-black">
              PDF Splitter
            </h1>
            <p className="text-lg text-gray-700">
              Upload your PDF and split by selecting page range
            </p>
          </div>

          {/* 🧩 Main Tool */}
          <div className="p-6 bg-white shadow-lg rounded-2xl sm:p-8">
            {!file ? (
              // Step 1: Upload file
              <div
                className="p-12 text-center transition-all border-2 border-gray-300 border-dashed cursor-pointer rounded-xl hover:border-black hover:bg-black/5"
                onClick={() => document.getElementById("pdfInput").click()}
              >
                <Upload className="w-12 h-12 mx-auto mb-4 text-black" />
                <h3 className="mb-2 text-xl font-semibold text-black">
                  Drop your PDF file here
                </h3>
                <p className="mb-4 text-gray-500">or click to browse files</p>
                <input
                  id="pdfInput"
                  type="file"
                  accept="application/pdf"
                  onChange={handleFileInput}
                  className="hidden"
                />
              </div>
            ) : (
              // Step 2: Split options
              <div className="flex flex-col gap-6 lg:grid lg:grid-cols-2">
                {/* Left - PDF Preview (Desktop only) */}
                <div className="hidden w-full overflow-hidden border rounded-lg shadow-sm lg:block">
                  <iframe
                    src={URL.createObjectURL(file)}
                    title="PDF Preview"
                    className="w-full"
                    style={{
                      height: "75vh",
                      border: "none",
                    }}
                  />
                </div>

                {/* Right - Controls (Visible on all devices) */}
                <div className="flex flex-col justify-between p-4 space-y-6">
                  <div>
                    <label className="block mb-2 font-medium text-black">
                      From Page
                    </label>
                    <input
                      type="number"
                      value={fromPage}
                      min={1}
                      max={numPages || 1}
                      onChange={(e) => setFromPage(Number(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 font-medium text-black">
                      To Page
                    </label>
                    <input
                      type="number"
                      value={toPage}
                      min={fromPage}
                      max={numPages || 1}
                      onChange={(e) => setToPage(Number(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black"
                    />
                  </div>

                  {/* PDF info for mobile */}
                  <div className="block p-3 text-sm text-gray-600 border border-gray-200 rounded-lg lg:hidden bg-gray-50">
                    <p>
                      <strong>Pages detected:</strong> {numPages || "—"}
                    </p>
                    <p>Preview hidden on mobile for better experience.</p>
                  </div>

                  {/* Error Message */}
                  {error && (
                    <div className="flex items-center gap-2 p-4 mt-2 border border-red-200 rounded-lg bg-red-50">
                      <AlertCircle className="w-5 h-5 text-red-500" />
                      <span className="text-red-700">{error}</span>
                    </div>
                  )}

                  {/* Buttons */}
                  <div className="flex flex-wrap justify-center gap-4 mt-4">
                    {!isProcessing && !downloadUrl && (
                      <button
                        onClick={processFile}
                        className="flex items-center gap-2 px-6 py-3 font-medium text-white transition-all rounded-lg shadow-md bg-black hover:bg-gray-800 hover:scale-[1.02]"
                      >
                        <File className="w-5 h-5" />
                        Split & Download
                      </button>
                    )}
                    {isProcessing && (
                      <button
                        disabled
                        className="flex items-center gap-2 px-6 py-3 font-medium text-white bg-gray-400 rounded-lg cursor-not-allowed"
                      >
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Splitting...
                      </button>
                    )}
                    {downloadUrl && (
                      <>
                        <button
                          onClick={downloadFile}
                          className="flex items-center gap-2 px-6 py-3 font-medium text-white transition-all rounded-lg shadow-md bg-black hover:bg-gray-800 hover:scale-[1.02]"
                        >
                          <Download className="w-5 h-5" />
                          Download Split PDF
                        </button>
                        <button
                          onClick={resetTool}
                          className="flex items-center gap-2 px-6 py-3 font-medium text-white transition-all rounded-lg shadow-md bg-gray-500 hover:bg-gray-600"
                        >
                          Split Another
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      <div className="mt-10 text-center text-gray-700 text-sm sm:text-base leading-relaxed">
  <h2 className="text-xl font-semibold text-black mb-2">
    Split PDF Pages Instantly
  </h2>
  <p>
    Extract specific pages or sections from your PDF in seconds. 
    Upload, select page ranges, and download your new document without installing any software. 
    <br className="hidden sm:block" />
    Viadocs makes PDF splitting fast, simple, and privacy-safe.
  </p>
</div>
      
      <footer className="w-full mt-auto py-3 bg-black border-t border-gray-800">
  <div className="max-w-5xl mx-auto text-center text-xs sm:text-sm text-white font-medium tracking-wide">
    © 2025 <span className="text-[#1EC6D7] font-semibold">Viadocs</span>. All rights reserved.
  </div>
</footer>

    </div>
  );
}
