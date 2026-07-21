"use client";

import Modal from "@mui/material/Modal";
import axios from "axios";
import { useState, useRef, useEffect } from "react";
import { X, Bot, SendHorizonal } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function AiModal({ openModal, setOpenModal }) {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef(null);

  // Auto-scroll to the bottom whenever messages change
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const handleClose = () => {
    setOpenModal(false);
  };

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    
    // 1. Instantly show user's message & clear input (Real-time feel)
    setInput("");
    setMessages((prev) => [...prev, { sender: "user", text: userMessage }]);
    setIsLoading(true);

    try {
      // 2. Make API Call
      const res = await axios.post("https://ai.vhbuyio.in/api/chat", {
        message: userMessage,
      });
      
      // 3. Append Bot Response
      setMessages((prev) => [...prev, { sender: "bot", text: res.data.reply }]);
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "⚠️ Sorry, I encountered an error. Please try again." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <Modal open={openModal} onClose={handleClose}>
      <div className="flex items-end sm:items-center justify-center min-h-screen sm:p-4 bg-black/40 backdrop-blur-sm">
        {/* Modal Box */}
        <div className="bg-background text-foreground w-full sm:max-w-xl h-[90vh] sm:h-[85vh] sm:rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-zinc-200 dark:border-zinc-800 rounded-t-2xl sm:rounded-b-2xl">
          
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-200 dark:border-zinc-800 bg-background/95 backdrop-blur z-10 sticky top-0">
            <div className="flex items-center gap-3">
              <div className="bg-yellow-500/20 p-2 rounded-full text-yellow-600 dark:text-yellow-500">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-semibold tracking-tight">AI Assistant</h2>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">Online and ready to help</p>
              </div>
            </div>
            <button 
              onClick={handleClose}
              className="p-2 rounded-full opacity-70 hover:opacity-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500"
            >
              <X className="w-5 h-5" />
              <span className="sr-only">Close</span>
            </button>
          </div>

          {/* Chat Area */}
          <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-6 space-y-6 bg-zinc-50/50 dark:bg-background">
            {messages.length === 0 && (
              <div className="text-center text-zinc-500 dark:text-zinc-400 mt-20 flex flex-col items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center mb-2">
                  <Bot className="w-6 h-6 text-zinc-400" />
                </div>
                <p className="text-sm">How can I help you today?</p>
              </div>
            )}

            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`px-4 py-3 max-w-[85%] md:max-w-[75%] whitespace-pre-wrap text-sm ${
                    msg.sender === "user"
                      ? "bg-yellow-500 text-zinc-950 rounded-2xl rounded-tr-sm shadow-sm"
                      : "bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 rounded-2xl rounded-tl-sm shadow-sm"
                  }`}
                >
                  <div className="prose dark:prose-invert prose-sm max-w-none">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {msg.text}
                    </ReactMarkdown>
                  </div>
                </div>
              </div>
            ))}

            {/* Real-time Typing Indicator */}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-4 py-4 rounded-2xl rounded-tl-sm shadow-sm flex gap-1.5 items-center">
                  <span className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce"></span>
                  <span className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                  <span className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                </div>
              </div>
            )}
            
            {/* Invisible div to scroll to */}
            <div ref={chatEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t border-zinc-200 dark:border-zinc-800 p-4 bg-background">
            <div className="relative flex items-end gap-2">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Message AI Assistant..."
                rows={1}
                className="flex-1 bg-zinc-100 dark:bg-zinc-900 border-transparent focus:border-transparent rounded-2xl text-foreground px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-yellow-500 resize-none overflow-y-auto min-h-[48px] max-h-32 text-sm"
              />
              <button
                onClick={sendMessage}
                disabled={isLoading || !input.trim()}
                className="absolute right-1 bottom-1 w-10 h-10 bg-yellow-500 hover:bg-yellow-400 disabled:bg-zinc-200 disabled:dark:bg-zinc-800 disabled:text-zinc-400 disabled:cursor-not-allowed text-zinc-950 rounded-full transition-all flex items-center justify-center shadow-sm"
              >
                <SendHorizonal className="w-4 h-4 ml-0.5" />
              </button>
            </div>
            <div className="text-center mt-3">
              <p className="text-[11px] text-zinc-400">AI can make mistakes. Consider verifying important information.</p>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}