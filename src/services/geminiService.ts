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
- Mụn và viêm da
- Lỗ chân lông
- Tăng sắc tố và nám
- Hàng rào bảo vệ da
- Sức khỏe da thẩm mỹ

Nhiệm vụ của bạn là phân tích ảnh khuôn mặt người dùng và tạo báo cáo phân tích da chi tiết, dễ hiểu và mang tính tư vấn.
Ngôn ngữ sử dụng: tiếng Việt, thân thiện, dễ hiểu.

Hãy phân tích hình ảnh da được cung cấp và trả về kết quả dưới dạng JSON theo cấu trúc sau:
{
  "overview": {
    "evenness": number (0-10),
    "brightness": number (0-10),
    "hydration": number (0-10),
    "surfaceQuality": number (0-10),
    "elasticity": number (0-10),
    "description": string
  },
  "skinType": {
    "type": "da_dau" | "da_kho" | "da_hon_hop" | "da_nhay_cam" | "da_binh_thuong",
    "confidence": number (0-1),
    "explanation": string
  },
  "healthScore": {
    "score": number (0-100),
    "explanation": string
  },
  "skinAge": {
    "age": number,
    "comparison": string,
    "explanation": string
  },
  "pigmentationAge": {
    "age": number,
    "comparison": string,
    "explanation": string
  },
  "agingAnalysis": {
    "eyeWrinkles": number (%),
    "cheekWrinkles": number (%),
    "foreheadWrinkles": number (%),
    "wrinkleDepth": "thap" | "trung_binh" | "cao",
    "description": string
  },
  "skinIssues": {
    "acne": number (0-10),
    "inflammatoryAcne": number (0-10),
    "largePores": number (0-10),
    "darkCircles": number (0-10),
    "dullness": number (0-10),
    "postAcneSpots": number (0-10),
    "aging": number (0-10),
    "pigmentation": number (0-10),
    "darkSpots": number (0-10),
    "melasma": number (0-10),
    "topIssues": string[] (3 issues)
  },
  "pigmentationAnalysis": {
    "melaninIndex": number (0-100),
    "density": number (0-10),
    "microPigmentationIndex": number (0-10),
    "unevenness": number (0-10),
    "microPigmentationExplanation": string
  },
  "pigmentationDistribution": {
    "forehead_left": number (0-100),
    "forehead_center": number (0-100),
    "forehead_right": number (0-100),
    "cheek_left": number (0-100),
    "cheek_right": number (0-100),
    "nose": number (0-100),
    "chin": number (0-100)
  },
  "pigmentationHeatmap": {
    "highestZones": string,
    "riskZones": string,
    "preMelasmaSigns": string,
    "explanation": string
  },
  "uvDamage": {
    "score": number (0-10),
    "signs": string[],
    "explanation": string
  },
  "skinBarrier": {
    "score": number (0-10),
    "moistureRetention": string,
    "sensitivity": string,
    "weaknessSigns": string
  },
  "melasmaRisk": {
    "score": number (0-100),
    "level": "thap" | "trung_binh" | "cao",
    "preMelasmaIndicators": string[],
    "probability": number (%)
  },
  "melasmaPrediction24Months": {
    "probability": number (0-100),
    "level": "thap" | "trung_binh" | "cao",
    "explanation": string
  },
  "skincareRecommendations": {
    "topical": {
      "morningRoutine": string,
      "nightRoutine": string,
      "suggestedActives": string[]
    },
    "internal": {
      "supplements": string[],
      "roles": string
    },
    "lifestyle": {
      "tips": string[]
    }
  },
  "aiConclusion": {
    "summary": string,
    "links": string,
    "futureRisks": string,
    "overallAdvice": string
  }
}

Lưu ý quan trọng:
- Nếu Micro-pigmentation index > 4: Lưu ý đây có thể là dấu hiệu sớm của tăng sắc tố hoặc tiền nám.
- Đặc biệt chú ý các vùng dễ hình thành nám: gò má, hai bên má, trán, sống mũi.
- Nếu micro-pigmentation index > 5 hoặc UV damage > 5: Tăng mức dự đoán nguy cơ nám trong tương lai.
- Kết luận cần nhấn mạnh dấu hiệu tăng sắc tố hoặc nguy cơ hình thành nám nếu các chỉ số liên quan cao.
- Giọng văn chuyên gia, thân thiện, không gây hoang mang, không đưa ra chẩn đoán y khoa tuyệt đối.

