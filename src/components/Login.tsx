import React, { useState } from 'react';
import { Phone, ArrowRight, X } from 'lucide-react';
import { motion } from 'motion/react';

interface LoginProps {
  onLogin: (phoneNumber: string) => void;
  onClose: () => void;
}

export const Login: React.FC<LoginProps> = ({ onLogin, onClose }) => {
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');

  const validatePhone = (p: string) => {
    // Basic Vietnamese phone number validation
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
    <div className="fixed inset-0 z-[60] flex items-center justify-center px-4 bg-slate-900/40 backdrop-blur-sm">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-3xl p-8 w-full max-w-md shadow-2xl relative"
      >
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 text-slate-400 hover:text-slate-600 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-600 mx-auto mb-4">
            <Phone className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900">Đăng nhập</h2>
          <p className="text-slate-500 mt-2">Đăng nhập bằng số điện thoại để xem lịch sử soi da</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Số điện thoại</label>
            <div className="relative">
              <input
                type="tel"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                  setError('');
                }}
                placeholder="09xx xxx xxx"
                className={`w-full px-4 py-3 bg-slate-50 border ${error ? 'border-red-300' : 'border-slate-200'} rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all`}
              />
            </div>
            {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-emerald-600 text-white py-4 rounded-xl font-bold hover:bg-emerald-700 transition-all flex items-center justify-center gap-2 group"
          >
            Tiếp tục
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </form>
      </motion.div>
    </div>
  );
};
