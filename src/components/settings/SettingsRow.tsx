type Props = {
  label: string;
  description?: string;
  children: React.ReactNode;
};

export function SettingsRow({ label, description, children }: Props) {
  return (
    <div className="flex items-center justify-between gap-4 py-4 border-b border-slate-100 last:border-0">
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-slate-800 text-sm">{label}</p>
        {description && <p className="text-slate-400 text-xs mt-0.5 leading-snug">{description}</p>}
      </div>
      <div className="shrink-0">{children}</div>
    </div>
  );
}

type ToggleProps = {
  checked: boolean;
  onChange: () => void;
  label: string;
};

export function Toggle({ checked, onChange, label }: ToggleProps) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={onChange}
      className={`
        relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200
        focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600
        ${checked ? 'bg-indigo-600' : 'bg-slate-200'}
      `}
    >
      <span
        className={`
          inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform duration-200
          ${checked ? 'translate-x-6' : 'translate-x-1'}
        `}
      />
    </button>
  );
}
