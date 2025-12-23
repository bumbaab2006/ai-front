"use client";
import { useState } from "react";
import ResultCard from "./ResultCard";

export default function IngredientRecognition() {
  const [dish, setDish] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const generate = async () => {
    setLoading(true);
    setResult("");

    try {
      const res = await fetch("http://localhost:5000/ingredient", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ dish }),
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
      <p className="text-sm font-semibold mb-2 text-gray-400">
        Ingredient recognition
      </p>

      <input
        value={dish}
        onChange={(e) => setDish(e.target.value)}
        placeholder="Dish name"
        className="border-gray-400 border rounded-md p-2 w-full text-sm mb-4 text-gray-600"
      />

      <button
        onClick={generate}
        className="bg-gray-600 text-white px-4 py-1.5 rounded-md text-sm"
        disabled={loading}
      >
        {loading ? "Working..." : "Generate"}
      </button>

      {result && <ResultCard text={result} />}
    </div>
  );
}
