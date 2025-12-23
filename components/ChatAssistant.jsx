"use client";
import { useState } from "react";

export default function ChatAssistant() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input) return;
    setMessages([...messages, { role: "user", text: input }]);
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });
      const data = await res.json();
      setMessages((prev) => [...prev, { role: "assistant", text: data.reply }]);
      setInput("");
    } catch (e) {
      alert(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border border-gray-400 rounded-xl p-4 w-full max-w-md flex flex-col gap-2">
      <div className="flex flex-col gap-2 h-64 overflow-y-auto">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`p-2 rounded-md text-sm ${
              m.role === "user"
                ? "bg-gray-500 self-end"
                : "bg-gray-400 self-start"
            }`}
          >
            {m.text}
          </div>
        ))}
        {loading && (
          <div className="text-xs text-gray-400">Assistant is typing...</div>
        )}
      </div>
      <div className="flex gap-2 mt-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 border rounded-md p-2 text-sm text-gray-500"
          placeholder="Type a message..."
        />
        <button
          onClick={sendMessage}
          className="bg-gray-600 text-white px-4 py-1.5 rounded-md text-sm"
          disabled={loading}
        >
          Send
        </button>
      </div>
    </div>
  );
}
