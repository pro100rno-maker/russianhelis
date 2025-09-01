"use client";
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

/** ====== STRAPI CLIENT (client-side) ====== */
const STRAPI_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL || "https://russianhelis-cms.onrender.com";

function mediaUrl(path?: string) {
  if (!path) return "";
  return path.startsWith("http") ? path : `${STRAPI_URL}${path}`;
}

async function fetchByLocale(locale: "ru" | "en") {
  const url = `${STRAPI_URL}/api/helicopters?populate=*&locale=${locale}&sort=createdAt:desc`;
  const res = await fetch(url, { cache: "no-store" }); // всегда свежие данные
  if (!res.ok) throw new Error(`Strapi ${res.status}: ${await res.text()}`);
  const json = await res.json();
  return (json.data ?? []) as any[];
}

async function fetchWithFallback(
  preferred: "ru" | "en"
): Promise<{ data: any[]; usedLocale: "ru" | "en" }> {
  const primary = await fetchByLocale(preferred);
  if (primary.length) {
    return { data: primary, usedLocale: preferred };
  }
  const alt: "ru" | "en" = preferred === "ru" ? "en" : "ru";
  const secondary = await fetchByLocale(alt);
  return { data: secondary, usedLocale: alt };
}
/** ========================================= */

const CONTACT = {
  phoneDisplay: "+7 967-250-01-02",
  phoneHref: "+79672500102",
  telegram: "Al_Filimonov",
  email: "alexander.filimonov@aoe.group",
};

const IMAGES = {
  hero: "/img/mi8-1/mi8_white.jpg",
};

