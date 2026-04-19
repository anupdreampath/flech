export default function Loading() {
  return (
    <div className="min-h-[80dvh] flex items-center justify-center bg-paper-white">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-3 border-border border-t-accent rounded-full animate-spin" />
        <p className="text-sm text-muted animate-pulse">Loading...</p>
      </div>
    </div>
  );
}
