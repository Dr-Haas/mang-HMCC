import { SequenceScrollAnimation } from "@/components/home/SequenceScrollAnimation";

export default function TestPage() {
  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      <SequenceScrollAnimation
        frameCount={251}
        className="fixed inset-0 w-full h-full z-[-1] pointer-events-none"
      />
      <section className="relative z-10 w-full min-h-[800vh] flex items-center justify-center">
        <div className="bg-white/80 rounded-xl shadow-xl p-12 text-center text-2xl font-bold">
          Scroll pour tester la séquence d'image en fond
        </div>
      </section>
    </div>
  );
}
