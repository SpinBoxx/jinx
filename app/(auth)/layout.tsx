export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="h-full px-4">{children}</div>;
}
