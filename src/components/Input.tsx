import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
}

export const Input: React.FC<InputProps> = ({ label, style, ...props }) => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-8)', width: '100%' }}>
            {label && <label style={{ fontSize: '14px', fontWeight: 500, color: 'var(--text-secondary)' }}>{label}</label>}
            <input
                style={{
                    padding: 'var(--spacing-16)',
                    border: '1px solid var(--border-color)',
                    borderRadius: 'var(--border-radius)',
                    outline: 'none',
                    transition: 'var(--transition-fast)',
                    width: '100%',
                    ...style
                }}
                onFocus={(e) => e.currentTarget.style.borderColor = 'var(--text-primary)'}
                onBlur={(e) => e.currentTarget.style.borderColor = 'var(--border-color)'}
                {...props}
            />
        </div>
    );
};
