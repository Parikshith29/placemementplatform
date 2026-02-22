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
    Zap,
    Check,
    Circle,
    Building2,
    Users,
    Target,
    Info,
    GitCommit,
    Clock
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
                <h2 className="text-2xl font-bold text-slate-900 border-2 border-slate-100 p-8 rounded-3xl">Entry Not Found</h2>
                <p className="text-slate-500 mt-4 max-w-sm text-center font-medium">One saved entry couldn't be loaded or doesn't exist. Create a new analysis.</p>
                <Link to="/practice" className="mt-8 px-8 py-3 bg-primary text-white rounded-full font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] transition-all">
                    Go to Practice
                </Link>
            </div>
        );
    }

    const toggleSkill = (skill: string) => {
        const currentStatus = result.skillConfidenceMap[skill] || 'practice';
        const newStatus = currentStatus === 'know' ? 'practice' : 'know';

        const newMap: Record<string, 'know' | 'practice'> = {
            ...result.skillConfidenceMap,
            [skill]: newStatus
        };

        let scoreAdjustment = 0;
        Object.values(newMap).forEach(status => {
            scoreAdjustment += status === 'know' ? 2 : -2;
        });

        const newScore = Math.max(0, Math.min(100, result.baseScore + scoreAdjustment));

        const updated = {
            ...result,
            skillConfidenceMap: newMap,
            finalScore: newScore
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
Analyzed: ${new Date(result.createdAt).toLocaleString()}
Last Updated: ${new Date(result.updatedAt).toLocaleString()}
Readiness Score: ${result.finalScore}%

EXTRACTED SKILLS:
${Object.entries(result.extractedSkills).map(([cat, skills]) => skills.length > 0 ? `${cat.toUpperCase()}: ${skills.join(', ')}` : '').filter(s => s).join('\n')}

7-DAY PREP PLAN:
${result.plan7Days.map(p => `${p.day} (${p.focus}): ${p.tasks.join(', ')}`).join('\n')}

ROUND-WISE CHECKLIST:
${result.checklist.map(c => `${c.roundTitle}:\n${c.items.map(i => `- ${i}`).join('\n')}`).join('\n\n')}

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

    const roundsToRender = result.roundMapping || [];

    return (
        <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <Link to="/history" className="text-primary text-sm font-bold flex items-center gap-1 mb-2 hover:translate-x-[-4px] transition-transform">
                        <ChevronLeft className="h-4 w-4" />
                        View History
                    </Link>
                    <div className="flex items-center gap-3">
                        <h1 className="text-4xl font-black text-slate-900 tracking-tight">
                            Strategy: <span className="text-primary">{result.company || 'Direct Entry'}</span>
                        </h1>
                    </div>
                    <p className="text-slate-500 mt-1 text-lg font-medium">{result.role || 'Target Role'} • Last refined {new Date(result.updatedAt).toLocaleDateString()}</p>
                </div>
                <div className="flex flex-wrap gap-3">
                    <button
                        onClick={downloadTxt}
                        className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border border-slate-200 text-slate-600 font-bold hover:border-slate-300 transition-all text-sm shadow-sm"
                    >
                        <Download className="h-4 w-4" />
                        Download Strategy
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
                    <Card className="text-center py-10 bg-gradient-to-b from-white to-slate-50 border-2 border-slate-100 shadow-xl relative overflow-visible">
                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-slate-900 text-white px-5 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg">
                            Dynamic Readiness
                        </div>
                        <div className="relative inline-flex items-center justify-center p-1 rounded-full bg-slate-100 mb-4 ring-8 ring-slate-50">
                            <svg className="h-32 w-32 -rotate-90 transition-all duration-1000">
                                <circle cx="64" cy="64" r="58" fill="transparent" stroke="currentColor" strokeWidth="10" className="text-white" />
                                <circle
                                    cx="64" cy="64" r="58" fill="transparent" stroke="currentColor" strokeWidth="10"
                                    strokeDasharray={2 * Math.PI * 58}
                                    strokeDashoffset={2 * Math.PI * 58 * (1 - result.finalScore / 100)}
                                    strokeLinecap="round"
                                    className={`transition-all duration-1000 ${result.finalScore > 75 ? 'text-emerald-500' : 'text-primary'}`}
                                />
                            </svg>
                            <span className="absolute text-3xl font-black text-slate-900 tracking-tighter">{result.finalScore}%</span>
                        </div>
                        <p className="text-slate-500 font-bold px-8 text-xs leading-relaxed">
                            Your score evolves based on the mastery of extracted skills.
                        </p>
                    </Card>

                    <Card className="overflow-hidden border-2 border-slate-100">
                        <CardHeader className="bg-slate-50/50 pb-4">
                            <CardTitle className="flex items-center gap-2 text-lg">
                                <Trophy className="h-5 w-5 text-amber-500" />
                                Requirement Analysis
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6 pt-6">
                            {Object.entries(result.extractedSkills).map(([cat, skills], i) => skills.length > 0 && (
                                <div key={i} className="space-y-3">
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center justify-between">
                                        {cat}
                                        <span className="h-px bg-slate-100 flex-1 ml-3" />
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {skills.map((skill: string, j: number) => {
                                            const isKnown = result.skillConfidenceMap[skill] === 'know';
                                            return (
                                                <button
                                                    key={j}
                                                    onClick={() => toggleSkill(skill)}
                                                    className={`flex items-center gap-2 px-3 py-1.5 text-xs font-bold rounded-2xl border-2 transition-all ${isKnown
                                                        ? 'bg-emerald-50 text-emerald-700 border-emerald-100'
                                                        : 'bg-white text-slate-600 border-slate-100 hover:border-primary/20 hover:bg-slate-50'
                                                        }`}
                                                >
                                                    {isKnown ? <CheckCircle2 className="h-3.5 w-3.5" /> : <div className="h-3 w-3 rounded-full border-2 border-slate-200" />}
                                                    {skill}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    <Card className="bg-primary text-white border-none shadow-xl shadow-primary/20 overflow-hidden relative group">
                        <Zap className="absolute -right-6 -bottom-6 h-32 w-32 text-white/10 -rotate-12 transition-transform group-hover:scale-110 duration-700" />
                        <CardHeader className="pb-2">
                            <CardTitle className="text-white text-lg flex items-center gap-2">
                                <Zap className="h-5 w-5 fill-white" />
                                Action Recommended
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="relative z-10 pb-8">
                            {weakSkills.length > 0 ? (
                                <p className="text-white/90 text-sm font-medium leading-relaxed">
                                    Start with <span className="text-white font-black underline decoration-white/40">{weakSkills[0]}</span> fundamentals.
                                    Target the Day 1 tasks in your sprint plan.
                                </p>
                            ) : (
                                <p className="text-white/90 text-sm font-medium leading-relaxed">
                                    All key technical skills mastered! focus on soft skills and mock interviews.
                                </p>
                            )}
                        </CardContent>
                    </Card>
                </div>

                {/* Right Column */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Round Mapping Engine */}
                    <Card className="border-2 border-slate-100">
                        <CardHeader className="flex flex-row items-center justify-between">
                            <CardTitle className="flex items-center gap-2">
                                <GitCommit className="h-6 w-6 text-primary" />
                                Round Mapping Timeline
                            </CardTitle>
                            <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400">
                                <Clock className="h-3 w-3" />
                                Heuristic Mapping
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-0 relative pb-10">
                            <div className="absolute left-[39px] top-[40px] bottom-[40px] w-1 bg-slate-100" />

                            {roundsToRender.map((r, i) => (
                                <div key={i} className="relative flex gap-10 p-6">
                                    <div className={`h-6 w-6 rounded-full mt-2 ring-8 relative z-10 transition-all ${i === 0 ? 'bg-primary ring-primary/10' : 'bg-white border-4 border-slate-100 ring-transparent'
                                        }`} />
                                    <div className="flex-1 space-y-3">
                                        <div className="flex flex-wrap items-center gap-3">
                                            <h4 className="font-black text-slate-900 text-lg uppercase tracking-tight">{r.roundTitle}</h4>
                                            <div className="flex gap-1.5 flex-wrap">
                                                {r.focusAreas.map((f, idx) => (
                                                    <span key={idx} className="text-[10px] font-black uppercase text-primary bg-primary/5 px-2 py-0.5 rounded border border-primary/10">
                                                        {f}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 shadow-inner">
                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2 mb-2">
                                                <Info className="h-3 w-3" />
                                                Preparation Strategy
                                            </p>
                                            <p className="text-xs text-slate-600 font-medium leading-relaxed">
                                                {r.whyItMatters}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    <Card className="border-2 border-slate-100">
                        <CardHeader className="flex flex-row items-center justify-between">
                            <CardTitle className="flex items-center gap-2">
                                <CheckCircle2 className="h-6 w-6 text-emerald-500" />
                                Technical Checklist
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 pb-10">
                            {result.checklist.map((round, i) => (
                                <div key={i} className="space-y-4">
                                    <h4 className="font-black text-slate-900 border-l-4 border-primary pl-4 text-sm uppercase tracking-wider">{round.roundTitle}</h4>
                                    <ul className="space-y-3">
                                        {round.items.map((item, j) => (
                                            <li key={j} className="flex items-center gap-3 text-sm text-slate-600 font-bold group bg-slate-50/50 p-2 rounded-xl border border-transparent hover:border-slate-200 transition-all">
                                                <div className="h-5 w-5 rounded-md border-2 border-slate-200 flex-shrink-0 group-hover:border-primary/50 transition-colors bg-white shadow-sm" />
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    <Card className="bg-slate-900 border-none shadow-2xl overflow-visible">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-white flex items-center gap-2">
                                <Calendar className="h-6 w-6 text-indigo-400" />
                                7-Day Preparation Sprint
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4 p-6">
                            {result.plan7Days.map((p, i) => (
                                <div key={i} className="flex gap-6 p-5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all group">
                                    <div className="flex flex-col items-center flex-shrink-0 w-16">
                                        <span className="text-[10px] font-black text-indigo-400 uppercase">{p.day}</span>
                                        <div className="h-full w-px bg-white/10 my-2" />
                                    </div>
                                    <div className="space-y-2 flex-1">
                                        <p className="text-xs font-black text-slate-400 uppercase tracking-widest">{p.focus}</p>
                                        <div className="flex flex-wrap gap-2">
                                            {p.tasks.map((t, idx) => (
                                                <span key={idx} className="text-sm font-bold text-slate-200 bg-white/5 px-3 py-1 rounded-lg border border-white/5">
                                                    {t}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    <Card className="border-2 border-slate-100">
                        <CardHeader className="flex flex-row items-center justify-between">
                            <CardTitle className="flex items-center gap-2">
                                <HelpCircle className="h-6 w-6 text-primary" />
                                Expected Interview Questions
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4 pt-4 pb-10 px-8">
                            {result.questions.map((q, i) => (
                                <div key={i} className="flex gap-6 p-6 rounded-3xl bg-slate-50 border-2 border-transparent hover:border-primary/10 transition-all shadow-sm">
                                    <span className="flex-shrink-0 h-10 w-10 rounded-2xl bg-white shadow-md flex items-center justify-center font-black text-primary text-lg">
                                        {i + 1}
                                    </span>
                                    <p className="font-bold text-slate-900 self-center leading-relaxed">{q}</p>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
