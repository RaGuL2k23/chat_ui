const handleSend = async (textInput, setTextInput, setIsLoading, setMessages) => {
  if (!textInput.trim()) return;

  const userMessage = { text: textInput.trim(), isUser: true };
  setMessages((prev) => [...prev, userMessage]);
  setIsLoading(true);
  setTextInput("");

  try {
    const botMessage = await fakeBotReply();
    setMessages((prev) => [...prev, botMessage]);
  } catch (error) {
    console.error("Bot reply failed:", error);
    setMessages((prev) => [
      ...prev,
      { text: "Oops! Something went wrong.", isUser: false }
    ]);
  } finally {
    setIsLoading(false);
  }
}; 

// 🔧 Fake promise helper function
const fakeBotReply = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        text: "This is a simulated reply.",
        isUser: false,
      });
    }, 1000);
  });
};

export {handleSend}