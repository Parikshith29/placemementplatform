import {
    Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer
} from 'recharts';
import { PlayCircle, CheckCircle2, Calendar, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/Card';

const skillData = [
    { subject: 'DSA', A: 75, fullMark: 100 },
    { subject: 'System Design', A: 60, fullMark: 100 },
    { subject: 'Communication', A: 80, fullMark: 100 },
    { subject: 'Resume', A: 85, fullMark: 100 },
    { subject: 'Aptitude', A: 70, fullMark: 100 },
];

export default function Dashboard() {
    const readinessValue = 72;
    const strokeDasharray = 2 * Math.PI * 45; // radius is 45
    const strokeDashoffset = strokeDasharray - (readinessValue / 100) * strokeDasharray;

    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900">Welcome back, Alex!</h1>
                    <p className="text-slate-500 mt-1">Here's your placement readiness overview for today.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* 1. Overall Readiness */}
                <Card className="flex flex-col items-center justify-center py-10">
                    <CardHeader className="text-center pb-6">
                        <CardTitle>Overall Readiness</CardTitle>
                    </CardHeader>
                    <CardContent className="relative flex items-center justify-center">
                        <svg className="h-48 w-48 -rotate-90 transform">
                            <circle
                                cx="96"
                                cy="96"
                                r="80"
                                stroke="currentColor"
                                strokeWidth="12"
                                fill="transparent"
                                className="text-slate-100"
                            />
                            <circle
                                cx="96"
                                cy="96"
                                r="80"
                                stroke="currentColor"
                                strokeWidth="12"
                                fill="transparent"
                                strokeDasharray={2 * Math.PI * 80}
                                strokeDashoffset={2 * Math.PI * 80 * (1 - readinessValue / 100)}
                                strokeLinecap="round"
                                className="text-primary transition-all duration-1000 ease-out"
                            />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-4xl font-black text-slate-900">{readinessValue}/100</span>
                            <span className="text-sm font-medium text-slate-500">Readiness Score</span>
                        </div>
                    </CardContent>
                </Card>

                {/* 2. Skill Breakdown */}
                <Card>
                    <CardHeader>
                        <CardTitle>Skill Breakdown</CardTitle>
                    </CardHeader>
                    <CardContent className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={skillData}>
                                <PolarGrid stroke="#e2e8f0" />
                                <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 12 }} />
                                <Radar
                                    name="Skills"
                                    dataKey="A"
                                    stroke="hsl(245, 58%, 51%)"
                                    fill="hsl(245, 58%, 51%)"
                                    fillOpacity={0.4}
                                />
                            </RadarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                {/* 3. Continue Practice */}
                <Card>
                    <CardHeader>
                        <CardTitle>Continue Practice</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="p-3 bg-indigo-50 text-primary rounded-2xl">
                                    <PlayCircle className="h-6 w-6" />
                                </div>
                                <div>
                                    <p className="font-bold text-slate-900 text-lg">Dynamic Programming</p>
                                    <p className="text-sm text-slate-500">Module 4: Advanced Algorithms</p>
                                </div>
                            </div>
                            <button className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-2 text-sm font-bold text-white shadow-md hover:bg-primary/90 transition-all">
                                Continue
                            </button>
                        </div>
                        <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-600 font-medium">3/10 completed</span>
                                <span className="text-primary font-bold">30%</span>
                            </div>
                            <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                                <div className="h-full bg-primary rounded-full w-[30%] shadow-[0_0_10px_rgba(79,70,229,0.3)]"></div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* 4. Weekly Goals */}
                <Card>
                    <CardHeader>
                        <CardTitle>Weekly Goals</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-600 font-medium font-semibold text-lg">Problems Solved</span>
                                <span className="text-slate-900 font-bold text-lg">12 / 20</span>
                            </div>
                            <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
                                <div className="h-full bg-primary rounded-full w-[60%]"></div>
                            </div>
                        </div>
                        <div className="flex justify-between items-center bg-slate-50 p-4 rounded-2xl">
                            {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => (
                                <div key={i} className="flex flex-col items-center gap-2">
                                    <div className={`h-8 w-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                                        // Using mock activity: Mon, Tue, Wed are done (first 3)
                                        i < 3 ? 'bg-primary text-white shadow-lg' : 'bg-white text-slate-400 border border-slate-200'
                                        }`}>
                                        {day}
                                    </div>
                                    <span className="text-[10px] font-bold text-slate-400 uppercase">{day}</span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* 5. Upcoming Assessments */}
                <Card className="md:col-span-2">
                    <CardHeader>
                        <CardTitle>Upcoming Assessments</CardTitle>
                    </CardHeader>
                    <CardContent className="grid gap-4 md:grid-cols-3">
                        {[
                            { title: "DSA Mock Test", time: "Tomorrow, 10:00 AM", color: "bg-blue-50 text-blue-600 border-blue-100" },
                            { title: "System Design Review", time: "Wed, 2:00 PM", color: "bg-purple-50 text-purple-600 border-purple-100" },
                            { title: "HR Interview Prep", time: "Friday, 11:00 AM", color: "bg-emerald-50 text-emerald-600 border-emerald-100" }
                        ].map((item, i) => (
                            <div key={i} className={`flex flex-col p-5 rounded-2xl border ${item.color} group cursor-pointer transition-all hover:scale-[1.02]`}>
                                <div className="flex justify-between items-start mb-4">
                                    <Calendar className="h-6 w-6" />
                                    <ChevronRight className="h-5 w-5 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </div>
                                <h4 className="font-bold text-lg text-slate-900 mb-1">{item.title}</h4>
                                <p className="font-medium opacity-80">{item.time}</p>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
