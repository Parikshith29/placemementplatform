import React from 'react';
import { Layout } from './components/Layout';
import { Card } from './components/Card';
import { Button } from './components/Button';
import { Input } from './components/Input';

const App: React.FC = () => {
    return (
        <Layout>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-40)', padding: 'var(--spacing-40) 0' }}>
                <section>
                    <h2 style={{ fontSize: '32px', marginBottom: 'var(--spacing-24)' }}>Project Setup</h2>
                    <Card>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-24)' }}>
                            <Input label="Project Name" placeholder="Enter your project name..." />
                            <Input label="Short Description" placeholder="What are you building?" />
                            <div style={{ display: 'flex', gap: 'var(--spacing-16)' }}>
                                <Button>Create Project</Button>
                                <Button variant="secondary">Cancel</Button>
                            </div>
                        </div>
                    </Card>
                </section>

                <section>
                    <h2 style={{ fontSize: '32px', marginBottom: 'var(--spacing-24)' }}>Recent Activity</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 'var(--spacing-24)' }}>
                        <Card>
                            <h3 style={{ fontSize: '20px', marginBottom: 'var(--spacing-8)' }}>Design Review</h3>
                            <p style={{ color: 'var(--text-secondary)' }}>The design system is now fully implemented with all core tokens.</p>
                        </Card>
                        <Card>
                            <h3 style={{ fontSize: '20px', marginBottom: 'var(--spacing-8)' }}>Build Status</h3>
                            <p style={{ color: 'var(--text-secondary)' }}>Vite environment configured and dependencies installed.</p>
                        </Card>
                    </div>
                </section>
            </div>
        </Layout>
    );
};

export default App;
