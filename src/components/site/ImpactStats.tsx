import { useEffect, useRef, useState } from "react";
import { Clock3, Coins, Gauge, Layers3 } from "lucide-react";
import { LiquidGlass } from "@/components/site/LiquidGlass";

const stats = [
  { value: 40, prefix: "+", suffix: " ساعة", label: "وقت يعود لك كل شهر", icon: Clock3 },
  { value: 70, prefix: "", suffix: "% أقل", label: "من تكلفة فريق تقليدي مماثل", icon: Coins },
  { value: 24, prefix: "", suffix: "/٦", label: "أيام عمل ممتدة مع يوم صيانة", icon: Gauge },
  { value: 1000, prefix: "+", suffix: " مهمة", label: "سعة شهرية في باقات الفرق", icon: Layers3 },
];

function AnimatedNumber({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [shown, setShown] = useState(0);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(value);
      return;
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry?.isIntersecting) return;
      const start = performance.now();
      const tick = (now: number) => {
        const p = Math.min((now - start) / 1200, 1);
        setShown(Math.round(value * (1 - Math.pow(1 - p, 3))));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      observer.disconnect();
    }, { threshold: 0.35 });
    observer.observe(node);
    return () => observer.disconnect();
  }, [value]);
  return <span ref={ref}>{shown.toLocaleString("ar-EG")}</span>;
}

export function ImpactStats() {
  return (
    <section className="impact-strip" aria-label="أثر فريق سهل">
      <div className="mx-auto grid max-w-6xl gap-3 px-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <LiquidGlass key={stat.label} className="impact-card">
            <stat.icon className="impact-icon" />
            <div className="font-display text-3xl font-black tabular-nums md:text-4xl">
              {stat.prefix}<AnimatedNumber value={stat.value} />{stat.suffix}
            </div>
            <p>{stat.label}</p>
          </LiquidGlass>
        ))}
      </div>
    </section>
  );
}