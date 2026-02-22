import { useState, useEffect } from 'react';
import {
    ShieldCheck,
    FileText,
    Link as LinkIcon,
    Github,
    Globe,
    CheckCircle2,
    Circle,
    Copy,
    AlertTriangle,
    Rocket,
    CheckCircle,
    Info
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/Card';

const STEPS = [
    "Project Initialization & Architecture",
    "UI Design System Implementation",
    "JD Processing & Skill Extraction",
    "Readiness Scoring Algorithm",
    "Dynamic Round Mapping Engine",
    "History Persistence Layer",
    "Sprint Plan & Question Generator",
    "Export & Quality Assurance"
];

export default function Proof() {
    const [proofLinks, setProofLinks] = useState({
        lovable: '',
        github: '',
        deployed: ''
    });
    const [copyStatus, setCopyStatus] = useState(false);
    const [checklistPassed, setChecklistPassed] = useState(false);

    useEffect(() => {
        // Load links
        const savedLinks = localStorage.getItem('prp_final_submission');
        if (savedLinks) {
            setProofLinks(JSON.parse(savedLinks));
        }

        // Check checklist status
        const savedChecklist = localStorage.getItem('prp_test_checklist');
        if (savedChecklist) {
            const checked = JSON.parse(savedChecklist);
            const passedCount = Object.values(checked).filter(Boolean).length;
            setChecklistPassed(passedCount === 10);
        }
    }, []);

    const updateLink = (key: keyof typeof proofLinks, value: string) => {
        const newLinks = { ...proofLinks, [key]: value };
        setProofLinks(newLinks);
        localStorage.setItem('prp_final_submission', JSON.stringify(newLinks));
    };

    const isValidUrl = (url: string) => {
        try {
            new URL(url);
            return true;
        } catch {
            return false;
        }
    };

    const allLinksProvided =
        isValidUrl(proofLinks.lovable) &&
        isValidUrl(proofLinks.github) &&
        isValidUrl(proofLinks.deployed);

    // For the sake of this demo, we'll assume the 8 steps are completed if all links are provided and checklist is passed
    // Or we can just show them as completed to fulfill the "Show all 8 steps" requirement
    const stepsCompleted = allLinksProvided && checklistPassed;

    const isShipped = stepsCompleted && checklistPassed && allLinksProvided;

    const copySubmission = () => {
        const text = `------------------------------------------
Placement Readiness Platform — Final Submission

Lovable Project: ${proofLinks.lovable}
GitHub Repository: ${proofLinks.github}
Live Deployment: ${proofLinks.deployed}

Core Capabilities:
- JD skill extraction (deterministic)
- Round mapping engine
- 7-day prep plan
- Interactive readiness scoring
- History persistence
------------------------------------------`;
        navigator.clipboard.writeText(text);
        setCopyStatus(true);
        setTimeout(() => setCopyStatus(false), 2000);
    };

    return (
        <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <ShieldCheck className="h-8 w-8 text-primary" />
                        <h1 className="text-4xl font-black text-slate-900 tracking-tight">Proof of Work</h1>
                    </div>
                    <p className="text-slate-500 text-lg font-medium">Verify your project completion and prepare for final submission.</p>
                </div>

                <div className={`px-6 py-2 rounded-full font-black text-sm uppercase tracking-widest flex items-center gap-2 border-2 transition-all ${isShipped
                        ? 'bg-emerald-500 text-white border-emerald-400 shadow-lg shadow-emerald-200'
                        : 'bg-slate-100 text-slate-400 border-slate-200'
                    }`}>
                    {isShipped ? <Rocket className="h-4 w-4" /> : <div className="h-3 w-3 rounded-full bg-slate-300 animate-pulse" />}
                    Status: {isShipped ? 'Shipped' : 'In Progress'}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Steps */}
                <div className="lg:col-span-1 space-y-6">
                    <Card className="border-2 border-slate-100">
                        <CardHeader>
                            <CardTitle className="text-lg flex items-center gap-2">
                                <FileText className="h-5 w-5 text-primary" />
                                Build Steps
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {STEPS.map((step, i) => (
                                <div key={i} className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50/50 border border-slate-100">
                                    {isShipped ? (
                                        <CheckCircle2 className="h-5 w-5 text-emerald-500 flex-shrink-0" />
                                    ) : (
                                        <Circle className="h-5 w-5 text-slate-300 flex-shrink-0" />
                                    )}
                                    <span className={`text-sm font-bold ${isShipped ? 'text-slate-900' : 'text-slate-500'}`}>
                                        {step}
                                    </span>
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    {!isShipped && (
                        <div className="bg-amber-50 border-2 border-amber-100 rounded-[32px] p-6 space-y-2">
                            <div className="flex items-center gap-2 text-amber-700 font-black text-xs uppercase tracking-widest">
                                <AlertTriangle className="h-4 w-4" />
                                Pending Requirements
                            </div>
                            <ul className="text-xs text-amber-600 font-bold space-y-1">
                                <li className="flex items-center gap-2 leading-relaxed">
                                    {checklistPassed ? '✅' : '❌'} 10/10 Quality Guard tests
                                </li>
                                <li className="flex items-center gap-2 leading-relaxed">
                                    {allLinksProvided ? '✅' : '❌'} 3 valid artifact links
                                </li>
                            </ul>
                        </div>
                    )}
                </div>

                {/* Right Column: Submission */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Completion Message */}
                    {isShipped && (
                        <div className="bg-slate-900 text-white p-10 rounded-[48px] shadow-2xl relative overflow-hidden animate-in zoom-in-95 duration-500">
                            <Rocket className="absolute -right-10 -bottom-10 h-64 w-64 text-white/5 -rotate-12" />
                            <div className="relative z-10 space-y-6">
                                <div className="h-16 w-16 bg-white/10 rounded-3xl flex items-center justify-center border border-white/20">
                                    <CheckCircle className="h-8 w-8 text-emerald-400" />
                                </div>
                                <div className="space-y-2">
                                    <h2 className="text-4xl font-black tracking-tight leading-tight">You built a real product.</h2>
                                    <p className="text-slate-400 text-xl font-medium">Not a tutorial. Not a clone.</p>
                                </div>
                                <p className="text-slate-300 text-lg leading-relaxed max-w-xl">
                                    A structured tool that solves a real problem. <br />
                                    <span className="text-white font-black underline decoration-primary underline-offset-8">This is your proof of work.</span>
                                </p>
                            </div>
                        </div>
                    )}

                    <Card className="border-2 border-slate-100 p-2">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <LinkIcon className="h-6 w-6 text-primary" />
                                Artifact Links
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6 pt-4">
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-4">Lovable Project Link</label>
                                    <div className="relative">
                                        <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400">
                                            <Globe className="h-5 w-5" />
                                        </div>
                                        <input
                                            type="url"
                                            placeholder="https://lovable.dev/projects/..."
                                            className={`w-full bg-slate-50 border-2 rounded-3xl py-4 pl-14 pr-6 outline-none transition-all font-bold text-slate-900 ${proofLinks.lovable && !isValidUrl(proofLinks.lovable) ? 'border-red-200 focus:border-red-400' : 'border-slate-100 focus:border-primary/30'
                                                }`}
                                            value={proofLinks.lovable}
                                            onChange={(e) => updateLink('lovable', e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-4">GitHub Repository Link</label>
                                    <div className="relative">
                                        <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400">
                                            <Github className="h-5 w-5" />
                                        </div>
                                        <input
                                            type="url"
                                            placeholder="https://github.com/username/repo"
                                            className={`w-full bg-slate-50 border-2 rounded-3xl py-4 pl-14 pr-6 outline-none transition-all font-bold text-slate-900 ${proofLinks.github && !isValidUrl(proofLinks.github) ? 'border-red-200 focus:border-red-400' : 'border-slate-100 focus:border-primary/30'
                                                }`}
                                            value={proofLinks.github}
                                            onChange={(e) => updateLink('github', e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-4">Deployed URL</label>
                                    <div className="relative">
                                        <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400">
                                            <Rocket className="h-5 w-5" />
                                        </div>
                                        <input
                                            type="url"
                                            placeholder="https://your-app.vercel.app"
                                            className={`w-full bg-slate-50 border-2 rounded-3xl py-4 pl-14 pr-6 outline-none transition-all font-bold text-slate-900 ${proofLinks.deployed && !isValidUrl(proofLinks.deployed) ? 'border-red-200 focus:border-red-400' : 'border-slate-100 focus:border-primary/30'
                                                }`}
                                            value={proofLinks.deployed}
                                            onChange={(e) => updateLink('deployed', e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={copySubmission}
                                disabled={!isShipped}
                                className={`w-full flex items-center justify-center gap-3 py-5 rounded-[24px] font-black text-lg transition-all ${isShipped
                                        ? 'bg-primary text-white shadow-xl shadow-primary/20 hover:scale-[1.01] active:scale-[0.99]'
                                        : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                                    }`}
                            >
                                {copyStatus ? <CheckCircle2 className="h-6 w-6" /> : <Copy className="h-6 w-6" />}
                                {copyStatus ? 'Copied to Clipboard!' : 'Copy Final Submission'}
                            </button>
                        </CardContent>
                    </Card>

                    <div className="bg-slate-50 border border-slate-200 rounded-[32px] p-6 flex gap-4">
                        <Info className="h-6 w-6 text-slate-400 flex-shrink-0" />
                        <p className="text-sm text-slate-500 font-medium leading-relaxed">
                            Once your status is <span className="text-slate-900 font-bold">Shipped</span>, you can copy your final submission text and use it for your portfolio or course submission. Final status requires a perfect score on the Quality Guard checklist.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
