
import { GoogleGenAI } from "@google/genai";

export async function getMotivationalQuote(): Promise<string> {
  try {
    if (!process.env.API_KEY) {
      return "Keep up the great work! Your focus is your superpower.";
    }
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: "Generate a short, powerful, one-sentence motivational quote for a student who is in a deep focus session."
    });
    return response.text;
  } catch (error) {
    console.error("Error fetching motivational quote:", error);
    return "The secret of getting ahead is getting started. Keep going!";
  }
}
