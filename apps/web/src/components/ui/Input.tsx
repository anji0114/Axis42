import { InputHTMLAttributes, ReactNode, forwardRef } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  fullWidth?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      helperText,
      startIcon,
      endIcon,
      className = "",
      fullWidth = false,
      ...props
    },
    ref
  ) => {
    const inputClasses = [
      "px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors",
      error ? "border-red-500" : "border-gray-300",
      fullWidth ? "w-full" : "",
      startIcon ? "pl-10" : "",
      endIcon ? "pr-10" : "",
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <div className={fullWidth ? "w-full" : ""}>
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {label}
          </label>
        )}
        <div className="relative">
          {startIcon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              {startIcon}
            </div>
          )}
          <input ref={ref} className={inputClasses} {...props} />
          {endIcon && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
              {endIcon}
            </div>
          )}
        </div>
        {error && (
          <p className="mt-1 text-sm text-red-600">{error}</p>
        )}
        {helperText && !error && (
          <p className="mt-1 text-sm text-gray-500">{helperText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;