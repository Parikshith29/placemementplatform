import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import DashboardLayout from './components/DashboardLayout';
import Dashboard from './pages/Dashboard';
import Practice from './pages/Practice';
import Results from './pages/Results';
import History from './pages/History';
import Assessments from './pages/Assessments';
import Resources from './pages/Resources';
import Profile from './pages/Profile';
import TestChecklist from './pages/TestChecklist';
import ShipPortal from './pages/ShipPortal';

const ShipLock = ({ children }: { children: React.ReactNode }) => {
    const saved = localStorage.getItem('prp_test_checklist');
    const checked = saved ? JSON.parse(saved) : {};
    const passedCount = Object.values(checked).filter(Boolean).length;

    if (passedCount < 10) {
        return <Navigate to="/prp/07-test" replace />;
    }

    return <>{children}</>;
};

function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Public Route */}
                <Route path="/" element={<LandingPage />} />

                {/* Dashboard Routes wrapped in Layout */}
                <Route element={<DashboardLayout />}>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/practice" element={<Practice />} />
                    <Route path="/results" element={<Results />} />
                    <Route path="/history" element={<History />} />
                    <Route path="/assessments" element={<Assessments />} />
                    <Route path="/resources" element={<Resources />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/prp/07-test" element={<TestChecklist />} />
                    <Route
                        path="/prp/08-ship"
                        element={
                            <ShipLock>
                                <ShipPortal />
                            </ShipLock>
                        }
                    />
                </Route>

                {/* Fallback */}
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
