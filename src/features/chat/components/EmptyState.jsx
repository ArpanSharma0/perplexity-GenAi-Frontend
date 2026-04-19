import React from 'react';
import { Layers } from 'lucide-react';

const EmptyState = () => {
    return (
        <div className="flex flex-col items-center justify-center h-full min-h-[65vh] opacity-100 animate-float">
            <div className="relative mb-8 group">
                <div className="absolute inset-0 bg-blue-500/20 blur-[30px] rounded-full scale-150 mix-blend-screen transition-all duration-700 group-hover:scale-125 group-hover:bg-blue-400/30"></div>
                <div className="relative w-16 h-16 rounded-3xl bg-[#0f172a]/80 backdrop-blur-2xl border border-white/10 flex items-center justify-center shadow-[0_0_40px_rgba(59,130,246,0.2)]">
                    <Layers size={28} className="text-[#3b82f6]" strokeWidth={1.5} />
                </div>
            </div>
            <h2 className="text-[26px] tracking-tight font-semibold text-[#f8fafc] mb-3 leading-tight drop-shadow-sm">Where knowledge begins</h2>
            <p className="text-[#9ca3af] text-[15px] md:text-[16px] text-center max-w-[400px] mt-1 leading-relaxed font-normal">Ask a question to search your connected data and the internet in real-time.</p>
        </div>
    );
};

export default EmptyState;
