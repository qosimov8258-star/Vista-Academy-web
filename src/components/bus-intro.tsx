"use client";

import { useCallback, useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { cdn } from "@/lib/cdn";

const STORAGE_KEY = "vista-intro-seen";
// Animatsiya juda sekin yuklansa yoki xabar yetib kelmasa ham sayt abadiy
// to'silib qolmasin uchun zaxira vaqt (animatsiyaning o'z ichidagi finishIntro
// chaqiruvlaridan ancha uzoqroq).
const FALLBACK_MS = 25000;
// Animatsiya ichidagi belgini bosish shart ekanligi ko'rinib turmasligi mumkin
// (foydalanuvchi 25 soniyalik zaxira tugagunicha butun sayt — shu jumladan
// admin panelda yuklangan rasmlar — ko'rinmaydi deb o'ylashi mumkin), shuning
// uchun shu vaqtdan keyin har doim bosiladigan "o'tkazib yuborish" tugmasi chiqadi.
const SKIP_BUTTON_DELAY_MS = 2500;

export function BusIntro() {
  const t = useTranslations();
  const [visible, setVisible] = useState(false);
  const [closing, setClosing] = useState(false);
  const [showSkip, setShowSkip] = useState(false);

  useEffect(() => {
    try {
      if (sessionStorage.getItem(STORAGE_KEY)) return;
    } catch {}
    setVisible(true);
  }, []);

  const finish = useCallback(() => {
    setClosing(true);
    try {
      sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {}
    setTimeout(() => setVisible(false), 500);
  }, []);

  useEffect(() => {
    if (!visible) return;

    const handleMessage = (event: MessageEvent) => {
      if (event.data && event.data.type === "vista-intro-done") finish();
    };

    window.addEventListener("message", handleMessage);
    const fallback = setTimeout(finish, FALLBACK_MS);
    const skipTimer = setTimeout(() => setShowSkip(true), SKIP_BUTTON_DELAY_MS);
    return () => {
      window.removeEventListener("message", handleMessage);
      clearTimeout(fallback);
      clearTimeout(skipTimer);
    };
  }, [visible, finish]);

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] bg-[#fffdf7] transition-opacity duration-500"
      style={{ opacity: closing ? 0 : 1, pointerEvents: closing ? "none" : "auto" }}
    >
      <iframe
        src={cdn("/animatsiya/vista-academy-avtobus.html")}
        title={t("busIntro")}
        className="h-full w-full border-0"
        allow="autoplay"
      />
      {showSkip && (
        <button
          type="button"
          onClick={finish}
          className="absolute right-4 top-4 rounded-full border border-black/10 bg-white/90 px-4 py-2 text-[13px] font-bold text-[var(--color-text)] shadow-md backdrop-blur transition-colors hover:bg-white sm:right-6 sm:top-6"
        >
          {t("busIntroSkip")}
        </button>
      )}
    </div>
  );
}
