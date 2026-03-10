/* eslint-disable @next/next/no-img-element */
"use client";
import { useState } from "react";
import ResultCard from "./ResultCard";
import { getApiUrl, parseJsonResponse } from "@/lib/api";

export default function ImageCreator() {
  const [description, setDescription] = useState("");
  const [prompt, setPrompt] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const generate = async () => {
    const trimmedDescription = description.trim();
    if (!trimmedDescription) return;

    setLoading(true);
    setPrompt("");
    setImageUrl("");
    setError("");

    try {
      const res = await fetch(getApiUrl("/generate-image"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description: trimmedDescription }),
      });

      const data = await parseJsonResponse(res);
      setPrompt(data.prompt);
      setImageUrl(data.imageUrl);
    } catch (e) {
      setError(e.message || "Failed to generate image.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="feature-card">
      <div className="feature-header">
        <div>
          <h2 className="feature-title">Image Creator</h2>
          <p className="feature-description">
            Generate a food scene from a short prompt and preview it immediately.
          </p>
        </div>
        <span className="subtle-badge">Gemini Image</span>
      </div>

      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Describe the food, plating, mood, and lighting."
        className="textarea-field"
      />

      <div className="helper-row">
        <span className="meta-text">
          Short prompts usually return cleaner results than long paragraphs.
        </span>
        <button
          type="button"
          onClick={generate}
          className="primary-button"
          disabled={loading || !description.trim()}
        >
          {loading ? "Generating..." : "Generate Image"}
        </button>
      </div>

      {error && (
        <div className="inline-error" role="alert">
          {error}
        </div>
      )}

      {prompt && <ResultCard text={prompt} label="Prompt" />}

      {imageUrl && (
        <div className="preview-shell">
          <img
            src={imageUrl}
            alt="Generated food scene"
            className="preview-image"
          />
        </div>
      )}
    </div>
  );
}
