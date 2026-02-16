import { Header } from "./Header";
import { Footer } from "./Footer";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative isolate min-h-screen overflow-x-clip bg-background text-foreground">
      <div className="relative z-10 flex min-h-screen flex-col">
        <Header />
        <div className="flex-1">{children}</div>
        <Footer />
      </div>
    </div>
  );
}
