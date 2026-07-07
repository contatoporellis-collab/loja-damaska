"use client";

import Script from "next/script";
import { useEffect } from "react";
import { YM_ID, captureUtm, reachGoal } from "@/lib/analytics";

/**
 * Яндекс.Метрика + автоматические цели по кликам (делегирование на document,
 * чтобы не превращать серверные компоненты в клиентские).
 *   tel:    → call_click
 *   wa.me   → whatsapp_click
 *   max.ru  → max_click
 *   [data-goal="…"] на ссылке — явная цель (напр. catalog_request).
 * Цель form_submit шлётся из LeadForm при успешной отправке.
 */
export function Analytics() {
  useEffect(() => {
    captureUtm();
  }, []);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      const target = e.target as HTMLElement | null;
      const a = target?.closest?.("a");
      if (!a) return;
      const explicit = a.getAttribute("data-goal");
      if (explicit) {
        reachGoal(explicit);
        return;
      }
      const href = a.getAttribute("href") || "";
      if (href.startsWith("tel:")) reachGoal("call_click");
      else if (href.includes("wa.me")) reachGoal("whatsapp_click");
      else if (href.includes("max.ru")) reachGoal("max_click");
    }
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  {
    /* TODO [PREENCHER]: скрипт подмены номера (call tracking — Callibri /
       Calltouch). Вставить сюда <Script src="…" strategy="afterInteractive" />.
       Номер телефона централизован в src/lib/site.ts → contacts.phone/phoneHref,
       чтобы сервис подмены менял его в одном месте. */
  }

  if (!YM_ID) return null;

  return (
    <>
      <Script id="ym-counter" strategy="afterInteractive">{`
(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};m[i].l=1*new Date();for(var j=0;j<document.scripts.length;j++){if(document.scripts[j].src===r){return;}}k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})(window,document,'script','https://mc.yandex.ru/metrika/tag.js','ym');
ym(${YM_ID},'init',{clickmap:true,trackLinks:true,accurateTrackBounce:true,webvisor:true});
      `}</Script>
      <noscript>
        {/* Пиксель Метрики для посетителей без JS — здесь next/image неуместен */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`https://mc.yandex.ru/watch/${YM_ID}`}
          style={{ position: "absolute", left: "-9999px" }}
          alt=""
        />
      </noscript>
    </>
  );
}
