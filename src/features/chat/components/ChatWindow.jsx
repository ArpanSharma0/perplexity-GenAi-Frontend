import React, { useState, useEffect, useRef } from 'react';
import MessageBubble from './MessageBubble';
import InputBox from './InputBox';
import EmptyState from './EmptyState';
import { Sparkles } from 'lucide-react';

const ChatWindow = ({ messages, onSendMessage, loading, mode, setMode }) => {
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

    return (
        <div className="flex-1 flex flex-col h-screen w-full relative bg-transparent transition-all duration-300">
            <div className="flex-1 overflow-y-auto px-4 py-8 md:px-8 w-full scrollbar-thin scrollbar-thumb-white/10">
                <div className="max-w-[800px] mx-auto pb-48 transition-all duration-300">
                    
                    {messages.length === 0 ? (
                        <EmptyState />
                    ) : (
                        messages.map((msg, idx) => (
                            <div key={idx} className="animate-in fade-in slide-in-from-bottom-4 duration-300 ease-out fill-mode-both" style={{animationDelay: `${idx * 50}ms`}}>
                                <MessageBubble message={msg} />
                            </div>
                        ))
                    )}
                    
                    {loading && (
                        <div className="flex w-full mb-8 justify-start gap-5 max-w-[800px] animate-in fade-in duration-300">
                            <div className="w-8 h-8 rounded-full bg-blue-500/10 flex flex-shrink-0 items-center justify-center mt-1 border border-blue-500/20">
                                <Sparkles size={16} className="text-blue-400 animate-pulse" />
                            </div>
                            <div className="flex flex-col gap-3 w-full pt-2">
                                <div className="h-2 bg-zinc-800 rounded-full animate-pulse w-24"></div>
                            </div>
                        </div>
                    )}
                    <div ref={endOfMessagesRef} />
                </div>
            </div>

            <InputBox 
                input={input} 
                setInput={setInput} 
                onSubmit={handleSubmit} 
                loading={loading}
                mode={mode}
                setMode={setMode}
            />
        </div>
    );
};

export default ChatWindow;
