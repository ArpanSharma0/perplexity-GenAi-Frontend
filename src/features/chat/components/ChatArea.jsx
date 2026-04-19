import React, { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { SendHorizontal, Sparkles, BookOpen } from 'lucide-react';

const SourceChip = ({ source, index }) => {
    return (
        <div className="flex flex-col gap-1 inline-block shrink-0 bg-[#2b2d31] border border-zinc-700/50 hover:bg-zinc-700 transition-colors p-3 rounded-xl max-w-[200px] cursor-default">
            <div className="flex items-center gap-2">
                <div className="text-[10px] font-bold bg-zinc-800 w-5 h-5 rounded-full flex items-center justify-center text-zinc-400">{index + 1}</div>
                <span className="text-xs font-medium text-zinc-300 truncate flex-1">{source.title}</span>
            </div>
            <p className="text-[11px] text-zinc-500 line-clamp-2 leading-relaxed">"{source.content}"</p>
        </div>
    )
};

const MessageBubble = ({ message }) => {
    const isAi = message.role === "ai";
    
    return (
        <div className={`flex w-full mb-8 font-sans ${isAi ? "justify-start" : "justify-end"}`}>
            {isAi ? (
                <div className="w-full flex gap-4 max-w-3xl">
                    <div className="w-8 h-8 rounded-full bg-blue-600/20 flex flex-shrink-0 items-center justify-center mt-1 outline outline-1 outline-blue-500/30">
                        <Sparkles size={16} className="text-blue-400" />
                    </div>
                    <div className="flex-1 flex flex-col min-w-0">
                        {/* Sources row */}
                        {message.sources && message.sources.length > 0 && (
                            <div className="mb-4">
                                <div className="flex items-center gap-2 text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                                    <BookOpen size={14} /> Sources
                                </div>
                                <div className="flex overflow-x-auto gap-2 pb-2 scrollbar-none">
                                    {message.sources.map((source, idx) => (
                                        <SourceChip key={idx} source={source} index={idx} />
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Answer */}
                        <div className="prose prose-invert prose-zinc max-w-none text-[15px] leading-7 font-normal text-zinc-200 prose-p:my-3 prose-pre:bg-[#202123] prose-pre:border prose-pre:border-zinc-800 prose-headings:text-zinc-100">
                            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                {message.content}
                            </ReactMarkdown>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="px-5 py-3.5 bg-[#2b2d31] rounded-2xl max-w-2xl text-[15px] text-zinc-100 leading-relaxed font-normal shadow-sm border border-zinc-800/80">
                    {message.content}
                </div>
            )}
        </div>
    );
};

const ChatArea = ({ messages, onSendMessage, loading }) => {
    const [input, setInput] = useState('');
    const endOfMessagesRef = useRef(null);

    useEffect(() => {
        endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (input.trim() && !loading) {
            onSendMessage(input);
            setInput('');
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e);
        }
    };

    return (
        <div className="flex-1 flex flex-col bg-[#343541] h-screen w-full relative">
            <div className="flex-1 overflow-y-auto px-4 py-8 md:px-8 w-full scrollbar-thin scrollbar-thumb-zinc-600">
                <div className="max-w-3xl mx-auto pb-48">
                    {messages.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full min-h-[60vh]">
                            <BookOpen size={48} className="text-zinc-700 mb-6" />
                            <h2 className="text-3xl font-semibold text-zinc-300 tracking-tight">Where knowledge begins</h2>
                            <p className="text-zinc-500 mt-3 text-center">Upload documents and ask questions to dive deep into your own data.</p>
                        </div>
                    ) : (
                        messages.map((msg, idx) => <MessageBubble key={idx} message={msg} />)
                    )}
                    
                    {loading && (
                        <div className="flex w-full mb-8 justify-start gap-4 max-w-3xl">
                            <div className="w-8 h-8 rounded-full bg-zinc-800 animate-pulse flex shrink-0" />
                            <div className="flex flex-col gap-2 w-full pt-1">
                                <div className="h-4 bg-zinc-800 rounded animate-pulse w-3/4" />
                                <div className="h-4 bg-zinc-800 rounded animate-pulse w-1/2" />
                            </div>
                        </div>
                    )}
                    <div ref={endOfMessagesRef} />
                </div>
            </div>

            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-[#343541] via-[#343541] to-transparent pt-10 pb-6 px-4 pointer-events-none">
                <div className="max-w-3xl mx-auto pointer-events-auto">
                    <form 
                        onSubmit={handleSubmit} 
                        className="relative flex items-end bg-[#40414f] border border-zinc-600/50 rounded-[24px] shadow-lg focus-within:bg-[#40414f] focus-within:ring-1 focus-within:ring-zinc-400 transition-all font-sans overflow-hidden"
                    >
                        <textarea
                            rows={1}
                            value={input}
                            onChange={(e) => {
                                setInput(e.target.value);
                                e.target.style.height = 'auto';
                                e.target.style.height = `${Math.min(e.target.scrollHeight, 120)}px`;
                            }}
                            onKeyDown={handleKeyDown}
                            placeholder="Ask me anything..."
                            className="w-full max-h-[120px] bg-transparent border-0 text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-0 resize-none py-4 px-5 text-[15px] leading-relaxed"
                            style={{ height: '56px' }}
                        />
                        <div className="absolute right-2 bottom-2">
                            <button
                                type="submit"
                                disabled={!input.trim() || loading}
                                className="p-2 bg-blue-500 hover:bg-blue-400 text-white rounded-full disabled:opacity-30 disabled:hover:bg-blue-500 transition-colors flex items-center justify-center transform active:scale-95"
                            >
                                <SendHorizontal size={18} className={input.trim() ? "translate-x-[1px]" : ""} />
                            </button>
                        </div>
                    </form>
                    <div className="text-center mt-3 text-[11px] text-zinc-500">
                        AI can make mistakes. Consider verifying important information.
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatArea;
