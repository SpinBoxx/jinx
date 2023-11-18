import Navbar from "./components/navbar";

export const metadata = {
  title: "Jinx",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-full">
      <Navbar /> <div className="w-full pt-4">{children}</div>
    </div>
  );
}
