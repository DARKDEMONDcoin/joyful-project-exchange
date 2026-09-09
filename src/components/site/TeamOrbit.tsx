import { useEffect, useState } from "react";
import { team } from "@/data/team";
import { Portrait } from "@/components/site/Portrait";
import { AppIcon } from "@/components/site/AppIcon";
import { LiquidGlass } from "@/components/site/LiquidGlass";
import { MenaMap } from "@/components/site/MenaMap";
import { cn } from "@/lib/utils";

const outcomes: Record<string, { short: string; detail: string }> = {
  sonny: { short: "ينشر عنك كل يوم", detail: "من الفكرة إلى التصميم والجدولة" },
  eva: { short: "ترتّب بريدك ومواعيدك", detail: "وتترك لك ما يحتاج قرارك فقط" },
  sam: { short: "يجلب فرص بيع حقيقية", detail: "ويتابعها حتى تصبح جاهزة" },
  nour: { short: "تكتب محتوى يظهر في البحث", detail: "من الكلمة إلى صفحة جاهزة للنشر" },
  dana: { short: "تصمّم كل موادك", detail: "بهوية واحدة لكل المقاسات" },
  adam: { short: "يحوّل أرقامك إلى قرار", detail: "ويخبرك ماذا توقف وماذا تضاعف" },
};

type Ping = { apps: string[]; text: string; thumb: string };

const pings: Record<string, Ping[]> = {
  sonny: [
    { apps: ["instagram", "facebook"], text: "بنشرلك بوست دلوقتي على إنستجرام", thumb: "منشور جاهز" },
    { apps: ["linkedin"], text: "بجدولك بوستات الأسبوع", thumb: "٧ منشورات" },
    { apps: ["facebook", "x"], text: "بردّ على تعليقات صفحتك", thumb: "١٢ تعليق" },
  ],
  eva: [
    { apps: ["gmail"], text: "بفلترلك بريد الصبح", thumb: "٣ مهمّة فقط" },
    { apps: ["calendar"], text: "بأكدلك اجتماع بكرة ١١", thumb: "موعد مؤكد" },
    { apps: ["slack"], text: "بلخّصلك محادثات الفريق", thumb: "ملخّص اليوم" },
  ],
  sam: [
    { apps: ["whatsapp"], text: "بتابع عميل محتمل على واتساب", thumb: "ردّ مُرسل" },
    { apps: ["hubspot"], text: "بجهّزلك قايمة فرص بيع", thumb: "٩ فرص" },
    { apps: ["gmail"], text: "بابعت عرض سعر للعميل", thumb: "عرض سعر" },
  ],
  nour: [
    { apps: ["wordpress"], text: "بنشر مقال جديد على ووردبريس", thumb: "مقال ١٢٠٠ كلمة" },
    { apps: ["search-console"], text: "بحسّن ترتيبك في البحث", thumb: "+٤ مراكز" },
    { apps: ["indexnow"], text: "بأرشفة صفحاتك الجديدة", thumb: "٥ صفحات" },
  ],
  dana: [
    { apps: ["figma"], text: "بصمّملك غلاف الحملة", thumb: "تصميم جديد" },
    { apps: ["canva"], text: "بجهّز صور المنتج بكل المقاسات", thumb: "٦ مقاسات" },
    { apps: ["instagram"], text: "برفعلك ستوري بهويتك", thumb: "ستوري" },
  ],
  adam: [
    { apps: ["analytics"], text: "بحلّل أرقام الأسبوع", thumb: "تقرير أسبوعي" },
    { apps: ["google-ads"], text: "برشحلك توقف الإعلان الضعيف", thumb: "توفير ٢٢٪" },
    { apps: ["sheets"], text: "بحدّث لوحة المبيعات", thumb: "لوحة محدّثة" },
  ],
};

const ROUTES = [
  { x: 700, y: 62 },
  { x: 300, y: 62 },
  { x: 875, y: 250 },
  { x: 125, y: 250 },
  { x: 700, y: 438 },
  { x: 300, y: 438 },
];

const MAP_EDGES = [
  { x: 560, y: 198 },
  { x: 440, y: 198 },
  { x: 622, y: 248 },
  { x: 378, y: 248 },
  { x: 560, y: 302 },
  { x: 440, y: 302 },
];

