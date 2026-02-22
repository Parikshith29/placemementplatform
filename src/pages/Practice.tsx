import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Building2, Briefcase } from 'lucide-react';
import { analyzeJD, saveResult } from '../utils/analysis';
import { Card, CardContent, CardHeader, CardTitle } from '../components/Card';

export default function Practice() {
    const [company, setCompany] = useState('');
    const [role, setRole] = useState('');
    const [jdText, setJdText] = useState('');
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const navigate = useNavigate();

    const handleAnalyze = () => {
        if (!jdText.trim()) return;
        setIsAnalyzing(true);

        // Simulate thinking process for better UX
        setTimeout(() => {
            const result = analyzeJD(company, role, jdText);
            saveResult(result);
            setIsAnalyzing(false);
            navigate(`/results?id=${result.id}`);
        }, 1500);
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div>
                <h1 className="text-4xl font-black text-slate-900 tracking-tight">JD Intelligence</h1>
                <p className="text-slate-500 mt-2 text-lg">Upload your target Job Description to generate a tailored preparation plan.</p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Sparkles className="h-5 w-5 text-primary" />
                        Analyze Job Description
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">Company Name</label>
                            <div className="relative">
                                <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                                <input
                                    type="text"
                                    placeholder="e.g. Google, Meta, Startup X"
                                    value={company}
                                    onChange={(e) => setCompany(e.target.value)}
                                    className="w-full bg-slate-50 border-2 border-transparent focus:border-primary/20 focus:bg-white rounded-2xl py-3 pl-10 pr-4 outline-none transition-all"
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">Target Role</label>
                            <div className="relative">
                                <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                                <input
                                    type="text"
                                    placeholder="e.g. Frontend Engineer, SDE-1"
                                    value={role}
                                    onChange={(e) => setRole(e.target.value)}
                                    className="w-full bg-slate-50 border-2 border-transparent focus:border-primary/20 focus:bg-white rounded-2xl py-3 pl-10 pr-4 outline-none transition-all"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">Job Description Text</label>
                        <textarea
                            placeholder="Paste the job description or requirements here..."
                            value={jdText}
                            onChange={(e) => setJdText(e.target.value)}
                            className="w-full min-h-[300px] bg-slate-50 border-2 border-transparent focus:border-primary/20 focus:bg-white rounded-2xl p-6 outline-none transition-all resize-none text-slate-700 leading-relaxed"
                        />
                    </div>

                    <button
                        onClick={handleAnalyze}
                        disabled={!jdText.trim() || isAnalyzing}
                        className={`w-full py-4 rounded-2xl font-bold text-lg shadow-xl shadow-primary/20 transition-all flex items-center justify-center gap-2 ${isAnalyzing
                                ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                                : 'bg-primary text-white hover:scale-[1.01] hover:shadow-2xl active:scale-[0.99]'
                            }`}
                    >
                        {isAnalyzing ? (
                            <>
                                <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                Analyzing Skills...
                            </>
                        ) : (
                            <>
                                <Sparkles className="h-5 w-5" />
                                Generate Prep Strategy
                            </>
                        )}
                    </button>
                </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 rounded-3xl bg-indigo-50 border border-indigo-100">
                    <p className="font-bold text-primary mb-1 text-sm uppercase">Step 1</p>
                    <h4 className="font-bold text-slate-900 mb-2 text-lg">Paste JD</h4>
                    <p className="text-slate-600 text-sm italic">"Must have experience in React and SQL..."</p>
                </div>
                <div className="p-6 rounded-3xl bg-purple-50 border border-purple-100">
                    <p className="font-bold text-purple-600 mb-1 text-sm uppercase">Step 2</p>
                    <h4 className="font-bold text-slate-900 mb-2 text-lg">Extraction</h4>
                    <p className="text-slate-600 text-sm">Our heuristic engine detects tech stacks and skills.</p>
                </div>
                <div className="p-6 rounded-3xl bg-emerald-50 border border-emerald-100">
                    <p className="font-bold text-emerald-600 mb-1 text-sm uppercase">Step 3</p>
                    <h4 className="font-bold text-slate-900 mb-2 text-lg">Get Ready</h4>
                    <p className="text-slate-600 text-sm">View checklist, 7-day plan and likely questions.</p>
                </div>
            </div>
        </div>
    );
}
