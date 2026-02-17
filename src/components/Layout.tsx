import { Header } from "./Header";
import { Footer } from "./Footer";
import { MotionProvider } from "./providers/MotionProvider";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background text-foreground">
      <MotionProvider>
        <div className="relative z-10 flex min-h-screen flex-col">
          <Header />
          <div className="flex-1">{children}</div>
          <Footer />
        </div>
      </MotionProvider>
    </div>
  );
}
