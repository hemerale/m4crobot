# M4croBot

M4croBot è un bot Discord sviluppato per gestire il server ufficiale di [**m4croxx**](https://m4croxx.github.io).  
Il bot include funzionalità di benvenuto, moderazione automatica e comandi divertenti per la community.

> ⚠️ **Stato del progetto:** il bot è attualmente **offline** perché il server Discord è stato chiuso.

---

## ✨ Funzionalità

- ✅ Messaggi di benvenuto automatici (canale + DM)
- ✅ Assegnazione automatica di un ruolo ai nuovi membri
- ✅ Messaggio quando un utente esce dal server
- ✅ Comandi fun:
  - Suggerimenti casuali su cosa guardare
  - Reazione con 🍌 al comando `banana`
- ✅ Sistema di **moderazione automatica** (filtro parolacce / link sospetti)
- ✅ Impostazione dello stato personalizzato del bot

---

## 🛠️ Tecnologie Usate

Il progetto è stato sviluppato utilizzando le seguenti tecnologie:

- **Node.js** (>=18) – Runtime JavaScript per l’esecuzione del bot
- **Discord.js v14** – Libreria principale per l’interazione con le API di Discord
- **dotenv** – Caricamento della configurazione da file `.env`
- **Discord Developer Portal** – Utilizzato per la creazione e configurazione del bot

---

## 🚀 Setup

1. Installa le dipendenze:
   ```bash
   npm install
   ```
2. Copia `.env.example` in `.env` e compila i valori:
   ```bash
   cp .env.example .env
   ```
   - `DISCORD_TOKEN`: token del bot dal [Discord Developer Portal](https://discord.com/developers/applications)
   - `WELCOME_CHANNEL_ID`: ID del canale per i messaggi di benvenuto
   - `LEAVE_CHANNEL_ID`: ID del canale per gli annunci di uscita
   - `WELCOME_ROLE_NAME`: nome del ruolo assegnato ai nuovi membri (default `User`)
   - `EXEMPT_ROLE_IDS`: ID dei ruoli esenti dalla moderazione automatica, separati da virgola
3. Avvia il bot:
   ```bash
   npm start
   ```

Contenuti come i suggerimenti video e la lista delle parole filtrate si trovano in [config.js](config.js).

> ⚠️ Non committare mai il file `.env`: contiene il token del bot ed è già escluso tramite `.gitignore`.

---

## 📄 Licenza

Distribuito sotto licenza [Apache 2.0](LICENSE).
