import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, CheckCircle2, Crown, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import siraj from "@/assets/hero/siraj-figurine.png";
import amal from "@/assets/hero/amal-figurine.png";
import salim from "@/assets/hero/salim-figurine.png";
import nour from "@/assets/hero/nour-figurine.png";

const EMPLOYEES = [
  { src: siraj, name: "سراج", role: "مسؤول المحتوى", task: "يخطط، يكتب وينشر محتواك" },
  { src: amal, name: "آمال", role: "المساعدة التنفيذية", task: "ترتب يومك وتتابع أولوياتك" },
  { src: salim, name: "آدم", role: "محلل الأعمال", task: "يحوّل أرقامك إلى قرارات واضحة" },
  { src: nour, name: "نور", role: "خبيرة الظهور", task: "تجعل عملاءك يجدونك أسرع" },
] as const;

export function Hero() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    EMPLOYEES.forEach(({ src }) => {
      const image = new Image();
      image.src = src;
    });

    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % EMPLOYEES.length);
    }, 4200);
    return () => window.clearInterval(interval);
  }, []);

  const active = EMPLOYEES[activeIndex] ?? EMPLOYEES[0];

  return (
    <section id="top" className="cinematic-hero" aria-label="فريق سهل الرقمي">
      <div className="cinematic-hero-bg" aria-hidden="true">
        <div className="cinematic-hero-beam" />
        <div className="cinematic-hero-grid" />
        <p>سهل</p>
      </div>

      <div className="cinematic-team" aria-live="polite">
        {EMPLOYEES.map((employee, index) => {
          const offset = (index - activeIndex + EMPLOYEES.length) % EMPLOYEES.length;
          const position = offset === 0 ? "active" : offset === 1 ? "next" : offset === 3 ? "prev" : "away";
          return (
            <figure key={employee.name} className={cn("cinematic-employee", `is-${position}`)} aria-hidden={position !== "active"}>
              <img
                src={employee.src}
                alt={position === "active" ? `${employee.name}، ${employee.role} في فريق سهل` : ""}
                width={1024}
                height={1536}
                loading={index === 0 ? "eager" : "lazy"}
                draggable={false}
              />
            </figure>
          );
        })}
        <div className="cinematic-employee-status" key={active.name}>
          <span><i /> يعمل الآن</span>
          <strong>{active.name}</strong>
          <small>{active.role}</small>
          <p>{active.task}</p>
        </div>
      </div>

      <div className="cinematic-hero-content" dir="rtl">
        <div className="cinematic-kicker cinematic-enter-1">
          <Crown aria-hidden="true" />
          <span>أول فريق عمل رقمي يفهم العربية ولهجتك</span>
        </div>
        <h1 className="cinematic-enter-2">
          فريق كامل.<br />
          <span>شغل يتنجز.</span><br />
          وأنت تقود.
        </h1>
        <p className="cinematic-lead cinematic-enter-3">
          موظفون بالذكاء الاصطناعي يكتبون ويصممون ويتابعون عملاءك كل يوم — من مساحة عمل واحدة، وتحت إشرافك الكامل.
        </p>
        <div className="cinematic-actions cinematic-enter-4">
          <Link to="/auth" search={{ mode: "signup" as const }} className="cinematic-primary">
            <span>كوّن فريقك مجانًا</span><ArrowLeft aria-hidden="true" />
          </Link>
          <Link to="/app" className="cinematic-secondary">
            <Sparkles aria-hidden="true" /><span>جرّب الموظفين</span>
          </Link>
        </div>
        <div className="cinematic-proof cinematic-enter-5">
          <span><CheckCircle2 /> بدون بطاقة بنكية</span>
          <span><CheckCircle2 /> يبدأ خلال دقائق</span>
        </div>
      </div>

      <div className="cinematic-stats" dir="rtl">
        <div><strong>٦</strong><span>موظفين متخصصين</span></div>
        <div><strong>٢٤/٧</strong><span>عمل بلا توقف</span></div>
        <div><strong>+١٠٠٠</strong><span>مهمة أُنجزت</span></div>
      </div>

      <div className="cinematic-progress" aria-hidden="true">
        {EMPLOYEES.map((employee, index) => (
          <i key={employee.name} className={index === activeIndex ? "is-active" : undefined}><span /></i>
        ))}
      </div>
    </section>
  );
}