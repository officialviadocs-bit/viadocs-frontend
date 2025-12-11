import React, { useState, useRef } from "react";
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

export default function ImageToPdf() {
  const [files, setFiles] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [error, setError] = useState(null);
  const [downloadUrl, setDownloadUrl] = useState(null);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const handleFileSelect = (selectedFiles) => {
    const validFiles = Array.from(selectedFiles).filter((file) =>
      file.type.startsWith("image/")
    );

    if (validFiles.length === 0) {
      setError("Please select valid image files (JPG, PNG, etc.)");
      return;
    }

    const tooLarge = validFiles.find((f) => f.size > 10 * 1024 * 1024);
    if (tooLarge) {
      setError("Each file must be less than 10MB");
      return;
    }

    setFiles([...files, ...validFiles]);
    setError(null);
    setIsComplete(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files.length > 0) {
      handleFileSelect(e.dataTransfer.files);
    }
  };

  const handleFileInput = (e) => {
    if (e.target.files?.length > 0) {
      handleFileSelect(e.target.files);
    }
  };

  const processFiles = async () => {
    if (files.length === 0) return;

    setIsProcessing(true);
    setError(null);

    try {
      const formData = new FormData();
      files.forEach((file) => formData.append("images", file));

      const response = await axios.post(
        "http://viadocs.in//api/tools/image-to-pdf",
        formData,
        { responseType: "blob" }
      );

      const url = URL.createObjectURL(new Blob([response.data]));
      setDownloadUrl(url);
      setIsComplete(true);
    } catch (err) {
      console.error(err);
      setError("Failed to convert images. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const downloadFile = () => {
    if (downloadUrl) {
      const a = document.createElement("a");
      a.href = downloadUrl;
      a.download = "images.pdf";
      a.click();
    }
  };

  const resetTool = () => {
    setFiles([]);
    setIsProcessing(false);
    setIsComplete(false);
    setError(null);
    if (downloadUrl) {
      URL.revokeObjectURL(downloadUrl);
      setDownloadUrl(null);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const removeFile = (index) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  return (
    <div className="flex flex-col min-h-screen bg-white text-black">
      <Header />

      <main className="flex-1 px-6 pb-0 pt-20 sm:pt-28">
        <div className="max-w-4xl mx-auto">
          {/* Back button */}
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

          {/* Header */}
          <div className="mb-10 text-center">
            <div className="flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-4 rounded-full bg-white border border-gray-200">
              <File className="w-10 h-10 sm:w-12 sm:h-12 text-black" />
            </div>
            <h1 className="mb-3 text-3xl font-bold text-black sm:text-4xl">
              Image to PDF Converter
            </h1>
            <p className="text-base text-gray-700 sm:text-lg">
              Combine your images into a single high-quality PDF
            </p>
          </div>

          {/* Main Tool Area */}
          <div className="p-6 bg-white shadow-xl sm:p-10 rounded-2xl">
            {files.length === 0 ? (
              <div
                onDrop={handleDrop}
                onDragOver={(e) => e.preventDefault()}
                className="p-10 text-center transition-all border-2 border-gray-300 border-dashed cursor-pointer rounded-xl hover:border-black hover:bg-black/5"
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="w-12 h-12 mx-auto mb-4 text-black" />
                <h3 className="mb-2 text-xl font-semibold text-black">
                  Drop your image files here
                </h3>
                <p className="mb-4 text-gray-500">or click to browse files</p>
                <div className="text-sm text-gray-400">
                  <p>Supported formats: JPG, PNG</p>
                  <p>Max file size: 10MB each</p>
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleFileInput}
                  className="hidden"
                />
              </div>
            ) : (
              <div className="space-y-6">
                {/* File List */}
                <div className="space-y-3">
                  {files.map((file, idx) => (
                    <div
                      key={idx}
                      className="flex flex-col items-center justify-between gap-4 p-4 rounded-lg sm:flex-row bg-gray-50"
                    >
                      <div className="flex items-center gap-4">
                        <File className="w-6 h-6 text-black" />
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
                        onClick={() => removeFile(idx)}
                        className="px-3 py-1 text-sm font-medium text-gray-600 transition-all rounded-md hover:text-gray-800 hover:bg-gray-100"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>

                {/* Status Messages */}
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
                      onClick={processFiles}
                      className="flex items-center gap-2 px-6 py-3 font-medium text-white transition-all rounded-lg shadow-md bg-black hover:bg-gray-800 hover:scale-[1.02]"
                    >
                      <File className="w-5 h-5" />
                      Convert to PDF
                    </button>
                  )}

                  {isProcessing && (
                    <button
                      disabled
                      className="flex items-center gap-2 px-6 py-3 font-medium text-white rounded-lg bg-gray-400 cursor-not-allowed"
                    >
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Converting...
                    </button>
                  )}

                  {isComplete && (
                    <div className="flex flex-col items-center gap-4 sm:flex-row">
                      <button
                        onClick={downloadFile}
                        className="flex items-center gap-2 px-6 py-3 font-medium text-white transition-all rounded-lg shadow-md bg-black hover:bg-gray-800 hover:scale-[1.02]"
                      >
                        <Download className="w-5 h-5" />
                        Download PDF
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
    Convert Images to PDF
  </h2>
  <p>
    Create PDFs from multiple images in seconds. Drag and drop JPG, PNG, or WEBP files and 
    get a neatly arranged, downloadable PDF instantly. 
    <br className="hidden sm:block" />
    All files are processed securely with no watermarks or signups.
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