const DICT = {
  ru: {
    brand: "Ми-8: сопровождение строительства",
    nav: { home: "Главная", what: "Что делаем", why: "Почему важно", process: "Как работаем", experience: "Опыт", cases: "Кейсы", marketplace: "Витрина", contact: "Контакты" },
    heroTitle: "Ваш Ми-8 — готов к работе. Без переплат. Без задержек.",
    heroText: "Мы сопровождаем строительство вертолётов Ми-8 от выбора комплектации до ввода в эксплуатацию. Работаем с Казанским и Улан-Удэнским заводами и берём на себя все переговоры, контроль и приёмку.",
    ctaConsult: "Получить консультацию",
    ctaCall: "Позвонить",
    bulletTiming: "Приёмка 4–5 рабочих дней вместо стандартных 2 недель",
    bulletMoney: "Экономия до $500 000 на лишних опциях",
    bulletFull: "Полный цикл: от ТЗ до ввода в эксплуатацию",
    whatTitle: "Полный цикл сопровождения покупки Ми-8",
    whatText: "Берём на себя всё, что владелец не сможет сделать сам — от выбора комплектации до приёмки и управления.",
    whatItems: [
      { title: "Конфигурация под задачи", text: "Подберём комплектацию под грузовые, пассажирские, VIP, санитарные задачи." },
      { title: "Контроль сборки", text: "Согласуем и контролируем процесс на заводе, устраняем риски и расхождения." },
      { title: "Приёмка и документы", text: "Финальная проверка систем и пакета документов. Готовим к вводу в эксплуатацию." },
      { title: "Управление", text: "Постановка под управление нашей авиакомпании и дальнейшая эксплуатация." },
    ],
    whyTitle: "Почему это важно",
    whyLead: "Покупка Ми-8 без профессионального сопровождения = лишние расходы, задержки и риски.",
    whyStats: [
      { title: "Сроки", text: "Приёмка 4–5 рабочих дней вместо стандартных 2 недель." },
      { title: "Деньги", text: "Экономим до $500 000 за счёт оптимизации комплектации." },
      { title: "Надёжность", text: "Коммуникации с заводом, контроль сборки, документация — всё на нас." },
    ],
    processTitle: "Как мы работаем",
    steps: [
      { title: "Договор", text: "Подписываем договор на сопровождение: фиксируем этапы и условия." },
      { title: "Конфигурация + КП", text: "Выбираем комплектацию и получаем коммерческое предложение от завода." },
      { title: "Оптимизация", text: "Оптимизируем по срокам и стоимости, убираем лишнее." },
      { title: "Договор с заводом", text: "Согласовываем договор купли-продажи, устраняем риски." },
      { title: "Постройка", text: "Сопровождаем процесс, приезжаем на завод несколько раз за период строительства." },
      { title: "Финальная приёмка", text: "Проверяем документы и вертолёт на месте, устраняем замечания, передаём клиенту." },
    ],
    expTitle: "Наш опыт",
    expFacts: ["14 воздушных судов в управлении компании","Приёмка Ми-8 с Казанского и Улан-Удэнского заводов","Клиенты из России, Азии и Ближнего Востока"],
    casesTitle: "Кейсы",
    cases: [
      { title: "Кейс — Алтай", text: "Клиент из Республики Алтай заказал Ми-8 в Казани. Убрали 3 ненужных опции, сэкономив $240 000. Приёмка — 4 рабочих дня вместо 14." },
      { title: "Кейс — Иркутская область", text: "Контроль сборки на Улан-Удэнском заводе, установка дополнительных топливных баков, приёмка и ввод в эксплуатацию за 5 рабочих дней." },
    ],
    marketTitle: "Витрина — вторичный рынок",
    marketLead: "Подбор, проверка истории, инспекция и сопровождение сделки под ключ.",
    marketCTA: "Запросить детали",
    contactTitle: "Свяжитесь с нами",
    contactLead: "Ответим на вопросы, обсудим задачи и предложим оптимальную конфигурацию под ваши цели.",
    formName: "Имя", formPhone: "Телефон", formMsg: "Сообщение",
    formSendMail: "Отправить на почту", formWriteTG: "Написать в Telegram",
    footer: "Сопровождение строительства вертолётов Ми-8",
  },
  en: {
    brand: "Mi-8: build supervision & delivery",
    nav: { home: "Home", what: "Services", why: "Value", process: "Process", experience: "Experience", cases: "Case studies", marketplace: "Marketplace", contact: "Contacts" },
    heroTitle: "Your Mi-8 — ready for work. No overpayments. No delays.",
    heroText: "We supervise Mi-8 builds end-to-end: configuration, factory control, final acceptance and entry into service.",
    ctaConsult: "Request a consultation", ctaCall: "Call us",
    bulletTiming: "Final acceptance in 4–5 business days vs typical 2 weeks",
    bulletMoney: "Save up to $500,000 on unnecessary options", bulletFull: "Full cycle: from requirements to entry into service",
    whatTitle: "Full-cycle Mi-8 acquisition support",
    whatText: "We cover everything — from configuration to factory acceptance and airline management.",
    whatItems: [
      { title: "Mission-driven spec", text: "Cargo, passenger, VIP, medevac — tailored configuration." },
      { title: "Factory oversight", text: "We align and supervise the assembly, mitigating risks and discrepancies." },
      { title: "Acceptance & docs", text: "Final system checks and paperwork. Ready for entry into service." },
      { title: "Operations", text: "Placement under our AOC and further operations." },
    ],
    whyTitle: "Why it matters",
    whyLead: "Buying a Mi-8 without professional support means extra costs, delays and risks.",
    whyStats: [
      { title: "Timing", text: "Final acceptance in 4–5 business days instead of 2 weeks." },
      { title: "Costs", text: "We save up to $500,000 by optimizing configuration." },
      { title: "Reliability", text: "We handle factory communications, build control and documentation." },
    ],
    processTitle: "How we work",
    steps: [
      { title: "Service agreement", text: "We sign an engagement contract with clear stages and terms." },
      { title: "Spec + quotation", text: "We define configuration and obtain the factory quote." },
      { title: "Optimization", text: "We optimize cost and lead time, removing non-essentials." },
      { title: "Sales contract", text: "We align the purchase agreement with the factory and mitigate risks." },
      { title: "Build supervision", text: "We visit the factory multiple times through the build phase." },
      { title: "Final acceptance", text: "On-site inspections and paperwork — we deliver a fully ready helicopter." },
    ],
    expTitle: "Experience",
    expFacts: ["14 aircraft under management","Mi-8 acceptances from Kazan and Ulan-Ude plants","Clients across Russia, Asia and the Middle East"],
    casesTitle: "Case studies",
    cases: [
      { title: "Altai region", text: "Removed 3 unnecessary options and saved $240,000. Acceptance took 4 business days instead of 14." },
      { title: "Irkutsk region", text: "Build supervised at Ulan-Ude plant with additional fuel tanks. Entry into service in 5 business days." },
    ],
    marketTitle: "Marketplace — pre-owned Mi-8",
    marketLead: "Selection, history checks, technical inspection and deal support end-to-end.",
    marketCTA: "Request details",
    contactTitle: "Get in touch",
    contactLead: "We’ll answer questions, discuss your mission and propose the optimal configuration.",
    formName: "Name", formPhone: "Phone", formMsg: "Message",
    formSendMail: "Send by email", formWriteTG: "Message on Telegram",
    footer: "Mi-8 build supervision",
  },
} as const;

