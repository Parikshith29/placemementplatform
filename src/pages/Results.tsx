import { useSearchParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import {
    CheckCircle2,
    Calendar,
    HelpCircle,
    ChevronLeft,
    Download,
    Share2,
    Trophy,
    Copy,
    FileText,
    Zap,
    Check,
    Circle
} from 'lucide-react';
import { getResultById, updateResult, AnalysisResult } from '../utils/analysis';
import { Card, CardContent, CardHeader, CardTitle } from '../components/Card';

export default function Results() {
    const [searchParams] = useSearchParams();
    const idValue = searchParams.get('id');
    const [result, setResult] = useState<AnalysisResult | null>(null);
    const [copyStatus, setCopyStatus] = useState<string | null>(null);

    useEffect(() => {
        if (idValue) {
            const data = getResultById(idValue);
            if (data) setResult(data);
        }
    }, [idValue]);

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

    const toggleSkill = (skill: string) => {
        const currentStatus = result.skillConfidenceMap[skill] || 'practice';
        const newStatus = currentStatus === 'know' ? 'practice' : 'know';

        // Calculate new score
        const newMap: Record<string, 'know' | 'practice'> = {
            ...result.skillConfidenceMap,
            [skill]: newStatus
        };

        let scoreAdjustment = 0;
        Object.values(newMap).forEach(status => {
            scoreAdjustment += status === 'know' ? 2 : -2;
        });
        const newScore = Math.max(0, Math.min(100, result.baseReadinessScore + scoreAdjustment));

        const updated = {
            ...result,
            skillConfidenceMap: newMap,
            readinessScore: newScore
        };

        setResult(updated);
        updateResult(updated);
    };

    const copyToClipboard = (text: string, label: string) => {
        navigator.clipboard.writeText(text);
        setCopyStatus(label);
        setTimeout(() => setCopyStatus(null), 2000);
    };

    const downloadTxt = () => {
        const content = `
PLACEMENT PREPARATION REPORT - ${result.company || 'Direct Entry'}
Role: ${result.role}
Date: ${new Date(result.createdAt).toLocaleDateString()}
Readiness Score: ${result.readinessScore}%

EXTRACTED SKILLS:
${result.extractedSkills.map(c => `${c.category}: ${c.skills.join(', ')}`).join('\n')}

7-DAY PREP PLAN:
${result.plan.join('\n')}

ROUND-WISE CHECKLIST:
${result.checklist.map(c => `${c.round}:\n${c.items.map(i => `- ${i}`).join('\n')}`).join('\n\n')}

TOP 10 INTERVIEW QUESTIONS:
${result.questions.map((q, i) => `${i + 1}. ${q}`).join('\n')}
    `;
        const blob = new Blob([content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `Prep_Plan_${result.company || 'Entry'}.txt`;
        link.click();
    };

    const weakSkills = Object.entries(result.skillConfidenceMap)
        .filter(([_, status]) => status === 'practice')
        .map(([skill]) => skill)
        .slice(0, 3);

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
                <div className="flex flex-wrap gap-3">
                    <button
                        onClick={downloadTxt}
                        className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border border-slate-200 text-slate-600 font-bold hover:bg-slate-50 transition-all text-sm shadow-sm group"
                    >
                        <Download className="h-4 w-4 group-hover:translate-y-[1px] transition-transform" />
                        Download TXT
                    </button>
                    <button className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-white font-bold hover:bg-primary/90 transition-all text-sm shadow-lg shadow-primary/20">
                        <Share2 className="h-4 w-4" />
                        Share Report
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column */}
                <div className="lg:col-span-1 space-y-8">
                    <Card className="text-center py-10 bg-gradient-to-b from-white to-slate-50 ring-1 ring-slate-200 shadow-xl relative overflow-visible">
                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest shadow-lg">
                            Live Readiness
                        </div>
                        <div className="relative inline-flex items-center justify-center p-1 rounded-full bg-slate-100 mb-4 ring-4 ring-slate-50">
                            <svg className="h-32 w-32 -rotate-90 transition-all duration-700">
                                <circle cx="64" cy="64" r="58" fill="transparent" stroke="currentColor" strokeWidth="8" className="text-white" />
                                <circle
                                    cx="64" cy="64" r="58" fill="transparent" stroke="currentColor" strokeWidth="8"
                                    strokeDasharray={2 * Math.PI * 58}
                                    strokeDashoffset={2 * Math.PI * 58 * (1 - result.readinessScore / 100)}
                                    strokeLinecap="round"
                                    className={`transition-all duration-700 ${result.readinessScore > 70 ? 'text-emerald-500' : 'text-primary'}`}
                                />
                            </svg>
                            <span className="absolute text-3xl font-black text-slate-900">{result.readinessScore}%</span>
                        </div>
                        <p className="text-slate-500 font-bold px-6 text-sm">
                            Score updates as you mark skills as mastered.
                        </p>
                    </Card>

                    <Card>
                        <CardHeader className="pb-4">
                            <CardTitle className="flex items-center gap-2 text-lg">
                                <Trophy className="h-5 w-5 text-amber-500" />
                                Key skills extracted
                            </CardTitle>
                            <p className="text-[10px] text-slate-400 font-bold uppercase mt-1">Click to toggle mastery</p>
                        </CardHeader>
                        <CardContent className="space-y-6 pt-0">
                            {result.extractedSkills.map((cat, i) => (
                                <div key={i} className="space-y-2">
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{cat.category}</p>
                                    <div className="flex flex-wrap gap-2">
                                        {cat.skills.map((skill, j) => {
                                            const isKnown = result.skillConfidenceMap[skill] === 'know';
                                            return (
                                                <button
                                                    key={j}
                                                    onClick={() => toggleSkill(skill)}
                                                    className={`flex items-center gap-2 px-3 py-1.5 text-xs font-bold rounded-xl border transition-all ${isKnown
                                                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                                        : 'bg-white text-slate-600 border-slate-200 hover:border-primary/30'
                                                        }`}
                                                >
                                                    {isKnown ? <CheckCircle2 className="h-3.5 w-3.5" /> : <Circle className="h-3.5 w-3.5 opacity-30" />}
                                                    {skill}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    <Card className="bg-emerald-50 border-emerald-100 overflow-hidden relative">
                        <Zap className="absolute -right-4 -bottom-4 h-24 w-24 text-emerald-100 -rotate-12" />
                        <CardHeader className="pb-2">
                            <CardTitle className="text-emerald-900 text-lg flex items-center gap-2">
                                <Zap className="h-5 w-5 text-emerald-500" />
                                Action Next
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="relative z-10">
                            {weakSkills.length > 0 ? (
                                <p className="text-emerald-800 text-sm font-medium leading-relaxed">
                                    Focus on mastering <span className="font-black underline">{weakSkills.join(', ')}</span>.
                                    Start the Day 1 plan now.
                                </p>
                            ) : (
                                <p className="text-emerald-800 text-sm font-medium leading-relaxed">
                                    You've marked all key skills as known! Transition to deep practice and mocks.
                                </p>
                            )}
                        </CardContent>
                    </Card>
                </div>

                {/* Right Column */}
                <div className="lg:col-span-2 space-y-8">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <CardTitle className="flex items-center gap-2">
                                <CheckCircle2 className="h-6 w-6 text-emerald-500" />
                                Prep Checklist
                            </CardTitle>
                            <button
                                onClick={() => copyToClipboard(result.checklist.map(c => `${c.round}:\n${c.items.join('\n')}`).join('\n\n'), 'Checklist')}
                                className="text-[10px] font-black text-primary hover:bg-primary/5 px-3 py-1.5 rounded-full uppercase flex items-center gap-1.5 transition-colors border border-primary/10"
                            >
                                {copyStatus === 'Checklist' ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                                Copy Round Checklist
                            </button>
                        </CardHeader>
                        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                            {result.checklist.map((round, i) => (
                                <div key={i} className="space-y-3">
                                    <h4 className="font-bold text-slate-900 border-l-4 border-primary pl-3 py-1">{round.round}</h4>
                                    <ul className="space-y-2">
                                        {round.items.map((item, j) => (
                                            <li key={j} className="flex items-start gap-2 text-sm text-slate-600 font-medium group">
                                                <div className="h-5 w-5 rounded-md border-2 border-slate-200 mt-0.5 flex-shrink-0 group-hover:border-primary/50 transition-colors" />
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    <Card className="bg-slate-900 text-white overflow-visible">
                        <CardHeader className="flex flex-row items-center justify-between">
                            <CardTitle className="text-white flex items-center gap-2">
                                <Calendar className="h-6 w-6 text-indigo-400" />
                                7-Day Sprint Plan
                            </CardTitle>
                            <button
                                onClick={() => copyToClipboard(result.plan.join('\n'), 'Plan')}
                                className="text-[10px] font-black text-indigo-400 hover:bg-white/10 px-3 py-1.5 rounded-full uppercase flex items-center gap-1.5 transition-colors border border-indigo-400/30"
                            >
                                {copyStatus === 'Plan' ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                                Copy Plan
                            </button>
                        </CardHeader>
                        <CardContent className="space-y-1">
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

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <CardTitle className="flex items-center gap-2">
                                <HelpCircle className="h-6 w-6 text-primary" />
                                Likely Questions
                            </CardTitle>
                            <button
                                onClick={() => copyToClipboard(result.questions.map((q, i) => `${i + 1}. ${q}`).join('\n'), 'Questions')}
                                className="text-[10px] font-black text-primary hover:bg-primary/5 px-3 py-1.5 rounded-full uppercase flex items-center gap-1.5 transition-colors border border-primary/10"
                            >
                                {copyStatus === 'Questions' ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                                Copy Questions
                            </button>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {result.questions.map((q, i) => (
                                <div key={i} className="flex gap-4 p-5 rounded-2xl bg-slate-50 border-2 border-transparent hover:border-primary/10 transition-all">
                                    <span className="flex-shrink-0 h-8 w-8 rounded-full bg-white shadow-sm flex items-center justify-center font-black text-primary text-sm">
                                        {i + 1}
                                    </span>
                                    <p className="font-bold text-slate-900 self-center text-sm">{q}</p>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
