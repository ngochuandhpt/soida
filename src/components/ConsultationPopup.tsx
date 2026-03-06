import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, X, Check, ArrowRight } from 'lucide-react';

interface ConsultationPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const ConsultationPopup: React.FC<ConsultationPopupProps> = ({ isOpen, onClose, onConfirm }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-md bg-white rounded-[2.5rem] shadow-2xl overflow-hidden"
          >
            <div className="absolute top-4 right-4">
              <button 
                onClick={onClose}
                className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-8 pt-12 text-center">
              <div className="w-20 h-20 bg-emerald-100 rounded-3xl flex items-center justify-center mx-auto mb-6 text-emerald-600">
                <MessageSquare className="w-10 h-10" />
              </div>
              
              <h3 className="text-2xl font-bold text-slate-900 mb-3">
                Xin chúc mừng!
              </h3>
              
              <p className="text-slate-500 mb-8 leading-relaxed">
                Bạn nhận được 1 vé tư vấn miễn phí trực tiếp về da và quy trình chăm sóc da chuyên sâu cho da Nám, bạn có muốn nhận không?
              </p>

              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={onClose}
                  className="px-6 py-4 rounded-2xl font-bold text-slate-500 bg-slate-100 hover:bg-slate-200 transition-all"
                >
                  Không, cảm ơn
                </button>
                <button
                  onClick={onConfirm}
                  className="px-6 py-4 rounded-2xl font-bold text-white bg-emerald-600 hover:bg-emerald-700 shadow-lg shadow-emerald-200 transition-all flex items-center justify-center gap-2 group"
                >
                  Có, tư vấn ngay
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            <div className="bg-slate-50 p-4 text-center border-t border-slate-100">
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest flex items-center justify-center gap-2">
                <Check className="w-3 h-3 text-emerald-500" />
                Dành riêng cho người dùng soida.vn
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
