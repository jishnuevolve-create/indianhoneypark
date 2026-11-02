import { CircleAlert, CircleCheck, X } from 'lucide-react';
import { createContext, useCallback, useEffect, useMemo, useRef, useState } from 'react';

const TOAST_DURATION_MS = 4000;

// eslint-disable-next-line react-refresh/only-export-components
export const ToastContext = createContext(null);

// Small pop-up messages ("Added to cart", "WhatsApp is not set up yet", …).
export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const timersRef = useRef([]);

  const dismissToast = useCallback((toastId) => {
    setToasts((current) => current.filter((toast) => toast.id !== toastId));
  }, []);

  const showToast = useCallback(
    (message, type = 'success') => {
      const toastId = Date.now() + Math.random();
      setToasts((current) => [...current.slice(-2), { id: toastId, message, type }]);
      timersRef.current.push(setTimeout(() => dismissToast(toastId), TOAST_DURATION_MS));
    },
    [dismissToast],
  );

  // Clear any pending timers if the provider is removed.
  useEffect(() => {
    const timers = timersRef.current;
    return () => timers.forEach(clearTimeout);
  }, []);

  const value = useMemo(() => ({ showToast }), [showToast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div
        aria-live="polite"
        className="pointer-events-none fixed inset-x-4 top-4 z-[70] flex flex-col items-center gap-2 sm:top-auto sm:bottom-6"
      >
        {toasts.map((toast) => {
          const isError = toast.type === 'error';
          const Icon = isError ? CircleAlert : CircleCheck;
          return (
            <div
              key={toast.id}
              role={isError ? 'alert' : 'status'}
              className="pointer-events-auto flex w-full max-w-sm animate-fade-up items-start gap-3 rounded-2xl bg-ink px-4 py-3 text-sm text-warm-white shadow-lift"
            >
              <Icon
                className={`mt-0.5 size-5 shrink-0 ${isError ? 'text-honey' : 'text-[#7fd1a0]'}`}
                aria-hidden="true"
              />
              <p className="flex-1 leading-relaxed">{toast.message}</p>
              <button
                type="button"
                onClick={() => dismissToast(toast.id)}
                className="-m-1 rounded-full p-1 text-warm-white/70 hover:text-warm-white"
                aria-label="Dismiss message"
              >
                <X className="size-4" aria-hidden="true" />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}
