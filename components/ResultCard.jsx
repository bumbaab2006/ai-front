"use client";
import { useEffect, useState } from "react";

export default function ResultCard({ text, label = "Result" }) {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    if (!text) return setDisplayedText("");
    if (text.length > 700) {
      setDisplayedText(text);
      return;
    }

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
    <div className="result-card">
      <p className="result-label">{label}</p>
      <p className="result-content">{displayedText}</p>
    </div>
  );
}
