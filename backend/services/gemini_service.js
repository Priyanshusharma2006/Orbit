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

export const curriculumSchema = {
  type: "OBJECT",
  properties: {
    title: { type: "STRING", description: "A catchy title for the entire curriculum based on the document" },
    modules: {
      type: "ARRAY",
      description: "A logical sequence of 2-5 modules that break down the entire text into major sections.",
      items: {
        type: "OBJECT",
        properties: {
          title: { type: "STRING" },
          subtopics: {
            type: "ARRAY",
            description: "A logical sequence of 2-5 subtopics that break down this module into individual lessons.",
            items: {
              type: "OBJECT",
              properties: {
                title: { type: "STRING" },
                content: { type: "STRING", description: "The complete, detailed raw text content for this subtopic extracted from the document." }
              },
              required: ["title", "content"]
            }
          }
        },
        required: ["title", "subtopics"]
      }
    }
  },
  required: ["title", "modules"]
};

export const teachingBlocksSchema = {
  type: "OBJECT",
  properties: {
    blocks: {
      type: "ARRAY",
      description: "An array of teaching blocks (paragraphs, lists, insights, questions) that teach the subtopic content in an engaging, interactive way.",
      items: {
        type: "OBJECT",
        properties: {
          type: { type: "STRING", enum: ["paragraph", "formula", "insight", "list", "simulation", "question"] },
          content: { type: "STRING", description: "Used for paragraph or insight type blocks" },
          formula: { type: "STRING", description: "LaTeX formula (without $$), used for formula blocks" },
          explanation: { type: "STRING", description: "Explanation for a formula" },
          items: { type: "ARRAY", items: { type: "STRING" }, description: "Used for list type blocks" },
          html: { type: "STRING", description: "Interactive HTML/CSS/JS code, used for simulation blocks" },
          description: { type: "STRING", description: "Description of the simulation" },
          questionType: { type: "STRING", enum: ["mcq", "fill_in_blank"], description: "Used for question blocks" },
          question: { type: "STRING", description: "The question text" },
          options: { type: "ARRAY", items: { type: "STRING" }, description: "For mcq questions, array of 3-4 options" },
          correctIndex: { type: "INTEGER", description: "For mcq questions, the 0-based index of the correct option" },
          correctAnswer: { type: "STRING", description: "For fill_in_blank questions, the correct answer" },
          acceptedAnswers: { type: "ARRAY", items: { type: "STRING" }, description: "For fill_in_blank questions, array of accepted answers" },
          explanations: {
            type: "OBJECT",
            properties: {
              correct: { type: "STRING" },
              incorrect: { type: "ARRAY", items: { type: "STRING" } }
            },
            required: ["correct"]
          },
          hint: { type: "STRING", description: "A hint for the question" }
        },
        required: ["type"]
      }
    }
  },
  required: ["blocks"]
};
