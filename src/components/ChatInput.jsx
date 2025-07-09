import { SendHorizontal, Loader2 } from 'lucide-react';

const ChatInput = ({
  isLoading,
  textInput,
  setTextInput,
  handleSend,
}) => {
  return (
    <div className="flex items-end gap-3 p-4 border-t border-gray-700 bg-gray-900">
      {/* Text Input */}
      <textarea
        className="flex-1 p-3 border border-gray-600 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out resize-none min-h-[3rem] max-h-[140px] overflow-y-auto"
        value={textInput}
        onChange={(e) => setTextInput(e.target.value)}
        placeholder="Type your message here..."
        disabled={isLoading}
        rows={1}
        onInput={(e) => {
          e.target.style.height = 'auto';
          e.target.style.height = `${Math.min(e.target.scrollHeight, 140)}px`;
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.shiftKey && textInput.trim() && !isLoading) {
            e.preventDefault();
            handleSend();
          }
        }}
      />

      {/* Send Button */}
      <button
        onClick={handleSend}
        className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-md flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed transition duration-200 ease-in-out"
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
