import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Building2, Briefcase, AlertCircle } from 'lucide-react';
import { analyzeJD, saveResult } from '../utils/analysis';
import { Card, CardContent, CardHeader, CardTitle } from '../components/Card';

export default function Practice() {
    const [company, setCompany] = useState('');
    const [role, setRole] = useState('');
    const [jdText, setJdText] = useState('');
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const navigate = useNavigate();

    const isTooShort = jdText.trim().length > 0 && jdText.trim().length < 200;
    const isDisabled = !jdText.trim() || isAnalyzing || isTooShort;

    const handleAnalyze = () => {
        if (!jdText.trim()) return;
        setIsAnalyzing(true);

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
                            <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">Company Name (Optional)</label>
                            <div className="relative">
                                <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                                <input
                                    type="text"
                                    placeholder="e.g. Google, Meta"
                                    value={company}
                                    onChange={(e) => setCompany(e.target.value)}
                                    className="w-full bg-slate-50 border-2 border-transparent focus:border-primary/20 focus:bg-white rounded-2xl py-3 pl-10 pr-4 outline-none transition-all"
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">Target Role (Optional)</label>
                            <div className="relative">
                                <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                                <input
                                    type="text"
                                    placeholder="e.g. Frontend Engineer"
                                    value={role}
                                    onChange={(e) => setRole(e.target.value)}
                                    className="w-full bg-slate-50 border-2 border-transparent focus:border-primary/20 focus:bg-white rounded-2xl py-3 pl-10 pr-4 outline-none transition-all"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">Job Description Text (Required)</label>
                        <textarea
                            placeholder="Paste the full job description here..."
                            value={jdText}
                            onChange={(e) => setJdText(e.target.value)}
                            className="w-full min-h-[300px] bg-slate-50 border-2 border-transparent focus:border-primary/20 focus:bg-white rounded-2xl p-6 outline-none transition-all resize-none text-slate-700 leading-relaxed font-medium"
                        />
                        {isTooShort && (
                            <div className="flex items-center gap-2 p-3 bg-amber-50 rounded-xl border border-amber-100 text-amber-700 text-sm font-medium animate-in slide-in-from-top-1 duration-300">
                                <AlertCircle className="h-4 w-4" />
                                This JD is too short to analyze deeply. Paste full JD for better output.
                            </div>
                        )}
                    </div>

                    <button
                        onClick={handleAnalyze}
                        disabled={isDisabled}
                        className={`w-full py-4 rounded-2xl font-bold text-lg shadow-xl transition-all flex items-center justify-center gap-2 ${isDisabled
                                ? 'bg-slate-100 text-slate-300 cursor-not-allowed'
                                : 'bg-primary text-white hover:scale-[1.01] hover:shadow-primary/20 hover:shadow-2xl active:scale-[0.99]'
                            }`}
                    >
                        {isAnalyzing ? (
                            <>
                                <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                Analyzing Intelligence...
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
                    <p className="font-black text-primary mb-1 text-xs uppercase tracking-widest">Efficiency</p>
                    <h4 className="font-bold text-slate-900 mb-2 text-lg">Detailed Extraction</h4>
                    <p className="text-slate-600 text-sm">We find hidden skill requirements other tools miss.</p>
                </div>
                <div className="p-6 rounded-3xl bg-purple-50 border border-purple-100">
                    <p className="font-black text-purple-600 mb-1 text-xs uppercase tracking-widest">Tailored</p>
                    <h4 className="font-bold text-slate-900 mb-2 text-lg">Hiring Rounds</h4>
                    <p className="text-slate-600 text-sm">Dynamic round mapping based on company size.</p>
                </div>
                <div className="p-6 rounded-3xl bg-emerald-50 border border-emerald-100">
                    <p className="font-black text-emerald-600 mb-1 text-xs uppercase tracking-widest">Success</p>
                    <h4 className="font-bold text-slate-900 mb-2 text-lg">Predictive Score</h4>
                    <p className="text-slate-600 text-sm">Track your live readiness as you master key skills.</p>
                </div>
            </div>
        </div>
    );
}
