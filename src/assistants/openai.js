import OpenAI from "openai";

console.log("Loaded API Key:", import.meta.env.VITE_OPEN_AI_API_KEY);

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPEN_AI_API_KEY,
  dangerouslyAllowBrowser: true,
});

export class Assistant {
  #client
  #model;

  constructor(model = "gpt-4o-mini", client = openai) {
    this.#client = client;
    this.#model = model;
  }

  async chat(content, history) {
    try {
      const result = await this.#client.chat.completions.create({
        model: this.#model,
        messages: [...history, { content, role: "user" }],
      });

      return result.choices[0].message.content;
    } catch (error) {
      console.error("OpenAI API Error:", error);
      throw error;
    }
  }

  async *chatStream(content, history){
     try {
      const result = await this.#client.chat.completions.create({
        model: this.#model,
        messages: [...history, { content, role: "user" }],
        stream: true,
      });

      for await (const chunk of result){
        yield chunk.choices[0]?.delta?.content || "";
      }

      return result.choices[0].message.content;
    } catch (error) {
      console.error("OpenAI API Error:", error);
      throw this.#parseError(error);
    }
  }

  #parseError(error){
    return error;
  }
}