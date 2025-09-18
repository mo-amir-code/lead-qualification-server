import { GoogleGenAI } from "@google/genai";
import { ENV_VARS } from "./constants.js";

const ai = new GoogleGenAI({
  apiKey: ENV_VARS.GEMINI_API_KEY,
});

export { ai };