export default function Page() {
  const [lang, setLang] = useState<"ru" | "en">("ru");
  const t = DICT[lang];
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <TopNav t={t} lang={lang} setLang={setLang} />
      <Hero t={t} />
      <WhatWeDo t={t} />
      <WhyItMatters t={t} />
      <Process t={t} />
      <Experience t={t} />
      <Cases t={t} />
      <Marketplace t={t} lang={lang} />
      <Contact t={t} />
      <Footer t={t} />
    </div>
  );
}

function Container({ children, className = "" }: any) {
  return <div className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>;
}
function Section({ id, className = "", children }: any) {
  return <section id={id} className={`scroll-mt-24 py-16 sm:py-24 ${className}`}>{children}</section>;
}

function TopNav({ t, lang, setLang }: any) {
  return (
    <header className="fixed top-0 z-50 w-full backdrop-blur supports-[backdrop-filter]:bg-white/70 border-b border-gray-100">
      <Container className="flex items-center justify-between h-16">
        <a href="#home" className="font-semibold tracking-tight text-gray-900">{t.brand}</a>
        <nav className="hidden md:flex items-center gap-6">
          {[{id:"home",label:t.nav.home},{id:"what",label:t.nav.what},{id:"why",label:t.nav.why},{id:"process",label:t.nav.process},{id:"experience",label:t.nav.experience},{id:"cases",label:t.nav.cases},{id:"marketplace",label:t.nav.marketplace},{id:"contact",label:t.nav.contact}].map((n:any)=>(
            <a key={n.id} href={`#${n.id}`} className="text-sm text-gray-700 hover:text-gray-900">{n.label}</a>
          ))}
          <div className="flex items-center gap-2">
            <button className={`btn ${lang==="ru"?"btn-primary":"btn-outline"}`} onClick={()=>setLang("ru")}>RU</button>
            <button className={`btn ${lang==="en"?"btn-primary":"btn-outline"}`} onClick={()=>setLang("en")}>EN</button>
          </div>
        </nav>
      </Container>
    </header>
  );
}

function Hero({ t }: any) {
  return (
    <Section id="home" className="pt-28 sm:pt-32 bg-gradient-to-b from-gray-50 to-white">
      <Container>
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <motion.h1 initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} transition={{duration:0.6}}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">{t.heroTitle}</motion.h1>
            <p className="mt-4 text-lg text-gray-700">{t.heroText}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href="#contact" className="btn btn-primary">{t.ctaConsult}</a>
              <a href={`tel:${CONTACT.phoneHref}`} className="btn btn-outline">{t.ctaCall}</a>
            </div>
            <ul className="mt-6 grid gap-3 text-sm text-gray-700">
              <li>• {t.bulletTiming}</li><li>• {t.bulletMoney}</li><li>• {t.bulletFull}</li>
            </ul>
          </div>
          <div>
            <figure className="relative aspect-[16/10] w-full rounded-3xl shadow-xl overflow-hidden">
              <img src={IMAGES.hero} alt="Mi-8" className="h-full w-full object-cover"/>
              <figcaption className="absolute bottom-0 left-0 right-0 bg-black/40 text-white text-xs p-2">Ми-8: финальная приёмка на площадке</figcaption>
            </figure>
          </div>
        </div>
      </Container>
    </Section>
  );
}

