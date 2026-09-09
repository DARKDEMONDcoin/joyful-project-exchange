import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import sirajFigurine from "@/assets/hero/siraj-user.png";
import amalFigurine from "@/assets/hero/amal-user.png";
import salimFigurine from "@/assets/hero/salim-user.png";
import nourFigurine from "@/assets/hero/nour-user.png";

const CHARACTERS = [
  {
    src: sirajFigurine,
    name: "عبدالله",
    role: "صاحب متجر · الرياض",
    line: "يدير محتوى متجره ومواعيده من مكان واحد، ويجد وقتًا أكبر لعملائه.",
  },
  {
    src: amalFigurine,
    name: "مريم",
    role: "صانعة محتوى · القاهرة",
    line: "تحوّل أفكارها إلى خطة واضحة ومحتوى جاهز للنشر بدون ضغط يومي.",
  },
  {
    src: salimFigurine,
    name: "يوسف",
    role: "مستقل · الدار البيضاء",
    line: "يتابع مشاريعه ورسائله بسهولة، ويركّز على الشغل الذي يحبه.",
  },
  {
    src: nourFigurine,
    name: "ليان",
    role: "صاحبة مشروع · عمّان",
    line: "ترتّب يومها وتتابع نمو مشروعها، بينما ينجز سهل التفاصيل المتكررة.",
  },
] as const;

type CharacterRole = "center" | "left" | "right" | "back";

export function Hero() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const animationLock = useRef(false);
  const releaseTimer = useRef<number | undefined>(undefined);

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

  const rotate = useCallback(() => {
    if (animationLock.current) return;
    animationLock.current = true;
    setIsAnimating(true);
    setActiveIndex((current) => (current + 1) % CHARACTERS.length);
    releaseTimer.current = window.setTimeout(() => {
      animationLock.current = false;
      setIsAnimating(false);
    }, 650);
  }, []);

  useEffect(() => {
    const interval = window.setInterval(rotate, 3600);
    return () => {
      window.clearInterval(interval);
      if (releaseTimer.current !== undefined) window.clearTimeout(releaseTimer.current);
    };
  }, [rotate]);

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
      aria-label="مستخدمو سهل"
      data-animating={isAnimating ? "true" : "false"}
    >
      <div className="sahl-carousel-viewport" data-mobile={isMobile ? "true" : "false"}>
        <div className="sahl-carousel-grain" aria-hidden="true" />
        <p className="sahl-carousel-ghost" aria-hidden="true">أهل سهل</p>

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
                  alt={role === "center" ? `${character.name}، مستخدم سعيد مع سهل` : ""}
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
          <span className="sahl-carousel-kicker">سهل في يومك</span>
          <h1>ناس زيّك،<br /><span>يومهم بقى أسهل.</span></h1>
          <div className="sahl-carousel-member" key={active.name}>
            <strong>{active.name}</strong>
            <span>{active.role}</span>
            <p>{active.line}</p>
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
            <i key={character.name} className={index === activeIndex ? "is-active" : undefined}>
              <span />
            </i>
          ))}
        </div>
      </div>
    </section>
  );
}