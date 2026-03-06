import React from 'react';
import { Sparkles, User, LogOut, History as HistoryIcon } from 'lucide-react';
import { AppState } from '../types';
import { motion } from 'motion/react';

interface HeaderProps {
  onStartScan?: () => void;
  onNavigate?: (page: AppState) => void;
  userPhone?: string | null;
  onLogout?: () => void;
  onLoginClick?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  onStartScan, 
  onNavigate, 
  userPhone, 
  onLogout,
  onLoginClick 
}) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => onNavigate?.('home')}>
          <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
            <Sparkles className="text-white w-5 h-5" />
          </div>
          <span className="font-bold text-xl tracking-tight text-slate-800">soida.vn</span>
        </div>
        
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
          <button 
            onClick={() => onNavigate?.('home')}
            className="hover:text-emerald-600 transition-colors font-medium"
          >
            Trang chủ
          </button>
          <button 
            onClick={onStartScan}
            className="hover:text-emerald-600 transition-colors font-medium relative group overflow-hidden px-3 py-1.5 rounded-lg"
          >
            <span className="relative z-10">Soi da ngay</span>
            
            {/* Subtle scanning line */}
            <motion.div 
              animate={{ 
                left: ["-100%", "200%"] 
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity, 
                ease: "easeInOut",
                repeatDelay: 2
              }}
              className="absolute top-0 bottom-0 w-8 bg-gradient-to-r from-transparent via-emerald-500/10 to-transparent skew-x-12 z-0"
            />
          </button>
          <a href="mailto:tlgvn123@gmail.com" className="hover:text-emerald-600 transition-colors">Liên hệ</a>
        </nav>

        <div className="flex items-center gap-4">
          {userPhone ? (
            <div className="flex items-center gap-3">
              <button 
                onClick={() => onNavigate?.('history')}
                className="flex items-center gap-2 text-slate-600 hover:text-emerald-600 transition-colors text-sm font-medium"
              >
                <HistoryIcon className="w-4 h-4" />
                Lịch sử
              </button>
              <div className="h-4 w-px bg-slate-200" />
              <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 rounded-full">
                <User className="w-4 h-4 text-slate-500" />
                <span className="text-xs font-bold text-slate-700">{userPhone}</span>
              </div>
              <button 
                onClick={onLogout}
                className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                title="Đăng xuất"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button 
              onClick={onLoginClick}
              className="bg-emerald-600 text-white px-6 py-2 rounded-full text-sm font-semibold hover:bg-emerald-700 transition-colors shadow-sm"
            >
              Đăng nhập
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
