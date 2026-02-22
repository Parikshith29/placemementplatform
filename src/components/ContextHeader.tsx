import React from 'react';

interface ContextHeaderProps {
    title: string;
    subtitle: string;
}

export const ContextHeader: React.FC<ContextHeaderProps> = ({ title, subtitle }) => {
    return (
        <div style={{ padding: 'var(--spacing-64) 0 var(--spacing-40) 0' }}>
            <h1 style={{ fontSize: '48px', marginBottom: 'var(--spacing-8)' }}>{title}</h1>
            <p className="subtext text-max-width">{subtitle}</p>
        </div>
    );
};
