import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    CheckCircle2,
    Circle,
    AlertCircle,
    RotateCcw,
    ShieldCheck,
    HelpCircle,
    PackageCheck,
    Lock
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/Card';

const TEST_ITEMS = [
    { id: 'validation', label: 'JD required validation works', hint: 'Try submitting an empty JD on /practice.' },
    { id: 'warning', label: 'Short JD warning shows for <200 chars', hint: 'Paste a short sentence and check for the warning text.' },
    { id: 'extraction', label: 'Skills extraction groups correctly', hint: 'Paste a full JD and verify skills appear in categories like Core CS, Web, etc.' },
    { id: 'mapping', label: 'Round mapping changes based on company + skills', hint: 'Compare a "Google" JD vs a startup JD to see different round structures.' },
    { id: 'deterministic', label: 'Score calculation is deterministic', hint: 'Analyze the same JD twice; the readiness score should be identical.' },
    { id: 'live_update', label: 'Skill toggles update score live', hint: 'On /results, toggle a skill as "Know" and watch the circular score change.' },
    { id: 'persistence', label: 'Changes persist after refresh', hint: 'Toggle a skill, refresh /results, and ensure the state remains "Know".' },
    { id: 'history', label: 'History saves and loads correctly', hint: 'Check /history to ensure your previous analyses are listed and clickable.' },
    { id: 'export', label: 'Export buttons copy the correct content', hint: 'Download the strategy text and verify it contains company/role details.' },
    { id: 'console', label: 'No console errors on core pages', hint: 'Open DevTools (F12) and browse Practice, Results, and History.' }
];

export default function TestChecklist() {
    const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
    const navigate = useNavigate();

    useEffect(() => {
        const saved = localStorage.getItem('prp_test_checklist');
        if (saved) {
            setCheckedItems(JSON.parse(saved));
        }
    }, []);

    const toggleItem = (id: string) => {
        const newChecked = { ...checkedItems, [id]: !checkedItems[id] };
        setCheckedItems(newChecked);
        localStorage.setItem('prp_test_checklist', JSON.stringify(newChecked));
    };

    const resetChecklist = () => {
        if (confirm('Reset all test progress?')) {
            setCheckedItems({});
            localStorage.removeItem('prp_test_checklist');
        }
    };

    const passedCount = TEST_ITEMS.filter(item => checkedItems[item.id]).length;
    const allPassed = passedCount === TEST_ITEMS.length;

    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-4xl font-black text-slate-900 tracking-tight flex items-center gap-3">
                        <PackageCheck className="h-10 w-10 text-primary" />
                        Quality Guard
                    </h1>
                    <p className="text-slate-500 mt-2 text-lg font-medium">Internal verification checklist for PRP v1.0</p>
                </div>
                <button
                    onClick={resetChecklist}
                    className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-xl text-slate-600 font-bold hover:bg-slate-50 transition-all text-sm"
                >
                    <RotateCcw className="h-4 w-4" />
                    Reset Progress
                </button>
            </div>

            {/* Summary Card */}
            <Card className={`border-2 transition-all ${allPassed ? 'border-emerald-500 bg-emerald-50/30' : 'border-amber-200 bg-amber-50/30'}`}>
                <CardContent className="p-8 flex flex-col md:flex-row items-center gap-8">
                    <div className="relative h-24 w-24 flex-shrink-0">
                        <svg className="h-full w-full -rotate-90">
                            <circle cx="48" cy="48" r="42" fill="transparent" stroke="currentColor" strokeWidth="8" className="text-white/50" />
                            <circle
                                cx="48" cy="48" r="42" fill="transparent" stroke="currentColor" strokeWidth="8"
                                strokeDasharray={2 * Math.PI * 42}
                                strokeDashoffset={2 * Math.PI * 42 * (1 - passedCount / 10)}
                                strokeLinecap="round"
                                className={`transition-all duration-1000 ${allPassed ? 'text-emerald-500' : 'text-amber-500'}`}
                            />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-2xl font-black text-slate-900">{passedCount}/10</span>
                        </div>
                    </div>

                    <div className="flex-1 space-y-2 text-center md:text-left">
                        <h2 className="text-2xl font-black text-slate-900">
                            {allPassed ? 'Ready for Deployment' : 'Verification in Progress'}
                        </h2>
                        <p className="text-slate-600 font-medium">
                            {allPassed
                                ? 'All core features validated. You can now access the shipment portal.'
                                : `Verify ${10 - passedCount} more items to unlock the /prp/08-ship route.`}
                        </p>

                        {!allPassed && (
                            <div className="flex items-center gap-2 text-amber-600 font-bold text-sm bg-amber-100/50 px-4 py-2 rounded-lg w-fit mx-auto md:mx-0">
                                <AlertCircle className="h-4 w-4" />
                                Fix issues before shipping.
                            </div>
                        )}
                    </div>

                    <button
                        onClick={() => navigate('/prp/08-ship')}
                        disabled={!allPassed}
                        className={`px-8 py-4 rounded-2xl font-black flex items-center gap-3 transition-all ${allPassed
                                ? 'bg-slate-900 text-white shadow-xl hover:scale-105 active:scale-95'
                                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                            }`}
                    >
                        {allPassed ? <ShieldCheck className="h-5 w-5" /> : <Lock className="h-5 w-5" />}
                        Access Shipment
                    </button>
                </CardContent>
            </Card>

            {/* Checklist Items */}
            <div className="grid gap-4">
                {TEST_ITEMS.map((item) => (
                    <div
                        key={item.id}
                        onClick={() => toggleItem(item.id)}
                        className={`group cursor-pointer p-6 rounded-3xl border-2 transition-all flex items-start gap-5 ${checkedItems[item.id]
                                ? 'bg-white border-primary/20 shadow-md'
                                : 'bg-white/50 border-slate-100 hover:border-slate-200'
                            }`}
                    >
                        <div className={`mt-1 flex-shrink-0 transition-transform group-active:scale-90 ${checkedItems[item.id] ? 'text-primary' : 'text-slate-300'}`}>
                            {checkedItems[item.id] ? <CheckCircle2 className="h-7 w-7" /> : <Circle className="h-7 w-7" />}
                        </div>
                        <div className="flex-1">
                            <h3 className={`font-bold text-lg transition-colors ${checkedItems[item.id] ? 'text-slate-900' : 'text-slate-500'}`}>
                                {item.label}
                            </h3>
                            <div className="mt-2 flex items-center gap-2 text-xs text-slate-400 font-bold uppercase tracking-wider group-hover:text-primary transition-colors">
                                <HelpCircle className="h-3.5 w-3.5" />
                                How to test: {item.hint}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
