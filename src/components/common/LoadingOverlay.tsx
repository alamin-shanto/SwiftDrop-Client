import React from "react";

type Props = {
  open?: boolean;
  message?: string;
};

export const LoadingOverlay: React.FC<Props> = ({
  open = true,
  message = "Loading...",
}) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white dark:bg-slate-800 p-6 rounded shadow flex flex-col items-center gap-3">
        <div className="w-10 h-10 border-4 border-slate-200 border-t-sky-600 rounded-full animate-spin" />
        <div className="text-sm text-slate-700 dark:text-slate-100">
          {message}
        </div>
      </div>
    </div>
  );
};

export default LoadingOverlay;
