# LemonClicker-Telegram

Clicker-Game als Telegram MiniApp inkl. Shop und Vercel Serverless Backend.

## Features

- Zitronen klicken – Upgrades, Premium kaufen
- Telegram WebApp-Erkennung und User-Login
- Shop für TON/Premium via Dummy (Vorlage für Payment mit TON/USD/Stars)
- Backend als Vercel Serverless Functions (`/api`)
- Fortschritt per Telegram User-ID gespeichert

## Deployment

1. **Repo auf Vercel deployen:**  
   Frontend: `/client`  
   Backend: `/api`  
   Routing und Build über `vercel.json`.

2. **Bot-Token mit Environment Variable:**  
   - Leg in Vercel eine Variable an:  
     Name: `TELEGRAM_BOT_TOKEN`  
     Wert: `8568507445:AAFddXfceFrODobeMVZLhwIlPuYRuV2pdWs`

3. **Telegram WebApp Integration:**  
   - WebApp-URL in [BotFather](https://core.telegram.org/bots/webapps) für deinen Bot hinterlegen.
   - Öffne Spiel nur über Telegram für Login und Shop.

## Payment-Integration (TODO)

- Aktuell Dummy-Kauf aller Premiumwährung.
- Für TON/Stars-Integration:  
  - [TON Connect JS](https://ton.org/docs/develop/web/ton-connect/)  
  - [Telegram Stars Webapps](https://core.telegram.org/stars/webapps)

## Sicherheit

- Backend speichert Userdaten aktuell im Speicher (Demo). Bitte für Produktion Datenbank einsetzen!
- Bot-Token niemals ins Repo pushen, sondern als Umgebungsvariable!

---

Fragen oder Wünsche? Melde dich!