"use client";
import { useState } from "react";
import ResultCard from "./ResultCard";

export default function ImageUploader() {
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState("");

  const uploadImage = async (file) => {
    setLoading(true);
    setResult("");

    try {
      const formData = new FormData();
      formData.append("image", file);

      const res = await fetch("http://localhost:5000/analyze", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      setResult(data.text);
    } catch (e) {
      alert(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border border-gray-400 rounded-xl p-5 w-full max-w-md bg-white shadow-sm">
      <p className="text-sm font-semibold mb-2 text-gray-400">Image analysis</p>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files[0];
          if (!file) return;
          setPreview(URL.createObjectURL(file));
          uploadImage(file);
        }}
        className="text-sm text-gray-400"
      />
      {preview && <img src={preview} className="mt-3 rounded-lg w-full" />}
      {loading && <p className="mt-2 text-xs text-gray-500">Analyzing...</p>}
      <ResultCard text={result} />
    </div>
  );
}
