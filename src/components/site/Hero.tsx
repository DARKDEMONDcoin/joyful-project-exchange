import { useCallback, useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import sirajFigurine from "@/assets/hero/siraj-figurine.png";
import amalFigurine from "@/assets/hero/amal-figurine.png";
import salimFigurine from "@/assets/hero/salim-figurine.png";
import nourFigurine from "@/assets/hero/nour-figurine.png";

const CHARACTERS = [
  {
    src: sirajFigurine,
    name: "سِراج",
    role: "مدير السوشيال ميديا",
    line: "يخطط ويصمّم وينشر محتواك بالعربية، كل يوم.",
  },
  {
    src: amalFigurine,
    name: "أمَل",
    role: "المساعدة التنفيذية",
    line: "ترتّب بريدك ومواعيدك، وتحمي وقتك للأهم.",
  },
  {
    src: salimFigurine,
    name: "سالم",
    role: "مسؤول المبيعات",
    line: "يبحث عن عملائك ويتابع الفرص حتى موعد الاجتماع.",
  },
  {
    src: nourFigurine,
    name: "نور",
    role: "مسؤولة المحتوى والسيو",
    line: "تجعل علامتك حاضرة في البحث وإجابات الذكاء الاصطناعي.",
  },
] as const;

type Direction = "next" | "prev";
type CharacterRole = "center" | "left" | "right" | "back";

export function Hero() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    CHARACTERS.forEach(({ src }) => {
      const image = new Image();
      image.src = src;
    });

    const updateViewport = () => setIsMobile(window.innerWidth < 640);
    updateViewport();
    window.addEventListener("resize", updateViewport);
    return () => window.removeEventListener("resize", updateViewport);
  }, []);

  const navigate = useCallback((direction: Direction) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveIndex((current) =>
      direction === "next"
        ? (current + 1) % CHARACTERS.length
        : (current + CHARACTERS.length - 1) % CHARACTERS.length,
    );
    window.setTimeout(() => setIsAnimating(false), 650);
  }, [isAnimating]);

  const center = activeIndex;
  const left = (activeIndex + 3) % CHARACTERS.length;
  const right = (activeIndex + 1) % CHARACTERS.length;
  const back = (activeIndex + 2) % CHARACTERS.length;
  const active = CHARACTERS[activeIndex] ?? CHARACTERS[0];

  const roleFor = (index: number): CharacterRole => {
    if (index === center) return "center";
    if (index === left) return "left";
    if (index === right) return "right";
    return "back";
  };

  return (
    <section
      id="top"
      className={cn("sahl-carousel-hero", `sahl-carousel-theme-${activeIndex}`)}
      aria-label="فريق سهل الرقمي"
    >
      <div className="sahl-carousel-viewport" data-mobile={isMobile ? "true" : "false"}>
        <div className="sahl-carousel-grain" aria-hidden="true" />
        <p className="sahl-carousel-ghost" aria-hidden="true">فريق سهل</p>

        <div className="sahl-carousel-brand" aria-label="سهل">
          <i />
          <span>سهل</span>
          <small>فريقك الرقمي</small>
        </div>

        <div className="sahl-carousel-stage" aria-live="polite">
          {CHARACTERS.map((character, index) => {
            const role = roleFor(index);
            return (
              <div
                key={character.name}
                className={cn("sahl-carousel-person", `is-${role}`)}
                aria-hidden={role !== "center"}
              >
                <img
                  src={character.src}
                  alt={role === "center" ? `${character.name} — ${character.role} في فريق سهل` : ""}
                  width={1024}
                  height={1536}
                  loading={index === 0 ? "eager" : "lazy"}
                  draggable={false}
                />
              </div>
            );
          })}
        </div>

        <div className="sahl-carousel-copy" dir="rtl">
          <span className="sahl-carousel-kicker">موظفك النشط الآن</span>
          <h1>فريق عربي كامل،<br /><span>يعمل لأجلك.</span></h1>
          <div className="sahl-carousel-member" key={active.name}>
            <strong>{active.name}</strong>
            <span>{active.role}</span>
            <p>{active.line}</p>
          </div>
          <div className="sahl-carousel-controls" dir="ltr">
            <Button type="button" variant="ghost" size="icon" onClick={() => navigate("prev")} aria-label="الموظف السابق">
              <ArrowLeft aria-hidden="true" />
            </Button>
            <span>{String(activeIndex + 1).padStart(2, "0")} / 04</span>
            <Button type="button" variant="ghost" size="icon" onClick={() => navigate("next")} aria-label="الموظف التالي">
              <ArrowRight aria-hidden="true" />
            </Button>
          </div>
        </div>

        <div className="sahl-carousel-actions">
          <Link to="/auth" search={{ mode: "signup" as const }} className="sahl-carousel-primary">
            ابدأ مع فريقك مجانًا <ArrowLeft aria-hidden="true" />
          </Link>
          <a href="#workspace" className="sahl-carousel-discover">
            شاهد مساحة العمل <ArrowLeft aria-hidden="true" />
          </a>
        </div>

        <div className="sahl-carousel-progress" aria-hidden="true">
          {CHARACTERS.map((character, index) => (
            <i key={character.name} className={index === activeIndex ? "is-active" : undefined} />
          ))}
        </div>
      </div>
    </section>
  );
}