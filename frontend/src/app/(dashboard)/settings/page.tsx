"use client";

import { useState } from "react";
import { useTheme } from "@/context/ThemeContext";
import { useLanguage } from "@/context/LanguageContext";
import { Toggle, useToast, ui as s } from "@/components/ui/ui";

export default function GeneralSettings() {
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage } = useLanguage();
  const [units, setUnits] = useState<"metric" | "imperial">("metric");
  const [currency, setCurrency] = useState("EUR");
  const [analytics, setAnalytics] = useState(true);
  const [personalised, setPersonalised] = useState(true);
  const [toast, show] = useToast();

  return (
    <div className={s.stack}>
      <section className={s.card}>
        <h2 className={s.cardTitle}>Appearance & language</h2>
        <p className={s.cardSub}>Changes apply instantly across the whole app.</p>

        <div className={s.settingRow}>
          <div>
            <div className={s.settingTitle}>Theme</div>
            <div className={s.settingDesc}>Currently using the {theme} theme.</div>
          </div>
          <div className={s.row}>
            {(["dark", "light"] as const).map((m) => (
              <button
                key={m}
                className={`${s.chip} ${theme === m ? s.chipActive : ""}`}
                onClick={() => { if (theme !== m) { toggleTheme(); show(`Switched to ${m} theme`); } }}
                aria-pressed={theme === m}
              >
                {m === "dark" ? "Dark" : "Light"}
              </button>
            ))}
          </div>
        </div>

        <div className={s.settingRow}>
          <div>
            <div className={s.settingTitle}>Language</div>
            <div className={s.settingDesc}>Interface language.</div>
          </div>
          <div className={s.row}>
            {([["en", "English"], ["fr", "Français"]] as const).map(([k, label]) => (
              <button key={k} className={`${s.chip} ${language === k ? s.chipActive : ""}`} onClick={() => { setLanguage(k); show("Language updated"); }} aria-pressed={language === k}>
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className={s.settingRow}>
          <div>
            <div className={s.settingTitle}>Units</div>
            <div className={s.settingDesc}>For measurements and temperature.</div>
          </div>
          <div className={s.row}>
            {([["metric", "Metric"], ["imperial", "Imperial"]] as const).map(([k, label]) => (
              <button key={k} className={`${s.chip} ${units === k ? s.chipActive : ""}`} onClick={() => setUnits(k)} aria-pressed={units === k}>{label}</button>
            ))}
          </div>
        </div>

        <div className={s.settingRow}>
          <div>
            <div className={s.settingTitle}>Currency</div>
            <div className={s.settingDesc}>Used for cost-per-wear and prices.</div>
          </div>
          <select className={s.select} style={{ width: 160 }} value={currency} onChange={(e) => setCurrency(e.target.value)} aria-label="Currency">
            <option value="EUR">EUR — €</option>
            <option value="USD">USD — $</option>
            <option value="GBP">GBP — £</option>
            <option value="INR">INR — ₹</option>
          </select>
        </div>
      </section>

      <section className={s.card}>
        <h2 className={s.cardTitle}>Privacy</h2>
        <p className={s.cardSub}>You decide what the stylist learns.</p>
        <div className={s.settingRow}>
          <div>
            <div className={s.settingTitle}>Personalised recommendations</div>
            <div className={s.settingDesc}>Use wear history and ratings to tailor looks.</div>
          </div>
          <Toggle checked={personalised} onChange={setPersonalised} label="Personalised recommendations" />
        </div>
        <div className={s.settingRow}>
          <div>
            <div className={s.settingTitle}>Product analytics</div>
            <div className={s.settingDesc}>Anonymous usage data that helps us improve.</div>
          </div>
          <Toggle checked={analytics} onChange={setAnalytics} label="Product analytics" />
        </div>
        <div style={{ marginTop: 24 }}>
          <button className={s.btn} onClick={() => show("Settings saved")}>Save changes</button>
        </div>
      </section>
      {toast}
    </div>
  );
}
