import React from 'react';
import { Sparkles, Facebook, Instagram, Twitter, Mail } from 'lucide-react';

import { AppState } from '../types';

interface FooterProps {
  onNavigate?: (page: AppState) => void;
  onAdminClick?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onAdminClick }) => {
  return (
    <footer className="bg-white border-t border-slate-200 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 mb-12">
          <div className="col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
                <Sparkles className="text-white w-5 h-5" />
              </div>
              <span className="font-bold text-xl tracking-tight text-slate-800">soida.vn</span>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed">
              Giải pháp phân tích da thông minh sử dụng trí tuệ nhân tạo, mang lại sự thấu hiểu sâu sắc về làn da của bạn.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold text-slate-900 mb-6">Liên kết</h4>
            <ul className="space-y-4 text-sm text-slate-500">
              <li><button onClick={() => onNavigate?.('home')} className="hover:text-emerald-600 transition-colors">Trang chủ</button></li>
              <li><button onClick={() => onNavigate?.('privacy')} className="hover:text-emerald-600 transition-colors">Chính sách bảo mật</button></li>
              <li><button onClick={() => onNavigate?.('terms')} className="hover:text-emerald-600 transition-colors">Điều khoản sử dụng</button></li>
              <li><button onClick={() => onNavigate?.('data-deletion')} className="hover:text-emerald-600 transition-colors">Chính sách xóa dữ liệu</button></li>
              <li><button onClick={onAdminClick} className="hover:text-indigo-600 transition-colors opacity-30 hover:opacity-100">Quản trị</button></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-400 font-medium">
          <p>© 2026 soida.vn. Tất cả quyền được bảo lưu.</p>
        </div>
      </div>
    </footer>
  );
};
