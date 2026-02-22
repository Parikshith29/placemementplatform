import { useNavigate } from 'react-router-dom';
import {
    Package,
    Rocket,
    ArrowLeft,
    CheckCircle2,
    Server,
    ShieldCheck,
    Globe
} from 'lucide-react';
import { Card, CardContent } from '../components/Card';

export default function ShipPortal() {
    const navigate = useNavigate();

    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-in zoom-in-95 duration-700">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-4xl font-black text-slate-900 tracking-tight flex items-center gap-3">
                        <Rocket className="h-10 w-10 text-indigo-500" />
                        Shipment Portal
                    </h1>
                    <p className="text-slate-500 mt-2 text-lg font-medium">Your application is ready for the world.</p>
                </div>
                <button
                    onClick={() => navigate('/prp/07-test')}
                    className="flex items-center gap-2 px-4 py-2 text-slate-500 font-bold hover:text-slate-900 transition-all text-sm"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back to Testing
                </button>
            </div>

            <Card className="bg-slate-900 text-white border-none shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-12 opacity-10">
                    <Rocket className="h-64 w-64 rotate-12" />
                </div>

                <CardContent className="p-12 relative z-10 space-y-8">
                    <div className="space-y-4">
                        <div className="bg-emerald-500/10 text-emerald-400 px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest w-fit border border-emerald-500/20">
                            Pre-Deployment Check: PASSED
                        </div>
                        <h2 className="text-5xl font-black tracking-tight leading-tight">
                            Ready to Launch <br />Placement Readiness Platform
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-8">
                        <div className="space-y-4 p-6 rounded-3xl bg-white/5 border border-white/10">
                            <Server className="h-8 w-8 text-indigo-400" />
                            <h3 className="text-xl font-bold">Production Build</h3>
                            <p className="text-slate-400 text-sm leading-relaxed">
                                Optimized assets, minified bundles, and production-ready environment configuration are prepared.
                            </p>
                            <div className="flex items-center gap-2 text-emerald-400 text-[10px] font-black uppercase">
                                <CheckCircle2 className="h-4 w-4" />
                                Artifacts Generated
                            </div>
                        </div>

                        <div className="space-y-4 p-6 rounded-3xl bg-white/5 border border-white/10">
                            <ShieldCheck className="h-8 w-8 text-emerald-400" />
                            <h3 className="text-xl font-bold">Quality Assured</h3>
                            <p className="text-slate-400 text-sm leading-relaxed">
                                All 10 manual verification tests passed. Core flows and persistence layers are stable.
                            </p>
                            <div className="flex items-center gap-2 text-emerald-400 text-[10px] font-black uppercase">
                                <CheckCircle2 className="h-4 w-4" />
                                Tests Verified
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                        <button className="flex-1 bg-white text-slate-900 px-8 py-6 rounded-3xl font-black text-xl flex items-center justify-center gap-4 hover:bg-slate-100 transition-all shadow-[0_0_30px_rgba(255,255,255,0.2)] active:scale-95">
                            <Globe className="h-6 w-6" />
                            Deploy to Vercel
                        </button>
                        <button className="flex-1 bg-slate-800 text-white px-8 py-6 rounded-3xl font-black text-xl flex items-center justify-center gap-4 hover:bg-slate-750 transition-all border border-white/10 active:scale-95">
                            <Package className="h-6 w-6" />
                            Create Release
                        </button>
                    </div>
                </CardContent>
            </Card>

            <div className="bg-slate-100 p-8 rounded-[40px] border border-slate-200">
                <p className="text-center text-slate-400 text-xs font-bold uppercase tracking-widest">
                    Version 1.0.0 (Latest) • Stable Build • {new Date().toLocaleDateString()}
                </p>
            </div>
        </div>
    );
}
