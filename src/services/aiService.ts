import { GoogleGenAI, Type } from "@google/genai";
import { AISummaryResult } from "../types";

// Initialize the Gemini API
// Note: In a real app, we'd handle the missing key more gracefully in the UI
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

export const generateSignalSummary = async (content: string, context: string): Promise<AISummaryResult> => {
  if (!process.env.GEMINI_API_KEY) {
    // Fallback for when no API key is present (dev mode without key)
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          summary: "AI Summary unavailable (Missing API Key). This is a simulated summary of the content.",
          actionItems: ["Check API Key configuration", "Review original message"],
          sentiment: "neutral"
        });
      }, 1000);
    });
  }

  try {
    const prompt = `
      You are an intelligent executive assistant. 
      Analyze the following inbound signal content and provide:
      1. A succinct summary.
      2. A list of action items for the user.
      3. The overall sentiment/urgency.
      4. A "suggested task" that you can perform on behalf of the user. 
         - This should be the most impactful next step (e.g., drafting a reply, creating a calendar invite, or updating a document).
         - Provide a title for the task, a brief description, and a full "preview" of the content (e.g., the full text of a draft email).
      
      Context/Title: ${context}
      
      Content:
      "${content}"
      
      Return the response in JSON format.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            summary: { type: Type.STRING, description: "A 1-2 sentence summary of the signal." },
            actionItems: { 
              type: Type.ARRAY, 
              items: { type: Type.STRING },
              description: "List of specific tasks or actions required from the user."
            },
            sentiment: { 
              type: Type.STRING, 
              enum: ["positive", "neutral", "negative", "urgent"],
              description: "The detected sentiment or urgency level."
            },
            suggestedTask: {
              type: Type.OBJECT,
              properties: {
                type: { 
                  type: Type.STRING, 
                  enum: ["email_draft", "doc_edit", "calendar_invite", "general_reply"],
                  description: "The type of task suggested."
                },
                title: { type: Type.STRING, description: "Short title for the task (e.g., 'Draft Reply')." },
                description: { type: Type.STRING, description: "Brief explanation of what this task accomplishes." },
                preview: { type: Type.STRING, description: "The actual content of the task (e.g., the email body or invite details)." }
              },
              required: ["type", "title", "description", "preview"]
            }
          },
          required: ["summary", "actionItems", "sentiment", "suggestedTask"]
        }
      }
    });

    const text = response.text;
    if (!text) {
      throw new Error("No response from AI");
    }

    return JSON.parse(text) as AISummaryResult;

  } catch (error) {
    console.error("Error generating summary:", error);
    return {
      summary: "Failed to generate AI summary.",
      actionItems: [],
      sentiment: "neutral"
    };
  }
};