function curve(x: number, y: number, index: number) {
  const start = MAP_EDGES[index] ?? { x: 500, y: 250 };
  const mx = (start.x + x) / 2;
  const my = (start.y + y) / 2;
  const dx = x - start.x;
  const dy = y - start.y;
  return `M${start.x} ${start.y} Q${(mx - dy * 0.14).toFixed(1)} ${(my + dx * 0.14).toFixed(1)} ${x} ${y}`;
}

const STEP_MS = 3200;
const TRAVEL_MS = 1100;

export function TeamOrbit({ compact = false, mapCenter = false }: { compact?: boolean; mapCenter?: boolean }) {
  const [step, setStep] = useState(0);
  const [arrived, setArrived] = useState(false);
  const [hovered, setHovered] = useState<number | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      setArrived(true);
      return;
    }
    setArrived(false);
    const arrive = window.setTimeout(() => setArrived(true), TRAVEL_MS);
    const next = window.setTimeout(() => setStep((s) => s + 1), STEP_MS);
    return () => {
      window.clearTimeout(arrive);
      window.clearTimeout(next);
    };
  }, [step]);

  const active = step % ROUTES.length;
  const activeConnection = hovered ?? active;
  const round = Math.floor(step / ROUTES.length);

  return (
    <div className={cn("team-orbit", compact && "team-orbit-compact")}>
      <svg className="orbit-connections" viewBox="0 0 1000 500" preserveAspectRatio="none" aria-hidden>
        {ROUTES.map((r, index) => (
          <path
            key={index}
            id={`orbit-route-${index}`}
            className={cn("orbit-connection", activeConnection === index && "is-active")}
            d={curve(r.x, r.y, index)}
          />
        ))}
        <circle key={step} className="orbit-travel-dot" r="6">
          <animateMotion dur={`${TRAVEL_MS}ms`} begin="0s" fill="freeze" keyPoints="0;1" keyTimes="0;1" calcMode="spline" keySplines="0.4 0 0.2 1">
            <mpath href={`#orbit-route-${activeConnection}`} />
          </animateMotion>
        </circle>
      </svg>

      {mapCenter ? (
        <div className="orbit-map-center">
          <MenaMap orbit />
          <small>من قلب المنطقة، يعمل فريقك</small>
        </div>
      ) : (
        <LiquidGlass className="orbit-user">
          <strong>أنت تقود</strong>
          <small>والفريق ينفّذ</small>
        </LiquidGlass>
      )}

      <div className="orbit-rail" aria-label="فريق سهل">
        {team.map((member, index) => {
          const list = pings[member.id] ?? [];
          const ping = list[round % (list.length || 1)];
          const isActive = active === index;
          return (
            <div
              key={member.id}
              className={cn("orbit-slot", `orbit-employee-${index + 1}`)}
              onPointerEnter={() => setHovered(index)}
              onPointerLeave={() => setHovered(null)}
              onFocusCapture={() => setHovered(index)}
              onBlurCapture={() => setHovered(null)}
            >
              {ping && isActive && arrived ? (
                <div className="orbit-bubble" role="status">
                  <span className="orbit-bubble-apps">
                    {ping.apps.map((a) => <AppIcon key={a} name={a} colored={false} className="size-3.5" />)}
                  </span>
                  <span className="orbit-bubble-text">{ping.text}</span>
                  <span className="orbit-bubble-thumb"><i /><em>{ping.thumb}</em></span>
                </div>
              ) : null}
              <LiquidGlass
                className={cn("orbit-employee", isActive && arrived && "is-lit")}
                style={{ "--employee-tone": member.tint, "--float-delay": `${index * -0.7}s` } as React.CSSProperties}
                tabIndex={0}
              >
                <span className="orbit-portrait">
                  <Portrait memberId={member.id} name={member.name} eager={index < 3} className="size-full" />
                  <i aria-hidden />
                </span>
                <span className="orbit-copy">
                  <strong>{member.name}</strong>
                  <small>{outcomes[member.id]?.short}</small>
                  {!compact ? <em>{outcomes[member.id]?.detail}</em> : null}
                </span>
              </LiquidGlass>
            </div>
          );
        })}
      </div>
    </div>
  );
}
