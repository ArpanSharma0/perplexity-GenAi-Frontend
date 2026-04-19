import React, { useRef, useEffect } from 'react';
import { Sparkles, ArrowUp } from 'lucide-react';
import ModeToggle from './ModeToggle';

const InputBox = ({ input, setInput, onSubmit, loading, mode, setMode }) => {
    const textareaRef = useRef(null);

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            onSubmit(e);
        }
    };

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
        }
    }, [input]);

    return (
        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-[#020617] via-[#020617]/90 to-transparent pt-16 pb-12 px-4 pointer-events-none z-10">
            <div className="max-w-3xl mx-auto pointer-events-auto">
                
                <ModeToggle mode={mode} setMode={setMode} />
                
                <form 
                    onSubmit={onSubmit} 
                    className="relative flex items-end bg-[#0f172a]/80 backdrop-blur-[24px] border border-white/[0.08] rounded-[28px] shadow-[0_8px_32px_rgba(0,0,0,0.5)] focus-within:bg-[#0f172a]/95 focus-within:ring-1 focus-within:ring-blue-500/40 focus-within:shadow-[0_0_30px_rgba(59,130,246,0.15)] transition-all duration-300 overflow-hidden group"
                >
                    <div className="pl-6 pb-[18px] hidden sm:flex items-center justify-center text-zinc-500 transition-colors group-focus-within:text-blue-400">
                        <Sparkles size={18} />
                    </div>
                    
                    <textarea
                        ref={textareaRef}
                        rows={1}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Ask anything..."
                        className="w-full max-h-[200px] bg-transparent border-0 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-0 resize-none py-4 px-4 text-[15px] leading-relaxed font-sans font-medium"
                        style={{ height: '56px' }}
                    />
                    
                    <div className="absolute right-2 bottom-2">
                        <button
                            type="submit"
                            disabled={!input.trim() || loading}
                            className="w-10 h-10 flex items-center justify-center bg-gradient-to-tr from-blue-600 to-blue-400 hover:from-blue-500 hover:to-blue-300 text-white rounded-full disabled:opacity-30 disabled:from-zinc-700 disabled:to-zinc-700 transition-all duration-200 ease-out transform hover:scale-105 active:scale-95 shadow-[0_4px_20px_rgba(59,130,246,0.4)] hover:shadow-[0_4px_25px_rgba(59,130,246,0.6)] disabled:shadow-none"
                        >
                            <ArrowUp size={20} strokeWidth={2.5} className="ml-[1px]" />
                        </button>
                    </div>
                </form>
                <div className="text-center mt-3 text-[11px] text-[#9ca3af] font-medium tracking-wide opacity-70">
                    Knowledge Assistant can make mistakes. Consider verifying important information.
                </div>
            </div>
        </div>
    );
};

export default InputBox;