function WhatWeDo({ t }: any) {
  return (
    <Section id="what">
      <Container>
        <div className="max-w-3xl">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">{t.whatTitle}</h2>
          <p className="mt-3 text-gray-700">{t.whatText}</p>
        </div>
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {t.whatItems.map((it: any) => (
            <div key={it.title} className="card">
              <div className="card-head">{it.title}</div>
              <div className="card-body">{it.text}</div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}

function WhyItMatters({ t }: any) {
  return (
    <Section id="why" className="bg-gray-50">
      <Container>
        <div className="max-w-3xl">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">{t.whyTitle}</h2>
          <p className="mt-3 text-gray-700">{t.whyLead}</p>
        </div>
        <div className="mt-8 grid md:grid-cols-3 gap-4">
          {t.whyStats.map((s: any) => (
            <div key={s.title} className="card"><div className="card-head">{s.title}</div><div className="card-body">{s.text}</div></div>
          ))}
        </div>
      </Container>
    </Section>
  );
}

function Process({ t }: any) {
  return (
    <Section id="process">
      <Container>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">{t.processTitle}</h2>
        <div className="mt-6 grid md:grid-cols-2 gap-4">
          {t.steps.map((step: any, i: number) => (
            <div key={step.title} className="card">
              <div className="card-head">{i+1}. {step.title}</div>
              <div className="card-body">{step.text}</div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}

function Experience({ t }: any) {
  return (
    <Section id="experience" className="bg-gray-50">
      <Container>
        <div className="max-w-3xl">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">{t.expTitle}</h2>
          <ul className="mt-4 grid gap-3 text-gray-800">{t.expFacts.map((f: string) => <li key={f}>• {f}</li>)}</ul>
        </div>
      </Container>
    </Section>
  );
}

function Cases({ t }: any) {
  return (
    <Section id="cases">
      <Container>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">{t.casesTitle}</h2>
        <div className="mt-8 grid md:grid-cols-2 gap-4">
          {t.cases.map((c: any) => (
            <div key={c.title} className="card"><div className="card-head">{c.title}</div><div className="card-body">{c.text}</div></div>
          ))}
        </div>
      </Container>
    </Section>
  );
}

function Marketplace({ t, lang }: any) {
  const [items, setItems] = useState<any[]>([]);
  const [usedLocale, setUsedLocale] = useState<"ru" | "en">(lang);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        setLoading(true);
        const { data, usedLocale } = await fetchWithFallback(lang);
        if (!cancelled) {
          setItems(data);
          setUsedLocale(usedLocale);
        }
      } catch (e) {
        console.error(e);
        if (!cancelled) {
          setItems([]);
          setUsedLocale(lang);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, [lang]);

  return (
    <Section id="marketplace" className="bg-gray-50">
      <Container>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">{t.marketTitle}</h2>
        <p className="mt-2 text-gray-700">{t.marketLead}</p>

        {loading && <p className="mt-6 text-gray-500">Загрузка…</p>}

        {!loading && items.length === 0 && (
          <p className="mt-6 text-gray-600">
            {usedLocale === "ru" ? "Пока нет опубликованных вертолётов." : "No published helicopters yet."}
          </p>
        )}

        <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((h: any) => {
            const a = h.attributes || {};
            const photo = a.photos?.data?.[0]?.attributes?.url;
            const name = a.name;
            const year = a.year ?? "—";
            const rawPrice = typeof a.price === "number" ? a.price : a.price ? Number(a.price) : undefined;
            const price = typeof rawPrice === "number"
              ? `$${rawPrice.toLocaleString("en-US")}`
              : usedLocale === "ru" ? "Цена по запросу" : "Price on request";
            const status =
              a.status === "sold"
                ? usedLocale === "ru" ? "Продан" : "Sold"
                : usedLocale === "ru" ? "Продаётся" : "For sale";

            return (
              <div key={h.id} className="card overflow-hidden">
                <div className="relative">
                  <img src={mediaUrl(photo)} alt={name} className="w-full h-44 object-cover" />
                  <span className={`absolute top-2 right-2 rounded-full px-3 py-1 text-xs font-semibold ${
                    a.status === "sold" ? "bg-red-600 text-white" : "bg-green-600 text-white"
                  }`}>
                    {status}
                  </span>
                </div>
                <div className="card-head flex items-center justify-between">
                  <span>{name} • {year}</span>
                  <span className="text-sm font-normal text-gray-600">{price}</span>
                </div>
                {a.location && (
                  <div className="card-body pt-0">
                    <p className="text-gray-600">
                      {usedLocale === "ru" ? "Локация: " : "Location: "}{a.location}
                    </p>
                  </div>
                )}
                <div className="card-body">
                  <a href="#contact" className="btn btn-primary mt-2">{t.marketCTA}</a>
                </div>
              </div>
            );
          })}
        </div>

        {items.length > 0 && usedLocale !== lang && (
          <p className="mt-6 text-xs text-gray-500">
            {lang === "ru" ? "Пока нет русской версии карточек — показаны английские." : "Russian version not available yet — showing English."}
          </p>
        )}
      </Container>
    </Section>
  );
}

function Contact({ t }: any) {
  const [name, setName] = useState(""); const [phone, setPhone] = useState(""); const [message, setMessage] = useState("");
  const mailtoHref = useMemo(()=>{
    const subject = encodeURIComponent("Заявка с сайта: Ми-8 / Mi-8");
    const body = encodeURIComponent(`Имя/Name: ${name}\nТелефон/Phone: ${phone}\nСообщение/Message: ${message}`);
    return `mailto:${CONTACT.email}?subject=${subject}&body=${body}`;
  }, [name, phone, message]);
  return (
    <Section id="contact" className="bg-gray-900 text-white">
      <Container>
        <div className="grid lg:grid-cols-2 gap-8 items-start">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">{t.contactTitle}</h2>
            <p className="mt-3 text-gray-300">{t.contactLead}</p>
            <div className="mt-6 space-y-2 text-gray-100">
              <a className="flex items-center gap-2" href={`tel:${CONTACT.phoneHref}`}>{CONTACT.phoneDisplay}</a>
              <a className="flex items-center gap-2" href={`https://t.me/${CONTACT.telegram}`} target="_blank">{"@" + CONTACT.telegram}</a>
              <a className="flex items-center gap-2" href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
            </div>
          </div>
          <div className="card bg-white text-gray-900">
            <div className="card-head">Форма заявки / Inquiry form</div>
            <div className="card-body">
              <form className="space-y-3" onSubmit={(e)=>e.preventDefault()}>
                <div><label className="text-sm text-gray-700">Имя / Name</label><input className="w-full border rounded-xl px-3 py-2" value={name} onChange={e=>setName(e.target.value)} placeholder="Ваше имя / Your name" /></div>
                <div><label className="text-sm text-gray-700">Телефон / Phone</label><input className="w-full border rounded-xl px-3 py-2" value={phone} onChange={e=>setPhone(e.target.value)} placeholder="+7 / +971 / +1" /></div>
                <div><label className="text-sm text-gray-700">Сообщение / Message</label><textarea className="w-full border rounded-xl px-3 py-2" rows={4} value={message} onChange={e=>setMessage(e.target.value)} placeholder="Кратко опишите задачу / Describe your mission" /></div>
                <div className="flex gap-3 pt-2">
                  <a className="btn btn-primary" href={mailtoHref}>Отправить на почту</a>
                  <a className="btn btn-outline" href={`https://t.me/${CONTACT.telegram}`} target="_blank">Написать в Telegram</a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}

function Footer({ t }: any) {
  return (
    <footer className="border-t border-gray-100">
      <Container className="py-8 text-sm text-gray-600 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p>© {new Date().getFullYear()} {t.footer}</p>
        <div className="flex items-center gap-4">
          <a href={`tel:${CONTACT.phoneHref}`} className="flex items-center gap-1">{CONTACT.phoneDisplay}</a>
          <a href={`mailto:${CONTACT.email}`} className="flex items-center gap-1">Mail</a>
          <a href={`https://t.me/${CONTACT.telegram}`} className="flex items-center gap-1">Telegram</a>
        </div>
      </Container>
    </footer>
  );
}
