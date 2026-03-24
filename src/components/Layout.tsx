import { Header } from "./Header";
import { Footer } from "./Footer";
import { MotionProvider } from "./providers/MotionProvider";

interface LayoutProps {
  children: React.ReactNode;
  hideHeader?: boolean;
  hideFooter?: boolean;
}

export function Layout({
  children,
  hideHeader = false,
  hideFooter = false,
}: LayoutProps) {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background text-foreground">
      <MotionProvider>
        <div className="relative z-10 flex min-h-screen flex-col">
          {!hideHeader && <Header />}
          <div className="flex-1">{children}</div>
          {!hideFooter && <Footer />}
        </div>
      </MotionProvider>
    </div>
  );
}
