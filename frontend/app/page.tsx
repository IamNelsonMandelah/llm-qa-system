'use client';

import { useEffect, useRef, useState } from 'react';

// Chat message type definition
interface Message {
  question: string;
  answer: string;
  timestamp: string;
}

export default function Home() {
  const [question, setQuestion] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedChatIndex, setSelectedChatIndex] = useState<number | null>(null);
  const [darkMode, setDarkMode] = useState(false);

  const bottomRef = useRef<HTMLDivElement | null>(null);

  // Scroll to bottom when new message is added
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Load saved chats on first render
  useEffect(() => {
    const saved = localStorage.getItem('chatHistory');
    if (saved) {
      setMessages(JSON.parse(saved));
    }
  }, []);

  // Save messages to local storage whenever they change
  useEffect(() => {
    localStorage.setItem('chatHistory', JSON.stringify(messages));
  }, [messages]);

  // Toggle dark mode class on body
  useEffect(() => {
    document.body.classList.toggle('dark', darkMode);
  }, [darkMode]);

  // Handle sending question to FastAPI backend
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch('http://127.0.0.1:8000/api/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question }),
      });

      const data = await res.json();

      if (res.ok) {
        const newMessage: Message = {
          question,
          answer: data.answer,
          timestamp: data.timestamp_responded,
        };
        setMessages((prev) => [...prev, newMessage]);
        setSelectedChatIndex(messages.length);
        setQuestion(''); // Clear textarea after sending
      } else {
        setError(data.detail || 'Something went wrong.');
      }
    } catch {
      setError('Server is unreachable.');
    } finally {
      setLoading(false);
    }
  };

  // Copy response to clipboarrd
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  return (
    <div className={`min-h-screen flex ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'}`}>
      {/* Sidebar - Chat History */}
      <aside className="w-64 bg-white dark:bg-gray-800 p-4 border-r dark:border-gray-700 hidden md:block">
  <h2 className="text-lg font-semibold mb-4 text-black dark:text-white">Chat History</h2>
  <ul className="space-y-2">
    {messages.map((msg, idx) => (
      <li
        key={idx}
        className={`cursor-pointer p-2 rounded text-black dark:text-white ${
          idx === selectedChatIndex
            ? 'bg-blue-600 text-white'
            : 'hover:bg-gray-200 dark:hover:bg-gray-700'
        }`}
        onClick={() => setSelectedChatIndex(idx)}
      >
        {msg.question.slice(0, 30)}...
      </li>
    ))}
  </ul>
</aside>


      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center p-6 space-y-4">
        <h1 className="text-3xl font-bold text-center">AI Q&A Assistant</h1>

        {/* Question Form */}
        <form onSubmit={handleSubmit} className="w-full max-w-2xl space-y-4">
          <textarea
            rows={4}
            className="w-full p-4 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 text-black bg-white dark:bg-gray-800"
            placeholder="Ask your question..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
          >
            {loading ? 'Thinking...' : 'Ask AI'}
          </button>
        </form>

        {/* Error Display */}
        {error && <p className="text-red-500">{error}</p>}

        {/* Display Answer */}
        {selectedChatIndex !== null && messages[selectedChatIndex] && (
          <div className="mt-6 w-full max-w-2xl bg-white dark:bg-gray-800 p-6 rounded-lg shadow space-y-3">
            <div>
              <p className="font-semibold text-gray-700 dark:text-gray-300">You:</p>
              <p className="whitespace-pre-wrap text-black">{messages[selectedChatIndex].question}</p>
            </div>
            <div className="border-t pt-3">
              <p className="font-semibold text-green-700 dark:text-green-400 flex justify-between">
                AI Response:
                <button
                  onClick={() => handleCopy(messages[selectedChatIndex].answer)}
                  className="text-xs bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded hover:bg-gray-300 dark:hover:bg-gray-500"
                >
                  Copy
                </button>
              </p>
              <p className="whitespace-pre-wrap text-black">{messages[selectedChatIndex].answer}</p>
            </div>
            <p className="text-xs text-gray-400 pt-2">
              Answered: {new Date(messages[selectedChatIndex].timestamp).toLocaleString()}
            </p>
          </div>
        )}

        <div ref={bottomRef}></div>
      </main>

      {/* Floating Dark Mode Toggle Button */}
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="fixed bottom-4 right-4 z-50 p-3 rounded-full bg-gray-800 text-white hover:bg-gray-700"
        title="Toggle dark mode"
      >
        {darkMode ? '🌙' : '☀️'}
      </button>
    </div>
  );
}
