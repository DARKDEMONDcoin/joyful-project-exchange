import { Link } from "@tanstack/react-router";
import { ArrowLeft, Check, Play } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { AmbientBackground } from "@/components/site/AmbientBackground";
import { TeamOrbit } from "@/components/site/TeamOrbit";

export function Hero() {
  return (
    <section id="top" className="home-hero">
      <AmbientBackground />

      <div className="relative z-10 mx-auto max-w-7xl px-5 pt-32 md:pt-40">
        <Reveal>
          <div className="hero-kicker">
            <span className="hero-live-dot" />
            أول فريق رقمي يفهم سوقك ويتكلم بلهجتك
          </div>
        </Reveal>

        <Reveal delay={80}>
          <h1 className="hero-title">
            وظّف فريقًا عربيًا كاملًا،
            <span>بلا توظيف ولا مرتبات.</span>
          </h1>
        </Reveal>

        <Reveal delay={150}>
          <p className="hero-lead">
            ستة موظفين بأسماء يشتغلون داخل حساباتك بعربي أصيل — من الليلة.
          </p>
        </Reveal>



        <Reveal delay={220}>
          <div className="hero-actions">
            <Link to="/auth" search={{ mode: "signup" as const }} className="hero-primary-cta">
              ابدأ مع فريقك مجانًا <ArrowLeft />
            </Link>
            <a href="#workspace" className="hero-secondary-cta">
              <Play /> شاهد مساحة العمل
            </a>
          </div>
        </Reveal>

        <Reveal delay={290}>
          <ul className="hero-assurances">
            {[
              "بدون بطاقة بنكية",
              "موافقتك قبل التنفيذ الحساس",
              "إعداد أول موظف في دقائق",
            ].map((item) => <li key={item}><Check />{item}</li>)}
          </ul>
        </Reveal>

        <Reveal delay={360}>
          <div className="hero-orbit-shell">
            <TeamOrbit compact mapCenter />
          </div>
        </Reveal>
      </div>
    </section>
  );
}