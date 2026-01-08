"use client";

import { uploadBill } from "@/lib/api";
import { AlertCircle, CheckCircle, Loader2, UploadCloud } from "lucide-react";
import { useState } from "react";

const UploadCard = ({ onSuccess }: { onSuccess?: () => void }) => {
  const [status, setStatus] = useState<
    "idle" | "uploading" | "success" | "error"
  >("idle");
  const [result, setResult] = useState<number | null>(null);
  const [fileName, setFileName] = useState<string>("");

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      return;
    }

    const file = e.target.files[0];
    setFileName(file.name);
    setStatus("uploading");

    try {
      // 1. Call the Python Backend
      const data = await uploadBill(file);

      // 2. Update UI with the result (Mock or Real)
      // Note: Backend returns keys like "detected_kwh" or "extracted_kwh"
      // Let's handle both just to be safe based on your python code
      setResult(data.extracted_kwh || data.detected_kwh || 0);
      setStatus("success");

      if (onSuccess) onSuccess();
    } catch (error) {
      console.error("Upload failed:", error);
      setStatus("error");
    }
  };
  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-xl shadow-lg border border-gray-100 p-8">
      {/* HEADER */}
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800">Upload Energy Bill</h2>
        <p className="text-gray-500 text-sm mt-2">Supports .jpg, .png</p>
      </div>

      {/* UPLOAD ZONE */}
      <div className="relative group">
        <input
          type="file"
          accept=".jpg,.jpeg,.png"
          onChange={handleFileChange}
          disabled={status === "uploading"}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
        />

        <div
          className={`
              border-2 border-dashed rounded-xl p-10 flex flex-col items-center justify-center transition-all
              ${
                status === "error"
                  ? "border-red-300 bg-red-50"
                  : status === "success"
                    ? "border-green-300 bg-green-50"
                    : "border-gray-300 hover:border-green-500 hover:bg-green-50"
              }
            `}
        >
          {/* ICON LOGIC */}
          {status === "uploading" ? (
            <Loader2 className="w-12 h-12 text-green-600 animate-spin" />
          ) : status === "success" ? (
            <CheckCircle className="w-12 h-12 text-green-600" />
          ) : status === "error" ? (
            <AlertCircle className="w-12 h-12 text-red-500" />
          ) : (
            <UploadCloud className="w-12 h-12 text-gray-400 group-hover:text-green-500 transition-colors" />
          )}

          {/* TEXT LOGIC */}
          <div className="mt-4 text-center">
            {status === "uploading" ? (
              <p className="font-medium text-green-700">
                Analyzing Carbon Data...
              </p>
            ) : status === "success" ? (
              <div className="space-y-1">
                <p className="font-bold text-green-700 text-xl">{result} kWh</p>
                <p className="text-xs text-green-600">Extracted Successfully</p>
              </div>
            ) : status === "error" ? (
              <p className="font-medium text-red-600">
                Upload Failed. Try again.
              </p>
            ) : (
              <>
                <p className="font-medium text-gray-700">Click to upload</p>
                <p className="text-xs text-gray-400 mt-1">or drag and drop</p>
              </>
            )}
          </div>
        </div>
      </div>

      {/* DEBUG INFO (Optional: To prove it's real) */}
      {fileName && (
        <p className="text-xs text-center text-gray-300 mt-4">
          File: {fileName}
        </p>
      )}
    </div>
  );
};

export default UploadCard;
