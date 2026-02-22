import React from 'react';

interface CardProps {
    children: React.ReactNode;
    padding?: string;
    style?: React.CSSProperties;
}

export const Card: React.FC<CardProps> = ({ children, padding = 'var(--spacing-24)', style }) => {
    return (
        <div style={{
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--border-radius)',
            padding,
            backgroundColor: '#FFFFFF',
            ...style
        }}>
            {children}
        </div>
    );
};
