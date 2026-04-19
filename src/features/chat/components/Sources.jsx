import React from 'react';
import { FileText, Globe, Database } from 'lucide-react';

const SourceChip = ({ source, index }) => {
    const isWeb = source.type === "web";
    const scorePct = source.score ? Math.round(source.score * 100) : null;
    
    const content = (
        <div className="flex flex-col gap-0.5 min-w-0 pr-1">
            <div className="flex items-center gap-1.5 mb-1 opacity-80">
                {isWeb ? <Globe size={10} className="text-emerald-400" /> : <Database size={10} className="text-blue-400" />}
                <span className="text-[9px] font-bold uppercase tracking-widest text-[#9ca3af]">
                    {isWeb ? "Web Resource" : "Local Doc"}
                </span>
                {scorePct && (
                    <span className="text-[9px] font-medium ml-auto px-1.5 py-[1px] bg-white/10 rounded uppercase tracking-wider text-zinc-300">
                        {scorePct}% Match
                    </span>
                )}
            </div>
            
            <div className="flex items-center gap-2 min-w-0">
                <div className={`text-[10px] font-bold bg-white/10 w-4 h-4 rounded flex items-center justify-center text-zinc-300 transition-colors ${isWeb ? 'group-hover:bg-emerald-500' : 'group-hover:bg-blue-500'} group-hover:text-white shrink-0`}>
                    {index + 1}
                </div>
                <span className="text-xs font-medium text-zinc-200 truncate flex-1 leading-none">
                    {source.title || (isWeb && source.url ? new URL(source.url).hostname : "Unknown Source")}
                </span>
            </div>
        </div>
    );

    const className = "flex flex-col shrink-0 bg-white/5 hover:bg-white/10 border border-white/10 backdrop-blur-md transition-all duration-200 py-2.5 px-3 rounded-xl min-w-[180px] max-w-[240px] cursor-pointer group shadow-sm";

    if (isWeb && source.url) {
        return (
            <a href={source.url} target="_blank" rel="noopener noreferrer" className={className} title={source.url}>
                {content}
            </a>
        );
    }

    return (
        <button className={className} title={source.title}>
            {content}
        </button>
    );
};
// Removed duplicate lines
const Sources = ({ sources }) => {
    if (!sources || sources.length === 0) return null;

    return (
        <div className="mb-6 w-full">
            <div className="flex flex-wrap gap-2">
                {sources.map((source, idx) => (
                    <SourceChip key={idx} source={source} index={idx} />
                ))}
            </div>
        </div>
    );
};

export default Sources;
