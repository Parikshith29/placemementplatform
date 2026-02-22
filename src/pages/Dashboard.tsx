export default function Dashboard() {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">Dashboard</h1>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                    <p className="text-sm font-medium text-slate-500">Total Practice</p>
                    <p className="text-2xl font-bold text-slate-900">124 Problems</p>
                </div>
                <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                    <p className="text-sm font-medium text-slate-500">Mocks Attended</p>
                    <p className="text-2xl font-bold text-slate-900">12 Interviews</p>
                </div>
                <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                    <p className="text-sm font-medium text-slate-500">Assessments</p>
                    <p className="text-2xl font-bold text-slate-900">5 Completed</p>
                </div>
                <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                    <p className="text-sm font-medium text-slate-500">Readiness Score</p>
                    <p className="text-2xl font-bold text-primary">85%</p>
                </div>
            </div>
        </div>
    );
}
