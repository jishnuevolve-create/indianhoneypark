// Shown while a page is loading. It fills the screen so the footer
// doesn't flash into view and then jump down when the page arrives.
function LoadingSpinner({ label = 'Loading…' }) {
  return (
    <div role="status" className="flex min-h-svh flex-col items-center justify-center gap-4">
      <span className="size-10 animate-spin rounded-full border-[3px] border-soft-yellow border-t-honey" />
      <span className="text-sm text-ink-soft">{label}</span>
    </div>
  );
}

export default LoadingSpinner;
