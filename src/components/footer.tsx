"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { cdn } from "@/lib/cdn";
import { Reveal } from "./reveal";

function TelegramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="m20.5 4-3 16.2-8.2-3.3M20.5 4 3.5 10.7l5.8 2.2M20.5 4 9.3 12.9l-.06 4.2" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className} aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5.5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function PhoneIcon({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} style={style} aria-hidden="true">
      <path d="M4 3.5h3.2l1.3 3.8-2 1.6a10.5 10.5 0 0 0 4.6 4.6l1.6-2 3.8 1.3V16a1.5 1.5 0 0 1-1.5 1.5C8.6 17.5 2.5 11.4 2.5 5a1.5 1.5 0 0 1 1.5-1.5Z" />
    </svg>
  );
}

function MailIcon({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} style={style} aria-hidden="true">
      <rect x="2.5" y="4.5" width="15" height="11" rx="2" />
      <path d="m3.5 5.5 6.5 5 6.5-5" />
    </svg>
  );
}

function PinIcon({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} style={style} aria-hidden="true">
      <path d="M10 17.5S16 12.6 16 8a6 6 0 1 0-12 0c0 4.6 6 9.5 6 9.5Z" />
      <circle cx="10" cy="8" r="2.2" />
    </svg>
  );
}

const PHONE_NUMBERS = [
  { href: "tel:+998905296555", label: "+998 90 529 65 55" },
  { href: "tel:+998905290555", label: "+998 90 529 05 55" },
];

