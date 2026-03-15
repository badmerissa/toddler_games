'use client';

import React from 'react';

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
};

export function BigButton({ children, className = '', disabled, ...rest }: Props) {
  return (
    <button
      {...rest}
      disabled={disabled}
      className={`
        flex items-center justify-center
        min-w-[64px] min-h-[64px]
        rounded-2xl
        font-bold text-2xl
        select-none cursor-pointer
        transition-transform duration-100
        active:scale-95
        disabled:opacity-40 disabled:cursor-not-allowed disabled:active:scale-100
        focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white
        ${className}
      `}
    >
      {children}
    </button>
  );
}
