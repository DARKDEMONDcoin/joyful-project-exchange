import { Link } from "@tanstack/react-router";
import { ArrowLeft, Check, Sparkles } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { AppIcon, appLabel } from "@/components/site/AppIcon";
import { TeamOrbit } from "@/components/site/TeamOrbit";

const inputs = ["instagram", "gmail", "shopify", "search-console"];
const outputs = ["facebook", "linkedin", "wordpress", "analytics"];

function AppCluster({ apps }: { apps: string[] }) {
  return (
    <div className="grid grid-cols-2 gap-2.5" aria-label={apps.map(appLabel).join("، ")}>
      {apps.map((app, index) => (
        <span
          key={app}
          title={appLabel(app)}
          className="integration-app grid size-13 place-items-center rounded-xl border border-background/15 bg-background shadow-card sm:size-15"
          style={{ animationDelay: `${index * 180}ms` }}
        >
          <AppIcon name={app} className="size-6 sm:size-7" />
        </span>
      ))}
    </div>
  );
}

export function IntegrationFlow() {
  return (
    <section className="relative overflow-hidden bg-foreground py-24 text-background sm:py-28">
      <div aria-hidden className="integration-grid integration-grid-wave absolute inset-0 opacity-70" />
      <div className="relative mx-auto max-w-6xl px-5">
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 text-sm font-bold text-amber">
              <Sparkles className="size-4" />
              منظومة واحدة بدلاً من أدوات متفرقة
            </span>
            <h2 className="mt-4 font-display text-4xl leading-tight font-black sm:text-5xl">
              حساباتك تدخل من هنا،
              <span className="text-amber"> وفريقك يتولّى الباقي</span>
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-background/70 sm:text-lg">
              اربط منصاتك مرة واحدة. يفهم موظفو سهل السياق، ينسّقون العمل معاً، ثم ينفّذون داخل أدواتك
              بعد موافقتك.
            </p>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className="relative mx-auto mt-16 max-w-5xl" dir="rtl">
            <div aria-hidden className="integration-flow-line absolute top-1/2 right-[12%] left-[12%] hidden h-px -translate-y-1/2 lg:block" />
            <span aria-hidden className="flow-spark flow-spark-in hidden lg:block" />
            <span aria-hidden className="flow-spark flow-spark-out hidden lg:block" />

            <div className="grid items-center gap-9 lg:grid-cols-[1fr_1.4fr_1fr] lg:gap-12">
              <div className="relative mx-auto flex items-center gap-5 lg:mx-0 lg:justify-self-start">
                <AppCluster apps={inputs} />
                <div className="hidden text-right lg:block">
                  <span className="block text-xs font-bold text-background/45">يفهم</span>
                  <span className="mt-1 block font-display font-black">بيانات عملك</span>
                </div>
              </div>

              <div className="relative mx-auto w-full max-w-2xl">
                <span aria-hidden className="integration-pulse integration-pulse-a" />
                <span aria-hidden className="integration-pulse integration-pulse-b" />
                <div className="integration-orbit-panel relative z-10">
                  <div className="flex items-center justify-between px-5 pt-4">
                    <span className="flex items-center gap-2 text-xs font-bold text-muted-foreground">
                      <span className="status-dot size-2 rounded-full bg-jade" />
                      يعمل الآن
                    </span>
                    <span className="font-display text-lg font-black text-foreground">فريق سهل</span>
                  </div>
                  <TeamOrbit compact mapCenter />
                </div>
              </div>

              <div className="relative mx-auto flex items-center gap-5 lg:mx-0 lg:justify-self-end">
                <div className="hidden text-left lg:block">
                  <span className="block text-xs font-bold text-background/45">ينفّذ</span>
                  <span className="mt-1 block font-display font-black">داخل منصاتك</span>
                </div>
                <AppCluster apps={outputs} />
              </div>
            </div>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-background/65">
              {["صلاحيات تحددها أنت", "موافقتك قبل النشر", "تفصل أي حساب فوراً"].map((item) => (
                <span key={item} className="flex items-center gap-2">
                  <span className="grid size-5 place-items-center rounded-full bg-jade/25 text-background">
                    <Check className="size-3" strokeWidth={3} />
                  </span>
                  {item}
                </span>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={220}>
          <div className="mt-10 text-center">
            <Link
              to="/integrations"
              className="group inline-flex items-center gap-2 font-bold text-amber transition-colors hover:text-background"
            >
              شاهد كل التكاملات
              <ArrowLeft className="size-4 transition-transform duration-300 group-hover:-translate-x-1" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}