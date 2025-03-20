import { WebClient } from "@slack/web-api";
import axios from "axios";
import { format, parseISO, isToday, differenceInYears } from "date-fns";
import schedule from "node-schedule";
import * as dotenv from "dotenv";

dotenv.config();

// Load environment variables
const SLACK_TOKEN = process.env.SLACK_TOKEN!;
const GIPHY_API_KEY = process.env.GIPHY_API_KEY!;
const CHANNEL_ID = process.env.SLACK_CHANNEL_ID!;

const slackClient = new WebClient(SLACK_TOKEN);

// Sample employee database (Replace with DB or API call)
const employees = [
    { name: "Alice", startDate: "2019-03-20", birthday: "1992-03-20" },
    { name: "Bob", startDate: "2020-06-15", birthday: "1988-06-15" },
];

// Fetch a professional-looking Happy Birthday GIF
async function getBirthdayGif(): Promise<string | null> {
    try {
        const response = await axios.get("https://api.giphy.com/v1/gifs/search", {
            params: {
                api_key: GIPHY_API_KEY,
                q: "happy birthday",
                rating: "g",
                limit: 5,
            },
        });

        const gifs = response.data.data;
        if (gifs.length > 0) {
            return gifs[Math.floor(Math.random() * gifs.length)].images.original.url;
        }
    } catch (error) {
        console.error("Error fetching GIF:", error);
    }
    return null;
}

// Check for work anniversaries and birthdays
async function checkEvents() {
    const today = format(new Date(), "yyyy-MM-dd");

    for (const employee of employees) {
        const { name, startDate, birthday } = employee;

        // Check work anniversary
        if (differenceInYears(new Date(), parseISO(startDate)) > 0 && isToday(parseISO(startDate))) {
            await sendMessage(
                `🎉 Today marks *${differenceInYears(new Date(), parseISO(startDate))} years* since ${name} joined! Congratulations!`
            );
        }

        // Check birthday
        if (isToday(parseISO(birthday))) {
            const gifUrl = await getBirthdayGif();
            await sendMessage(`🎂 Happy Birthday, *${name}*! 🥳`, gifUrl);
        }
    }
}

// Send message to Slack
async function sendMessage(text: string, gifUrl?: string) {
    try {
        await slackClient.chat.postMessage({
            channel: CHANNEL_ID,
            text,
            attachments: gifUrl ? [{ image_url: gifUrl, fallback: "Happy Birthday GIF" }] : undefined,
        });
        console.log("Message sent:", text);
    } catch (error) {
        console.error("Error sending message:", error);
    }
}

// Schedule the bot to run every day at 9 AM
schedule.scheduleJob("0 9 * * *", () => {
    console.log("Running daily check at 9 AM...");
    checkEvents();
});

// Initial run in case the script starts during the day
checkEvents();
