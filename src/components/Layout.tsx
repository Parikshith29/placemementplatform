import React from 'react';
import { TopBar } from './TopBar';
import { ContextHeader } from './ContextHeader';
import { ProofFooter } from './ProofFooter';

interface LayoutProps {
    children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className="layout-root" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <TopBar />
            <main className="container" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <ContextHeader
                    title="KodNest Premium Build System"
                    subtitle="Intentional design for high-performance product teams."
                />
                <div className="workspace-container" style={{ display: 'flex', gap: 'var(--spacing-40)', paddingBottom: 'var(--spacing-64)' }}>
                    <div className="primary-workspace" style={{ flex: '0 0 70%' }}>
                        {children}
                    </div>
                    <aside className="secondary-panel" style={{ flex: '0 0 30%', borderLeft: '1px solid var(--border-color)', paddingLeft: 'var(--spacing-24)' }}>
                        <div className="panel-content" style={{ position: 'sticky', top: 'var(--spacing-40)' }}>
                            <h3 style={{ fontSize: '20px', marginBottom: 'var(--spacing-16)' }}>Step Instructions</h3>
                            <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--spacing-24)' }}>
                                Follow the guidelines to build your premium SaaS product. Use the components provided in the design system.
                            </p>

                            <div className="prompt-box" style={{
                                background: '#FFFFFF',
                                border: '1px solid var(--border-color)',
                                padding: 'var(--spacing-16)',
                                borderRadius: 'var(--border-radius)',
                                marginBottom: 'var(--spacing-24)'
                            }}>
                                <code style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
                                    build a premium dashboard using KodNest components...
                                </code>
                            </div>

                            <div className="panel-actions" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-16)' }}>
                                <button className="btn-secondary">Copy Prompt</button>
                                <button className="btn-primary">Build in Lovable</button>
                                <div style={{ display: 'flex', gap: 'var(--spacing-8)' }}>
                                    <button className="btn-secondary" style={{ flex: 1 }}>It Worked</button>
                                    <button className="btn-secondary" style={{ flex: 1 }}>Error</button>
                                </div>
                                <button className="btn-secondary w-full">Add Screenshot</button>
                            </div>
                        </div>
                    </aside>
                </div>
            </main>
            <ProofFooter />

            <style dangerouslySetInnerHTML={{
                __html: `
        .btn-primary {
          background-color: var(--accent-primary);
          color: white;
          padding: var(--spacing-16);
          font-weight: 500;
          border-radius: var(--border-radius);
          text-align: center;
        }
        .btn-primary:hover {
          background-color: var(--accent-hover);
        }
        .btn-secondary {
          border: 1px solid var(--border-color);
          padding: var(--spacing-16);
          color: var(--text-primary);
          font-weight: 500;
          border-radius: var(--border-radius);
          text-align: center;
        }
        .btn-secondary:hover {
          background-color: #F0F0F0;
        }
      `}} />
        </div>
    );
};
