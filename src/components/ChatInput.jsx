import { SendHorizontal, Loader2 } from 'lucide-react';
import { useEffect, useRef } from 'react';

const ChatInput = ({
  isLoading,
  textInput,
  setTextInput,
  handleSend,
}) => {
  const textInputRef = useRef(null); // Create a ref for the textarea
  useEffect(() => {
    if (textInputRef.current) {
      textInputRef.current.focus();
    }
  }, [isLoading]);
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey && textInput.trim() && !isLoading) {
      e.preventDefault(); // Prevent default action (form submission)
      handleSend(); // Send the message
    }
  };

  return (
    <div className="flex items-end gap-3 p-4 border-t border-gray-700 bg-gray-900 dark:bg-gray-800 dark:border-gray-600">
      {/* Text Input */}
      <textarea
        ref={textInputRef} // Attach ref to the textarea
        className="flex-1 p-3 border border-gray-600 rounded-lg bg-gray-700 dark:bg-gray-900 text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out resize-none min-h-[3rem] max-h-[140px] overflow-y-auto"
        value={textInput}
        onChange={(e) => setTextInput(e.target.value)}
        placeholder="Type your message here..."
        disabled={isLoading}
        rows={1}
        onInput={(e) => {
          e.target.style.height = 'auto';
          e.target.style.height = `${Math.min(e.target.scrollHeight, 140)}px`;
        }}
        onKeyDown={handleKeyDown} // Use the new keydown handler
      />

      {/* Send Button */}
      <button
        onClick={handleSend}
        className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-md flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed transition duration-200 ease-in-out dark:bg-indigo-500 dark:hover:bg-indigo-600"
        disabled={isLoading || !textInput?.trim()}
      >
        {isLoading ? (
          <Loader2 className="animate-spin h-5 w-5" />
        ) : (
          <>
            Send
            <SendHorizontal className="h-5 w-5 ml-2" />
          </>
        )}
      </button>
    </div>
  );
};

export default ChatInput;
