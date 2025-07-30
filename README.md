# Grammatrix

### 💬 The Discord bot that keeps the chat fluent — English only.
### [➕ Invite Grammatrix](https://discord.com/oauth2/authorize?client_id=1373053820367671469&permissions=274877982720&scope=applications.commands%20bot)  
### [🛠 Join Support Server](https://discord.gg/DFFdYTYmGw)

---

> [!CAUTION]  
> **Grammatrix is still learning.**  
> If you get muted unfairly, blame the devs — not the bot. But seriously, join the support server if you have ideas or issues. We love feedback. ❤️

---

## 🌐 Features

### 🧠 Smart Language Detection
- Uses [Google’s Compact Language Detector](https://github.com/CLD2Owners/cld2) **CLD2**
- Detects message language and responds in the user's own tongue (just before telling them off)

### 🛡️ Moderation Engine
- Enforces **English-only** communication
- Supports **language whitelisting** (for exceptions)
- Automatically warns users after X non-English messages (`default: 0 allowed`)
- Escalates warnings: `warning → final warning → timeout` (no auto-kick)
- **Timeout duration** is customizable (`default: 30 minutes`)
- Tracks and resets infractions after **24 hours of good behavior**
- Full moderation logs with `/modlog set`

### 🧩 Flexible Configuration
- Monitor specific channels or categories
- Exclude keywords, tags, or specific phrases (slang, ticket systems, etc.)
- Ignore messages from whitelisted roles or channels
- Role-based command permissions

### 🎨 Custom Responses
- Personalize bot button responses via `/buttons`
- Customize moderation reply style and tone
- Clean, formatted mod messages for better clarity

---

## 🤖 About Grammatrix

Grammatrix was born to serve servers like **Global Lounge**, where **English-only** rules need more than just polite reminders.

Originally based on **Liofa-Bot** by [TheFacelessOne](https://github.com/TheFacelessOne), Grammatrix is now a sarcasm-enabled, logic-upgraded, and moderation-optimized bot actively maintained by **Mahito**.

---

## 🔧 What’s New (2025)
- 🚦 **Warning escalation system** (no more slap-on-the-wrist moderation)
- 🔁 **Per-user infraction reset** after 24 hours of chill behavior
- 🧹 **Cleaner error handling** and formatted bot replies
- 🔍 **Rewritten language detection logic** for better accuracy
- 🎛️ **UX and mod flow improvements** across all commands

---

## 🧪 Upcoming Features

> ⚙️ *Note: These features are planned but development will be gradual — Mahito is busy keeping life balanced with bot dev. Expect slow but steady progress.*

### 🥇 Most-Needed Features First

1. **Custom Language Rules per Channel**  
   → Allow specific languages in designated channels (e.g., `#support-arabic`, `#spanish-lounge`)  
   → Still enforce English elsewhere.

2. **Multilingual Auto-Translation (Optional)**  
   → Instead of just deleting, auto-translate the message to English and show both versions with a warning:  
   _“Translation: ‘Can I speak Arabic?’ → Sorry, English only here.”_

3. **User Self-Appeal System**  
   → Let users appeal a warning using `/appeal` or a button.  
   → Moderators can approve, reset, or deny directly.

4. **Adaptive Warning Cooldown**  
   → The bot tracks violator frequency and scales timeout duration automatically.

5. **Status Rotation / Presence Updates**  
   → Rotating activity like:  
     - `Watching 🇬🇧 grammar crimes`  
     - `Listening to broken English`  
     - `Moderating Global Lounge`  

6. **Language Fun Facts / Auto-Replies**  
   → Triggered warnings will be paired with trivia or sarcastic fun facts:  
   _“Fun fact: 67% of the internet is in English. Try joining them 😏”_

7. **Mod Analytics Panel (`/modstats`)**  
   → View:
     - Most flagged users
     - Current infraction trends
     - Language breakdowns
     - Top moderators by action

8. **Message Scoring System**  
   → Score messages from 0–100 for “English-likeness”  
   → Borderline messages receive soft warnings instead of full penalties.

9. **Context-Aware Bypass System**  
   → Messages like “Bonjour, can someone help me in English?” will bypass moderation if most of it is English.

10. **Upgrade from CLD2 → CLD3**  
    → A future switch to Google’s newer Compact Language Detector (CLD3) for improved accuracy and stability.

---

## 🏅 Credits
- **Original Creator:** [TheFacelessOne](https://github.com/TheFacelessOne)  
- **Lead Developer & Maintainer (2025):** Mahito

---

## 📄 License
This project is licensed under the [MIT License](LICENSE).  
Forked from Liofa-Bot with full attribution. All modifications and rebranding are documented.

---

> 💡 *Grammatrix doesn’t speak your language. On purpose.*
