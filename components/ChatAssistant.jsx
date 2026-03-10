"use client";
import { useState } from "react";
import { getApiUrl, parseJsonResponse } from "@/lib/api";

export default function ChatAssistant() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const sendMessage = async () => {
    const message = input.trim();
    if (!message || loading) return;

    setMessages((prev) => [...prev, { role: "user", text: message }]);
    setInput("");
    setError("");
    setLoading(true);

    try {
      const res = await fetch(getApiUrl("/chat"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });

      const data = await parseJsonResponse(res);
      setMessages((prev) => [...prev, { role: "assistant", text: data.reply }]);
    } catch (e) {
      setError(e.message || "Failed to generate a reply.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="feature-card">
      <div className="feature-header">
        <div>
          <h2 className="feature-title">Chat Assistant</h2>
          <p className="feature-description">
            Ask for recipe ideas, ingredient alternatives, or food-related help.
          </p>
        </div>
        <span className="subtle-badge">Quick Chat</span>
      </div>

      <div className="chat-shell">
        <div className="chat-messages">
          {messages.length === 0 && (
            <div className="empty-state">
              Start with a simple food question. For example: suggest a quick
              salmon dinner or explain what pairs well with miso.
            </div>
          )}

          {messages.map((message, index) => (
            <div
              key={`${message.role}-${index}`}
              className={`chat-bubble ${message.role}`}
            >
              {message.text}
            </div>
          ))}

          {loading && (
            <span className="loading-pill" aria-live="polite">
              <span className="dot" />
              <span className="dot" />
              <span className="dot" />
              Assistant is typing
            </span>
          )}
        </div>

        {error && (
          <div className="inline-error" role="alert">
            {error}
          </div>
        )}

        <div className="chat-input-row">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="input-field chat-input"
            placeholder="Ask something about food..."
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
              }
            }}
          />
          <button
            type="button"
            onClick={sendMessage}
            className="primary-button"
            disabled={loading || !input.trim()}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
