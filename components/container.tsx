export default function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className="inset-0 h-full w-full max-w-[1536px] items-center px-6 pb-10">
      {children}
    </div>
  );
}
