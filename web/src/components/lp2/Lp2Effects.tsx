"use client";

import { useEffect } from "react";

/**
 * Интерактив LP v2 (перенос скриптов из исходного пакета): шапка при скролле,
 * мобильное меню, reveal-анимации, аккордеон FAQ, лайтбокс галереи и
 * «Рассчитать» в карточке товара → подстановка в select + скролл к форме.
 * Всё ищется внутри .lp2 — на другие страницы не влияет.
 */
export function Lp2Effects() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>(".lp2");
    if (!root) return;
    const cleanups: (() => void)[] = [];

    // шапка при скролле
    const header = root.querySelector<HTMLElement>("header");
    if (header) {
      const onScroll = () =>
        header.classList.toggle("scrolled", window.scrollY > 10);
      window.addEventListener("scroll", onScroll, { passive: true });
      onScroll();
      cleanups.push(() => window.removeEventListener("scroll", onScroll));
    }

    // мобильное меню
    const menu = root.querySelector<HTMLElement>(".mobile-menu");
    const burger = root.querySelector<HTMLElement>(".burger");
    const closeMenu = root.querySelector<HTMLElement>(".close-menu");
    if (menu && burger && closeMenu) {
      const open = () => menu.classList.add("open");
      const close = () => menu.classList.remove("open");
      burger.addEventListener("click", open);
      closeMenu.addEventListener("click", close);
      const links = Array.from(menu.querySelectorAll("a"));
      links.forEach((a) => a.addEventListener("click", close));
      cleanups.push(() => {
        burger.removeEventListener("click", open);
        closeMenu.removeEventListener("click", close);
        links.forEach((a) => a.removeEventListener("click", close));
      });
    }

    // reveal
    const io = new IntersectionObserver(
      (es) =>
        es.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.12 },
    );
    root.querySelectorAll(".reveal").forEach((el) => io.observe(el));
    cleanups.push(() => io.disconnect());

    // FAQ-аккордеон
    root.querySelectorAll<HTMLButtonElement>(".faq-q").forEach((btn) => {
      const onClick = () => {
        const item = btn.parentElement as HTMLElement;
        const a = item.querySelector<HTMLElement>(".faq-a");
        if (!a) return;
        const wasOpen = item.classList.contains("open");
        root.querySelectorAll<HTMLElement>(".faq-item.open").forEach((i) => {
          i.classList.remove("open");
          const ia = i.querySelector<HTMLElement>(".faq-a");
          if (ia) ia.style.maxHeight = "";
        });
        if (!wasOpen) {
          item.classList.add("open");
          a.style.maxHeight = a.scrollHeight + "px";
        }
      };
      btn.addEventListener("click", onClick);
      cleanups.push(() => btn.removeEventListener("click", onClick));
    });

    // лайтбокс
    const lb = root.querySelector<HTMLElement>(".lightbox");
    const lbImg = lb?.querySelector<HTMLImageElement>("img");
    if (lb && lbImg) {
      root.querySelectorAll<HTMLElement>(".g-item").forEach((g) => {
        const onClick = () => {
          const img = g.querySelector<HTMLImageElement>("img");
          if (!img) return;
          lbImg.src = img.src;
          lb.classList.add("open");
        };
        g.addEventListener("click", onClick);
        cleanups.push(() => g.removeEventListener("click", onClick));
      });
      const close = () => lb.classList.remove("open");
      lb.addEventListener("click", close);
      cleanups.push(() => lb.removeEventListener("click", close));
    }

    // вне рабочих часов (Пн–Сб 9–18 МСК) звонок уходит в никуда — 16.08 видели
    // в Вебвизоре, как клиент из Севастополя в 20:25 нажал «Позвонить» и пропал.
    // Вечером и в воскресенье кнопка звонка в нижней панели становится WhatsApp.
    const bar = root.querySelector<HTMLElement>(".mobile-bar");
    const callBtn = bar?.querySelector<HTMLAnchorElement>('a[href^="tel:"]');
    const waHref = bar?.dataset.wa;
    if (callBtn && waHref) {
      const msk = new Date(
        new Date().toLocaleString("en-US", { timeZone: "Europe/Moscow" }),
      );
      const closed =
        msk.getDay() === 0 || msk.getHours() < 9 || msk.getHours() >= 18;
      if (closed) {
        callBtn.textContent = "WhatsApp — ответим утром";
        callBtn.setAttribute("href", waHref);
        callBtn.setAttribute("target", "_blank");
        callBtn.setAttribute("rel", "noopener noreferrer");
      }
    }

    // видео-демо: играет только на экране (экономим трафик мобильных)
    const video = root.querySelector<HTMLVideoElement>("video[data-autoplay]");
    if (video) {
      const vio = new IntersectionObserver(
        (es) =>
          es.forEach((e) => {
            if (e.isIntersecting) video.play().catch(() => {});
            else video.pause();
          }),
        { threshold: 0.35 },
      );
      vio.observe(video);
      cleanups.push(() => vio.disconnect());
    }

    // «Рассчитать» в карточке товара
    root.querySelectorAll<HTMLElement>(".product .link").forEach((l) => {
      const onClick = () => {
        const sel = root.querySelector<HTMLSelectElement>(
          "#leadForm select[name=product]",
        );
        const product = l.dataset.product || "";
        if (sel) {
          const opt = Array.from(sel.options).find((o) => o.text === product);
          if (opt) sel.value = opt.value;
        }
        root
          .querySelector("#order")
          ?.scrollIntoView({ behavior: "smooth" });
      };
      l.addEventListener("click", onClick);
      cleanups.push(() => l.removeEventListener("click", onClick));
    });

    return () => cleanups.forEach((fn) => fn());
  }, []);

  return null;
}
