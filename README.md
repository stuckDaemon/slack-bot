### **README.md**

# Slack Birthday & Work Anniversary Bot 🎉  

This bot automatically sends messages to a Slack channel when:  
- An employee has a **birthday** today 🎂  
- An employee is celebrating their **work anniversary** 🎉  

It also fetches a **professional-looking Happy Birthday GIF** using the Giphy API.  

---

## 🚀 Features
✅ Sends automated messages to a Slack channel.  
✅ Checks for birthdays and work anniversaries every day at **9 AM**.  
✅ Fetches **high-quality birthday GIFs** from Giphy.  
✅ Runs automatically without requiring manual execution.  

---

## 🛠️ Installation & Setup

### 1️⃣ **Clone the Repository**
```sh
git clone https://github.com/your-repo/slack-birthday-bot.git
cd slack-birthday-bot
```

### 2️⃣ **Install Dependencies**
```sh
yarn install
```

### 3️⃣ **Create a `.env` File**
Inside the project folder, create a `.env` file and add the following environment variables:

```sh
SLACK_TOKEN=xoxb-your-slack-bot-token
GIPHY_API_KEY=your-giphy-api-key
SLACK_CHANNEL_ID=your-slack-channel-id
```

- **SLACK_TOKEN** → Your Slack bot token (`xoxb-...`)
- **GIPHY_API_KEY** → Your Giphy API key
- **SLACK_CHANNEL_ID** → The Slack channel ID where messages should be sent

---

## ▶️ Running the Bot

To start the bot manually:
```sh
yarn ts-node bot.ts
```

The bot will:
- **Immediately check birthdays and anniversaries** upon startup.
- **Schedule itself to run at 9 AM daily** to send messages.

---

## 🔄 Running the Bot Continuously (PM2)

To keep the bot running in the background:
```sh
yarn global add pm2
pm2 start bot.ts --interpreter=ts-node
pm2 save
pm2 startup
```

Check logs:
```sh
pm2 logs bot
```

Stop the bot:
```sh
pm2 stop bot
```

---

## 📦 Deployment Options

### **1️⃣ Run on a Cloud Server (VPS)**
Deploy it on a server (e.g., AWS, DigitalOcean, Vultr) and use `pm2` to keep it running.

### **2️⃣ Run on a Serverless Function**
Convert it into an AWS Lambda or Google Cloud Function with a scheduled trigger.

### **3️⃣ Run on a Local Machine**
Keep the script running in the background on your machine.

---

## 🛠️ Troubleshooting

**Bot is not sending messages?**
- Check if the bot has `chat:write` permissions in Slack.
- Ensure the `.env` file has the correct tokens.
- Verify the channel ID is correct (`SLACK_CHANNEL_ID`).

**GIFs are not loading?**
- Make sure your **Giphy API key** is valid.
- Giphy API may be rate-limiting requests—try again later.

---

## 📌 Next Steps
✅ Fetch GIFs based on user preferences.  
✅ Expand database to use a proper backend.  
✅ Allow custom message templates.

---

## 🏆 Author
**[gab]**  
Feel free to contribute, improve, or fork this project! 🚀
```

