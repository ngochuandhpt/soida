import { GoogleGenAI, Type } from "@google/genai";
import { SkinAnalysisResult } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export const analyzeSkin = async (base64Image: string): Promise<SkinAnalysisResult> => {
  const model = "gemini-3-flash-preview";

  const systemInstruction = `
Bạn là một chuyên gia phân tích da liễu bằng AI với kiến thức chuyên sâu về:
- Cấu trúc da  
- Lão hóa da  
- Sắc tố da  
- Mụn và mụn viêm  
- Lỗ chân lông  
- Thâm nám  
- Đánh giá sức khỏe da thẩm mỹ  

Hãy phân tích hình ảnh da được cung cấp và trả về kết quả dưới dạng JSON theo cấu trúc sau:
{
  "overview": {
    "evenness": number (0-10),
    "brightness": number (0-10),
    "hydration": number (0-10),
    "surfaceQuality": number (0-10)
  },
  "skinType": string,
  "skinTypeConfidence": number (0-1),
  "score": number (0-100),
  "estimatedAge": number,
  "agingAnalysis": {
    "eyeWrinkles": number (%),
    "cheekWrinkles": number (%),
    "wrinkleDepth": "thap" | "trung_binh" | "cao"
  },
  "issues": {
    "overallAging": number (0-10),
    "acne": number (0-10),
    "redInflammation": number (0-10),
    "darkCircles": number (0-10),
    "largePores": number (0-10),
    "darkSpots": number (0-10)
  },
  "careSuggestions": {
    "morningRoutine": string,
    "nightRoutine": string,
    "suitableActives": string[],
    "notes": string
  },
  "detailedConclusion": string
}

Yêu cầu chi tiết cho "detailedConclusion":
- Đánh giá tổng quan chi tiết và DÀI HƠN, giải thích rõ ràng sự liên hệ giữa các chỉ số phát hiện được (như độ ẩm, độ đàn hồi, nếp nhăn, lỗ chân lông, quầng thâm, mụn, v.v.).
- Đưa ra kết luận khẳng định lại loại da của người dùng.
- Đưa ra lời khuyên tổng thể, giải thích tóm tắt vì sao lại khuyên như vậy dựa trên tình trạng da.
`;

  const response = await ai.models.generateContent({
    model,
    contents: [
      {
        parts: [
          { text: "Hãy phân tích hình ảnh da này." },
          {
            inlineData: {
              mimeType: "image/jpeg",
              data: base64Image.split(",")[1],
            },
          },
        ],
      },
    ],
    config: {
      systemInstruction,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          overview: {
            type: Type.OBJECT,
            properties: {
              evenness: { type: Type.NUMBER },
              brightness: { type: Type.NUMBER },
              hydration: { type: Type.NUMBER },
              surfaceQuality: { type: Type.NUMBER },
            },
            required: ["evenness", "brightness", "hydration", "surfaceQuality"],
          },
          skinType: { type: Type.STRING },
          skinTypeConfidence: { type: Type.NUMBER },
          score: { type: Type.NUMBER },
          estimatedAge: { type: Type.NUMBER },
          agingAnalysis: {
            type: Type.OBJECT,
            properties: {
              eyeWrinkles: { type: Type.NUMBER },
              cheekWrinkles: { type: Type.NUMBER },
              wrinkleDepth: { type: Type.STRING },
            },
            required: ["eyeWrinkles", "cheekWrinkles", "wrinkleDepth"],
          },
          issues: {
            type: Type.OBJECT,
            properties: {
              overallAging: { type: Type.NUMBER },
              acne: { type: Type.NUMBER },
              redInflammation: { type: Type.NUMBER },
              darkCircles: { type: Type.NUMBER },
              largePores: { type: Type.NUMBER },
              darkSpots: { type: Type.NUMBER },
            },
            required: ["overallAging", "acne", "redInflammation", "darkCircles", "largePores", "darkSpots"],
          },
          careSuggestions: {
            type: Type.OBJECT,
            properties: {
              morningRoutine: { type: Type.STRING },
              nightRoutine: { type: Type.STRING },
              suitableActives: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
              },
              notes: { type: Type.STRING },
            },
            required: ["morningRoutine", "nightRoutine", "suitableActives", "notes"],
          },
          detailedConclusion: { type: Type.STRING },
        },
        required: [
          "overview",
          "skinType",
          "skinTypeConfidence",
          "score",
          "estimatedAge",
          "agingAnalysis",
          "issues",
          "careSuggestions",
          "detailedConclusion",
        ],
      },
    },
  });

  const result = JSON.parse(response.text || "{}");
  
  return {
    ...result,
    timestamp: new Date().toLocaleString('vi-VN'),
    // Map to legacy fields for backward compatibility if needed by components
    metrics: {
      acne: result.issues.acne * 10,
      wrinkles: result.issues.overallAging * 10,
      pores: result.issues.largePores * 10,
      pigmentation: result.issues.darkSpots * 10,
      hydration: result.overview.hydration * 10,
    },
    recommendations: [
      result.careSuggestions.morningRoutine,
      result.careSuggestions.nightRoutine,
      result.careSuggestions.notes
    ]
  };
};
