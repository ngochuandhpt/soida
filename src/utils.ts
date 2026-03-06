import { SkinAnalysisResult } from './types';

export const generateMockAnalysis = (): SkinAnalysisResult => {
  return {
    overview: {
      evenness: 8,
      brightness: 7,
      hydration: 8,
      surfaceQuality: 9,
      elasticity: 8,
      description: "Làn da có độ đàn hồi tốt và bề mặt mịn màng."
    },
    skinType: {
      type: 'da_hon_hop',
      confidence: 0.92,
      explanation: "Vùng chữ T có dấu hiệu tiết dầu nhẹ trong khi hai bên má bình thường."
    },
    healthScore: {
      score: 85,
      explanation: "Da khỏe mạnh, cần duy trì quy trình chăm sóc hiện tại."
    },
    skinAge: {
      age: 28,
      comparison: "Trẻ hơn tuổi thật",
      explanation: "Các dấu hiệu lão hóa chưa xuất hiện rõ rệt."
    },
    pigmentationAge: {
      age: 30,
      comparison: "Tương đương tuổi thật",
      explanation: "Sắc tố da ổn định."
    },
    agingAnalysis: {
      eyeWrinkles: 5,
      cheekWrinkles: 2,
      foreheadWrinkles: 3,
      wrinkleDepth: 'thap',
      description: "Nếp nhăn mờ, chủ yếu là nếp nhăn cảm xúc."
    },
    skinIssues: {
      acne: 2,
      inflammatoryAcne: 1,
      largePores: 4,
      darkCircles: 3,
      dullness: 2,
      postAcneSpots: 3,
      aging: 2,
      pigmentation: 3,
      darkSpots: 2,
      melasma: 1,
      topIssues: ["Lỗ chân lông", "Thâm sau mụn", "Quầng thâm"]
    },
    pigmentationAnalysis: {
      melaninIndex: 35,
      density: 3,
      microPigmentationIndex: 2,
      unevenness: 3,
      microPigmentationExplanation: "Sắc tố vi điểm ở mức thấp, chưa có dấu hiệu tích tụ melanin sâu."
    },
    pigmentationDistribution: {
      forehead_left: 20,
      forehead_center: 25,
      forehead_right: 20,
      cheek_left: 35,
      cheek_right: 35,
      nose: 40,
      chin: 30
    },
    pigmentationHeatmap: {
      highestZones: "Gò má",
      riskZones: "Hai bên má",
      preMelasmaSigns: "Không rõ rệt",
      explanation: "Sắc tố tập trung nhẹ ở vùng gò má do tiếp xúc ánh nắng."
    },
    uvDamage: {
      score: 3,
      signs: ["Sạm nhẹ"],
      explanation: "Tổn thương UV ở mức thấp nhưng cần duy trì chống nắng."
    },
    skinBarrier: {
      score: 8,
      moistureRetention: "Tốt",
      sensitivity: "Thấp",
      weaknessSigns: "Không có"
    },
    melasmaRisk: {
      score: 20,
      level: 'thap',
      preMelasmaIndicators: ["Sắc tố lan tỏa nhẹ"],
      probability: 15
    },
    melasmaPrediction24Months: {
      probability: 25,
      level: 'thap',
      explanation: "Nguy cơ thấp nếu duy trì bảo vệ da tốt."
    },
    skincareRecommendations: {
      topical: {
        morningRoutine: "Sữa rửa mặt -> Vitamin C -> Kem dưỡng -> Chống nắng",
        nightRoutine: "Tẩy trang -> Sữa rửa mặt -> Retinol -> Kem dưỡng phục hồi",
        suggestedActives: ["Vitamin C", "Retinol", "Niacinamide"]
      },
      internal: {
        supplements: ["Collagen", "Vitamin C"],
        roles: "Hỗ trợ sáng da và chống lão hóa"
      },
      lifestyle: {
        tips: ["Ngủ đủ giấc", "Uống 2L nước mỗi ngày"]
      }
    },
    aiConclusion: {
      summary: "Da hỗn hợp thiên dầu nhẹ, tình trạng chung rất tốt.",
      links: "Độ ẩm tốt giúp hàng rào bảo vệ da vững chắc.",
      futureRisks: "Nguy cơ lão hóa thấp trong 2 năm tới.",
      overallAdvice: "Tiếp tục quy trình hiện tại và chú ý chống nắng kỹ."
    },
    timestamp: new Date().toLocaleString('vi-VN'),
    score: 85,
    detailedConclusion: "Da của bạn đang ở trạng thái khá tốt."
  };
};
