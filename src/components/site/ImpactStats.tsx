import { useEffect, useRef, useState } from "react";
import { Clock3, Coins, Gauge, Layers3 } from "lucide-react";

const stats = [
  { value: 40, prefix: "+", suffix: " ساعة", label: "وقت يعود لك كل شهر", icon: Clock3, visual: "clock" },
  { value: 70, prefix: "", suffix: "% أقل", label: "من تكلفة فريق تقليدي مماثل", icon: Coins, visual: "saving" },
  { value: 24, prefix: "", suffix: "/٦", label: "أيام عمل ممتدة مع يوم صيانة", icon: Gauge, visual: "pulse" },
  { value: 1000, prefix: "+", suffix: " مهمة", label: "سعة شهرية في باقات الفرق", icon: Layers3, visual: "stack" },
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
      <div className="impact-grid mx-auto max-w-6xl px-5">
        {stats.map((stat, index) => (
          <article key={stat.label} className="impact-card" style={{ "--impact-delay": `${index * 130}ms` } as React.CSSProperties}>
            <div className="impact-card-inner">
              <div className="impact-icon-shell"><stat.icon className="impact-icon" /></div>
              <div className={`impact-mini-visual impact-mini-${stat.visual}`} aria-hidden="true">
                {stat.visual === "clock" && <><i /><i /><i /></>}
                {stat.visual === "saving" && <><b /><b /><b /><b /></>}
                {stat.visual === "pulse" && <><svg viewBox="0 0 120 28"><path d="M2 17h24l7-11 12 20 11-15 9 6h53" /></svg></>}
                {stat.visual === "stack" && <><i /><i /><i /></>}
              </div>
              <div className="impact-value font-display tabular-nums">
                {stat.prefix}<AnimatedNumber value={stat.value} />{stat.suffix}
              </div>
              <p>{stat.label}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}