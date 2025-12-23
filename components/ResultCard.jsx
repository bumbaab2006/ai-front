"use client";
import { useEffect, useState } from "react";

export default function ResultCard({ text }) {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    if (!text) return setDisplayedText("");

    let index = 0;
    setDisplayedText("");
    const interval = setInterval(() => {
      setDisplayedText((prev) => prev + text[index]);
      index++;
      if (index >= text.length) clearInterval(interval);
    }, 15); // 15ms бүр character-д

    return () => clearInterval(interval);
  }, [text]);

  if (!text) return null;

  return (
    <div className="mt-4 w-full">
      <p className="text-sm font-semibold mb-1 text-gray-400">Result</p>
      <div className="border rounded-lg p-3 bg-gray-50 text-xs text-gray-600 font-mono whitespace-pre-wrap">
        {displayedText}
      </div>
    </div>
  );
}
