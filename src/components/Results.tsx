import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  CheckCircle2, 
  AlertCircle, 
  Droplets, 
  Zap, 
  Target, 
  Layers,
  ChevronRight,
  Download,
  Share2,
  Loader2,
  Sun,
  Moon,
  Info,
  Activity,
  User,
  Clock,
  ShieldCheck,
  Sparkles
} from 'lucide-react';
import { SkinAnalysisResult } from '../types';
import { 
  Radar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  ResponsiveContainer 
} from 'recharts';
import { toPng } from 'html-to-image';
import Markdown from 'react-markdown';
import { ConsultationPopup } from './ConsultationPopup';

interface ResultsProps {
  data: SkinAnalysisResult;
  onReset: () => void;
  onConsultation: (requested: boolean) => void;
}

export const Results: React.FC<ResultsProps> = ({ data, onReset, onConsultation }) => {
  const exportRef = useRef<HTMLDivElement>(null);
  const conclusionEndRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [showConsultation, setShowConsultation] = useState(false);
  const [hasShownConsultation, setHasShownConsultation] = useState(false);

  useEffect(() => {
    // Reset hasShownConsultation for every new scan result
    // If consultation was already requested for this specific result, don't show popup
    setHasShownConsultation(data.consultationRequested !== undefined);
  }, [data.timestamp, data.consultationRequested]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasShownConsultation) {
          // Small delay to ensure they've actually seen the end
          setTimeout(() => {
            // Re-check hasShownConsultation in case it changed during timeout
            setHasShownConsultation(prev => {
              if (!prev) {
                setShowConsultation(true);
                return true;
              }
              return prev;
            });
          }, 500);
        }
      },
      {
        root: null,
        threshold: 1.0,
      }
    );

    if (conclusionEndRef.current) {
      observer.observe(conclusionEndRef.current);
    }

    return () => {
      if (conclusionEndRef.current) {
        observer.unobserve(conclusionEndRef.current);
      }
    };
  }, [hasShownConsultation]);

  const handleDownload = async () => {
    if (!exportRef.current) return;
    
    setIsDownloading(true);
    try {
      const node = exportRef.current;
      
      const exportOnlyElements = node.querySelectorAll('.export-only');
      exportOnlyElements.forEach(el => {
        (el as HTMLElement).style.display = 'flex';
      });

      const dataUrl = await toPng(node, {
        cacheBust: true,
        backgroundColor: '#f8fafc',
        style: {
          padding: '40px',
        }
      });
      
      exportOnlyElements.forEach(el => {
        (el as HTMLElement).style.display = 'none';
      });

      const link = document.createElement('a');
      link.download = `SkinAnalysis-${data.timestamp.replace(/[/:\s]/g, '-')}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Download failed:', err);
      alert('Không thể tải ảnh xuống. Vui lòng thử lại.');
    } finally {
      setIsDownloading(false);
    }
  };

  const chartData = [
    { subject: 'Lão hóa', A: (10 - data.issues.overallAging) * 10, fullMark: 100 },
    { subject: 'Mụn', A: (10 - data.issues.acne) * 10, fullMark: 100 },
    { subject: 'Lỗ chân lông', A: (10 - data.issues.largePores) * 10, fullMark: 100 },
    { subject: 'Sắc tố', A: (10 - data.issues.darkSpots) * 10, fullMark: 100 },
    { subject: 'Độ ẩm', A: data.overview.hydration * 10, fullMark: 100 },
  ];

  return (
    <div className="pt-24 pb-20 px-4 max-w-6xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12 text-center"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 text-emerald-700 text-sm font-bold mb-4">
          <CheckCircle2 className="w-4 h-4" />
          Phân tích hoàn tất
        </div>
        <h2 className="text-4xl font-bold text-slate-900 mb-2">Báo cáo phân tích da AI</h2>
        <p className="text-slate-500">Thực hiện vào lúc {data.timestamp}</p>
      </motion.div>

      <div className="relative">
        <div ref={exportRef} className="flex flex-col gap-8 p-6 bg-slate-50 rounded-[3rem]">
          {/* Branding for Export */}
          <div className="hidden pointer-events-none export-only flex items-center justify-between mb-4 px-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center text-white font-black text-xl">S</div>
              <span className="text-2xl font-black text-slate-900 tracking-tighter">soida.vn</span>
            </div>
            <div className="text-right">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">AI Skin Analysis Report</p>
              <p className="text-sm font-bold text-emerald-600">{data.timestamp}</p>
            </div>
          </div>

          {/* Top Section: Score & Photo */}
          <div className="grid lg:grid-cols-3 gap-8">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-[2.5rem] p-8 shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col items-center justify-center text-center"
            >
              <div className="relative w-48 h-48 mb-6">
                <svg className="w-full h-full transform -rotate-90">
                  <circle cx="96" cy="96" r="88" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-slate-100" />
                  <motion.circle
                    cx="96" cy="96" r="88" stroke="currentColor" strokeWidth="12" fill="transparent"
                    strokeDasharray={552.92}
                    initial={{ strokeDashoffset: 552.92 }}
                    animate={{ strokeDashoffset: 552.92 - (552.92 * data.score) / 100 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="text-emerald-500"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-5xl font-black text-slate-900">{data.score}</span>
                  <span className="text-sm font-bold text-slate-400 uppercase tracking-wider">Điểm Sức Khỏe</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 w-full">
                <div className="bg-slate-50 p-4 rounded-2xl">
                  <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Loại da</p>
                  <p className="text-sm font-bold text-emerald-600">{data.skinType}</p>
                  <p className="text-[10px] text-slate-400">Độ tin cậy: {(data.skinTypeConfidence * 100).toFixed(0)}%</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-2xl">
                  <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Tuổi da</p>
                  <p className="text-sm font-bold text-emerald-600">{data.estimatedAge} tuổi</p>
                  <p className="text-[10px] text-slate-400">Ước tính AI</p>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="lg:col-span-2 bg-white rounded-[2.5rem] p-8 shadow-xl shadow-slate-200/50 border border-slate-100"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <Activity className="w-5 h-5 text-emerald-500" />
                  Tổng quan sức khỏe da
                </h3>
              </div>
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="h-56 bg-slate-50/50 rounded-3xl p-2">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="70%" data={chartData}>
                      <PolarGrid stroke="#cbd5e1" />
                      <PolarAngleAxis dataKey="subject" tick={{ fill: '#475569', fontSize: 10, fontWeight: 700 }} />
                      <Radar name="Skin" dataKey="A" stroke="#10b981" fill="#10b981" fillOpacity={0.2} />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <OverviewItem label="Độ đều màu" value={data.overview.evenness} />
                  <OverviewItem label="Độ sáng" value={data.overview.brightness} />
                  <OverviewItem label="Độ ẩm" value={data.overview.hydration} />
                  <OverviewItem label="Chất lượng bề mặt" value={data.overview.surfaceQuality} />
                </div>
              </div>
            </motion.div>
          </div>

          {/* Middle Section: Issues & Aging */}
          <div className="grid lg:grid-cols-3 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-2 bg-white rounded-[2.5rem] p-8 shadow-xl shadow-slate-200/50 border border-slate-100"
            >
              <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-rose-500" />
                Đánh giá các vấn đề da
              </h3>
              <div className="grid md:grid-cols-2 gap-x-10 gap-y-6">
                <IssueItem label="Lão hóa tổng thể" value={data.issues.overallAging} />
                <IssueItem label="Mụn" value={data.issues.acne} />
                <IssueItem label="Mụn viêm đỏ" value={data.issues.redInflammation} />
                <IssueItem label="Quầng thâm mắt" value={data.issues.darkCircles} />
                <IssueItem label="Lỗ chân lông to" value={data.issues.largePores} />
                <IssueItem label="Đốm thâm nám" value={data.issues.darkSpots} />
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-emerald-900 rounded-[2.5rem] p-8 text-white shadow-xl"
            >
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                Phân tích lão hóa
              </h3>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-emerald-200">Nếp nhăn vùng mắt</span>
                    <span className="text-sm font-bold">{data.agingAnalysis.eyeWrinkles}%</span>
                  </div>
                  <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-400" style={{ width: `${data.agingAnalysis.eyeWrinkles}%` }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-emerald-200">Nếp nhăn vùng má</span>
                    <span className="text-sm font-bold">{data.agingAnalysis.cheekWrinkles}%</span>
                  </div>
                  <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-400" style={{ width: `${data.agingAnalysis.cheekWrinkles}%` }} />
                  </div>
                </div>
                <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
                  <p className="text-[10px] uppercase font-bold text-emerald-300 mb-1">Độ sâu nếp nhăn</p>
                  <p className="text-lg font-bold capitalize">
                    {data.agingAnalysis.wrinkleDepth === 'thap' ? 'Thấp' : 
                     data.agingAnalysis.wrinkleDepth === 'trung_binh' ? 'Trung bình' : 'Cao'}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Routine Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-[2.5rem] p-8 shadow-xl shadow-slate-200/50 border border-slate-100"
          >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
              <h3 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
                <Sparkles className="w-6 h-6 text-emerald-500" />
                Gợi ý quy trình chăm sóc
              </h3>
              <div className="flex gap-3">
                <button className="p-3 bg-slate-100 rounded-xl hover:bg-slate-200 transition-colors">
                  <Share2 className="w-5 h-5 text-slate-600" />
                </button>
                <button 
                  onClick={handleDownload}
                  disabled={isDownloading}
                  className="p-3 bg-slate-100 rounded-xl hover:bg-slate-200 transition-colors disabled:opacity-50"
                >
                  {isDownloading ? <Loader2 className="w-5 h-5 animate-spin text-slate-600" /> : <Download className="w-5 h-5 text-slate-600" />}
                </button>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="bg-amber-50 rounded-3xl p-6 border border-amber-100">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-amber-500 rounded-xl flex items-center justify-center text-white">
                    <Sun className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-bold text-amber-900">Routine Sáng</h4>
                </div>
                <p className="text-amber-800/80 leading-relaxed">{data.careSuggestions.morningRoutine}</p>
              </div>
              <div className="bg-indigo-50 rounded-3xl p-6 border border-indigo-100">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-indigo-500 rounded-xl flex items-center justify-center text-white">
                    <Moon className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-bold text-indigo-900">Routine Tối</h4>
                </div>
                <p className="text-indigo-800/80 leading-relaxed">{data.careSuggestions.nightRoutine}</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-emerald-50 rounded-3xl p-6 border border-emerald-100">
                <h4 className="font-bold text-emerald-900 mb-4 flex items-center gap-2">
                  <Zap className="w-4 h-4" />
                  Hoạt chất phù hợp
                </h4>
                <div className="flex flex-wrap gap-2">
                  {data.careSuggestions.suitableActives.map((active, i) => (
                    <span key={i} className="px-3 py-1 bg-white border border-emerald-200 text-emerald-700 rounded-full text-xs font-bold">
                      {active}
                    </span>
                  ))}
                </div>
              </div>
              <div className="bg-slate-50 rounded-3xl p-6 border border-slate-200">
                <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <Info className="w-4 h-4" />
                  Lưu ý quan trọng
                </h4>
                <p className="text-sm text-slate-600 leading-relaxed">{data.careSuggestions.notes}</p>
              </div>
            </div>
          </motion.div>

          {/* Conclusion Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-slate-900 rounded-[2.5rem] p-10 text-white"
          >
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <Layers className="w-6 h-6 text-emerald-400" />
              Kết luận chuyên gia
            </h3>
            <div className="prose prose-invert max-w-none">
              <div className="text-slate-300 leading-relaxed space-y-4">
                <Markdown>{data.detailedConclusion}</Markdown>
              </div>
            </div>
            <div className="mt-10 pt-10 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-emerald-500 flex items-center justify-center">
                  <AlertCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="font-bold text-emerald-400">Quà tặng dành riêng cho bạn!</p>
                  <p className="text-sm text-slate-400 max-w-md">Bạn nhận được 1 vé tư vấn miễn phí trực tiếp về da và quy trình chăm sóc da chuyên sâu từ chuyên gia.</p>
                </div>
              </div>
              <div className="flex flex-wrap justify-center gap-4">
                <button 
                  onClick={() => setShowConsultation(true)}
                  className="px-8 py-4 bg-emerald-500 text-white rounded-2xl font-bold hover:bg-emerald-600 transition-all flex items-center gap-2 shadow-lg shadow-emerald-500/20"
                >
                  Nhận Vé Tư Vấn
                  <Sparkles className="w-5 h-5" />
                </button>
                <button 
                  onClick={onReset}
                  className="px-8 py-4 bg-white/10 text-white border border-white/20 rounded-2xl font-bold hover:bg-white/20 transition-all flex items-center gap-2"
                >
                  Soi lại lần nữa
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div ref={conclusionEndRef} className="h-1 w-full" />
          </motion.div>
        </div>

        {/* AI Disclaimer */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-12 p-6 bg-slate-50 rounded-3xl border border-slate-100 text-center"
        >
          <p className="text-xs text-slate-400 leading-relaxed max-w-2xl mx-auto">
            Công cụ phân tích da sử dụng thuật toán AI tự động. Kết quả không phải chẩn đoán y khoa. 
            Nếu có dấu hiệu bệnh lý, vui lòng gặp bác sĩ da liễu.
          </p>
        </motion.div>
      </div>

      <ConsultationPopup 
        isOpen={showConsultation} 
        onClose={() => {
          setShowConsultation(false);
          setHasShownConsultation(true);
          onConsultation(false);
        }}
        onConfirm={() => {
          setShowConsultation(false);
          setHasShownConsultation(true);
          onConsultation(true);
          alert("Cảm ơn bạn! Chuyên gia của chúng tôi sẽ liên hệ với bạn qua số điện thoại đã đăng ký.");
        }}
      />
    </div>
  );
};

const OverviewItem = ({ label, value }: { label: string, value: number }) => (
  <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
    <div className="flex justify-between items-center mb-1">
      <span className="text-[10px] font-bold text-slate-400 uppercase">{label}</span>
      <span className="text-xs font-black text-slate-900">{value}/10</span>
    </div>
    <div className="h-1 bg-slate-200 rounded-full overflow-hidden">
      <div className="h-full bg-emerald-500" style={{ width: `${value * 10}%` }} />
    </div>
  </div>
);

const IssueItem = ({ label, value }: { label: string, value: number }) => (
  <div>
    <div className="flex justify-between items-center mb-2">
      <span className="text-sm font-bold text-slate-600">{label}</span>
      <span className="text-sm font-black text-slate-900">{value}/10</span>
    </div>
    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
      <motion.div 
        initial={{ width: 0 }}
        animate={{ width: `${value * 10}%` }}
        transition={{ duration: 1, delay: 0.5 }}
        className={`h-full ${value > 7 ? 'bg-rose-500' : value > 4 ? 'bg-amber-500' : 'bg-emerald-500'}`}
      />
    </div>
  </div>
);
