import { useState } from "react";
import ChatBubble from "./ChatBubble";
import ChatInput from "./ChatInput";
import { handleSend } from "../queries/hepler";

const ChatMainUi = () => {
  const [textInput, setTextInput] = useState("");
const [messages, setMessages] = useState([
  { text: "Hey!", isUser: true },
  { text: "Hello! How can I assist you today?", isUser: false },
  { text: "Can you write a Python function to check if a number is prime?", isUser: true },
  {
    text: `
def is_prime(n):
    if n <= 1:
        return False
    for i in range(2, int(n ** 0.5) + 1):
        if n % i == 0:
            return False
    return True

# Example
print(is_prime(11))  # True
    `.trim(),
    isUser: false,
  },
  { text: "Nice! Can you do the same in JavaScript?", isUser: true },
  {
    text: `
function isPrime(n) {
    if (n <= 1) return false;
    for (let i = 2; i <= Math.sqrt(n); i++) {
        if (n % i === 0) return false;
    }
    return true;
}

// Example
console.log(isPrime(11)); // true
    `.trim(),
    isUser: false,
  },
  { text: "Perfect, thanks! 👌", isUser: true },
]);

  const [isLoading, setIsLoading] = useState(false);

  

  return (
    <main className="h-screen w-screen flex flex-col bg-gray-900 text-white">
      {/* Header */}
      <header className="p-4 text-lg font-semibold bg-gray-800 shadow-md">
        Welcome to ChatBot
      </header>

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {messages.map((msg, i) => (
          <ChatBubble key={i} message={msg.text} isUser={msg.isUser} />
        ))}
      </div>

      {/* Fixed Chat Input */}
      <footer className="bg-gray-900 border-t border-gray-700">
        <ChatInput
          isLoading={isLoading}
          textInput={textInput}
          setTextInput={setTextInput}
          handleSend={()=>handleSend(textInput , setTextInput , setIsLoading , setMessages)}
        />
      </footer>
    </main>
  );
};

export default ChatMainUi;
