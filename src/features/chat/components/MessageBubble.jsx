import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Sources from './Sources';
import { Sparkles, User } from 'lucide-react';

const MessageBubble = ({ message }) => {
    const isAi = message.role === "ai";
    
    return (
        <div className={`flex w-full mb-8 font-sans ${isAi ? "justify-start" : "justify-end"}`}>
            {isAi ? (
                <div className="w-full flex gap-5 max-w-[800px] group">
                    <div className="w-8 h-8 rounded-full bg-blue-500/10 flex flex-shrink-0 items-center justify-center mt-1 border border-blue-500/20 shadow-[0_0_20px_rgba(59,130,246,0.15)] transition-shadow duration-300 group-hover:shadow-[0_0_30px_rgba(59,130,246,0.25)]">
                        <Sparkles size={16} className="text-blue-400" />
                    </div>
                    <div className="flex-1 flex flex-col min-w-0 pt-1">
                        <Sources sources={message.sources} />

                        <div className="prose prose-invert prose-zinc max-w-none text-[15px] leading-[1.7] font-normal text-[#e5e7eb] 
                                      prose-p:my-4 prose-pre:bg-[#020617]/50 prose-pre:backdrop-blur-xl prose-pre:border prose-pre:border-white/10 prose-pre:shadow-lg
                                      prose-headings:text-[#e5e7eb] prose-headings:font-semibold prose-headings:tracking-tight prose-h1:text-xl prose-h2:text-lg prose-h3:text-base
                                      prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline prose-strong:text-[#e5e7eb] prose-strong:font-semibold
                                      prose-li:my-1.5 prose-ul:my-5 prose-code:text-blue-300 prose-code:bg-blue-500/10 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:font-medium">
                            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                {message.content}
                            </ReactMarkdown>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="px-5 py-3.5 bg-[#1e293b]/80 backdrop-blur-md rounded-3xl rounded-tr-md max-w-[80%] lg:max-w-2xl text-[15px] text-[#e5e7eb] leading-relaxed font-normal shadow-[0_8px_30px_rgba(0,0,0,0.4)] border border-white/5 border-t-white/10 transition-colors duration-200 hover:bg-[#1e293b]/90">
                    {message.content}
                </div>
            )}
        </div>
    );
};

export default MessageBubble;
