"use client";
import { useState } from "react";
import ResultCard from "./ResultCard";
import { getApiUrl, parseJsonResponse } from "@/lib/api";

export default function IngredientRecognition() {
  const [dish, setDish] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const generate = async () => {
    const trimmedDish = dish.trim();
    if (!trimmedDish) return;

    setLoading(true);
    setResult("");
    setError("");

    try {
      const res = await fetch(getApiUrl("/ingredient"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ dish: trimmedDish }),
      });

      const data = await parseJsonResponse(res);
      setResult(data.text);
    } catch (e) {
      setError(e.message || "Failed to recognize ingredients.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="feature-card">
      <div className="feature-header">
        <div>
          <h2 className="feature-title">Ingredient Recognition</h2>
          <p className="feature-description">
            Enter a dish name and get a quick ingredient list back.
          </p>
        </div>
        <span className="subtle-badge">Text Prompt</span>
      </div>

      <input
        value={dish}
        onChange={(e) => setDish(e.target.value)}
        placeholder="Try: truffle pasta, chicken salad, ramen"
        className="input-field"
      />

      <div className="helper-row">
        <span className="meta-text">
          Best for food dish names instead of long paragraphs.
        </span>
        <button
          type="button"
          onClick={generate}
          className="primary-button"
          disabled={loading || !dish.trim()}
        >
          {loading ? "Working..." : "List Ingredients"}
        </button>
      </div>

      {error && (
        <div className="inline-error" role="alert">
          {error}
        </div>
      )}

      <ResultCard text={result} label="Ingredients" />
    </div>
  );
}
