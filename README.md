# Vista Academy — landing sahifa

Bu — Vista Academy bog'chasining ommaviy lending sahifasi (marketing sayti).
Ilgari `bogcha-saas` monorepo ichida `apps/landing-web` bo'lib turgan, endi
alohida loyiha sifatida ajratildi.

Barcha kontent (o'qituvchilar, guruhlar, jadval, arizalar) bu saytda
saqlanmaydi — u `bogcha-saas` loyihasidagi bog'cha admin panelidan
boshqariladi va shu yerga faqat ochiq REST API orqali (`NEXT_PUBLIC_API_URL`)
keladi. Ya'ni matn/rasm/ma'lumotni o'zgartirish uchun admin panelga kirish
kerak, bu sayt faqat uni ko'rsatadi.

## Ishga tushirish

```bash
npm install
cp .env.example .env.local   # NEXT_PUBLIC_API_URL ni to'g'ri manzilga o'zgartiring
npx next dev -p 3102
```

## Muhit o'zgaruvchilari

| Nomi | Nima uchun |
|---|---|
| `NEXT_PUBLIC_API_URL` | bog'cha admin panelining backend API manzili (`.../api/v1`) |
| `NEXT_PUBLIC_CDN_URL` | rasm/media fayllar uchun CDN (Cloudflare R2) manzili |
