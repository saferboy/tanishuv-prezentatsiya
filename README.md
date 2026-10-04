# Tanishuv prezentatsiyasi

Saparboyev Muxtor — dasturlash darsi uchun tanishuv slaydlari (11 ta slayd, o'zbek tilida).

**Jonli sayt:** https://muxtor-tanishuv.netlify.app

## Tuzilishi

| Yo'l | Nima |
|---|---|
| `dist/` | Netlify'ga joylashtiriladigan tayyor statik sayt |
| `dist/project/deck.json` | Slaydlar tartibi, sarlavha, shriftlar |
| `dist/project/slides/*.html` | Har bir slayd alohida fayl (spiker izohlari `<aside>` ichida) |
| `dist/artifact-type/` | Slayd dvigateli (app.js, app.css) |
| `dist/_blob/` | Rasmlar |
| `dist/_files.json` | Fayllar ro'yxati — dvigatel shu orqali slaydlarni topadi |
| `presentation.html` | Eski, bitta fayldagi variant |

## Deploy

```bash
npx netlify-cli deploy --prod --dir dist
```

## Slaydni o'zgartirish

1. `dist/project/slides/<id>.html` faylini tahrirlang
2. Fayllar ro'yxatini yangilang:

```bash
node tools/update-files-json.js
```

3. Qaytadan deploy qiling.