export function Footer() {
  const year = new Date().getFullYear();
  const t = useTranslations();
  const [callTarget, setCallTarget] = useState<{ href: string; label: string } | null>(null);

  const QUICK_LINKS = [
    { label: t("nav.home"), href: "/#top" },
    { label: t("nav.features"), href: "/#classrooms" },
    { label: t("nav.about"), href: "/#about" },
    { label: t("nav.contact"), href: "/#contact" },
  ];

  const GROUPS_LINKS = [
    { label: t("groups.schedule"), href: "/jadval" },
    { label: t("groups.meals"), href: "/taomlar" },
    { label: t("groups.teacher"), href: "/tarbiyachi" },
    { label: t("groups.education"), href: "/talim-yonalishi" },
    { label: t("groups.teachers"), href: "/oqituvchilar" },
  ];

  return (
    <>
    <footer
      id="contact"
      className="border-t border-[var(--color-border)]"
      style={{
        backgroundColor: "var(--color-surface)",
      }}
    >
      <div className="mx-auto max-w-[1120px] px-4 py-14 sm:py-16">
        <Reveal direction="up" className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1.1fr] lg:gap-8">
          <div>
            <a href="/#top" className="flex items-center gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element -- statik brend rasmi */}
              <img src={cdn("/homepage/logo.png")} alt="Vista Academy" className="h-12 w-12 object-contain" />
              {/* eslint-disable-next-line @next/next/no-img-element -- statik brend rasmi */}
              <img src={cdn("/homepage/logo-name.png")} alt="Vista Academy" className="h-8 w-auto object-contain" />
            </a>
            <p className="mt-4 max-w-[320px] text-[14px] leading-relaxed text-[var(--color-text-muted)]">
              {t("footer.description")}
            </p>
            <div className="mt-5 flex items-center gap-3">
              <a
                href="https://t.me/vistaoriginal"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Telegram"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-border)] text-[var(--color-text-muted)] transition-colors hover:border-[var(--color-blue)] hover:text-[var(--color-blue)]"
              >
                <TelegramIcon className="h-5 w-5" />
              </a>
              <a
                href="https://www.instagram.com/vista_academy_uz?stkn=MTE3Zmt4ajdwcTg3bQ%3D%3D&utm_source=qr"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-border)] text-[var(--color-text-muted)] transition-colors hover:border-[var(--color-blue)] hover:text-[var(--color-blue)]"
              >
                <InstagramIcon className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <p className="font-heading text-[15px] font-bold text-[var(--color-text)]">{t("footer.pagesHeading")}</p>
            <ul className="mt-4 flex flex-col gap-2.5">
              {QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-[14px] font-medium text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-text)]"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-heading text-[15px] font-bold text-[var(--color-text)]">{t("footer.groupsHeading")}</p>
            <ul className="mt-4 flex flex-col gap-2.5">
              {GROUPS_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-[14px] font-medium text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-text)]"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-heading text-[15px] font-bold text-[var(--color-text)]">{t("footer.contactHeading")}</p>
            <ul className="mt-4 flex flex-col gap-3">
              <li>
                <a
                  href="https://maps.app.goo.gl/p4671sbeFZbTn2KN7?g_st=com.olcorporation.olai.Share"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-2.5 text-[14px] text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-text)]"
                >
                  <PinIcon className="mt-0.5 h-4 w-4 shrink-0" style={{ color: "var(--color-blue)" }} />
                  {t("footer.address")}
                </a>
              </li>
              {PHONE_NUMBERS.map((phone) => (
                <li key={phone.href}>
                  <a
                    href={phone.href}
                    onClick={(e) => {
                      e.preventDefault();
                      setCallTarget(phone);
                    }}
                    className="flex items-center gap-2.5 text-[14px] text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-text)]"
                  >
                    <PhoneIcon className="h-4 w-4 shrink-0" style={{ color: "var(--color-blue)" }} />
                    {phone.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="mailto:info@vista-academy.uz"
                  className="flex items-center gap-2.5 text-[14px] text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-text)]"
                >
                  <MailIcon className="h-4 w-4 shrink-0" style={{ color: "var(--color-blue)" }} />
                  info@vista-academy.uz
                </a>
              </li>
            </ul>
            <a
              href="/ariza"
              className="mt-5 inline-flex rounded-full px-5 py-2.5 text-[14px] font-bold text-white shadow-[var(--shadow-cta)] transition-transform duration-150 hover:scale-[1.03]"
              style={{ background: "linear-gradient(135deg, var(--color-green) 0%, var(--color-green-dark) 100%)" }}
            >
              {t("common.cta")}
            </a>
          </div>
        </Reveal>
      </div>

      <div className="border-t border-[var(--color-border)]">
        <div className="mx-auto flex max-w-[1120px] flex-col items-center justify-between gap-2 px-4 py-5 text-center sm:flex-row sm:text-left">
          <p className="text-[13px] text-[var(--color-text-muted)]">{t("footer.copyright", { year })}</p>
          <p className="text-[13px] text-[var(--color-text-muted)]">{t("footer.tagline")}</p>
        </div>
      </div>
    </footer>
    {callTarget && (
      <CallConfirmModal phone={callTarget} onCancel={() => setCallTarget(null)} onConfirm={() => setCallTarget(null)} />
    )}
    </>
  );
}

function CallConfirmModal({
  phone,
  onCancel,
  onConfirm,
}: {
  phone: { href: string; label: string };
  onCancel: () => void;
  onConfirm: () => void;
}) {
  const t = useTranslations();

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCancel();
    };
    document.addEventListener("keydown", onKeyDown);
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = overflow;
    };
  }, [onCancel]);

  return (
    <div
      role="presentation"
      onClick={onCancel}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[rgba(31,41,55,0.45)] p-4 backdrop-blur-sm"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={t("footer.callConfirmTitle")}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-[360px] rounded-[var(--radius-xl)] bg-[var(--color-bg)] p-6 text-center shadow-[var(--shadow-raised)]"
      >
        <div
          className="mx-auto flex h-12 w-12 items-center justify-center rounded-full"
          style={{ background: "var(--color-tint-cream)", color: "var(--color-blue)" }}
        >
          <PhoneIcon className="h-5 w-5" />
        </div>
        <p className="font-heading mt-4 text-[16px] font-bold text-[var(--color-text)]">{t("footer.callConfirmTitle")}</p>
        <p className="mt-2 text-[14px] leading-relaxed text-[var(--color-text-muted)]">
          {t("footer.callConfirmMessage", { phone: phone.label })}
        </p>
        <div className="mt-5 flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 whitespace-nowrap rounded-full border border-[var(--color-border)] px-4 py-2.5 text-[14px] font-bold text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-text)]"
          >
            {t("footer.callConfirmCancel")}
          </button>
          <a
            href={phone.href}
            onClick={onConfirm}
            className="flex-1 whitespace-nowrap rounded-full px-4 py-2.5 text-center text-[14px] font-bold text-white shadow-[var(--shadow-cta)] transition-transform duration-150 hover:scale-[1.03]"
            style={{ background: "linear-gradient(135deg, var(--color-green) 0%, var(--color-green-dark) 100%)" }}
          >
            {t("footer.callConfirmConfirm")}
          </a>
        </div>
      </div>
    </div>
  );
}
