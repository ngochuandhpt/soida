import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, FileText, CheckCircle, AlertTriangle, Scale, Info } from 'lucide-react';

interface TermsOfUseProps {
  onBack: () => void;
}

export const TermsOfUse: React.FC<TermsOfUseProps> = ({ onBack }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-32 pb-20 px-4">
      <div className="max-w-3xl mx-auto">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-slate-500 hover:text-emerald-600 transition-colors mb-8 group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          Quay lại trang chủ
        </button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl p-8 md:p-12 shadow-xl shadow-slate-200/50 border border-slate-100"
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-600">
              <FileText className="w-6 h-6" />
            </div>
            <h1 className="text-3xl font-bold text-slate-900">Điều khoản sử dụng</h1>
          </div>

          <div className="space-y-8 text-slate-600 leading-relaxed">
            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-4">1. Phạm vi dịch vụ</h2>
              <p>Ứng dụng <strong>Soida.vn</strong> cung cấp:</p>
              <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                <li>Công cụ phân tích da bằng công nghệ trí tuệ nhân tạo (AI)</li>
                <li>Gợi ý quy trình chăm sóc da</li>
                <li>Đề xuất sản phẩm mỹ phẩm phù hợp với tình trạng da</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-4">2. Điều kiện sử dụng</h2>
              <p>Người dùng cam kết:</p>
              <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                <li>Cung cấp thông tin chính xác</li>
                <li>Không sử dụng ứng dụng cho mục đích vi phạm pháp luật</li>
                <li>Không tải lên hình ảnh của người khác khi chưa có sự cho phép</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-4">3. Quyền sở hữu trí tuệ</h2>
              <p>Toàn bộ nội dung, thuật toán, công nghệ và thiết kế hệ thống thuộc quyền sở hữu của <strong>Công ty TLG Việt Nam</strong>.</p>
              <p className="mt-4 font-bold text-slate-800">Nghiêm cấm:</p>
              <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                <li>Sao chép</li>
                <li>Reverse engineer</li>
                <li>Khai thác thương mại trái phép</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-4">4. Giới hạn trách nhiệm</h2>
              <p>Ứng dụng <strong>Soida.vn</strong> cung cấp kết quả phân tích dựa trên thuật toán AI.</p>
              <p className="mt-4 font-bold text-slate-800">Chúng tôi không chịu trách nhiệm đối với:</p>
              <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                <li>Quyết định sử dụng sản phẩm của người dùng</li>
                <li>Các phản ứng cá nhân đối với mỹ phẩm</li>
                <li>Việc sử dụng thông tin sai mục đích</li>
              </ul>
            </section>

            <section className="border-t border-slate-100 pt-8">
              <h2 className="text-xl font-bold text-slate-900 mb-4">5. Chấm dứt tài khoản</h2>
              <p><strong>Công ty TLG Việt Nam</strong> có quyền:</p>
              <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                <li>Tạm khóa tài khoản</li>
                <li>Chấm dứt quyền truy cập</li>
              </ul>
              <p className="mt-4">nếu phát hiện hành vi vi phạm điều khoản sử dụng.</p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
