"use client";
import { useState } from "react";
import ResultCard from "./ResultCard";

export default function ImageCreator() {
  const [description, setDescription] = useState("");
  const [prompt, setPrompt] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const generate = async () => {
    setLoading(true);
    setPrompt("");
    setImageUrl("");

    try {
      const res = await fetch(
        "https://ai-back-h30s.onrender.com/generate-image",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ description }),
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      setPrompt(data.prompt);
      setImageUrl(data.imageUrl);
    } catch (e) {
      alert(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border border-gray-400 rounded-xl p-5 w-full max-w-md bg-white shadow-sm">
      <p className="text-sm font-semibold mb-2 text-gray-400">Image creator</p>

      <textarea
        rows={3}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Describe food or scene"
        className="border rounded-md p-2 w-full text-sm mb-4 border-gray-400 text-gray-600"
      />

      <button
        onClick={generate}
        className="bg-gray-600 text-white px-4 py-1.5 rounded-md text-sm"
        disabled={loading}
      >
        {loading ? "Generating..." : "Generate Image"}
      </button>

      {prompt && <ResultCard text={prompt} />}

      {imageUrl && (
        <img
          src={imageUrl}
          alt="Generated"
          className="mt-4 w-full h-auto rounded-lg border"
        />
      )}
    </div>
  );
}
