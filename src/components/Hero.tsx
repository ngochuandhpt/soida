import React from 'react';
import { motion } from 'motion/react';
import { Camera, Zap, Cpu } from 'lucide-react';
import { HERO_IMAGE } from '../constants';

interface HeroProps {
  onStart: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStart }) => {
  return (
    <section className="pt-32 pb-20 px-4 overflow-hidden relative">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-100/30 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-teal-100/30 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-4xl mx-auto text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-6">
            <Zap className="w-3 h-3" />
            Công nghệ AI tiên tiến
          </div>
          <h1 className="text-6xl lg:text-8xl font-bold text-slate-900 leading-[1.1] mb-8 tracking-tight">
            Thấu hiểu làn da <br />
            <span className="bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-400 bg-clip-text text-transparent italic">bằng trí tuệ nhân tạo.</span>
          </h1>
          <p className="text-lg text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            Trợ lý AI chuyên biệt cho phái đẹp, giúp thấu hiểu và chăm sóc làn da khoa học hơn mỗi ngày. Phân tích tình trạng da mặt, phát hiện sớm các vấn đề và nhận lời khuyên chuyên nghiệp ngay tại nhà.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button 
              onClick={onStart}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-14 py-6 bg-emerald-600 text-white rounded-2xl font-bold text-2xl hover:bg-emerald-700 transition-all shadow-2xl shadow-emerald-200 flex items-center justify-center gap-4 group relative overflow-hidden"
            >
              <Camera className="w-8 h-8 group-hover:rotate-12 transition-transform relative z-10" />
              <span className="relative z-10">Bắt đầu soi da ngay</span>
              
              {/* Scanning Effect Overlay */}
              <motion.div 
                animate={{ 
                  left: ["-100%", "200%"] 
                }}
                transition={{ 
                  duration: 2.5, 
                  repeat: Infinity, 
                  ease: "easeInOut",
                  repeatDelay: 1
                }}
                className="absolute top-0 bottom-0 w-20 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12 z-0"
              />
              
              {/* Subtle pulsing glow */}
              <motion.div 
                animate={{ 
                  opacity: [0.2, 0.5, 0.2] 
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
                className="absolute inset-0 bg-emerald-400/20 z-0"
              />
            </motion.button>
          </div>

          {/* Hero Image / AI Visualization */}
          <div className="mt-16 relative max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="relative rounded-3xl overflow-hidden shadow-2xl shadow-emerald-200/50 border border-slate-100 bg-white"
            >
              <img 
                src={HERO_IMAGE} 
                alt="AI Skin Analysis for Women" 
                className="w-full h-[500px] object-cover object-center scale-105"
                referrerPolicy="no-referrer"
              />
              
              {/* Scanning UI Elements Overlay */}
              <div className="absolute inset-0 pointer-events-none">
                {/* Hexagon Grid Overlay */}
                <div className="absolute inset-0 opacity-20" style={{ 
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l25.98 15v30L30 60 4.02 45V15z' fill-rule='evenodd' stroke='%2334d399' stroke-width='1' fill='none'/%3E%3C/svg%3E")`,
                  backgroundSize: '40px 40px'
                }} />

                <motion.div 
                  animate={{ 
                    top: ["0%", "100%", "0%"] 
                  }}
                  transition={{ 
                    duration: 3, 
                    repeat: Infinity, 
                    ease: "easeInOut" 
                  }}
                  className="absolute left-0 right-0 h-1.5 bg-emerald-400 shadow-[0_0_30px_rgba(52,211,153,1)] z-10"
                >
                  <div className="absolute inset-0 bg-emerald-400 blur-md" />
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-emerald-500 text-[10px] text-white px-2 py-0.5 rounded-full font-bold shadow-lg flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                    SCANNING_ACTIVE
                  </div>
                  <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-[8px] text-emerald-400 font-mono tracking-widest opacity-50">
                    PROCESSING_NEURAL_DATA...
                  </div>
                </motion.div>
                
                {/* Corner brackets */}
                <div className="absolute top-10 left-10 w-12 h-12 border-t-2 border-l-2 border-emerald-400 rounded-tl-xl shadow-[0_0_10px_rgba(52,211,153,0.5)]" />
                <div className="absolute top-10 right-10 w-12 h-12 border-t-2 border-r-2 border-emerald-400 rounded-tr-xl shadow-[0_0_10px_rgba(52,211,153,0.5)]" />
                <div className="absolute bottom-10 left-10 w-12 h-12 border-b-2 border-l-2 border-emerald-400 rounded-bl-xl shadow-[0_0_10px_rgba(52,211,153,0.5)]" />
                <div className="absolute bottom-10 right-10 w-12 h-12 border-b-2 border-r-2 border-emerald-400 rounded-br-xl shadow-[0_0_10px_rgba(52,211,153,0.5)]" />
                
                {/* Target markers with data labels */}
                <motion.div 
                  animate={{ scale: [1, 1.1, 1], opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute top-1/4 left-1/3 w-8 h-8 border border-emerald-400/50 rounded-full flex items-center justify-center"
                >
                  <div className="w-2 h-2 bg-emerald-400 rounded-full shadow-[0_0_8px_rgba(52,211,153,1)]" />
                  <div className="absolute left-10 top-0 bg-black/40 backdrop-blur-md border border-white/10 px-2 py-1 rounded text-[8px] text-emerald-400 font-mono whitespace-nowrap">
                    PORE_SCAN: 0.82
                  </div>
                </motion.div>

                <motion.div 
                  animate={{ scale: [1, 1.1, 1], opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.7 }}
                  className="absolute top-1/2 right-1/3 w-8 h-8 border border-emerald-400/50 rounded-full flex items-center justify-center"
                >
                  <div className="w-2 h-2 bg-emerald-400 rounded-full shadow-[0_0_8px_rgba(52,211,153,1)]" />
                  <div className="absolute right-10 top-0 bg-black/40 backdrop-blur-md border border-white/10 px-2 py-1 rounded text-[8px] text-emerald-400 font-mono whitespace-nowrap">
                    HYDRATION: 74%
                  </div>
                </motion.div>

                <motion.div 
                  animate={{ scale: [1, 1.1, 1], opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 1.1 }}
                  className="absolute top-1/3 right-10 w-8 h-8 border border-emerald-400/50 rounded-full flex items-center justify-center"
                >
                  <div className="w-2 h-2 bg-emerald-400 rounded-full shadow-[0_0_8px_rgba(52,211,153,1)]" />
                  <div className="absolute right-10 top-0 bg-black/40 backdrop-blur-md border border-white/10 px-2 py-1 rounded text-[8px] text-emerald-400 font-mono whitespace-nowrap">
                    MELANIN: 0.12
                  </div>
                </motion.div>

                <motion.div 
                  animate={{ scale: [1, 1.1, 1], opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 1.4 }}
                  className="absolute bottom-1/4 left-1/2 w-8 h-8 border border-emerald-400/50 rounded-full flex items-center justify-center"
                >
                  <div className="w-2 h-2 bg-emerald-400 rounded-full shadow-[0_0_8px_rgba(52,211,153,1)]" />
                  <div className="absolute left-10 top-0 bg-black/40 backdrop-blur-md border border-white/10 px-2 py-1 rounded text-[8px] text-emerald-400 font-mono whitespace-nowrap">
                    ELASTICITY: HIGH
                  </div>
                </motion.div>

                <motion.div 
                  animate={{ scale: [1, 1.1, 1], opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 1.8 }}
                  className="absolute top-1/4 left-10 w-8 h-8 border border-emerald-400/50 rounded-full flex items-center justify-center"
                >
                  <div className="w-2 h-2 bg-emerald-400 rounded-full shadow-[0_0_8px_rgba(52,211,153,1)]" />
                  <div className="absolute left-10 top-0 bg-black/40 backdrop-blur-md border border-white/10 px-2 py-1 rounded text-[8px] text-emerald-400 font-mono whitespace-nowrap">
                    WRINKLE_INDEX: 0.05
                  </div>
                </motion.div>

                <motion.div 
                  animate={{ scale: [1, 1.1, 1], opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 2.2 }}
                  className="absolute bottom-1/3 right-1/4 w-8 h-8 border border-emerald-400/50 rounded-full flex items-center justify-center"
                >
                  <div className="w-2 h-2 bg-emerald-400 rounded-full shadow-[0_0_8px_rgba(52,211,153,1)]" />
                  <div className="absolute right-10 top-0 bg-black/40 backdrop-blur-md border border-white/10 px-2 py-1 rounded text-[8px] text-emerald-400 font-mono whitespace-nowrap">
                    REDNESS: LOW
                  </div>
                </motion.div>

                <motion.div 
                  animate={{ scale: [1, 1.1, 1], opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 2.6 }}
                  className="absolute top-1/2 left-1/2 w-8 h-8 border border-emerald-400/50 rounded-full flex items-center justify-center -translate-x-1/2 -translate-y-1/2"
                >
                  <div className="w-2 h-2 bg-emerald-400 rounded-full shadow-[0_0_8px_rgba(52,211,153,1)]" />
                  <div className="absolute top-10 bg-black/40 backdrop-blur-md border border-white/10 px-2 py-1 rounded text-[8px] text-emerald-400 font-mono whitespace-nowrap">
                    FACIAL_MAP_SYNC: 100%
                  </div>
                </motion.div>

                <motion.div 
                  animate={{ scale: [1, 1.1, 1], opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 3 }}
                  className="absolute bottom-10 left-1/4 w-8 h-8 border border-emerald-400/50 rounded-full flex items-center justify-center"
                >
                  <div className="w-2 h-2 bg-emerald-400 rounded-full shadow-[0_0_8px_rgba(52,211,153,1)]" />
                  <div className="absolute bottom-10 bg-black/40 backdrop-blur-md border border-white/10 px-2 py-1 rounded text-[8px] text-emerald-400 font-mono whitespace-nowrap">
                    TEXTURE_ANALYSIS: OPTIMAL
                  </div>
                </motion.div>

                <motion.div 
                  animate={{ scale: [1, 1.1, 1], opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 3.4 }}
                  className="absolute bottom-10 right-1/4 w-8 h-8 border border-emerald-400/50 rounded-full flex items-center justify-center"
                >
                  <div className="w-2 h-2 bg-emerald-400 rounded-full shadow-[0_0_8px_rgba(52,211,153,1)]" />
                  <div className="absolute bottom-10 bg-black/40 backdrop-blur-md border border-white/10 px-2 py-1 rounded text-[8px] text-emerald-400 font-mono whitespace-nowrap">
                    DERMA_HEALTH: 98%
                  </div>
                </motion.div>

                <motion.div 
                  animate={{ scale: [1, 1.1, 1], opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 3.8 }}
                  className="absolute top-10 left-1/2 w-8 h-8 border border-emerald-400/50 rounded-full flex items-center justify-center -translate-x-1/2"
                >
                  <div className="w-2 h-2 bg-emerald-400 rounded-full shadow-[0_0_8px_rgba(52,211,153,1)]" />
                  <div className="absolute top-10 bg-black/40 backdrop-blur-md border border-white/10 px-2 py-1 rounded text-[8px] text-emerald-400 font-mono whitespace-nowrap">
                    SYMMETRY_CHECK: PASS
                  </div>
                </motion.div>

                <motion.div 
                  animate={{ scale: [1, 1.1, 1], opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 4.2 }}
                  className="absolute top-1/4 right-1/4 w-8 h-8 border border-emerald-400/50 rounded-full flex items-center justify-center"
                >
                  <div className="w-2 h-2 bg-emerald-400 rounded-full shadow-[0_0_8px_rgba(52,211,153,1)]" />
                  <div className="absolute right-10 top-0 bg-black/40 backdrop-blur-md border border-white/10 px-2 py-1 rounded text-[8px] text-emerald-400 font-mono whitespace-nowrap">
                    LIP_CONTOUR: DEFINED
                  </div>
                </motion.div>

                <motion.div 
                  animate={{ scale: [1, 1.1, 1], opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 4.6 }}
                  className="absolute bottom-1/4 right-1/2 w-8 h-8 border border-emerald-400/50 rounded-full flex items-center justify-center translate-x-1/2"
                >
                  <div className="w-2 h-2 bg-emerald-400 rounded-full shadow-[0_0_8px_rgba(52,211,153,1)]" />
                  <div className="absolute bottom-10 bg-black/40 backdrop-blur-md border border-white/10 px-2 py-1 rounded text-[8px] text-emerald-400 font-mono whitespace-nowrap">
                    CHIN_LINE: SHARP
                  </div>
                </motion.div>

                <motion.div 
                  animate={{ scale: [1, 1.1, 1], opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 5 }}
                  className="absolute top-1/3 left-1/4 w-8 h-8 border border-emerald-400/50 rounded-full flex items-center justify-center"
                >
                  <div className="w-2 h-2 bg-emerald-400 rounded-full shadow-[0_0_8px_rgba(52,211,153,1)]" />
                  <div className="absolute left-10 top-0 bg-black/40 backdrop-blur-md border border-white/10 px-2 py-1 rounded text-[8px] text-emerald-400 font-mono whitespace-nowrap">
                    EYE_CONTOUR: SYMMETRIC
                  </div>
                </motion.div>

                <motion.div 
                  animate={{ scale: [1, 1.1, 1], opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 5.4 }}
                  className="absolute top-1/2 right-10 w-8 h-8 border border-emerald-400/50 rounded-full flex items-center justify-center"
                >
                  <div className="w-2 h-2 bg-emerald-400 rounded-full shadow-[0_0_8px_rgba(52,211,153,1)]" />
                  <div className="absolute right-10 top-0 bg-black/40 backdrop-blur-md border border-white/10 px-2 py-1 rounded text-[8px] text-emerald-400 font-mono whitespace-nowrap">
                    SKIN_TONE: EVEN
                  </div>
                </motion.div>

                <motion.div 
                  animate={{ scale: [1, 1.1, 1], opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 5.8 }}
                  className="absolute bottom-1/2 left-1/4 w-8 h-8 border border-emerald-400/50 rounded-full flex items-center justify-center"
                >
                  <div className="w-2 h-2 bg-emerald-400 rounded-full shadow-[0_0_8px_rgba(52,211,153,1)]" />
                  <div className="absolute left-10 top-0 bg-black/40 backdrop-blur-md border border-white/10 px-2 py-1 rounded text-[8px] text-emerald-400 font-mono whitespace-nowrap">
                    PORE_INDEX: 0.08
                  </div>
                </motion.div>

                <motion.div 
                  animate={{ scale: [1, 1.1, 1], opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 6.2 }}
                  className="absolute bottom-1/2 right-1/4 w-8 h-8 border border-emerald-400/50 rounded-full flex items-center justify-center"
                >
                  <div className="w-2 h-2 bg-emerald-400 rounded-full shadow-[0_0_8px_rgba(52,211,153,1)]" />
                  <div className="absolute right-10 top-0 bg-black/40 backdrop-blur-md border border-white/10 px-2 py-1 rounded text-[8px] text-emerald-400 font-mono whitespace-nowrap">
                    DARK_CIRCLE: 0.04
                  </div>
                </motion.div>

                <motion.div 
                  animate={{ scale: [1, 1.1, 1], opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 6.6 }}
                  className="absolute top-10 right-1/2 w-8 h-8 border border-emerald-400/50 rounded-full flex items-center justify-center translate-x-1/2"
                >
                  <div className="w-2 h-2 bg-emerald-400 rounded-full shadow-[0_0_8px_rgba(52,211,153,1)]" />
                  <div className="absolute top-10 bg-black/40 backdrop-blur-md border border-white/10 px-2 py-1 rounded text-[8px] text-emerald-400 font-mono whitespace-nowrap">
                    DERMA_SCORE: 92
                  </div>
                </motion.div>

                <motion.div 
                  animate={{ scale: [1, 1.1, 1], opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 7 }}
                  className="absolute bottom-1/4 left-1/3 w-8 h-8 border border-emerald-400/50 rounded-full flex items-center justify-center"
                >
                  <div className="w-2 h-2 bg-emerald-400 rounded-full shadow-[0_0_8px_rgba(52,211,153,1)]" />
                  <div className="absolute bottom-10 bg-black/40 backdrop-blur-md border border-white/10 px-2 py-1 rounded text-[8px] text-emerald-400 font-mono whitespace-nowrap">
                    UV_DAMAGE: MINIMAL
                  </div>
                </motion.div>

                <motion.div 
                  animate={{ scale: [1, 1.1, 1], opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 7.4 }}
                  className="absolute top-1/2 left-1/4 w-8 h-8 border border-emerald-400/50 rounded-full flex items-center justify-center"
                >
                  <div className="w-2 h-2 bg-emerald-400 rounded-full shadow-[0_0_8px_rgba(52,211,153,1)]" />
                  <div className="absolute left-10 top-0 bg-black/40 backdrop-blur-md border border-white/10 px-2 py-1 rounded text-[8px] text-emerald-400 font-mono whitespace-nowrap">
                    PORE_SIZE: 0.12
                  </div>
                </motion.div>

                <motion.div 
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                  className="absolute top-1/2 left-10 bg-emerald-500/10 backdrop-blur-sm border border-emerald-500/20 p-2 rounded-lg text-[10px] text-emerald-400 font-mono"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <Cpu className="w-3 h-3 animate-spin-slow" />
                    <span>NEURAL_NET_SYNC</span>
                  </div>
                  <div className="w-24 h-1 bg-slate-800 rounded-full overflow-hidden">
                    <motion.div 
                      animate={{ width: ["0%", "100%"] }}
                      transition={{ duration: 3, repeat: Infinity }}
                      className="h-full bg-emerald-400"
                    />
                  </div>
                </motion.div>

                <motion.div 
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 4, repeat: Infinity, delay: 2 }}
                  className="absolute bottom-20 right-10 bg-emerald-500/10 backdrop-blur-sm border border-emerald-500/20 p-2 rounded-lg text-[10px] text-emerald-400 font-mono"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <Zap className="w-3 h-3 animate-pulse" />
                    <span>DERMA_METRICS</span>
                  </div>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                    <span>ACNE: 0.02</span>
                    <span>UV: 0.15</span>
                    <span>AGE: 24.5</span>
                    <span>TYPE: OILY</span>
                  </div>
                </motion.div>
              </div>
            </motion.div>
            
            {/* Floating Stats/Badges */}
            <motion.div 
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="absolute -right-6 top-1/4 bg-white p-4 rounded-2xl shadow-xl border border-slate-100 hidden lg:block"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 font-bold">95%</div>
                <div>
                  <div className="text-xs text-slate-400 font-medium">Độ chính xác</div>
                  <div className="text-sm font-bold text-slate-800">Phân tích AI</div>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1 }}
              className="absolute -left-6 bottom-1/4 bg-white/80 backdrop-blur-md p-3 rounded-2xl shadow-xl border border-white/20 hidden lg:block"
            >
              <div className="flex items-center gap-2">
                <Cpu className="w-4 h-4 text-emerald-500 animate-pulse" />
                <span className="text-[10px] font-bold text-slate-600 uppercase tracking-wider">AI_CORE_READY</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
