import { Link, Outlet, useLocation } from 'react-router-dom';
import {
    LayoutDashboard,
    Code2,
    ClipboardList,
    BookOpen,
    UserCircle,
    Search,
    Bell
} from 'lucide-react';

export default function DashboardLayout() {
    const location = useLocation();

    const navItems = [
        { name: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
        { name: 'Practice', icon: Code2, path: '/practice' },
        { name: 'Assessments', icon: ClipboardList, path: '/assessments' },
        { name: 'Resources', icon: BookOpen, path: '/resources' },
        { name: 'Profile', icon: UserCircle, path: '/profile' },
    ];

    return (
        <div className="flex h-screen bg-slate-50">
            {/* Sidebar */}
            <aside className="w-64 border-r border-slate-200 bg-white">
                <div className="flex h-16 items-center border-b border-slate-200 px-6">
                    <div className="flex items-center gap-2">
                        <div className="h-7 w-7 rounded bg-primary"></div>
                        <span className="text-xl font-bold text-slate-900 tracking-tight">Prep</span>
                    </div>
                </div>
                <nav className="flex flex-col gap-1 p-4">
                    {navItems.map((item) => {
                        const isActive = location.pathname === item.path;
                        return (
                            <Link
                                key={item.name}
                                to={item.path}
                                className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all ${isActive
                                        ? 'bg-primary text-white shadow-md shadow-primary/20 scale-[1.02]'
                                        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                                    }`}
                            >
                                <item.icon className={`h-5 w-5 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                                {item.name}
                            </Link>
                        );
                    })}
                </nav>
            </aside>

            {/* Main Content Area */}
            <div className="flex flex-1 flex-col overflow-hidden">
                {/* Header */}
                <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-8">
                    <div className="flex flex-1 items-center">
                        <div className="relative w-96">
                            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Search resources, problems..."
                                className="w-full rounded-full bg-slate-100 py-2 pl-10 pr-4 text-sm outline-none focus:ring-2 focus:ring-primary/20 transition-all border-none"
                            />
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <button className="relative rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-900 transition-all">
                            <Bell className="h-5 w-5" />
                            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500 border-2 border-white"></span>
                        </button>
                        <div className="h-8 w-px bg-slate-200"></div>
                        <div className="flex items-center gap-3">
                            <div className="text-right">
                                <p className="text-sm font-semibold text-slate-900 leading-none">Alex Johnson</p>
                                <p className="text-xs text-slate-500 mt-1">Free Tier</p>
                            </div>
                            <div className="h-10 w-10 rounded-full bg-indigo-100 border-2 border-white shadow-sm flex items-center justify-center text-primary font-bold">
                                AJ
                            </div>
                        </div>
                    </div>
                </header>

                {/* Scrollable Content */}
                <main className="flex-1 overflow-y-auto p-8">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
