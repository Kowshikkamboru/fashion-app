"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import Icon, { IconName } from "@/components/Icon";
import { Reveal, CountUp } from "@/components/Motion";
import { CAPABILITIES, CAPABILITY_GROUPS } from "@/content/capabilities";
import { HOME, PLANS } from "@/content/home";
import styles from "./page.module.css";

export default function Home() {
  const { t, language } = useLanguage();
  const { loginAsGuest, user, logout } = useAuth();
  const router = useRouter();
  const h = HOME[language === "fr" ? "fr" : "en"];

  const [occasion, setOccasion] = useState("cocktail");
  const [climate, setClimate] = useState("summer");
  const [scrolled, setScrolled] = useState(false);

  const [offerIdx, setOfferIdx] = useState(0);
  const [stepIdx, setStepIdx] = useState(0);
  const [stepsPaused, setStepsPaused] = useState(false);
  const [group, setGroup] = useState<string>("All");
  const [hovered, setHovered] = useState<string | null>(null);
  const [yearly, setYearly] = useState(false);
  const [quoteIdx, setQuoteIdx] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Auto-advance "how it works" until the visitor takes control
  useEffect(() => {
    if (stepsPaused) return;
    const id = setInterval(() => setStepIdx((i) => (i + 1) % h.how.steps.length), 5000);
    return () => clearInterval(id);
  }, [stepsPaused, h.how.steps.length]);

  // Testimonials rotate
  useEffect(() => {
    const id = setInterval(() => setQuoteIdx((i) => (i + 1) % h.proof.items.length), 7000);
    return () => clearInterval(id);
  }, [h.proof.items.length]);

  const offer = h.offer.items[offerIdx];
  const visibleCaps = useMemo(
    () => CAPABILITIES.filter((c) => group === "All" || c.group === group),
    [group]
  );
  const activeCap = CAPABILITIES.find((c) => c.label === hovered);

  const navItems = [
    { href: "#offer", label: t.nav.expertise },
    { href: "#story", label: t.nav.story },
    { href: "#how", label: language === "fr" ? "Méthode" : "How it works" },
    { href: "#pricing", label: language === "fr" ? "Tarifs" : "Pricing" },
  ];

  return (
    <main className={styles.main}>
      {/* Navigation */}
      <nav className={`${styles.nav} ${scrolled ? styles.navScrolled : ""}`}>
        <div className={styles.navContainer}>
          <div className={styles.logo}>
            VASTR<span className={styles.logoAccent}>IÉ</span>
          </div>
          <div className={styles.navLinks}>
            {navItems.map((n) => (
              <a key={n.href} href={n.href} className={styles.navLink}>{n.label}</a>
            ))}
          </div>
          <div className={`${styles.navActions} ${scrolled ? "" : styles.navActionsDark}`}>
            <ThemeSwitcher />
            <LanguageSwitcher />
            {user ? (
              <>
                <Link href="/dashboard" className={styles.navBtn}>
                  {language === "fr" ? "Tableau de Bord" : "Dashboard"}
                </Link>
                <button onClick={() => { logout(); router.push('/'); }} className={styles.navBtn}>
                  {language === "fr" ? "Déconnexion" : "Logout"}
                </button>
              </>
            ) : (
              <Link href="/auth" className={styles.navBtn}>
                {t.nav.enterAtelier}
              </Link>
            )}
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section
        className={styles.hero}
        style={{
          backgroundImage: "url(/images/editorial_hero_1791120796342.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center 20%",
        }}
      >
        <div className={styles.heroOverlay}></div>

        <div className={`container ${styles.heroContainer}`}>
          <div className={styles.heroContent}>
            <div className={`${styles.tagline} animate-fade-in`}>{t.hero.badge}</div>
            <h1 className={`${styles.title} animate-fade-in animate-delay-1`}>{t.hero.title}</h1>
            <p className={`${styles.description} animate-fade-in animate-delay-2`}>{t.hero.subtitle}</p>
            <div className={`${styles.heroCtas} animate-fade-in animate-delay-3`}>
              <Link href="/auth" className={styles.ctaPrimary}>{h.heroPrimary}</Link>
              <a href="#offer" className={styles.ctaGhost}>{h.heroSecondary} ↓</a>
            </div>
          </div>

          {/* Interactive Widget */}
          <div className={`${styles.heroWidget} animate-fade-in animate-delay-3`}>
            <div className={styles.widgetHeader}>
              <span className={styles.widgetDot}></span> {t.widget.badge}
            </div>
            <h3 className={styles.widgetTitle}>{t.widget.title}</h3>

            <div className={styles.inputGroup}>
              <label htmlFor="occasion">{t.widget.occasionLabel}</label>
              <select id="occasion" value={occasion} onChange={(e) => setOccasion(e.target.value)} className={styles.select}>
                <option value="cocktail">{t.widget.occasions.cocktail}</option>
                <option value="business">{t.widget.occasions.business}</option>
                <option value="casual">{t.widget.occasions.casual}</option>
              </select>
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="climate">{t.widget.climateLabel}</label>
              <select id="climate" value={climate} onChange={(e) => setClimate(e.target.value)} className={styles.select}>
                <option value="summer">{t.widget.climates.summer}</option>
                <option value="spring">{t.widget.climates.spring}</option>
                <option value="autumn">{t.widget.climates.autumn}</option>
              </select>
            </div>

            <Link href="/outfits" className={styles.widgetBtn}>
              {language === "fr" ? "Générer la Recommandation IA →" : "Generate AI Recommendation →"}
            </Link>
          </div>
        </div>
      </section>

      {/* Social proof / stats */}
      <section className={styles.statsBar} aria-label="Key figures">
        <div className="container">
          <div className={styles.statsGrid}>
            {h.stats.map((s: any) => (
              <Reveal key={s.label}>
                <div className={styles.stat}>
                  <div className={styles.statValue}>
                    <CountUp value={s.value} suffix={s.suffix} decimals={"decimals" in s ? s.decimals : 0} />
                  </div>
                  <div className={styles.statLabel}>{s.label}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* What we offer — interactive tabs */}
      <section id="offer" className={`section ${styles.offerSection}`}>
        <div className="container">
          <Reveal>
            <div className={styles.sectionHeaderCentered}>
              <h4 className={styles.sectionLabel}>{h.offer.label}</h4>
              <h2 className={styles.sectionTitleCentered}>{h.offer.title}</h2>
              <p className={styles.sectionSub}>{h.offer.sub}</p>
            </div>
          </Reveal>

          <div className={styles.offerGrid}>
            <div className={styles.offerTabs} role="tablist" aria-label={h.offer.label}>
              {h.offer.items.map((item: any, i: number) => (
                <button
                  key={item.id}
                  role="tab"
                  aria-selected={i === offerIdx}
                  id={`offer-tab-${item.id}`}
                  className={`${styles.offerTab} ${i === offerIdx ? styles.offerTabActive : ""}`}
                  onClick={() => setOfferIdx(i)}
                  onMouseEnter={() => setOfferIdx(i)}
                >
                  <span className={styles.offerTabNum}>0{i + 1}</span>
                  <span className={styles.offerTabName}>{item.tab}</span>
                  <Icon name="arrow" size={18} />
                </button>
              ))}
            </div>

            <div key={offer.id} className={styles.offerPanel} role="tabpanel">
              <div className={styles.offerImage} style={{ backgroundImage: `url(${offer.image})` }} />
              <div className={styles.offerBody}>
                <h3 className={styles.offerTitle}>{offer.title}</h3>
                <p className={styles.sectionText}>{offer.text}</p>
                <ul className={styles.offerList}>
                  {offer.bullets.map((b: any) => (
                    <li key={b}><Icon name="check" size={16} /> {b}</li>
                  ))}
                </ul>
                <Link href={offer.href} className={styles.linkBtn}>{offer.cta} →</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section id="story" className={styles.sectionSplit}>
        <div className={styles.splitImage} style={{ backgroundImage: "url(/images/story_image_1791120813277.jpg)", backgroundSize: "cover", backgroundPosition: "center" }} />
        <div className={styles.splitContent}>
          <h4 className={styles.sectionLabel}>{t.story.label}</h4>
          <h2 className={styles.sectionTitle}>{t.story.title}</h2>
          <p className={styles.sectionText}>{t.story.p1}</p>
          <p className={styles.sectionText}>{t.story.p2}</p>
          <div className={styles.values}>
            {(language === "fr"
              ? ["Retenue", "Savoir-faire", "Discrétion"]
              : ["Restraint", "Craft", "Discretion"]
            ).map((v) => (
              <span key={v} className={styles.valueChip}>{v}</span>
            ))}
          </div>
        </div>
      </section>

      {/* What you will get */}
      <section id="benefits" className={`section ${styles.benefitsSection}`}>
        <div className="container">
          <Reveal>
            <div className={styles.sectionHeaderCentered}>
              <h4 className={styles.sectionLabel}>{h.benefits.label}</h4>
              <h2 className={styles.sectionTitleCentered}>{h.benefits.title}</h2>
            </div>
          </Reveal>
          <div className={styles.benefitGrid}>
            {h.benefits.items.map((b: any, i: number) => (
              <Reveal key={b.title} delay={i * 70}>
                <article className={styles.benefitCard} tabIndex={0}>
                  <div className={styles.benefitIcon}><Icon name={b.icon as IconName} size={24} /></div>
                  <h3 className={styles.benefitTitle}>{b.title}</h3>
                  <p className={styles.benefitText}>{b.text}</p>
                  <div className={styles.benefitMetric}>{b.metric}</div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className={`section ${styles.howSection}`}>
        <div className="container">
          <Reveal>
            <div className={styles.sectionHeaderCentered}>
              <h4 className={styles.sectionLabel}>{h.how.label}</h4>
              <h2 className={styles.sectionTitleCentered}>{h.how.title}</h2>
            </div>
          </Reveal>
          <div className={styles.howGrid}>
            <ol className={styles.stepList}>
              {h.how.steps.map((s: any, i: number) => (
                <li key={s.n}>
                  <button
                    className={`${styles.stepBtn} ${i === stepIdx ? styles.stepActive : ""}`}
                    onClick={() => { setStepIdx(i); setStepsPaused(true); }}
                    aria-current={i === stepIdx}
                  >
                    <span className={styles.stepNum}>{s.n}</span>
                    <span className={styles.stepTitle}>{s.title}</span>
                  </button>
                </li>
              ))}
            </ol>
            <div className={styles.stepDetail} key={stepIdx}>
              <div className={styles.stepBig}>{h.how.steps[stepIdx].n}</div>
              <h3 className={styles.offerTitle}>{h.how.steps[stepIdx].title}</h3>
              <p className={styles.sectionText}>{h.how.steps[stepIdx].text}</p>
              <div className={styles.stepProgress}>
                <div className={styles.stepProgressBar} style={{ width: `${((stepIdx + 1) / h.how.steps.length) * 100}%` }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Who We Help */}
      <section id="who-we-help" className={styles.sectionSplitReverse}>
        <div className={styles.splitImage} style={{ backgroundImage: "url(/images/who_we_help_1791120827211.jpg)", backgroundSize: "cover", backgroundPosition: "center" }} />
        <div className={styles.splitContent}>
          <h4 className={styles.sectionLabel}>{t.clients.label}</h4>
          <h2 className={styles.sectionTitle}>{t.clients.title}</h2>
          <p className={styles.sectionText}>{t.clients.p1}</p>
          <p className={styles.sectionText}>{t.clients.p2}</p>
          <Link href="/auth" className={styles.linkBtn}>{t.clients.cta} &rarr;</Link>
        </div>
      </section>

      {/* Capabilities */}
      <section id="capabilities" className={`section ${styles.capabilitiesSection}`}>
        <div className="container">
          <Reveal>
            <div className={styles.sectionHeaderCentered}>
              <h4 className={styles.sectionLabel}>{h.capabilities.label}</h4>
              <h2 className={styles.sectionTitleCentered}>{h.capabilities.title}</h2>
              <p className={styles.sectionSub}>{h.capabilities.sub}</p>
            </div>
          </Reveal>

          <div className={styles.filterRow} role="tablist" aria-label="Filter capabilities">
            {CAPABILITY_GROUPS.map((g) => (
              <button
                key={g}
                role="tab"
                aria-selected={group === g}
                className={`${styles.filterChip} ${group === g ? styles.filterChipActive : ""}`}
                onClick={() => setGroup(g)}
              >
                {g}
              </button>
            ))}
          </div>

          <div className={styles.capPreview} aria-live="polite">
            {activeCap ? (
              <>
                <Icon name={activeCap.icon} size={18} />
                <strong>{activeCap.label}</strong>
                <span>— {activeCap.desc}</span>
              </>
            ) : (
              <span>{language === "fr" ? "Survolez une carte pour en savoir plus." : "Hover a card to learn more."}</span>
            )}
          </div>

          <div className={styles.capabilitiesGrid}>
            {visibleCaps.map((cap) => (
              <div
                key={cap.label}
                className={styles.capabilityPill}
                onMouseEnter={() => setHovered(cap.label)}
                onFocus={() => setHovered(cap.label)}
                onMouseLeave={() => setHovered(null)}
                onBlur={() => setHovered(null)}
                tabIndex={0}
              >
                <span className={styles.capabilityIcon}><Icon name={cap.icon} size={20} /></span>
                <span className={styles.capabilityText}>{cap.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing preview */}
      <section id="pricing" className={`section ${styles.pricingSection}`}>
        <div className="container">
          <Reveal>
            <div className={styles.sectionHeaderCentered}>
              <h4 className={styles.sectionLabel}>{h.pricing.label}</h4>
              <h2 className={styles.sectionTitleCentered}>{h.pricing.title}</h2>
            </div>
          </Reveal>

          <div className={styles.billingToggle} role="group" aria-label="Billing period">
            <button className={!yearly ? styles.billingActive : ""} onClick={() => setYearly(false)}>{h.pricing.monthly}</button>
            <button className={yearly ? styles.billingActive : ""} onClick={() => setYearly(true)}>
              {h.pricing.yearly} <em>{h.pricing.save}</em>
            </button>
          </div>

          <div className={styles.planGrid}>
            {PLANS.map((p: any) => (
              <article key={p.id} className={`${styles.planCard} ${"featured" in p ? styles.planFeatured : ""}`}>
                {"featured" in p && <span className={styles.planBadge}>{h.pricing.featured}</span>}
                <h3 className={styles.planName}>{p.name}</h3>
                <p className={styles.planTag}>{p.tagline}</p>
                <div className={styles.planPrice}>
                  €{yearly ? p.yearly : p.monthly}
                  <span>{yearly ? h.pricing.perYear : h.pricing.perMonth}</span>
                </div>
                <ul className={styles.planList}>
                  {p.features.map((f: any) => (
                    <li key={f}><Icon name="check" size={15} /> {f}</li>
                  ))}
                </ul>
                <Link href={`/checkout?plan=${p.id}&billing=${yearly ? "yearly" : "monthly"}`} className={styles.planBtn}>
                  {p.cta}
                </Link>
              </article>
            ))}
          </div>
          <div className={styles.centerLink}>
            <Link href="/pricing" className={styles.linkBtn}>{h.pricing.all} →</Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className={`section ${styles.proofSection}`}>
        <div className="container">
          <div className={styles.sectionHeaderCentered}>
            <h4 className={styles.sectionLabel}>{h.proof.label}</h4>
            <h2 className={styles.sectionTitleCentered}>{h.proof.title}</h2>
          </div>
          <div className={styles.quoteWrap}>
            <blockquote className={styles.quote} key={quoteIdx}>
              <p>“{h.proof.items[quoteIdx].quote}”</p>
              <footer>
                <strong>{h.proof.items[quoteIdx].name}</strong>
                <span>{h.proof.items[quoteIdx].role}</span>
              </footer>
            </blockquote>
            <div className={styles.quoteDots}>
              {h.proof.items.map((_: any, i: number) => (
                <button
                  key={i}
                  aria-label={`Testimonial ${i + 1}`}
                  className={`${styles.dot} ${i === quoteIdx ? styles.dotActive : ""}`}
                  onClick={() => setQuoteIdx(i)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className={`section ${styles.faqSection}`}>
        <div className={`container ${styles.faqInner}`}>
          <div className={styles.sectionHeaderCentered}>
            <h4 className={styles.sectionLabel}>{h.faq.label}</h4>
            <h2 className={styles.sectionTitleCentered}>{h.faq.title}</h2>
          </div>
          <div className={styles.faqList}>
            {h.faq.items.map((f: any, i: number) => {
              const open = openFaq === i;
              return (
                <div key={f.q} className={`${styles.faqItem} ${open ? styles.faqOpen : ""}`}>
                  <button
                    className={styles.faqQ}
                    aria-expanded={open}
                    onClick={() => setOpenFaq(open ? null : i)}
                  >
                    {f.q}
                    <span className={styles.faqIcon}><Icon name="plus" size={18} /></span>
                  </button>
                  <div className={styles.faqA} style={{ gridTemplateRows: open ? "1fr" : "0fr" }}>
                    <p>{f.a}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className={styles.finalCta}>
        <div className="container">
          <h2 className={styles.finalTitle}>{h.cta.title}</h2>
          <p className={styles.finalText}>{h.cta.text}</p>
          <div className={styles.finalButtons}>
            <Link href="/auth" className={styles.ctaPrimary}>{h.cta.primary}</Link>
            <Link
              href="/dashboard"
              className={styles.ctaGhost}
              onClick={() => loginAsGuest()}
            >
              {h.cta.secondary}
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className="container">
          <div className={styles.footerGrid}>
            <div>
              <div className={styles.footerLogo}>VASTRIÉ</div>
              <p className={styles.footerText}>{h.footer.tag}</p>
            </div>
            {h.footer.cols.map((col: any) => (
              <div key={col.title}>
                <div className={styles.footerTitle}>{col.title}</div>
                <ul className={styles.footerLinks}>
                  {col.links.map(([label, href]: any) => (
                    <li key={label}>
                      {href.startsWith("#") ? <a href={href}>{label}</a> : <Link href={href}>{label}</Link>}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className={styles.footerCopy}>{t.footer.copyright}</p>
        </div>
      </footer>
    </main>
  );
}
