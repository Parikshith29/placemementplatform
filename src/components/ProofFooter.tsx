import React from 'react';

export const ProofFooter: React.FC = () => {
    const items = [
        { label: 'UI Built', completed: true },
        { label: 'Logic Working', completed: false },
        { label: 'Test Passed', completed: false },
        { label: 'Deployed', completed: false },
    ];

    return (
        <footer style={{
            position: 'fixed',
            bottom: 0,
            width: '100%',
            backgroundColor: '#FFFFFF',
            borderTop: '1px solid var(--border-color)',
            padding: 'var(--spacing-16) var(--spacing-24)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 'var(--spacing-40)'
        }}>
            {items.map((item, index) => (
                <div key={index} style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-16)' }}>
                    <div style={{
                        width: '20px',
                        height: '20px',
                        border: `2px solid ${item.completed ? 'var(--status-success)' : 'var(--border-color)'}`,
                        borderRadius: '2px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: item.completed ? 'var(--status-success)' : 'transparent'
                    }}>
                        {item.completed && <span style={{ color: 'white', fontSize: '14px' }}>✓</span>}
                    </div>
                    <span style={{
                        fontSize: '14px',
                        fontWeight: 500,
                        color: item.completed ? 'var(--text-primary)' : 'var(--text-secondary)'
                    }}>
                        {item.label}
                    </span>
                </div>
            ))}
        </footer>
    );
};
