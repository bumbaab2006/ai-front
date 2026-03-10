/* eslint-disable @next/next/no-img-element */
"use client";
import { useEffect, useState } from "react";
import ResultCard from "./ResultCard";
import { getApiUrl, parseJsonResponse } from "@/lib/api";

export default function ImageUploader() {
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  const uploadImage = async (file) => {
    setLoading(true);
    setResult("");
    setError("");

    try {
      const formData = new FormData();
      formData.append("image", file);

      const res = await fetch(getApiUrl("/analyze"), {
        method: "POST",
        body: formData,
      });

      const data = await parseJsonResponse(res);
      setResult(data.text);
    } catch (e) {
      setError(e.message || "Failed to analyze image.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="feature-card">
      <div className="feature-header">
        <div>
          <h2 className="feature-title">Image Analysis</h2>
          <p className="feature-description">
            Upload a food photo and extract ingredient hints from the image.
          </p>
        </div>
        <span className="subtle-badge">Gemini Vision</span>
      </div>

      <input
        type="file"
        accept="image/*"
        disabled={loading}
        className="file-input"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (!file) return;

          if (preview) {
            URL.revokeObjectURL(preview);
          }

          setPreview(URL.createObjectURL(file));
          uploadImage(file);
        }}
      />

      <div className="helper-row">
        <span className="meta-text">PNG, JPG, WEBP and other image formats.</span>
        {loading && (
          <span className="loading-pill" aria-live="polite">
            <span className="dot" />
            <span className="dot" />
            <span className="dot" />
            Analyzing
          </span>
        )}
      </div>

      {preview && (
        <div className="preview-shell">
          <img
            src={preview}
            alt="Preview of the uploaded image"
            className="preview-image"
          />
        </div>
      )}

      {error && (
        <div className="inline-error" role="alert">
          {error}
        </div>
      )}

      <ResultCard text={result} label="Analysis" />
    </div>
  );
}
