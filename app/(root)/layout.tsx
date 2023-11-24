import Container from "@/components/container";
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
      <Navbar />
      <div className="inset-0 flex w-full justify-center pt-4">
        <Container>{children}</Container>
      </div>
    </div>
  );
}
