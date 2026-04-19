import React from 'react';
import { Database, Sparkles, Globe } from 'lucide-react';

const ModeToggle = ({ mode, setMode }) => {
    const getIndex = () => {
        if (mode === "local") return 0;
        if (mode === "hybrid") return 1;
        if (mode === "deep_research") return 2;
        return 0;
    };

    return (
        <div className="flex justify-center mb-6">
            <div className="relative flex items-center bg-[#0f172a]/60 backdrop-blur-2xl p-1.5 rounded-full border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
                
                {/* Sliding Background */}
                <div 
                    className="absolute top-1.5 bottom-1.5 w-28 bg-[#1e293b]/90 border border-white/10 rounded-full shadow-lg transition-transform duration-300 ease-out flex items-center justify-center overflow-hidden"
                    style={{ transform: `translateX(${getIndex() * 100}%)` }}
                >
                    <div className={`absolute inset-0 opacity-40 transition-colors duration-300 
                        ${mode === 'local' ? 'bg-blue-500/30' : 
                          mode === 'hybrid' ? 'bg-purple-500/30' : 
                          'bg-emerald-500/30'}`} 
                    />
                </div>

                <button 
                    onClick={() => setMode("local")}
                    className={`relative w-28 flex items-center justify-center gap-2 py-2 rounded-full text-[13.5px] tracking-wide font-medium transition-colors duration-300 z-10 ${
                        mode === "local" ? "text-blue-100" : "text-[#9ca3af] hover:text-[#e5e7eb]"
                    }`}
                >
                    <Database size={15} className={`transition-colors duration-300 ${mode === "local" ? "text-blue-400" : "opacity-60"}`} />
                    Local
                </button>

                <button 
                    onClick={() => setMode("hybrid")}
                    className={`relative w-28 flex items-center justify-center gap-2 py-2 rounded-full text-[13.5px] tracking-wide font-medium transition-colors duration-300 z-10 ${
                        mode === "hybrid" ? "text-purple-100" : "text-[#9ca3af] hover:text-[#e5e7eb]"
                    }`}
                >
                    <Sparkles size={15} className={`transition-colors duration-300 ${mode === "hybrid" ? "text-purple-400" : "opacity-60"}`} />
                    Hybrid
                </button>

                <button 
                    onClick={() => setMode("deep_research")}
                    className={`relative w-28 flex items-center justify-center gap-2 py-2 rounded-full text-[13.5px] tracking-wide font-medium transition-colors duration-300 z-10 ${
                        mode === "deep_research" ? "text-emerald-100" : "text-[#9ca3af] hover:text-[#e5e7eb]"
                    }`}
                >
                    <Globe size={15} className={`transition-colors duration-300 ${mode === "deep_research" ? "text-emerald-400" : "opacity-60"}`} />
                    Web
                </button>
            </div>
        </div>
    );
};

export default ModeToggle;
