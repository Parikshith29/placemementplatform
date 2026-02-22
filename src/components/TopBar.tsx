import React from 'react';

export const TopBar: React.FC = () => {
    return (
        <header style={{
            height: '64px',
            borderBottom: '1px solid var(--border-color)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 var(--spacing-24)',
            backgroundColor: '#FFFFFF',
            position: 'sticky',
            top: 0,
            zIndex: 100
        }}>
            <div className="brand" style={{ fontWeight: 600, fontSize: '18px' }}>
                KodNest
            </div>

            <div className="progress" style={{
                fontSize: '14px',
                color: 'var(--text-secondary)',
                fontWeight: 500
            }}>
                Step 02 / 05
            </div>

            <div className="status" style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-8)' }}>
                <span style={{
                    fontSize: '12px',
                    fontWeight: 600,
                    padding: '4px 8px',
                    backgroundColor: '#F0F0F0',
                    borderRadius: '20px',
                    color: 'var(--text-secondary)'
                }}>
                    In Progress
                </span>
            </div>
        </header>
    );
};
