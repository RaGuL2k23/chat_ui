import { Download } from "lucide-react";

// Utility to guess file extension based on message content
const guessFileExtension = (message) => {
  const msg = message.toLowerCase();

  if (msg.includes("<html") || msg.includes("<!doctype html")) return "html";
  if (msg.includes("import") && msg.includes("def")) return "py";
  if (msg.includes("console.log") || msg.includes("function")) return "js";
  if (msg.includes("SELECT") || msg.includes("FROM") || msg.includes("JOIN")) return "sql";
  if (msg.includes("body {") || msg.includes("color:")) return "css";
  if (msg.includes("public class") || msg.includes("System.out")) return "java";
  if (msg.includes("using System")) return "cs";
  if (msg.includes("<?php")) return "php";

  return "txt"; // default fallback
};

export default function ChatBubble({ message, isUser }) {
  const handleDownload = () => {
    const ext = guessFileExtension(message);
    console.log(ext,'extension');
    
    const blob = new Blob([message], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `response.${ext}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-3`}>
      <div
        className={`
          p-3 rounded-2xl shadow text-sm relative group
          max-w-[80%] whitespace-pre-wrap break-words
          ${isUser 
            ? 'bg-blue-600 text-white rounded-br-none'
            : 'bg-gray-100 text-black rounded-bl-none'
          }
          font-mono
        `}
      >
        <pre className="whitespace-pre-wrap">{message}</pre>

        {!isUser && (
          <button
            onClick={handleDownload}
            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
            title="Download response"
          >
            <Download className="h-4 w-4 text-gray-600 hover:text-black" />
          </button>
        )}
      </div>
    </div>
  );
}
