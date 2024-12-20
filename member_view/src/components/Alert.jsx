import React from "react";

const Alert = ({ children, variant = "default", ...props }) => {
  const variants = {
    default: "bg-blue-50 border-blue-200 text-blue-800",
    destructive: "bg-red-50 border-red-200 text-red-800",
    success: "bg-green-50 border-green-200 text-green-800"
  };

  return (
    <div
      role="alert"
      className={`rounded-lg border p-4 mb-2 ${variants[variant]}`}
      {...props}
    >
      {children}
    </div>
  );
};

const AlertTitle = ({ children }) => (
  <h5 className="mb-1 font-medium leading-none tracking-tight">
    {children}
  </h5>
);

const AlertDescription = ({ children }) => (
  <div className="text-sm opacity-90">
    {children}
  </div>
);

export { Alert, AlertTitle, AlertDescription };