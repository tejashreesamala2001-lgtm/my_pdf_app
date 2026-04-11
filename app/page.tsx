"use client";

import { useState } from "react";

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [pdfText, setPdfText] = useState("");
  const [messages, setMessages] = useState<{ role: string; text: string }[]>([]);
  const [input, setInput] = useState("");

  // 📄 Upload file
  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    console.log("FRONT TEXT:", data.text); // DEBUG

    setPdfText(data.text);

    setMessages((prev) => [
      ...prev,
      { role: "system", text: `📄 Uploaded: ${file.name}` },
    ]);
  };

  // 🤖 Send question
  const handleSend = async () => {
    if (!input) return;

    const question = input;

    // add user + loading
    setMessages((prev) => [
      ...prev,
      { role: "user", text: question },
      { role: "bot", text: "🤖 Thinking..." },
    ]);

    setInput("");

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question,
          context: pdfText,
        }),
      });

      const data = await res.json();

      console.log("AI RESPONSE:", data);

      setMessages((prev) => [
        ...prev.slice(0, -1),
        { role: "bot", text: data.answer || "No response" },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev.slice(0, -1),
        { role: "bot", text: "❌ Error getting response" },
      ]);
    }
  };

  return (
    <main className="flex flex-col h-screen bg-gray-900 text-white">

      {/* Header */}
      <div className="p-4 border-b border-gray-700 text-lg font-semibold">
        📄 My Text AI Chat
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 pb-40">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`max-w-[70%] p-3 rounded-lg ${
              msg.role === "user"
                ? "bg-blue-600 ml-auto"
                : msg.role === "bot"
                ? "bg-gray-700"
                : "bg-green-600 text-sm text-center mx-auto"
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>

      {/* Bottom Section */}
      <div className="fixed bottom-0 left-0 w-full bg-gray-900 border-t border-gray-700 p-3">

        {/* Upload */}
        <div className="flex gap-2 mb-2">
          <input
            type="file"
            onChange={(e) => {
              if (e.target.files) {
                setFile(e.target.files[0]);
              }
            }}
          />

          <button
            onClick={handleUpload}
            className="bg-purple-600 px-3 py-1 rounded hover:bg-purple-700"
          >
            Upload
          </button>
        </div>

        {/* Input */}
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Ask something about your document..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 p-2 rounded bg-gray-800 border border-gray-600"
          />

          <button
            onClick={handleSend}
            className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
          >
            Send
          </button>
        </div>

      </div>

    </main>
  );
}
