import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary';
    children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ variant = 'primary', children, style, ...props }) => {
    const baseStyle: React.CSSProperties = {
        padding: 'var(--spacing-16) var(--spacing-24)',
        fontWeight: 500,
        borderRadius: 'var(--border-radius)',
        textAlign: 'center',
        transition: 'var(--transition-fast)',
        fontSize: '16px',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        ...style
    };

    const variantStyles: Record<string, React.CSSProperties> = {
        primary: {
            backgroundColor: 'var(--accent-primary)',
            color: 'white',
        },
        secondary: {
            border: '1px solid var(--border-color)',
            color: 'var(--text-primary)',
            backgroundColor: 'transparent',
        }
    };

    return (
        <button
            style={{ ...baseStyle, ...variantStyles[variant] }}
            className={`btn-${variant}`}
            {...props}
        >
            {children}
        </button>
    );
};
