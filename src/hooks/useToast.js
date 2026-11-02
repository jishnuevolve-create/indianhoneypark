import { useContext } from 'react';
import { ToastContext } from '../context/ToastContext';

// const { showToast } = useToast(); showToast('Saved!'); showToast('Something went wrong', 'error');
export function useToast() {
  const toast = useContext(ToastContext);
  if (!toast) {
    throw new Error('useToast must be used inside <ToastProvider>.');
  }
  return toast;
}
