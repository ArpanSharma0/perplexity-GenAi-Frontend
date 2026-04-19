import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, MessageSquare, FileText, Upload, ChevronLeft, Trash2, Library, Settings, LogOut } from 'lucide-react';
import { useSelector } from 'react-redux';
import { useAuth } from '../../auth/hook/useAuth';

const DocumentManager = () => {
    const [file, setFile] = useState(null);
    const [documents, setDocuments] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchDocuments();
    }, []);

    const fetchDocuments = async () => {
        try {
            const res = await axios.get("http://localhost:3000/api/docs", { withCredentials: true });
            setDocuments(res.data.documents || []);
        } catch (error) {
            console.error("Failed to fetch documents", error);
        }
    };

    const handleUpload = async () => {
        if (!file) return;
        setLoading(true);
        const formData = new FormData();
        formData.append("document", file);

        try {
            await axios.post("http://localhost:3000/api/docs/upload", formData, {
                withCredentials: true,
                headers: { "Content-Type": "multipart/form-data" }
            });
            setFile(null);
            fetchDocuments();
        } catch (error) {
            console.error("Upload failed", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="mt-4 border-t border-white/5 pt-6">
            <h3 className="text-[11px] font-semibold text-[#9ca3af] uppercase tracking-wider mb-4 px-4 flex items-center gap-2">
                <Library size={13} /> Knowledge Base
            </h3>
            
            <div className="px-3 mb-4">
                <input 
                    type="file" 
                    id="doc-upload"
                    accept=".txt,.pdf" 
                    onChange={(e) => setFile(e.target.files[0])}
                    className="hidden"
                />
                
                <div className="flex bg-[#0f172a]/40 rounded-xl border border-white/10 hover:border-blue-500/30 transition-colors duration-200 p-1.5 items-center shadow-sm">
                    <label 
                        htmlFor="doc-upload"
                        className="flex-1 cursor-pointer truncate text-[13px] text-[#9ca3af] px-4 py-2 hover:text-[#e5e7eb] transition-colors font-medium"
                    >
                        {file ? file.name : "Select PDF/TXT..."}
                    </label>
                    <button 
                        onClick={handleUpload} 
                        disabled={!file || loading}
                        className="bg-white/5 text-[#e5e7eb] hover:bg-white/10 disabled:opacity-30 rounded-lg p-2 transition-all duration-200 cursor-pointer"
                    >
                        {loading ? <div className="w-4 h-4 border-2 border-[#9ca3af] border-t-[#e5e7eb] rounded-full animate-spin" /> : <Upload size={14} />}
                    </button>
                </div>
            </div>

            <ul className="space-y-[2px] px-2 overflow-y-auto max-h-48 scrollbar-thin scrollbar-thumb-white/10 w-full">
                {documents.map(doc => (
                    <li key={doc._id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 group transition-colors duration-200">
                        <FileText size={14} className="text-[#9ca3af] shrink-0" />
                        <span className="text-[12px] text-[#e5e7eb] truncate flex-1">{doc.title}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

const UserProfileFooter = () => {
    const { user } = useSelector(state => state.auth);
    const { handleLogout } = useAuth();
    const [dropdownOpen, setDropdownOpen] = useState(false);

    if (!user) return null;

    return (
        <div className="relative p-4 border-t border-white/5 mt-auto bg-[#0f172a]/20">
            {dropdownOpen && (
                <>
                    <div className="fixed inset-0 z-40" onClick={() => setDropdownOpen(false)}></div>
                    <div className="absolute bottom-[calc(100%-8px)] left-4 w-52 bg-[#1e293b]/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.5)] z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                        <button className="flex items-center w-full gap-3 px-4 py-3.5 text-[13px] text-[#e5e7eb] hover:bg-white/5 transition-colors text-left font-medium">
                            <Settings size={15} className="text-[#9ca3af]" />
                            Profile
                        </button>
                        <div className="h-px w-full bg-white/5" />
                        <button 
                            onClick={() => { setDropdownOpen(false); handleLogout(); }}
                            className="flex items-center w-full gap-3 px-4 py-3.5 text-[13px] text-red-400 hover:bg-red-500/10 transition-colors text-left font-medium"
                        >
                            <LogOut size={15} />
                            Log out
                        </button>
                    </div>
                </>
            )}

            <div 
                className="flex items-center gap-3 cursor-pointer p-2 -mx-2 hover:bg-white/5 rounded-xl transition-colors duration-200"
                onClick={() => setDropdownOpen(!dropdownOpen)}
            >
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white text-[12px] font-bold shadow-md uppercase tracking-wider shrink-0">
                    {user?.username?.substring(0, 2) || 'US'}
                </div>
                <div className="flex-1 min-w-0 pr-2">
                    <div className="text-[13px] font-medium text-[#e5e7eb] truncate">{user?.username}</div>
                    <div className="text-[11px] text-[#9ca3af] truncate mt-0.5">{user?.email}</div>
                </div>
            </div>
        </div>
    );
};

const Sidebar = ({ chats = [], onSelectChat, currentChatId, onNewChat, isOpen, toggleSidebar, onDeleteChat }) => {
    return (
        <>
            {isOpen && (
                <div 
                    className="fixed inset-0 bg-[#020617]/80 backdrop-blur-sm z-20 md:hidden transition-opacity"
                    onClick={toggleSidebar}
                />
            )}
            
            <div className={`fixed md:relative inset-y-0 left-0 z-30 w-[270px] bg-[#0f172a]/60 backdrop-blur-2xl border-r border-white/5 text-[#e5e7eb] flex flex-col h-full transform transition-all duration-300 ease-out font-sans shadow-[4px_0_24px_rgba(0,0,0,0.2)] ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
                
                <div className="p-4 pt-6 flex items-center justify-between">
                    <button 
                        onClick={() => { onNewChat(); if(window.innerWidth < 768) toggleSidebar(); }}
                        className="flex items-start justify-center gap-2 text-[13px] bg-blue-500 hover:bg-blue-600 text-white rounded-full px-5 py-2.5 flex-1 transition-all duration-200 ease-out font-medium tracking-wide shadow-[0_4px_14px_rgba(59,130,246,0.2)] hover:shadow-[0_6px_20px_rgba(59,130,246,0.4)] active:scale-95 border border-blue-400/50"
                    >
                        <Plus size={16} strokeWidth={2.5} /> 
                        <span>New Thread</span>
                    </button>
                    <button onClick={toggleSidebar} className="md:hidden ml-2 p-2 text-[#9ca3af] hover:text-[#e5e7eb]">
                        <ChevronLeft size={20} />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent mt-4">
                    <h3 className="text-[11px] font-bold text-[#9ca3af] uppercase tracking-wider mb-3 px-6">Recents</h3>
                    <ul className="space-y-[3px] px-3">
                        {chats.map(chat => (
                            <li key={chat._id}>
                                <div className={`group flex items-center w-full p-2.5 rounded-xl text-[13px] transition-all duration-200 ease-out cursor-pointer
                                        ${currentChatId === chat._id 
                                            ? 'bg-blue-500/15 text-blue-400 shadow-sm border border-blue-500/30' 
                                            : 'text-[#9ca3af] hover:bg-[#1e293b]/60 hover:text-[#f8fafc] border border-transparent hover:border-white/5 hover:shadow-sm'
                                        }`}
                                    onClick={() => { onSelectChat(chat._id); if(window.innerWidth < 768) toggleSidebar(); }}
                                >
                                    <div className="flex-1 flex items-center gap-3 text-left truncate px-2">
                                        <MessageSquare size={14} className={currentChatId === chat._id ? "text-blue-400" : "text-[#9ca3af]"} />
                                        <span className="truncate leading-none tracking-tight font-medium pb-[1px]">{chat.title}</span>
                                    </div>
                                    <button 
                                        onClick={(e) => { e.stopPropagation(); onDeleteChat?.(chat._id); }}
                                        className={`p-1.5 text-zinc-500 hover:text-red-400 hover:bg-red-500/10 rounded-md transition-all duration-200 ml-1 ${currentChatId === chat._id ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}
                                        title="Delete Chat"
                                    >
                                        <Trash2 size={13} />
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                    
                    <DocumentManager />
                </div>
                
                <UserProfileFooter />
            </div>
        </>
    )
}

export default Sidebar;