Hướng dẫn viết Kết luận Chuyên gia (aiConclusion) để đảm bảo tính LOGIC và CUỐN HÚT:
1. summary (Tổng quan hiện trạng): Viết như một lời nhận định sắc sảo về "câu chuyện" hiện tại của làn da. Dùng ngôn ngữ chuyên nghiệp nhưng giàu hình ảnh (ví dụ: "Làn da đang ở trạng thái báo động về sắc tố", "Nền da đang mất dần độ đàn hồi tự nhiên").
2. links (Mối liên hệ các chỉ số): Giải thích MỐI QUAN HỆ NHÂN QUẢ một cách logic. Phải kết nối được ít nhất 2-3 chỉ số với nhau. Ví dụ: "Sự sụt giảm độ ẩm (Hydration) kết hợp với hàng rào bảo vệ da yếu đã tạo điều kiện cho tia UV xâm nhập sâu hơn, kích thích sản sinh Melanin quá mức tại vùng gò má".
3. futureRisks (Dự báo rủi ro): Đưa ra dự báo cụ thể và có căn cứ. Nếu không can thiệp, các sắc tố ẩn sẽ trở thành nám mảng trong bao lâu, hoặc độ sâu nếp nhăn sẽ tiến triển thế nào.
4. overallAdvice (Lời khuyên tổng quát): Đưa ra một "triết lý" chăm sóc da phù hợp nhất lúc này (ví dụ: "Ưu tiên phục hồi trước khi đặc trị", "Tập trung tối đa vào việc bảo vệ và ức chế sắc tố từ gốc").
`;

  const response = await ai.models.generateContent({
    model,
    contents: [
      {
        parts: [
          { text: "Hãy phân tích hình ảnh da này theo đúng cấu trúc yêu cầu." },
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
              elasticity: { type: Type.NUMBER },
              description: { type: Type.STRING },
            },
            required: ["evenness", "brightness", "hydration", "surfaceQuality", "elasticity", "description"],
          },
          skinType: {
            type: Type.OBJECT,
            properties: {
              type: { type: Type.STRING },
              confidence: { type: Type.NUMBER },
              explanation: { type: Type.STRING },
            },
            required: ["type", "confidence", "explanation"],
          },
          healthScore: {
            type: Type.OBJECT,
            properties: {
              score: { type: Type.NUMBER },
              explanation: { type: Type.STRING },
            },
            required: ["score", "explanation"],
          },
          skinAge: {
            type: Type.OBJECT,
            properties: {
              age: { type: Type.NUMBER },
              comparison: { type: Type.STRING },
              explanation: { type: Type.STRING },
            },
            required: ["age", "comparison", "explanation"],
          },
          pigmentationAge: {
            type: Type.OBJECT,
            properties: {
              age: { type: Type.NUMBER },
              comparison: { type: Type.STRING },
              explanation: { type: Type.STRING },
            },
            required: ["age", "comparison", "explanation"],
          },
          agingAnalysis: {
            type: Type.OBJECT,
            properties: {
              eyeWrinkles: { type: Type.NUMBER },
              cheekWrinkles: { type: Type.NUMBER },
              foreheadWrinkles: { type: Type.NUMBER },
              wrinkleDepth: { type: Type.STRING },
              description: { type: Type.STRING },
            },
            required: ["eyeWrinkles", "cheekWrinkles", "foreheadWrinkles", "wrinkleDepth", "description"],
          },
          skinIssues: {
            type: Type.OBJECT,
            properties: {
              acne: { type: Type.NUMBER },
              inflammatoryAcne: { type: Type.NUMBER },
              largePores: { type: Type.NUMBER },
              darkCircles: { type: Type.NUMBER },
              dullness: { type: Type.NUMBER },
              postAcneSpots: { type: Type.NUMBER },
              aging: { type: Type.NUMBER },
              pigmentation: { type: Type.NUMBER },
              darkSpots: { type: Type.NUMBER },
              melasma: { type: Type.NUMBER },
              topIssues: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
              },
            },
            required: ["acne", "inflammatoryAcne", "largePores", "darkCircles", "dullness", "postAcneSpots", "aging", "pigmentation", "darkSpots", "melasma", "topIssues"],
          },
          pigmentationAnalysis: {
            type: Type.OBJECT,
            properties: {
              melaninIndex: { type: Type.NUMBER },
              density: { type: Type.NUMBER },
              microPigmentationIndex: { type: Type.NUMBER },
              unevenness: { type: Type.NUMBER },
              microPigmentationExplanation: { type: Type.STRING },
            },
            required: ["melaninIndex", "density", "microPigmentationIndex", "unevenness", "microPigmentationExplanation"],
          },
          pigmentationDistribution: {
            type: Type.OBJECT,
            properties: {
              forehead_left: { type: Type.NUMBER },
              forehead_center: { type: Type.NUMBER },
              forehead_right: { type: Type.NUMBER },
              cheek_left: { type: Type.NUMBER },
              cheek_right: { type: Type.NUMBER },
              nose: { type: Type.NUMBER },
              chin: { type: Type.NUMBER },
            },
            required: ["forehead_left", "forehead_center", "forehead_right", "cheek_left", "cheek_right", "nose", "chin"],
          },
          pigmentationHeatmap: {
            type: Type.OBJECT,
            properties: {
              highestZones: { type: Type.STRING },
              riskZones: { type: Type.STRING },
              preMelasmaSigns: { type: Type.STRING },
              explanation: { type: Type.STRING },
            },
            required: ["highestZones", "riskZones", "preMelasmaSigns", "explanation"],
          },
          uvDamage: {
            type: Type.OBJECT,
            properties: {
              score: { type: Type.NUMBER },
              signs: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
              },
              explanation: { type: Type.STRING },
            },
            required: ["score", "signs", "explanation"],
          },
          skinBarrier: {
            type: Type.OBJECT,
            properties: {
              score: { type: Type.NUMBER },
              moistureRetention: { type: Type.STRING },
              sensitivity: { type: Type.STRING },
              weaknessSigns: { type: Type.STRING },
            },
            required: ["score", "moistureRetention", "sensitivity", "weaknessSigns"],
          },
          melasmaRisk: {
            type: Type.OBJECT,
            properties: {
              score: { type: Type.NUMBER },
              level: { type: Type.STRING },
              preMelasmaIndicators: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
              },
              probability: { type: Type.NUMBER },
            },
            required: ["score", "level", "preMelasmaIndicators", "probability"],
          },
          melasmaPrediction24Months: {
            type: Type.OBJECT,
            properties: {
              probability: { type: Type.NUMBER },
              level: { type: Type.STRING },
              explanation: { type: Type.STRING },
            },
            required: ["probability", "level", "explanation"],
          },
          skincareRecommendations: {
            type: Type.OBJECT,
            properties: {
              topical: {
                type: Type.OBJECT,
                properties: {
                  morningRoutine: { type: Type.STRING },
                  nightRoutine: { type: Type.STRING },
                  suggestedActives: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                  },
                },
                required: ["morningRoutine", "nightRoutine", "suggestedActives"],
              },
              internal: {
                type: Type.OBJECT,
                properties: {
                  supplements: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                  },
                  roles: { type: Type.STRING },
                },
                required: ["supplements", "roles"],
              },
              lifestyle: {
                type: Type.OBJECT,
                properties: {
                  tips: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                  },
                },
                required: ["tips"],
              },
            },
            required: ["topical", "internal", "lifestyle"],
          },
          aiConclusion: {
            type: Type.OBJECT,
            properties: {
              summary: { type: Type.STRING },
              links: { type: Type.STRING },
              futureRisks: { type: Type.STRING },
              overallAdvice: { type: Type.STRING },
            },
            required: ["summary", "links", "futureRisks", "overallAdvice"],
          },
        },
        required: [
          "overview",
          "skinType",
          "healthScore",
          "skinAge",
          "pigmentationAge",
          "agingAnalysis",
          "skinIssues",
          "pigmentationAnalysis",
          "pigmentationDistribution",
          "pigmentationHeatmap",
          "uvDamage",
          "skinBarrier",
          "melasmaRisk",
          "melasmaPrediction24Months",
          "skincareRecommendations",
          "aiConclusion",
        ],
      },
    },
  });

  const result = JSON.parse(response.text || "{}");
  
  return {
    ...result,
    timestamp: new Date().toLocaleString('vi-VN'),
    // Compatibility fields for UI
    score: result.healthScore.score,
    detailedConclusion: `
### Tóm tắt tình trạng da
${result.aiConclusion.summary}

### Mối liên hệ các chỉ số
${result.aiConclusion.links}

### Nguy cơ tương lai
${result.aiConclusion.futureRisks}

### Lời khuyên tổng thể
${result.aiConclusion.overallAdvice}
    `
  };
};
