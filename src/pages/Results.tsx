import { useSearchParams, Link } from 'react-router-dom';
import {
    CheckCircle2,
    Calendar,
    HelpCircle,
    ChevronLeft,
    Download,
    Share2,
    Trophy,
    History as HistoryIcon
} from 'lucide-react';
import { getResultById } from '../utils/analysis';
import { Card, CardContent, CardHeader, CardTitle } from '../components/Card';

export default function Results() {
    const [searchParams] = useSearchParams();
    const idValue = searchParams.get('id');
    const result = idValue ? getResultById(idValue) : null;

    if (!result) {
        return (
            <div className="flex flex-col items-center justify-center py-20 animate-in fade-in duration-500">
                <h2 className="text-2xl font-bold text-slate-900">Analysis Not Found</h2>
                <p className="text-slate-500 mt-2">Please go back to the Practice page to analyze a JD.</p>
                <Link to="/practice" className="mt-6 text-primary font-bold hover:underline flex items-center gap-2">
                    <ChevronLeft className="h-5 w-5" />
                    Back to Practice
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <Link to="/history" className="text-primary text-sm font-bold flex items-center gap-1 mb-2 hover:translate-x-[-4px] transition-transform">
                        <ChevronLeft className="h-4 w-4" />
                        View History
                    </Link>
                    <h1 className="text-4xl font-black text-slate-900 tracking-tight">
                        Analysis: <span className="text-primary">{result.company || 'Direct Entry'}</span>
                    </h1>
                    <p className="text-slate-500 mt-1 text-lg font-medium">{result.role} • Analyzed on {new Date(result.createdAt).toLocaleDateString()}</p>
                </div>
                <div className="flex gap-4">
                    <button className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border border-slate-200 text-slate-600 font-bold hover:bg-slate-50 transition-all text-sm shadow-sm group">
                        <Download className="h-4 w-4 group-hover:translate-y-[1px] transition-transform" />
                        Export PDF
                    </button>
                    <button className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-white font-bold hover:bg-primary/90 transition-all text-sm shadow-lg shadow-primary/20">
                        <Share2 className="h-4 w-4" />
                        Share Report
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column - Score & Skills */}
                <div className="lg:col-span-1 space-y-8">
                    {/* Readiness Score */}
                    <Card className="text-center py-10 bg-gradient-to-b from-white to-slate-50 ring-1 ring-slate-200 shadow-xl overflow-visible">
                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest shadow-lg">
                            Readiness Score
                        </div>
                        <div className="relative inline-flex items-center justify-center p-1 rounded-full bg-slate-100 mb-4 ring-4 ring-slate-50">
                            <svg className="h-32 w-32 -rotate-90">
                                <circle cx="64" cy="64" r="58" fill="transparent" stroke="currentColor" strokeWidth="8" className="text-white" />
                                <circle
                                    cx="64" cy="64" r="58" fill="transparent" stroke="currentColor" strokeWidth="8"
                                    strokeDasharray={2 * Math.PI * 58}
                                    strokeDashoffset={2 * Math.PI * 58 * (1 - result.readinessScore / 100)}
                                    strokeLinecap="round"
                                    className="text-primary"
                                />
                            </svg>
                            <span className="absolute text-3xl font-black text-slate-900">{result.readinessScore}%</span>
                        </div>
                        <p className="text-slate-500 font-bold px-6">
                            {result.readinessScore >= 80 ? "Excellent match! You're almost ready." :
                                result.readinessScore >= 60 ? "Good progress. Focus on the core skills." :
                                    "Significant preparation needed for this JD."}
                        </p>
                    </Card>

                    {/* Extracted Skills */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-lg">
                                <Trophy className="h-5 w-5 text-amber-500" />
                                Detected Skills
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {result.extractedSkills.map((cat, i) => (
                                <div key={i} className="space-y-2">
                                    <p className="text-xs font-black text-slate-400 uppercase tracking-widest">{cat.category}</p>
                                    <div className="flex flex-wrap gap-2">
                                        {cat.skills.map((skill, j) => (
                                            <span key={j} className="px-3 py-1 bg-indigo-50 text-primary text-sm font-bold rounded-lg border border-indigo-100">
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </div>

                {/* Middle/Right Columns - Checklist, Plan, Questions */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Prep Checklist */}
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <CardTitle className="flex items-center gap-2">
                                <CheckCircle2 className="h-6 w-6 text-emerald-500" />
                                Prep Checklist
                            </CardTitle>
                            <span className="text-xs font-bold text-slate-400 bg-slate-100 px-3 py-1 rounded-full uppercase tracking-widest">Round-wise</span>
                        </CardHeader>
                        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                            {result.checklist.map((round, i) => (
                                <div key={i} className="space-y-3">
                                    <h4 className="font-bold text-slate-900 border-l-4 border-primary pl-3 py-1">{round.round}</h4>
                                    <ul className="space-y-2">
                                        {round.items.map((item, j) => (
                                            <li key={j} className="flex items-start gap-2 text-sm text-slate-600 font-medium">
                                                <div className="h-5 w-5 rounded-md border-2 border-slate-200 mt-0.5 flex-shrink-0" />
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    {/* 7-Day Plan */}
                    <Card className="bg-slate-900 text-white overflow-visible">
                        <CardHeader>
                            <CardTitle className="text-white flex items-center gap-2">
                                <Calendar className="h-6 w-6 text-indigo-400" />
                                7-Day Sprint Plan
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-1 relative">
                            {result.plan.map((step, i) => (
                                <div key={i} className="flex gap-4 p-4 rounded-2xl hover:bg-white/5 transition-colors group">
                                    <div className="flex flex-col items-center">
                                        <div className="h-2 w-2 rounded-full bg-indigo-500 ring-4 ring-indigo-500/20" />
                                        {i < result.plan.length - 1 && <div className="flex-1 w-0.5 border-l border-white/20 mt-2 mb-1" />}
                                    </div>
                                    <p className="font-medium text-slate-300 group-hover:text-white transition-colors">
                                        {step}
                                    </p>
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    {/* 10 likely Questions */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <HelpCircle className="h-6 w-6 text-primary" />
                                Top 10 Likely Questions
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {result.questions.map((q, i) => (
                                <div key={i} className="flex gap-4 p-5 rounded-2xl bg-slate-50 border-2 border-transparent hover:border-primary/10 transition-all">
                                    <span className="flex-shrink-0 h-8 w-8 rounded-full bg-white shadow-sm flex items-center justify-center font-black text-primary text-sm">
                                        {i + 1}
                                    </span>
                                    <p className="font-bold text-slate-900 self-center">{q}</p>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
