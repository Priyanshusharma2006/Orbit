import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
dotenv.config();

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function generateContent(prompt, systemInstruction = null) {
  try {
    const config = {
      systemInstruction: systemInstruction || "You are an expert tutor. Provide accurate, structured, and helpful responses.",
      temperature: 0.7,
    };
    
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: config
    });
    
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    throw error;
  }
}

export async function generateStructuredContent(prompt, schema) {
  try {
    const config = {
      responseMimeType: "application/json",
      responseSchema: schema,
      temperature: 0.1,
    };
    
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: config
    });
    
    return JSON.parse(response.text);
  } catch (error) {
    console.error("Gemini Structured Error:", error);
    throw error;
  }
}
