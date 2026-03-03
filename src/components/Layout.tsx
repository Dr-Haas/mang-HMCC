import { Header } from "./Header";
import { Footer } from "./Footer";
import { MotionProvider } from "./providers/MotionProvider";

interface LayoutProps {
  children: React.ReactNode;
  hideHeaderFooter?: boolean;
}

export function Layout({ children, hideHeaderFooter = false }: LayoutProps) {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background text-foreground">
      <MotionProvider>
        <div className="relative z-10 flex min-h-screen flex-col">
          {!hideHeaderFooter && <Header />}
          <div className="flex-1">{children}</div>
          {!hideHeaderFooter && <Footer />}
        </div>
      </MotionProvider>
    </div>
  );
}
