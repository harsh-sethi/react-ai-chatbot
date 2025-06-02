import OpenAI from "openai";
import { Assistant as OpenAIAssistant } from "./openai";

console.log("Loaded API Key:", import.meta.env.VITE_OPEN_AI_API_KEY);

const openai = new OpenAI({
  baseURL: "https://api.deepseek.com",
  apiKey: import.meta.env.VITE_DEEPSEEK_AI_API_KEY,
  dangerouslyAllowBrowser: true,
});

export class Assistant extends OpenAIAssistant {
  constructor(model = "deepseek-chat", client = openai) {
    super(model, client);
  }
}