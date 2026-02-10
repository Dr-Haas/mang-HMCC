import { Header } from "./Header";
import { Footer } from "./Footer";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header />
      <div className="flex-1">{children}</div>
      <Footer />
    </div>
  );
}
