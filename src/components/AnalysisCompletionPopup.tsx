import React, { useState } from 'react';
import { Phone, ArrowRight, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';

interface AnalysisCompletionPopupProps {
  onLogin: (phoneNumber: string) => void;
  initialPhone?: string | null;
}

export const AnalysisCompletionPopup: React.FC<AnalysisCompletionPopupProps> = ({ onLogin, initialPhone }) => {
  const [phone, setPhone] = useState(initialPhone || '');
  const [error, setError] = useState('');

  const validatePhone = (p: string) => {
    const regex = /^(0|84)(3|5|7|8|9)([0-9]{8})$/;
    return regex.test(p);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validatePhone(phone)) {
      onLogin(phone);
    } else {
      setError('Số điện thoại không đúng định dạng (VD: 0912345678)');
    }
  };

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center px-4 bg-slate-900/60 backdrop-blur-md">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="bg-white rounded-[2.5rem] p-8 w-full max-w-md shadow-2xl relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-2 bg-emerald-500" />
        
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-emerald-100 rounded-3xl flex items-center justify-center text-emerald-600 mx-auto mb-6">
            <CheckCircle2 className="w-12 h-12" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900">Phân tích da xong!</h2>
          <p className="text-slate-500 mt-3 leading-relaxed">
            Vui lòng đăng nhập bằng thông tin số điện thoại của bạn để xem chi tiết và lưu lại lịch sử soi da.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">Số điện thoại của bạn</label>
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                <Phone className="w-5 h-5" />
              </div>
              <input
                type="tel"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                  setError('');
                }}
                placeholder="09xx xxx xxx"
                className={`w-full pl-12 pr-4 py-4 bg-slate-50 border-2 ${error ? 'border-red-200' : 'border-slate-100'} rounded-2xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all text-lg font-medium`}
                autoFocus
              />
            </div>
            {error && <p className="text-red-500 text-xs mt-2 ml-1 font-medium">{error}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-emerald-600 text-white py-5 rounded-2xl font-bold hover:bg-emerald-700 shadow-lg shadow-emerald-200 transition-all flex items-center justify-center gap-3 group text-lg"
          >
            Xem kết quả ngay
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          
          <p className="text-[10px] text-center text-slate-400 uppercase tracking-widest font-bold">
            Bảo mật tuyệt đối • Kết quả tức thì
          </p>
        </form>
      </motion.div>
    </div>
  );
};
