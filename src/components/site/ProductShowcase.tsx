import { Activity } from "lucide-react";
import { Reveal } from "@/components/Reveal";

const dashboard = "/product-shots/chat.png";
const calendar = "/product-shots/calendar.png";
const chat = "/product-shots/chat.png";

export function ProductShowcase() {
  return (
    <section className="product-showcase overflow-hidden py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <p className="section-kicker">مساحة عمل واحدة</p>
            <h2 className="section-title">شاهد ما يحدث، وافق على المهم، واترك الباقي للفريق</h2>
            <p className="section-lead">تقويم المحتوى والمحادثات والمهام والنتائج في مكان واحد واضح — من غير تنقّل بين عشر أدوات.</p>
          </div>
        </Reveal>
        <Reveal delay={100}>
          <div className="device-stage">
            <div className="laptop-frame">
              <div className="laptop-bar"><span /><span /><span /><b>مساحة عمل سهل</b></div>
              <img src={dashboard} alt="شاشة محادثات فريق سهل داخل مساحة العمل" loading="lazy" />
              <div className="laptop-base" />
            </div>
            <figure className="phone-frame phone-calendar">
              <span className="phone-island" />
              <img src={calendar} alt="تقويم المحتوى في سهل" loading="lazy" />
              <figcaption><Activity /> تحديث حي</figcaption>
            </figure>
            <figure className="phone-frame phone-chat">
              <span className="phone-island" />
              <img src={chat} alt="قائمة محادثات الموظفين في سهل" loading="lazy" />
              <figcaption><Activity /> الفريق متاح</figcaption>
            </figure>
          </div>
        </Reveal>
      </div>
    </section>
  );
}