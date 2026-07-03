import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  icon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, icon, className = '', ...props }, ref) => (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-semibold text-slate-700 mb-1.5">
          {label}
          {props.required && <span className="text-blue-500 ml-1">*</span>}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            {icon}
          </div>
        )}
        <input
          ref={ref}
          {...props}
          className={`
            w-full rounded-xl border text-sm transition-all duration-150
            focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400
            ${error ? 'border-red-300 bg-red-50/50 text-red-900' : 'border-slate-200 bg-white text-slate-900 hover:border-slate-300'}
            ${icon ? 'pl-10' : 'pl-4'} pr-4 py-3
            placeholder:text-slate-400 disabled:bg-slate-50 disabled:text-slate-400
            ${className}
          `}
        />
      </div>
      {error && <p className="mt-1.5 text-xs text-red-500 font-medium">{error}</p>}
      {hint && !error && <p className="mt-1.5 text-xs text-slate-400">{hint}</p>}
    </div>
  )
);
Input.displayName = 'Input';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: { value: string; label: string }[];
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, options, className = '', ...props }, ref) => (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-semibold text-slate-700 mb-1.5">
          {label}
          {props.required && <span className="text-blue-500 ml-1">*</span>}
        </label>
      )}
      <select
        ref={ref}
        {...props}
        className={`
          w-full rounded-xl border text-sm transition-all duration-150 px-4 py-3
          focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400
          ${error ? 'border-red-300 bg-red-50/50' : 'border-slate-200 bg-white hover:border-slate-300'}
          ${className}
        `}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
      {error && <p className="mt-1.5 text-xs text-red-500 font-medium">{error}</p>}
    </div>
  )
);
Select.displayName = 'Select';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, className = '', ...props }, ref) => (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-semibold text-slate-700 mb-1.5">{label}</label>
      )}
      <textarea
        ref={ref}
        {...props}
        className={`
          w-full rounded-xl border text-sm transition-all duration-150 px-4 py-3 resize-none
          focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400
          ${error ? 'border-red-300 bg-red-50/50' : 'border-slate-200 bg-white hover:border-slate-300'}
          ${className}
        `}
      />
      {error && <p className="mt-1.5 text-xs text-red-500 font-medium">{error}</p>}
    </div>
  )
);
Textarea.displayName = 'Textarea';
