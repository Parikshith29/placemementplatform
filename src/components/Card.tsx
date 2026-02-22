import React from 'react';

export const Card = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
    <div className={`rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden ${className}`}>
        {children}
    </div>
);

export const CardHeader = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
    <div className={`p-6 pb-0 ${className}`}>
        {children}
    </div>
);

export const CardTitle = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
    <h3 className={`text-xl font-bold text-slate-900 ${className}`}>
        {children}
    </h3>
);

export const CardContent = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
    <div className={`p-6 ${className}`}>
        {children}
    </div>
);
