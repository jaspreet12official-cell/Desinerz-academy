
import React from "react";

const InputField = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder = "",
  required = false,
  error = "",
  disabled = false,
  readOnly = false,
  helperText = "",
  className = "",
  ...props
}) => {
  return (
    <div className={`w-full min-w-0 ${className}`}>
      {label && (
        <label
          htmlFor={name}
          className="block text-sm font-medium text-gray-700 mb-1.5"
        >
          {label}
          {required && (
            <span className="text-red-500 ml-1">*</span>
          )}
        </label>
      )}

      <input
        id={name}
        name={name}
        type={type}
        value={value ?? ""}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        readOnly={readOnly}
        aria-invalid={!!error}
        aria-describedby={
          error ? `${name}-error` : helperText ? `${name}-helper` : undefined
        }
        className={`
          w-full h-10 px-3
          border rounded-md
          text-sm text-gray-800
          placeholder:text-gray-400
          outline-none transition-all
          focus:ring-2 focus:ring-purple-100
          focus:border-purple-600
          disabled:bg-gray-100 disabled:cursor-not-allowed
          ${error
            ? "border-red-500 focus:border-red-500 focus:ring-red-100"
            : "border-gray-300"
          }
        `}
        {...props}
      />

      {error && (
        <p
          id={`${name}-error`}
          className="text-xs text-red-500 mt-1"
          role="alert"
        >
          {error}
        </p>
      )}

      {!error && helperText && (
        <p
          id={`${name}-helper`}
          className="text-xs text-gray-500 mt-1"
        >
          {helperText}
        </p>
      )}
    </div>
  );
};

export default InputField;
