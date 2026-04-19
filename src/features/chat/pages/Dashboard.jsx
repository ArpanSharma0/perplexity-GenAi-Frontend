import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Menu } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import ChatWindow from '../components/ChatWindow';

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const [chats, setChats] = useState([]);
  const [currentChatId, setCurrentChatId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [mode, setMode] = useState("local");

  useEffect(() => {
    fetchChatHistory();
  }, []);

  useEffect(() => {
    if (currentChatId) {
      fetchMessages(currentChatId);
    } else {
      setMessages([]);
    }
  }, [currentChatId]);

  const fetchChatHistory = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/chats/history", { withCredentials: true });
      setChats(res.data.chats);
    } catch (error) {
      console.error("Failed to fetch history", error);
    }
  };

  const fetchMessages = async (chatId) => {
    try {
      const res = await axios.get(`http://localhost:3000/api/chats/${chatId}/messages`, { withCredentials: true });
      setMessages(res.data.messages);
    } catch (error) {
      console.error("Failed to fetch messages", error);
    }
  };

  const handleDeleteChat = async (chatId) => {
    try {
      await axios.delete(`http://localhost:3000/api/chats/${chatId}`, { withCredentials: true });
      setChats(prev => prev.filter(c => c._id !== chatId));
      if (currentChatId === chatId) {
        setCurrentChatId(null);
      }
    } catch (error) {
      console.error("Failed to delete chat", error);
    }
  };

  const handleSendMessage = async (text) => {
    const newUserMsg = { role: 'user', content: text };
    setMessages(prev => [...prev, newUserMsg]);
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:3000/api/chats", {
        message: text,
        chatId: currentChatId,
        mode: mode
      }, { withCredentials: true });

      const aiMsg = res.data.message;
      setMessages(prev => [...prev, aiMsg]);
      
      if (!currentChatId) {
        setCurrentChatId(res.data.chat._id);
        fetchChatHistory();
      }
    } catch (error) {
      console.error("Failed to send message", error);
      setMessages(prev => [...prev, { role: 'ai', content: "Sorry, I encountered an error. Please try again." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen overflow-hidden font-sans text-[#e5e7eb] relative bg-[#020617]">
        
        {/* Layered Lighting Effects */}
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
            {/* Top left soft blue glow */}
            <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[60%] rounded-full bg-blue-600/15 blur-[120px] mix-blend-screen opacity-70"></div>
            
            {/* Top right cyan/emerald glow */}
            <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[50%] rounded-full bg-cyan-500/10 blur-[130px] mix-blend-screen opacity-60"></div>
            
            {/* Center spotlight for main focus area */}
            <div className="absolute top-[10%] left-[50%] translate-x-[-50%] w-[70vw] h-[600px] rounded-[100%] bg-white/[0.02] blur-[150px] pointer-events-none"></div>
            
            {/* Bottom left purple subtle glow */}
            <div className="absolute bottom-[-10%] left-[20%] w-[40%] h-[40%] rounded-full bg-indigo-500/10 blur-[140px] mix-blend-screen opacity-40"></div>
        </div>

        {/* Mobile menu button */}
        <button 
            onClick={() => setSidebarOpen(true)}
            className="md:hidden absolute top-4 left-4 z-20 p-2 text-[#9ca3af] hover:text-[#e5e7eb] bg-[#0f172a]/50 backdrop-blur-md rounded-md border border-white/5 shadow-sm"
        >
            <Menu size={20} />
        </button>

        <Sidebar 
          chats={chats} 
          currentChatId={currentChatId}
          onSelectChat={setCurrentChatId}
          onNewChat={() => setCurrentChatId(null)}
          onDeleteChat={handleDeleteChat}
          isOpen={sidebarOpen}
          toggleSidebar={() => setSidebarOpen(false)}
        />
        
        <main className="flex-1 min-w-0 transition-all duration-300 relative z-10">
          <ChatWindow 
            messages={messages}
            onSendMessage={handleSendMessage}
            loading={loading}
            mode={mode}
            setMode={setMode}
          />
        </main>
    </div>
  );
};

export default Dashboard;
