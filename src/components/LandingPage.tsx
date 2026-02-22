import { useNavigate } from 'react-router-dom';
import { Code, Video, BarChart3, ArrowRight } from 'lucide-react';

export default function LandingPage() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="relative overflow-hidden pt-20 pb-16 sm:pt-32 sm:pb-24">
                <div className="container mx-auto px-4">
                    <div className="text-center">
                        <h1 className="text-5xl font-extrabold tracking-tight text-slate-900 sm:text-6xl md:text-7xl">
                            Ace Your <span className="text-primary tracking-normal">Placement</span>
                        </h1>
                        <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-600 sm:text-xl md:mt-10">
                            Practice, assess, and prepare for your dream job with our comprehensive placement readiness platform.
                        </p>
                        <div className="mt-10 flex justify-center gap-4">
                            <button
                                onClick={() => navigate('/dashboard')}
                                className="inline-flex items-center justify-center rounded-full bg-primary px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all hover:bg-primary/90 hover:scale-105 active:scale-95"
                            >
                                Get Started
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Background blobs for premium feel */}
                <div className="absolute top-0 -z-10 h-full w-full opacity-30 blur-3xl" aria-hidden="true">
                    <div className="absolute left-[calc(50%-15rem)] top-[calc(50%-15rem)] h-[30rem] w-[30rem] rounded-full bg-primary/20"></div>
                    <div className="absolute right-[calc(50%-15rem)] bottom-[calc(50%-15rem)] h-[30rem] w-[30rem] rounded-full bg-primary/10"></div>
                </div>
            </section>

            {/* Features Grid */}
            <section className="py-24 bg-slate-50">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
                        {/* Feature 1 */}
                        <div className="group relative flex flex-col rounded-3xl bg-white p-8 shadow-sm transition-all hover:shadow-xl hover:-translate-y-1 border border-slate-100">
                            <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                                <Code className="h-7 w-7" />
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900">Practice Problems</h3>
                            <p className="mt-4 text-slate-600 leading-relaxed">
                                Master complex algorithms and data structures with our curated collection of coding challenges.
                            </p>
                        </div>

                        {/* Feature 2 */}
                        <div className="group relative flex flex-col rounded-3xl bg-white p-8 shadow-sm transition-all hover:shadow-xl hover:-translate-y-1 border border-slate-100">
                            <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                                <Video className="h-7 w-7" />
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900">Mock Interviews</h3>
                            <p className="mt-4 text-slate-600 leading-relaxed">
                                Simulate real interview scenarios with video-based mock sessions and expert feedback.
                            </p>
                        </div>

                        {/* Feature 3 */}
                        <div className="group relative flex flex-col rounded-3xl bg-white p-8 shadow-sm transition-all hover:shadow-xl hover:-translate-y-1 border border-slate-100">
                            <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                                <BarChart3 className="h-7 w-7" />
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900">Track Progress</h3>
                            <p className="mt-4 text-slate-600 leading-relaxed">
                                Visualize your growth with detailed analytics and personalized readiness scores.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t border-slate-100 py-12">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
                        <div className="flex items-center gap-2">
                            <div className="h-8 w-8 rounded-lg bg-primary"></div>
                            <span className="text-xl font-bold text-slate-900 tracking-tight">Placement Prep</span>
                        </div>
                        <p className="text-sm text-slate-500">
                            © {new Date().getFullYear()} Placement Prep. All rights reserved.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
