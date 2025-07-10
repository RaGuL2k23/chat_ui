import { Download } from "lucide-react";

// Utility to guess file extension based on message content
const guessFileExtension = (message) => {
  const msg = message.toLowerCase();

  if (msg.includes("<html") || msg.includes("<!doctype html")) return "html";
  if (msg.includes("import") && msg.includes("def")) return "py";
  if (msg.includes("console.log") || msg.includes("function")) return "js";
  if (msg.includes("select") || msg.includes("from") || msg.includes("join")) return "sql";
  if (msg.includes("body {") || msg.includes("color:") || msg.includes("font-size:")) return "css";
  if (msg.includes("public class") || msg.includes("system.out")) return "java";
  if (msg.includes("using system")) return "cs";
  if (msg.includes("<?php")) return "php";

  return "txt"; // default fallback for unrecognized code
};

export default function ChatBubble({ message, isUser }) {
  const handleDownload = () => {
    const ext = guessFileExtension(message); // Get the file extension based on content
    console.log(ext, 'extension');  // Debugging line
    
    const contentType = getContentTypeForExtension(ext);  // Get the appropriate content type based on extension
    
    // Create the Blob with correct content type
    const blob = new Blob([message], { type: contentType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `response.${ext}`; // Default file name with extension
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Determine content type based on file extension
  const getContentTypeForExtension = (ext) => {
    switch (ext) {
      case 'html':
        return 'text/html';
      case 'js':
        return 'application/javascript';
      case 'py':
        return 'text/x-python';
      case 'css':
        return 'text/css';
      case 'java':
        return 'text/x-java-source';
      case 'php':
        return 'application/x-httpd-php';
      case 'sql':
        return 'application/sql';
      case 'cs':
        return 'text/x-csharp';
      default:
        return 'text/plain';
    }
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
          dark:bg-gray-800 dark:text-white // Dark mode styles
        `}
      >
        <pre className="whitespace-pre-wrap">{message}</pre>

        {/* Only show the download button for non-user messages */}
        {!isUser && (
          <button
            onClick={handleDownload}
            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
            title="Download response"
          >
            <Download className="h-4 w-4 text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white" />
          </button>
        )}
      </div>
    </div>
  );
}
