import { useNavigate } from 'react-router-dom';
import {
    Building2,
    Briefcase,
    Calendar,
    ChevronRight,
    Search,
    Trash2,
    Clock
} from 'lucide-react';
import { getHistory } from '../utils/analysis';
import { Card, CardContent } from '../components/Card';

export default function History() {
    const history = getHistory();
    const navigate = useNavigate();

    return (
        <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-black text-slate-900 tracking-tight">Strategy Vault</h1>
                    <p className="text-slate-500 mt-2 text-lg">Your previous JD intelligence results.</p>
                </div>
                <div className="relative w-full md:w-80">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Search history..."
                        className="w-full bg-white border border-slate-200 rounded-full py-3 px-12 outline-none focus:ring-4 focus:ring-primary/5 transition-all text-sm font-medium"
                    />
                </div>
            </div>

            {history.length === 0 ? (
                <Card className="py-20 text-center">
                    <CardContent className="flex flex-col items-center">
                        <div className="h-20 w-20 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 mb-6">
                            <Clock className="h-10 w-10" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900">No History Found</h3>
                        <p className="text-slate-500 mt-2 max-w-xs">Start analyzing Job Descriptions on the Practice page to see them here.</p>
                        <button
                            onClick={() => navigate('/practice')}
                            className="mt-8 px-8 py-3 bg-primary text-white rounded-full font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] transition-all"
                        >
                            Go to Practice
                        </button>
                    </CardContent>
                </Card>
            ) : (
                <div className="grid gap-4">
                    {history.map((entry) => {
                        const allSkills = Object.values(entry.extractedSkills).flat();
                        return (
                            <Card
                                key={entry.id}
                                className="group cursor-pointer hover:border-primary/30 transition-all hover:shadow-xl hover:shadow-primary/5 active:scale-[0.995]"
                            >
                                <CardContent className="p-0">
                                    <div
                                        className="flex flex-col md:flex-row items-center md:items-stretch group"
                                        onClick={() => navigate(`/results?id=${entry.id}`)}
                                    >
                                        {/* Readiness Score Badge */}
                                        <div className="w-full md:w-32 flex flex-col items-center justify-center p-6 bg-slate-50 border-b md:border-b-0 md:border-r border-slate-100 group-hover:bg-primary/5 transition-colors">
                                            <span className="text-2xl font-black text-primary">{entry.finalScore}%</span>
                                            <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest mt-1">Readiness</span>
                                        </div>

                                        {/* Details */}
                                        <div className="flex-1 p-6 space-y-4">
                                            <div className="flex items-start justify-between">
                                                <div className="space-y-1">
                                                    <div className="flex items-center gap-2">
                                                        <Building2 className="h-4 w-4 text-slate-400" />
                                                        <h3 className="font-bold text-slate-900 text-lg">{entry.company || 'Direct Entry'}</h3>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <Briefcase className="h-4 w-4 text-slate-400" />
                                                        <p className="text-slate-500 font-medium">{entry.role || 'Target Role'}</p>
                                                    </div>
                                                </div>
                                                <div className="text-right flex flex-col items-end gap-2 text-xs">
                                                    <div className="flex items-center gap-1.5 font-bold text-slate-400 bg-white border border-slate-100 px-3 py-1 rounded-full">
                                                        <Calendar className="h-3 w-3" />
                                                        {new Date(entry.createdAt).toLocaleDateString()}
                                                    </div>
                                                    <button className="p-2 text-slate-300 hover:text-red-500 transition-colors">
                                                        <Trash2 className="h-4 w-4" />
                                                    </button>
                                                </div>
                                            </div>

                                            <div className="flex flex-wrap gap-2">
                                                {allSkills.slice(0, 5).map((skill, i) => (
                                                    <span key={i} className="text-[10px] font-bold text-slate-500 bg-white border border-slate-200 px-2 py-0.5 rounded uppercase tracking-tighter">
                                                        {skill}
                                                    </span>
                                                ))}
                                                {allSkills.length > 5 && (
                                                    <span className="text-[10px] font-bold text-primary px-2 py-0.5">+ {allSkills.length - 5} more</span>
                                                )}
                                            </div>
                                        </div>

                                        {/* Action */}
                                        <div className="hidden md:flex items-center justify-center px-6">
                                            <div className="h-10 w-10 rounded-full bg-slate-50 text-slate-300 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all shadow-inner">
                                                <ChevronRight className="h-5 w-5" />
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
